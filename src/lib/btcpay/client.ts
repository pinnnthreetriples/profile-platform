import "server-only"

import { getServerEnv } from "@/lib/env/server"
import type { CreateBtcpayInvoiceInput, CreateBtcpayInvoiceResult } from "./types"

/**
 * BTCPay client stub - Stage 0 placeholder
 * Real implementation will be added in Stage 3+
 */
export async function createBtcpayInvoice(
  input: CreateBtcpayInvoiceInput
): Promise<CreateBtcpayInvoiceResult> {
  // Validate env is available (will throw if not configured)
  const env = getServerEnv()

  console.log("BTCPay invoice placeholder:", input)
  console.log("BTCPay config available:", {
    serverUrl: !!env.BTCPAY_SERVER_URL,
    apiKey: !!env.BTCPAY_API_KEY,
    storeId: !!env.BTCPAY_STORE_ID,
  })

  // Return mock data
  return {
    invoiceId: "placeholder-invoice-id",
    checkoutUrl: "/payment",
    status: "new",
  }
}
