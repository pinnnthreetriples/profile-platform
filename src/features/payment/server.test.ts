import { describe, it, expect, vi, beforeEach } from "vitest"
import type { SupabaseClient } from "@supabase/supabase-js"

vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(),
}))

vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: vi.fn(),
}))

vi.mock("@/lib/btcpay/client", () => ({
  createBtcpayInvoice: vi.fn(),
}))

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn().mockReturnValue({ allowed: true, remaining: 4 }),
  resetRateLimit: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`)
  }),
}))

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { createBtcpayInvoice } from "@/lib/btcpay/client"
import { checkRateLimit } from "@/lib/security/rate-limit"
import {
  getCurrentUserPayments,
  getLatestPaymentForCurrentUser,
  createPaymentForCurrentUser,
} from "./server"

// ---- helpers ----

function mockAnonWithUser(userId: string, fromChain?: object): SupabaseClient {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: userId } } }),
    },
    from: fromChain ? vi.fn().mockReturnValue(fromChain) : vi.fn(),
  } as unknown as SupabaseClient
}

function mockAnonNoUser(): SupabaseClient {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
    from: vi.fn(),
  } as unknown as SupabaseClient
}

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

function makeProfileChain(paymentStatus: string) {
  return {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: { id: "user-123", payment_status: paymentStatus },
      error: null,
    }),
  }
}

function makeActivePaymentsChain(rows: object[]) {
  return {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    not: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue({ data: rows, error: null }),
  }
}

describe("getCurrentUserPayments", () => {
  beforeEach(() => vi.clearAllMocks())

  it("redirects to /login when unauthenticated", async () => {
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockAnonNoUser())
    await expect(getCurrentUserPayments()).rejects.toThrow("REDIRECT:/login")
  })

  it("returns mapped payments for authenticated user", async () => {
    const row = makePaymentRow()
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({ data: [row], error: null }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockAnonWithUser("user-123", chain)
    )

    const payments = await getCurrentUserPayments()
    expect(payments).toHaveLength(1)
    expect(payments[0].id).toBe("pay-123")
    expect(payments[0].network).toBe("tron")
    expect(payments[0].paymentMethodId).toBe("USDT-TRON")
  })
})

describe("getLatestPaymentForCurrentUser", () => {
  beforeEach(() => vi.clearAllMocks())

  it("redirects to /login when unauthenticated", async () => {
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockAnonNoUser())
    await expect(getLatestPaymentForCurrentUser()).rejects.toThrow("REDIRECT:/login")
  })

  it("returns null when no payments exist", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: null, error: { code: "PGRST116" } }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockAnonWithUser("user-123", chain)
    )

    const result = await getLatestPaymentForCurrentUser()
    expect(result).toBeNull()
  })
})

describe("createPaymentForCurrentUser", () => {
  beforeEach(() => vi.clearAllMocks())

  it("redirects to /login when unauthenticated", async () => {
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockAnonNoUser())
    await expect(createPaymentForCurrentUser()).rejects.toThrow("REDIRECT:/login")
  })

  it("returns rate limit error when rate limit exceeded", async () => {
    vi.mocked(checkRateLimit).mockReturnValue({ allowed: false, remaining: 0 })
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockAnonWithUser("user-123"))

    const result = await createPaymentForCurrentUser()
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.message).toContain("Too many")
  })

  it("returns alreadyPaid when profile payment_status is paid", async () => {
    vi.mocked(checkRateLimit).mockReturnValue({ allowed: true, remaining: 4 })
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockAnonWithUser("user-123", makeProfileChain("paid"))
    )

    const result = await createPaymentForCurrentUser()
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.alreadyPaid).toBe(true)
  })

  it("reuses existing active pending payment with checkout URL", async () => {
    vi.mocked(checkRateLimit).mockReturnValue({ allowed: true, remaining: 4 })

    const fromMock = vi.fn()
    fromMock.mockReturnValueOnce(makeProfileChain("pending"))
    fromMock.mockReturnValueOnce(makeActivePaymentsChain([makePaymentRow()]))

    vi.mocked(createSupabaseServerClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-123" } } }),
      },
      from: fromMock,
    } as unknown as SupabaseClient)

    const result = await createPaymentForCurrentUser()
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.checkoutUrl).toBe("https://btcpay.example.com/i/inv-abc")
      expect(result.paymentId).toBe("pay-123")
    }
    expect(createBtcpayInvoice).not.toHaveBeenCalled()
  })

  it("returns error when BTCPay invoice creation fails", async () => {
    vi.mocked(checkRateLimit).mockReturnValue({ allowed: true, remaining: 4 })
    vi.mocked(createBtcpayInvoice).mockRejectedValue(new Error("BTCPay down"))

    const newPaymentRow = makePaymentRow({
      provider_invoice_id: null,
      checkout_url: null,
    })
    const fromMock = vi.fn()
    fromMock.mockReturnValueOnce(makeProfileChain("pending"))
    fromMock.mockReturnValueOnce(makeActivePaymentsChain([]))

    vi.mocked(createSupabaseServerClient).mockResolvedValue({
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-123" } } }),
      },
      from: fromMock,
    } as unknown as SupabaseClient)

    const adminFromMock = vi.fn()
    adminFromMock.mockReturnValueOnce({
      insert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: newPaymentRow, error: null }),
    })
    adminFromMock.mockReturnValueOnce({
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockResolvedValue({ error: null }),
    })

    vi.mocked(createSupabaseAdminClient).mockReturnValue({
      from: adminFromMock,
    } as unknown as ReturnType<typeof createSupabaseAdminClient>)

    const result = await createPaymentForCurrentUser()
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.message).toContain("Failed to create payment invoice")
  })
})
