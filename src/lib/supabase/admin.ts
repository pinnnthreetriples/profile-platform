import "server-only"

import { createClient } from "@supabase/supabase-js"

/**
 * Create a Supabase admin client using the service role key.
 *
 * SECURITY: This client bypasses RLS.
 * ONLY use in server-only files for trusted server operations:
 *   - creating payment records
 *   - updating payment status from verified webhooks
 *   - inserting payment events
 *   - updating profiles.payment_status after verified webhook
 *
 * NEVER import this in client components or expose to the browser.
 */
export function createSupabaseAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing required Supabase admin environment variables. " +
        "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set."
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
