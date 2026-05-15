import { NextResponse, type NextRequest } from "next/server"
import { verifyBtcpayWebhookSignature } from "@/lib/btcpay/webhook"
import { processBtcpayWebhook } from "@/features/payment/webhook"
import { btcpayWebhookPayloadSchema } from "@/features/payment/schemas"

/**
 * BTCPay webhook handler
 *
 * POST /api/webhooks/btcpay
 *
 * Security:
 * 1. Read raw body BEFORE any parsing.
 * 2. Verify HMAC-SHA256 signature using BTCPay-Sig header.
 * 3. Only parse JSON after signature is verified.
 * 4. Idempotent: duplicate events are silently accepted (200).
 *
 * Webhook signature header: BTCPay-Sig
 * Format: sha256=<hmac-sha256-hex>
 * Reference: https://docs.btcpayserver.org/Webhooks/#webhook-security
 */
export async function POST(request: NextRequest) {
  // 1. Read raw body — must happen before any JSON parsing
  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: "Failed to read request body" }, { status: 400 })
  }

  // 2. Read and verify signature
  // Header name: BTCPay-Sig (confirmed from BTCPay webhook docs)
  const signature = request.headers.get("BTCPay-Sig")
  const secret = process.env.BTCPAY_WEBHOOK_SECRET

  if (!secret) {
    // Webhook secret not configured — reject all requests
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 })
  }

  const isValid = verifyBtcpayWebhookSignature({ rawBody, signature, secret })

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  // 3. Parse JSON only after signature verification
  let rawPayload: Record<string, unknown>
  try {
    rawPayload = JSON.parse(rawBody) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 })
  }

  // 4. Validate payload shape
  const parseResult = btcpayWebhookPayloadSchema.safeParse(rawPayload)
  if (!parseResult.success) {
    return NextResponse.json({ error: "Invalid payload structure" }, { status: 400 })
  }

  // 5. Process the event
  try {
    const result = await processBtcpayWebhook(parseResult.data, rawPayload)
    return NextResponse.json({ message: result.message }, { status: result.status })
  } catch {
    // Do not expose internal error details
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
