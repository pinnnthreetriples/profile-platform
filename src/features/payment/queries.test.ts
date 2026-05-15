import { describe, it, expect, vi, afterEach } from "vitest"
import { currentPaymentQueryOptions, paymentStatusQueryOptions } from "./queries"
import type { Payment } from "./types"
import type { PaymentStatus } from "@/types/database"

function makePayment(overrides: Partial<Payment> = {}): Payment {
  return {
    id: "pay-1",
    userId: "user-1",
    profileId: "user-1",
    provider: "btcpay",
    providerInvoiceId: "inv-1",
    checkoutUrl: "https://btcpay.example.com/i/inv-1",
    amount: 100,
    currency: "USDT",
    network: "tron",
    paymentMethodId: "USDT-TRON",
    status: "pending",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    expiresAt: null,
    settledAt: null,
    ...overrides,
  }
}

/**
 * Evaluate refetchInterval by simulating the query state object
 * that TanStack Query passes to the refetchInterval function.
 */
function evalRefetchInterval(status: PaymentStatus | null): number | false {
  const opts = currentPaymentQueryOptions()
  if (typeof opts.refetchInterval !== "function") return false

  const fakeQuery = {
    state: { data: status ? makePayment({ status }) : undefined },
  } as Parameters<typeof opts.refetchInterval>[0]

  return opts.refetchInterval(fakeQuery) as number | false
}

describe("currentPaymentQueryOptions", () => {
  afterEach(() => vi.clearAllMocks())

  it("uses correct query key", () => {
    expect(currentPaymentQueryOptions().queryKey).toEqual(["payment", "current"])
  })

  it("uses initialData when provided", () => {
    const payment = makePayment()
    expect(currentPaymentQueryOptions(payment).initialData).toEqual(payment)
  })

  it("initialData is undefined when null passed", () => {
    expect(currentPaymentQueryOptions(null).initialData).toBeUndefined()
  })

  it("staleTime is 10 seconds", () => {
    expect(currentPaymentQueryOptions().staleTime).toBe(10_000)
  })

  it("refetchInterval is a function", () => {
    expect(typeof currentPaymentQueryOptions().refetchInterval).toBe("function")
  })

  // Polling behaviour
  it.each([
    ["pending" as PaymentStatus, 10_000],
    ["processing" as PaymentStatus, 10_000],
  ])("polls every 10s when status is %s", (status, expected) => {
    expect(evalRefetchInterval(status)).toBe(expected)
  })

  it.each([
    ["paid" as PaymentStatus],
    ["failed" as PaymentStatus],
    ["expired" as PaymentStatus],
    ["cancelled" as PaymentStatus],
  ])("stops polling when status is %s", (status) => {
    expect(evalRefetchInterval(status)).toBe(false)
  })

  it("stops polling when no data", () => {
    expect(evalRefetchInterval(null)).toBe(false)
  })

  it("queryFn fetches from /api/payment/status", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => makePayment({ status: "paid" }),
    })
    vi.stubGlobal("fetch", mockFetch)

    const opts = currentPaymentQueryOptions()
    // queryFn is defined — we assert it exists before calling
    expect(opts.queryFn).toBeDefined()
    const queryFn = opts.queryFn!
    const result = await (queryFn as () => Promise<Payment | null>)()

    expect(mockFetch).toHaveBeenCalledWith("/api/payment/status", { cache: "no-store" })
    expect((result as Payment).status).toBe("paid")
  })

  it("queryFn returns null on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401 }))

    const opts = currentPaymentQueryOptions()
    const queryFn = opts.queryFn!
    const result = await (queryFn as () => Promise<Payment | null>)()
    expect(result).toBeNull()
  })
})

describe("paymentStatusQueryOptions", () => {
  it("uses correct query key with paymentId", () => {
    expect(paymentStatusQueryOptions("pay-123").queryKey).toEqual([
      "payment",
      "pay-123",
      "status",
    ])
  })

  it("uses initialData when provided", () => {
    const payment = makePayment()
    expect(paymentStatusQueryOptions("pay-1", payment).initialData).toEqual(payment)
  })
})
