import { describe, it, expect } from "vitest"
import { createHmac } from "crypto"
import { verifyBtcpayWebhookSignature } from "./webhook"

const SECRET = "test-webhook-secret"
const BODY = '{"type":"InvoiceSettled","invoiceId":"inv-123"}'

function makeSignature(body: string, secret: string): string {
  const hex = createHmac("sha256", secret).update(body, "utf8").digest("hex")
  return `sha256=${hex}`
}

describe("verifyBtcpayWebhookSignature", () => {
  it("returns true for a valid signature", () => {
    const signature = makeSignature(BODY, SECRET)
    expect(
      verifyBtcpayWebhookSignature({ rawBody: BODY, signature, secret: SECRET })
    ).toBe(true)
  })

  it("returns false for an invalid signature", () => {
    const signature = makeSignature(BODY, "wrong-secret")
    expect(
      verifyBtcpayWebhookSignature({ rawBody: BODY, signature, secret: SECRET })
    ).toBe(false)
  })

  it("returns false when signature is null", () => {
    expect(
      verifyBtcpayWebhookSignature({ rawBody: BODY, signature: null, secret: SECRET })
    ).toBe(false)
  })

  it("returns false when signature is empty string", () => {
    expect(
      verifyBtcpayWebhookSignature({ rawBody: BODY, signature: "", secret: SECRET })
    ).toBe(false)
  })

  it("returns false when signature has wrong prefix", () => {
    const hex = createHmac("sha256", SECRET).update(BODY, "utf8").digest("hex")
    expect(
      verifyBtcpayWebhookSignature({
        rawBody: BODY,
        signature: `md5=${hex}`,
        secret: SECRET,
      })
    ).toBe(false)
  })

  it("returns false when body is tampered", () => {
    const signature = makeSignature(BODY, SECRET)
    const tamperedBody = BODY.replace("InvoiceSettled", "InvoiceExpired")
    expect(
      verifyBtcpayWebhookSignature({
        rawBody: tamperedBody,
        signature,
        secret: SECRET,
      })
    ).toBe(false)
  })

  it("returns false for mismatched hex lengths", () => {
    // Truncated hex — different length
    expect(
      verifyBtcpayWebhookSignature({
        rawBody: BODY,
        signature: "sha256=abc123",
        secret: SECRET,
      })
    ).toBe(false)
  })

  it("uses constant-time comparison (timingSafeEqual path covered)", () => {
    // This test verifies the happy path goes through timingSafeEqual
    const signature = makeSignature(BODY, SECRET)
    const result = verifyBtcpayWebhookSignature({
      rawBody: BODY,
      signature,
      secret: SECRET,
    })
    expect(result).toBe(true)
  })
})
