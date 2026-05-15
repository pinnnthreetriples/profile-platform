import { z } from "zod"

/**
 * Result schema for create payment action
 */
export const createPaymentResultSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), checkoutUrl: z.string().url(), paymentId: z.string() }),
  z.object({
    ok: z.literal(false),
    message: z.string(),
    alreadyPaid: z.boolean().optional(),
  }),
])

/**
 * BTCPay Greenfield API invoice response schema
 * Reference: https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_CreateInvoice
 */
export const btcpayInvoiceResponseSchema = z.object({
  id: z.string(),
  checkoutLink: z.string(),
  status: z.enum(["New", "Processing", "Settled", "Expired", "Invalid"]),
  expirationTime: z.number().optional(),
})

/**
 * BTCPay webhook payload schema
 * Reference: https://docs.btcpayserver.org/Webhooks/
 */
export const btcpayWebhookPayloadSchema = z.object({
  deliveryId: z.string().optional(),
  webhookId: z.string().optional(),
  originalDeliveryId: z.string().optional(),
  isRedelivery: z.boolean().optional(),
  type: z.string(),
  timestamp: z.number().optional(),
  storeId: z.string().optional(),
  invoiceId: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export type BtcpayWebhookPayload = z.infer<typeof btcpayWebhookPayloadSchema>
