import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { createBtcpayInvoice } from "./client"

const ENV = {
  BTCPAY_SERVER_URL: "https://btcpay.example.com",
  BTCPAY_API_KEY: "test-api-key",
  BTCPAY_STORE_ID: "test-store-id",
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
}

const validInput = {
  paymentId: "pay-123",
  userId: "user-123",
  amount: 100,
  currency: "USDT" as const,
  network: "tron" as const,
  paymentMethodId: "USDT-TRON" as const,
}

const successResponse = {
  id: "invoice-abc",
  checkoutLink: "https://btcpay.example.com/i/invoice-abc",
  status: "New",
  expirationTime: 1700000000,
}

function mockFetchSuccess(data = successResponse) {
  return vi.fn().mockResolvedValue({
    ok: true,
    json: async () => data,
  })
}

describe("createBtcpayInvoice", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.assign(process.env, ENV)
  })

  afterEach(() => {
    for (const key of Object.keys(ENV)) {
      delete process.env[key]
    }
  })

  it("calls BTCPay API with correct URL and headers", async () => {
    const mockFetch = mockFetchSuccess()
    vi.stubGlobal("fetch", mockFetch)

    await createBtcpayInvoice(validInput)

    expect(mockFetch).toHaveBeenCalledOnce()
    const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit]
    expect(url).toBe("https://btcpay.example.com/api/v1/stores/test-store-id/invoices")
    expect(options.method).toBe("POST")
    expect((options.headers as Record<string, string>)["Authorization"]).toBe(
      "token test-api-key"
    )
  })

  it("includes USDT-TRON payment method in request body", async () => {
    const mockFetch = mockFetchSuccess()
    vi.stubGlobal("fetch", mockFetch)

    await createBtcpayInvoice(validInput)

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string)
    expect(body.checkout.paymentMethods).toContain("USDT-TRON")
  })

  it("includes metadata with paymentId, userId, network, paymentMethodId", async () => {
    const mockFetch = mockFetchSuccess()
    vi.stubGlobal("fetch", mockFetch)

    await createBtcpayInvoice(validInput)

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string)
    expect(body.metadata.paymentId).toBe("pay-123")
    expect(body.metadata.userId).toBe("user-123")
    expect(body.metadata.network).toBe("tron")
    expect(body.metadata.paymentMethodId).toBe("USDT-TRON")
  })

  it("returns mapped result on success", async () => {
    vi.stubGlobal("fetch", mockFetchSuccess())

    const result = await createBtcpayInvoice(validInput)

    expect(result.invoiceId).toBe("invoice-abc")
    expect(result.checkoutUrl).toBe("https://btcpay.example.com/i/invoice-abc")
    expect(result.status).toBe("New")
    expect(result.expiresAt).toBeDefined()
  })

  it("throws on non-2xx response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 401, statusText: "Unauthorized" })
    )

    await expect(createBtcpayInvoice(validInput)).rejects.toThrow("BTCPay API error: 401")
  })

  it("throws on network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")))

    await expect(createBtcpayInvoice(validInput)).rejects.toThrow("BTCPay request failed")
  })

  it("throws when BTCPay config is missing", async () => {
    delete process.env.BTCPAY_SERVER_URL

    await expect(createBtcpayInvoice(validInput)).rejects.toThrow(
      "BTCPay configuration is incomplete"
    )
  })

  it("does not log API key or secrets", async () => {
    const consoleSpy = vi.spyOn(console, "log")
    vi.stubGlobal("fetch", mockFetchSuccess())

    await createBtcpayInvoice(validInput)

    const loggedArgs = consoleSpy.mock.calls.flat().join(" ")
    expect(loggedArgs).not.toContain("test-api-key")
  })
})
