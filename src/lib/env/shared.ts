import { z } from "zod"

/**
 * Shared environment variable schemas
 */

export const publicEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_PAYMENT_CURRENCY: z.enum(["USDT"]),
  NEXT_PUBLIC_PAYMENT_NETWORK: z.enum(["polygon", "tron", "ethereum"]),
})

export const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
  BTCPAY_SERVER_URL: z.string().url().optional(),
  BTCPAY_API_KEY: z.string().min(1).optional(),
  BTCPAY_STORE_ID: z.string().min(1).optional(),
  BTCPAY_WEBHOOK_SECRET: z.string().min(1).optional(),
})

export type PublicEnv = z.infer<typeof publicEnvSchema>
export type ServerEnv = z.infer<typeof serverEnvSchema>
