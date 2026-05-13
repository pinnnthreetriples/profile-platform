import {
  publicEnvSchema,
  serverEnvSchema,
  type PublicEnv,
  type ServerEnv,
} from "./shared"

/**
 * Server-side environment variables
 * NEVER import this in client components
 */

let serverEnv: (PublicEnv & ServerEnv) | null = null

function validateServerEnv(): PublicEnv & ServerEnv {
  // Only validate on server
  if (typeof window !== "undefined") {
    throw new Error("getServerEnv() cannot be called on the client")
  }

  if (serverEnv) {
    return serverEnv
  }

  const publicResult = publicEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_PAYMENT_CURRENCY: process.env.NEXT_PUBLIC_PAYMENT_CURRENCY,
    NEXT_PUBLIC_PAYMENT_NETWORK: process.env.NEXT_PUBLIC_PAYMENT_NETWORK,
  })

  const serverResult = serverEnvSchema.safeParse({
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    BTCPAY_SERVER_URL: process.env.BTCPAY_SERVER_URL,
    BTCPAY_API_KEY: process.env.BTCPAY_API_KEY,
    BTCPAY_STORE_ID: process.env.BTCPAY_STORE_ID,
    BTCPAY_WEBHOOK_SECRET: process.env.BTCPAY_WEBHOOK_SECRET,
  })

  if (!publicResult.success) {
    throw new Error(
      `Invalid public environment variables: ${JSON.stringify(publicResult.error.format(), null, 2)}`
    )
  }

  if (!serverResult.success) {
    throw new Error(
      `Invalid server environment variables: ${JSON.stringify(serverResult.error.format(), null, 2)}`
    )
  }

  serverEnv = { ...publicResult.data, ...serverResult.data }
  return serverEnv
}

/**
 * Get validated server environment variables
 * Throws if validation fails or called on client
 */
export function getServerEnv(): PublicEnv & ServerEnv {
  return validateServerEnv()
}
