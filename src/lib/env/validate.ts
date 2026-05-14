import "server-only"

import { logger } from "@/lib/logger"
import { getClientEnv } from "./client"
import { getServerEnv } from "./server"

/**
 * Validate all environment variables on application startup
 * Fails fast if any required variables are missing or invalid
 *
 * Call this in instrumentation.ts or at the top of your root layout
 */
export function validateEnvOnStartup(): void {
  try {
    logger.info("Validating environment variables...")

    // Validate client env
    const clientEnv = getClientEnv()
    logger.info("Client environment validated", {
      appUrl: clientEnv.NEXT_PUBLIC_APP_URL,
      supabaseUrl: clientEnv.NEXT_PUBLIC_SUPABASE_URL,
      paymentCurrency: clientEnv.NEXT_PUBLIC_PAYMENT_CURRENCY,
      paymentNetwork: clientEnv.NEXT_PUBLIC_PAYMENT_NETWORK,
    })

    // Validate server env
    const serverEnv = getServerEnv()
    logger.info("Server environment validated", {
      hasServiceRoleKey: !!serverEnv.SUPABASE_SERVICE_ROLE_KEY,
      hasBtcpayConfig: !!(
        serverEnv.BTCPAY_SERVER_URL &&
        serverEnv.BTCPAY_API_KEY &&
        serverEnv.BTCPAY_STORE_ID
      ),
    })

    logger.info("✅ All environment variables validated successfully")
  } catch (error) {
    logger.error("❌ Environment validation failed", error)
    logger.error("Application cannot start with invalid environment configuration")
    throw error
  }
}
