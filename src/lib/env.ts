import { z } from "zod"

const envSchema = z.object({
  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Supabase public
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),

  // Supabase private (server-side only)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

  // BTCPay (server-side only)
  BTCPAY_SERVER_URL: z.string().url().optional(),
  BTCPAY_API_KEY: z.string().min(1).optional(),
  BTCPAY_STORE_ID: z.string().min(1).optional(),
  BTCPAY_WEBHOOK_SECRET: z.string().min(1).optional(),

  // Payment
  NEXT_PUBLIC_PAYMENT_CURRENCY: z.enum(["USDT"]),
  NEXT_PUBLIC_PAYMENT_NETWORK: z.enum(["polygon", "tron", "ethereum"]),
})

export type Env = z.infer<typeof envSchema>

// Validate env on module load (only in Node.js environment)
let env: Env | undefined

if (typeof window === "undefined") {
  try {
    env = envSchema.parse(process.env)
  } catch (error) {
    console.warn("Environment validation failed:", error)
    // On Stage 0, env might not be fully configured yet
  }
}

export function getEnv(): Env {
  if (!env) {
    throw new Error("Environment not initialized")
  }
  return env
}

// Helper to safely get public env vars on client
export function getPublicEnv() {
  return {
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    paymentCurrency: process.env.NEXT_PUBLIC_PAYMENT_CURRENCY || "USDT",
    paymentNetwork: process.env.NEXT_PUBLIC_PAYMENT_NETWORK || "polygon",
  }
}
