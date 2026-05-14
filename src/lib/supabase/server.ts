import "server-only"

import { createClient } from "@supabase/supabase-js"
import { getServerEnv } from "@/lib/env/server"

/**
 * Create a Supabase client for server components and API routes
 * Uses anon key for now - service_role only when needed
 *
 * @returns Supabase client instance
 */
export function createSupabaseServerClient() {
  const env = getServerEnv()

  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
