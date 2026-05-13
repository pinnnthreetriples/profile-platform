import { createClient } from "@supabase/supabase-js";

// Server client for server components and API routes
// Uses anon key for now - service_role only when needed
export function createSupabaseServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
