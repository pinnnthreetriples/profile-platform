import { createBrowserClient } from "@supabase/ssr"
import { getClientEnv } from "@/lib/env"

/**
 * Create a Supabase client for browser/client components
 * Uses SSR-compatible browser client with public anon key
 * Safe for frontend use
 *
 * @returns Supabase browser client instance
 */
export function createSupabaseBrowserClient() {
  const env = getClientEnv()

  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
