import { createClient } from "@supabase/supabase-js";

// Browser client for client components
// Uses public anon key - safe for frontend
export const supabaseBrowserClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
