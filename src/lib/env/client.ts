import { publicEnvSchema, type PublicEnv } from "./shared"

/**
 * Client-side environment variables
 * Safe to use in browser/client components
 */

let clientEnv: PublicEnv | null = null

function validateClientEnv(): PublicEnv {
  if (clientEnv) {
    return clientEnv
  }

  const result = publicEnvSchema.safeParse({
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_PAYMENT_CURRENCY: process.env.NEXT_PUBLIC_PAYMENT_CURRENCY,
    NEXT_PUBLIC_PAYMENT_NETWORK: process.env.NEXT_PUBLIC_PAYMENT_NETWORK,
  })

  if (!result.success) {
    throw new Error(
      `Invalid client environment variables: ${JSON.stringify(result.error.format(), null, 2)}`
    )
  }

  clientEnv = result.data
  return clientEnv
}

/**
 * Get validated client environment variables
 * Throws if validation fails
 */
export function getClientEnv(): PublicEnv {
  return validateClientEnv()
}
