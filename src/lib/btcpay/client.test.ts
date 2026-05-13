import { describe, it, expect, vi, beforeEach } from "vitest"
import { createBtcpayInvoice } from "./client"

// Mock the env module
vi.mock("@/lib/env/server", () => ({
  getServerEnv: () => ({
    NEXT_PUBLIC_APP_URL: "http://localhost:3000",
    NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "test-anon-key",
    NEXT_PUBLIC_PAYMENT_CURRENCY: "USDT",
    NEXT_PUBLIC_PAYMENT_NETWORK: "polygon",
    BTCPAY_SERVER_URL: "https://btcpay.example.com",
    BTCPAY_API_KEY: "test-api-key",
    BTCPAY_STORE_ID: "test-store-id",
    BTCPAY_WEBHOOK_SECRET: "test-webhook-secret",
  }),
}))

describe("createBtcpayInvoice", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return placeholder invoice data", async () => {
    const input = {
      userId: "user-123",
      amount: 100,
      currency: "USDT" as const,
      network: "polygon" as const,
    }

    const result = await createBtcpayInvoice(input)

    expect(result).toEqual({
      invoiceId: "placeholder-invoice-id",
      checkoutUrl: "/payment",
      status: "new",
    })
  })

  it("should log input data", async () => {
    const consoleSpy = vi.spyOn(console, "log")

    const input = {
      userId: "user-123",
      amount: 100,
      currency: "USDT" as const,
      network: "polygon" as const,
    }

    await createBtcpayInvoice(input)

    expect(consoleSpy).toHaveBeenCalledWith("BTCPay invoice placeholder:", input)
  })

  it("should validate env is available", async () => {
    const consoleSpy = vi.spyOn(console, "log")

    const input = {
      userId: "user-123",
      amount: 100,
      currency: "USDT" as const,
      network: "polygon" as const,
    }

    await createBtcpayInvoice(input)

    expect(consoleSpy).toHaveBeenCalledWith("BTCPay config available:", {
      serverUrl: true,
      apiKey: true,
      storeId: true,
    })
  })
})
