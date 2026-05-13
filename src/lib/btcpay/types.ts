export type BtcpayInvoiceStatus = "new" | "processing" | "settled" | "expired" | "invalid"

export type CreateBtcpayInvoiceInput = {
  userId: string
  amount: number
  currency: "USDT"
  network: "polygon" | "tron" | "ethereum"
}

export type CreateBtcpayInvoiceResult = {
  invoiceId: string
  checkoutUrl: string
  status: BtcpayInvoiceStatus
}
