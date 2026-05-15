// BTCPay invoice status values from Greenfield API
// Reference: https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_CreateInvoice
export type BtcpayInvoiceStatus = "New" | "Processing" | "Settled" | "Expired" | "Invalid"

export type CreateBtcpayInvoiceInput = {
  paymentId: string
  userId: string
  amount: number
  currency: "USDT"
  network: "tron"
  paymentMethodId: "USDT-TRON"
}

export type CreateBtcpayInvoiceResult = {
  invoiceId: string
  checkoutUrl: string
  status: BtcpayInvoiceStatus
  expiresAt?: string
}

/**
 * BTCPay webhook event payload (InvoiceEvent)
 * Reference: https://docs.btcpayserver.org/Webhooks/
 *
 * Webhook signature header: BTCPay-Sig
 * Format: sha256=<hmac-sha256-hex>
 */
export type BtcpayWebhookPayload = {
  deliveryId?: string
  webhookId?: string
  originalDeliveryId?: string
  isRedelivery?: boolean
  type: string
  timestamp?: number
  storeId?: string
  invoiceId?: string
  metadata?: Record<string, unknown>
}

/**
 * Mapping from BTCPay invoice status to internal PaymentStatus
 * Reference: BTCPay Greenfield API invoice status values
 */
export const BTCPAY_STATUS_MAP = {
  New: "pending",
  Processing: "processing",
  Settled: "paid",
  Expired: "expired",
  Invalid: "failed",
} as const

/**
 * BTCPay webhook event types that indicate final payment state
 * Reference: https://docs.btcpayserver.org/Webhooks/#invoice-events
 */
export const BTCPAY_PAID_EVENT_TYPES = [
  "InvoiceSettled",
  "InvoicePaymentSettled",
] as const

export const BTCPAY_EXPIRED_EVENT_TYPES = ["InvoiceExpired"] as const

export const BTCPAY_PROCESSING_EVENT_TYPES = ["InvoiceProcessing"] as const
