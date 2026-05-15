// Payment routes
export const PAYMENT_ROUTES = {
  PAYMENT: "/payment",
  SUCCESS: "/payment/success",
  CANCEL: "/payment/cancel",
} as const

// Server-controlled payment settings — MVP: USDT on TRON only
// Amount is fixed server-side; users cannot override it
export const PAYMENT_AMOUNT = 100 // USDT

export const PAYMENT_CURRENCY = "USDT" as const

// MVP: TRON only. Polygon/Ethereum are out of scope for this stage.
export const PAYMENT_NETWORK = "tron" as const

// Tether USDt Plugin payment method id for TRON
// Reference: https://github.com/btcpayserver-tether/BTCPayServer.Plugins.USDt
export const BTCPAY_USDT_TRON_PAYMENT_METHOD_ID = "USDT-TRON" as const

// Active payment statuses — a payment in these states can be reused
export const ACTIVE_PAYMENT_STATUSES = ["pending", "processing"] as const

// Rate limiting: max invoice creation attempts per user per window
export const RATE_LIMIT_MAX_ATTEMPTS = 5
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // 10 minutes
