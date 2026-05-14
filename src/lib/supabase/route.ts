import "server-only"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Get Supabase environment variables with validation
 * Throws clear error if variables are missing
 */
function getSupabaseEnv(): {
  url: string
  anonKey: string
} {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error(
      "Missing required Supabase environment variables. " +
        "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set. " +
        "Check your .env.local file or deployment environment configuration."
    )
  }

  return { url, anonKey }
}

/**
 * Create a Supabase client for Route Handlers
 * Handles cookies properly for auth callback routes
 *
 * @param request - Next.js request object
 * @param response - Optional NextResponse to write cookies into (for redirects)
 * @returns Tuple of [supabase client, response object]
 */
export async function createSupabaseRouteClient(
  request: NextRequest,
  response?: NextResponse
) {
  const cookieStore = await cookies()

  // Use provided response or create a new one
  const responseToUse = response || NextResponse.next({ request })

  const { url, anonKey } = getSupabaseEnv()

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options)
          responseToUse.cookies.set(name, value, options)
        })
      },
    },
  })

  return { supabase, response: responseToUse }
}
