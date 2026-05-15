import "server-only"

import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import {
  markPaymentPaid,
  markPaymentExpired,
  markPaymentFailed,
  markPaymentProcessing,
} from "./server"
import {
  BTCPAY_PAID_EVENT_TYPES,
  BTCPAY_EXPIRED_EVENT_TYPES,
  BTCPAY_PROCESSING_EVENT_TYPES,
} from "@/lib/btcpay/types"
import type { BtcpayWebhookPayload } from "./schemas"
import type { Database } from "@/types/database"

type PaymentRow = Database["public"]["Tables"]["payments"]["Row"]

/**
 * Process a verified BTCPay webhook event.
 *
 * Rules:
 * - Only called after signature verification.
 * - Idempotent: duplicate event_id is silently ignored.
 * - Unknown event types are stored but do not mutate payment status.
 * - Only verified final events mark payment/profile as paid.
 * - Success redirect URL never marks payment as paid.
 */
export async function processBtcpayWebhook(
  payload: BtcpayWebhookPayload,
  rawPayload: Record<string, unknown>
): Promise<{ status: number; message: string }> {
  const admin = createSupabaseAdminClient()

  const eventId = payload.deliveryId ?? payload.originalDeliveryId ?? null
  const eventType = payload.type
  const invoiceId = payload.invoiceId ?? null

  // Idempotency: check if this event was already processed
  if (eventId) {
    const { data: existing } = await admin
      .from("payment_events")
      .select("id")
      .eq("provider", "btcpay")
      .eq("event_id", eventId)
      .limit(1)
      .single()

    if (existing) {
      // Already processed — return 200 (idempotent)
      return { status: 200, message: "Event already processed" }
    }
  }

  // Find the payment by provider_invoice_id
  let payment: PaymentRow | null = null
  if (invoiceId) {
    const { data } = await admin
      .from("payments")
      .select("*")
      .eq("provider_invoice_id", invoiceId)
      .single()

    payment = data ? (data as unknown as PaymentRow) : null
  }

  // Insert payment event (audit log — always, even for unknown events)
  await admin.from("payment_events").insert({
    payment_id: payment?.id ?? null,
    provider: "btcpay" as const,
    provider_invoice_id: invoiceId,
    event_type: eventType,
    event_id: eventId,
    payload: rawPayload,
  })

  if (!payment) {
    // No matching payment found — log and return 200 (don't retry)
    return { status: 200, message: "No matching payment found" }
  }

  // Map event type to status transition
  const isPaid = (BTCPAY_PAID_EVENT_TYPES as readonly string[]).includes(eventType)
  const isExpired = (BTCPAY_EXPIRED_EVENT_TYPES as readonly string[]).includes(eventType)
  const isProcessing = (BTCPAY_PROCESSING_EVENT_TYPES as readonly string[]).includes(
    eventType
  )

  if (isPaid) {
    await markPaymentPaid(payment.id, payment.user_id)
  } else if (isExpired) {
    await markPaymentExpired(payment.id)
  } else if (isProcessing) {
    await markPaymentProcessing(payment.id)
  } else if (eventType === "InvoiceInvalid") {
    await markPaymentFailed(payment.id)
  }
  // Unknown event types: stored in payment_events but no status change

  return { status: 200, message: "OK" }
}
