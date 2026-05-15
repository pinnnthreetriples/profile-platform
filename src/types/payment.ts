// Re-export canonical payment types from database.ts
// to avoid duplication across the codebase
export type { PaymentStatus, PaymentNetwork, PaymentMethodId } from "./database"

export type PaymentProvider = "btcpay"

export type PaymentCurrency = "USDT"
