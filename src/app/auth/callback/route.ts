import { type NextRequest, NextResponse } from "next/server"
import { createSupabaseRouteClient } from "@/lib/supabase/route"

/**
 * Auth callback route for Supabase Auth
 *
 * Handles:
 * - Email confirmation links
 * - Magic link authentication
 * - OAuth provider callbacks
 *
 * Flow:
 * 1. Extract code from URL params
 * 2. Exchange code for session
 * 3. Redirect to profile on success or login on failure
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  // No code provided - redirect to login
  if (!code) {
    return NextResponse.redirect(`${origin}/login`)
  }

  // Create Supabase client with proper cookie handling
  const { supabase, response } = await createSupabaseRouteClient(request)

  // Exchange code for session
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    // Failed to exchange code - redirect to login
    return NextResponse.redirect(`${origin}/login`)
  }

  // Success - redirect to profile
  // Session cookies are automatically set via response object
  // The response.headers contain Set-Cookie headers from exchangeCodeForSession
  // which are preserved in the redirect response
  return NextResponse.redirect(`${origin}/profile`, {
    headers: response.headers,
  })
}
