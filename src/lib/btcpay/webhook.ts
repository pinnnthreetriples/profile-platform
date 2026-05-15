import "server-only"

import { createHmac, timingSafeEqual } from "crypto"

/**
 * Verify a BTCPay webhook signature.
 *
 * BTCPay sends the signature in the header: BTCPay-Sig
 * Format: sha256=<hmac-sha256-hex-of-raw-body>
 * Reference: https://docs.btcpayserver.org/Webhooks/#webhook-security
 *
 * IMPORTANT: rawBody must be the raw request body string BEFORE JSON.parse.
 * Parsing first and re-serializing changes whitespace and breaks the signature.
 *
 * Uses timingSafeEqual to prevent timing attacks.
 */
export function verifyBtcpayWebhookSignature({
  rawBody,
  signature,
  secret,
}: {
  rawBody: string
  signature: string | null
  secret: string
}): boolean {
  if (!signature) {
    return false
  }

  // Signature format: "sha256=<hex>"
  const prefix = "sha256="
  if (!signature.startsWith(prefix)) {
    return false
  }

  const receivedHex = signature.slice(prefix.length)

  const expectedHex = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex")

  // Use constant-time comparison to prevent timing attacks
  try {
    const receivedBuf = Buffer.from(receivedHex, "hex")
    const expectedBuf = Buffer.from(expectedHex, "hex")

    if (receivedBuf.length !== expectedBuf.length) {
      return false
    }

    return timingSafeEqual(receivedBuf, expectedBuf)
  } catch {
    return false
  }
}
