import "server-only"

import type { CreateBtcpayInvoiceInput, CreateBtcpayInvoiceResult } from "./types"

/**
 * Create a BTCPay invoice via the Greenfield API.
 *
 * Uses the Tether USDt Plugin payment method USDT-TRON for TRON network.
 * Reference: https://docs.btcpayserver.org/API/Greenfield/v1/#operation/Invoices_CreateInvoice
 *
 * @throws Error if BTCPay config is missing or the API returns a non-2xx response
 */
export async function createBtcpayInvoice(
  input: CreateBtcpayInvoiceInput
): Promise<CreateBtcpayInvoiceResult> {
  const serverUrl = process.env.BTCPAY_SERVER_URL
  const apiKey = process.env.BTCPAY_API_KEY
  const storeId = process.env.BTCPAY_STORE_ID
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!serverUrl || !apiKey || !storeId) {
    throw new Error(
      "BTCPay configuration is incomplete. " +
        "BTCPAY_SERVER_URL, BTCPAY_API_KEY, and BTCPAY_STORE_ID must be set."
    )
  }

  const url = `${serverUrl}/api/v1/stores/${storeId}/invoices`

  const body = {
    amount: input.amount.toString(),
    currency: input.currency,
    // Restrict to USDT-TRON payment method only (Tether USDt Plugin)
    // Payment method id: USDT-TRON
    // Reference: https://github.com/btcpayserver-tether/BTCPayServer.Plugins.USDt
    checkout: {
      paymentMethods: [input.paymentMethodId],
      redirectURL: appUrl ? `${appUrl}/payment/success` : undefined,
      redirectAutomatically: false,
    },
    metadata: {
      paymentId: input.paymentId,
      userId: input.userId,
      network: input.network,
      paymentMethodId: input.paymentMethodId,
    },
  }

  let response: Response
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${apiKey}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15_000),
    })
  } catch (err) {
    throw new Error(
      `BTCPay request failed: ${err instanceof Error ? err.message : "network error"}`
    )
  }

  if (!response.ok) {
    // Do not log the response body — may contain sensitive info
    throw new Error(`BTCPay API error: ${response.status} ${response.statusText}`)
  }

  const data = (await response.json()) as Record<string, unknown>

  return {
    invoiceId: data["id"] as string,
    checkoutUrl: data["checkoutLink"] as string,
    status: data["status"] as CreateBtcpayInvoiceResult["status"],
    expiresAt:
      typeof data["expirationTime"] === "number"
        ? new Date(data["expirationTime"] * 1000).toISOString()
        : undefined,
  }
}
