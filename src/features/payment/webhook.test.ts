import { describe, it, expect, vi, beforeEach } from "vitest"

vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: vi.fn(),
}))

vi.mock("./server", () => ({
  markPaymentPaid: vi.fn(),
  markPaymentExpired: vi.fn(),
  markPaymentFailed: vi.fn(),
  markPaymentProcessing: vi.fn(),
}))

import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import {
  markPaymentPaid,
  markPaymentExpired,
  markPaymentFailed,
  markPaymentProcessing,
} from "./server"
import { processBtcpayWebhook } from "./webhook"
import type { BtcpayWebhookPayload } from "./schemas"

// ---- helpers ----

function makePaymentRow(overrides = {}) {
  return {
    id: "pay-123",
    user_id: "user-123",
    profile_id: "user-123",
    provider: "btcpay",
    provider_invoice_id: "inv-abc",
    checkout_url: "https://btcpay.example.com/i/inv-abc",
    amount: 100,
    currency: "USDT",
    network: "tron",
    payment_method_id: "USDT-TRON",
    status: "pending",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    expires_at: null,
    settled_at: null,
    ...overrides,
  }
}

function makeAdminClient(
  existingEvent: object | null,
  paymentRow: object | null,
  insertError: object | null = null
) {
  const fromMock = vi.fn()

  // Call 1: check for existing event (idempotency)
  fromMock.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: existingEvent,
      error: existingEvent ? null : { code: "PGRST116" },
    }),
  })

  // Call 2: find payment by provider_invoice_id
  fromMock.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: paymentRow,
      error: paymentRow ? null : { code: "PGRST116" },
    }),
  })

  // Call 3: insert payment_event
  fromMock.mockReturnValueOnce({
    insert: vi.fn().mockResolvedValue({ error: insertError }),
  })

  return { from: fromMock } as unknown as ReturnType<typeof createSupabaseAdminClient>
}

const basePayload: BtcpayWebhookPayload = {
  type: "InvoiceSettled",
  invoiceId: "inv-abc",
  deliveryId: "delivery-001",
}

describe("processBtcpayWebhook", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(markPaymentPaid).mockResolvedValue(undefined)
    vi.mocked(markPaymentExpired).mockResolvedValue(undefined)
    vi.mocked(markPaymentFailed).mockResolvedValue(undefined)
    vi.mocked(markPaymentProcessing).mockResolvedValue(undefined)
  })

  it("returns 200 and skips processing for duplicate event (idempotency)", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(
      makeAdminClient({ id: "existing-event" }, makePaymentRow()) as ReturnType<
        typeof createSupabaseAdminClient
      >
    )

    const result = await processBtcpayWebhook(basePayload, {})
    expect(result.status).toBe(200)
    expect(result.message).toContain("already processed")
    expect(markPaymentPaid).not.toHaveBeenCalled()
  })

  it("calls markPaymentPaid for InvoiceSettled event", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(
      makeAdminClient(null, makePaymentRow()) as ReturnType<
        typeof createSupabaseAdminClient
      >
    )

    const result = await processBtcpayWebhook(
      { ...basePayload, type: "InvoiceSettled" },
      {}
    )
    expect(result.status).toBe(200)
    expect(markPaymentPaid).toHaveBeenCalledWith("pay-123", "user-123")
  })

  it("calls markPaymentPaid for InvoicePaymentSettled event", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(
      makeAdminClient(null, makePaymentRow()) as ReturnType<
        typeof createSupabaseAdminClient
      >
    )

    await processBtcpayWebhook({ ...basePayload, type: "InvoicePaymentSettled" }, {})
    expect(markPaymentPaid).toHaveBeenCalledWith("pay-123", "user-123")
  })

  it("calls markPaymentExpired for InvoiceExpired event", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(
      makeAdminClient(null, makePaymentRow()) as ReturnType<
        typeof createSupabaseAdminClient
      >
    )

    await processBtcpayWebhook({ ...basePayload, type: "InvoiceExpired" }, {})
    expect(markPaymentExpired).toHaveBeenCalledWith("pay-123")
  })

  it("calls markPaymentProcessing for InvoiceProcessing event", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(
      makeAdminClient(null, makePaymentRow()) as ReturnType<
        typeof createSupabaseAdminClient
      >
    )

    await processBtcpayWebhook({ ...basePayload, type: "InvoiceProcessing" }, {})
    expect(markPaymentProcessing).toHaveBeenCalledWith("pay-123")
  })

  it("calls markPaymentFailed for InvoiceInvalid event", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(
      makeAdminClient(null, makePaymentRow()) as ReturnType<
        typeof createSupabaseAdminClient
      >
    )

    await processBtcpayWebhook({ ...basePayload, type: "InvoiceInvalid" }, {})
    expect(markPaymentFailed).toHaveBeenCalledWith("pay-123")
  })

  it("stores unknown event but does not mark payment paid", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(
      makeAdminClient(null, makePaymentRow()) as ReturnType<
        typeof createSupabaseAdminClient
      >
    )

    const result = await processBtcpayWebhook(
      { ...basePayload, type: "InvoiceCreated" },
      {}
    )
    expect(result.status).toBe(200)
    expect(markPaymentPaid).not.toHaveBeenCalled()
    expect(markPaymentExpired).not.toHaveBeenCalled()
    expect(markPaymentFailed).not.toHaveBeenCalled()
  })

  it("returns 200 when no matching payment found", async () => {
    vi.mocked(createSupabaseAdminClient).mockReturnValue(makeAdminClient(null, null))

    const result = await processBtcpayWebhook(basePayload, {})
    expect(result.status).toBe(200)
    expect(result.message).toContain("No matching payment")
    expect(markPaymentPaid).not.toHaveBeenCalled()
  })
})
