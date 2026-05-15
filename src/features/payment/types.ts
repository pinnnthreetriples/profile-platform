import type { PaymentStatus, PaymentNetwork, PaymentMethodId } from "@/types/database"

export type Payment = {
  id: string
  userId: string
  profileId: string
  provider: "btcpay"
  providerInvoiceId: string | null
  checkoutUrl: string | null
  amount: number
  currency: "USDT" | "USDt"
  network: PaymentNetwork
  paymentMethodId: PaymentMethodId
  status: PaymentStatus
  createdAt: string
  updatedAt: string
  expiresAt: string | null
  settledAt: string | null
}

export type PaymentEvent = {
  id: string
  paymentId: string | null
  provider: "btcpay"
  providerInvoiceId: string | null
  eventType: string
  eventId: string | null
  payload: Record<string, unknown>
  processedAt: string
}

export type CreatePaymentResult =
  | { ok: true; checkoutUrl: string; paymentId: string }
  | { ok: false; message: string; alreadyPaid?: boolean }
