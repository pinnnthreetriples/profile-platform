import { createClient } from "@supabase/supabase-js"
import { getClientEnv } from "@/lib/env"

/**
 * Create a Supabase client for browser/client components
 * Uses public anon key - safe for frontend
 *
 * @returns Supabase client instance
 */
export function createSupabaseBrowserClient() {
  const env = getClientEnv()

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}
