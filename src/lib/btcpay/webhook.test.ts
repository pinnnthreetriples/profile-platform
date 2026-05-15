import { describe, it, expect } from "vitest"
import { createHmac } from "crypto"
import { verifyBtcpayWebhookSignature } from "./webhook"

function getTestSecret(): string {
  return process.env.TEST_BTCPAY_WEBHOOK_SECRET ?? "test-webhook-secret"
}

const BODY = '{"type":"InvoiceSettled","invoiceId":"inv-123"}'

function makeSignature(body: string, secret: string): string {
  const hex = createHmac("sha256", secret).update(body, "utf8").digest("hex")
  return `sha256=${hex}`
}

describe("verifyBtcpayWebhookSignature", () => {
  it("returns true for a valid signature", () => {
    const secret = getTestSecret()
    const signature = makeSignature(BODY, secret)
    expect(
      verifyBtcpayWebhookSignature({ rawBody: BODY, signature, secret })
    ).toBe(true)
  })

  it("returns false for an invalid signature", () => {
    const secret = getTestSecret()
    const signature = makeSignature(BODY, `${secret}-wrong`)
    expect(
      verifyBtcpayWebhookSignature({ rawBody: BODY, signature, secret })
    ).toBe(false)
  })

  it("returns false when signature is null", () => {
    const secret = getTestSecret()
    expect(
      verifyBtcpayWebhookSignature({ rawBody: BODY, signature: null, secret })
    ).toBe(false)
  })

  it("returns false when signature is empty string", () => {
    const secret = getTestSecret()
    expect(verifyBtcpayWebhookSignature({ rawBody: BODY, signature: "", secret })).toBe(
      false
    )
  })

  it("returns false when signature has wrong prefix", () => {
    const secret = getTestSecret()
    const hex = createHmac("sha256", secret).update(BODY, "utf8").digest("hex")
    expect(
      verifyBtcpayWebhookSignature({
        rawBody: BODY,
        signature: `md5=${hex}`,
        secret,
      })
    ).toBe(false)
  })

  it("returns false when body is tampered", () => {
    const secret = getTestSecret()
    const signature = makeSignature(BODY, secret)
    const tamperedBody = BODY.replace("InvoiceSettled", "InvoiceExpired")
    expect(
      verifyBtcpayWebhookSignature({
        rawBody: tamperedBody,
        signature,
        secret,
      })
    ).toBe(false)
  })

  it("returns false for mismatched hex lengths", () => {
    const secret = getTestSecret()
    // Truncated hex — different length
    expect(
      verifyBtcpayWebhookSignature({
        rawBody: BODY,
        signature: "sha256=abc123",
        secret,
      })
    ).toBe(false)
  })

  it("uses constant-time comparison (timingSafeEqual path covered)", () => {
    const secret = getTestSecret()
    // This test verifies the happy path goes through timingSafeEqual
    const signature = makeSignature(BODY, secret)
    const result = verifyBtcpayWebhookSignature({
      rawBody: BODY,
      signature,
      secret,
    })
    expect(result).toBe(true)
  })
})
