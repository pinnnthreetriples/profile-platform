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
 * 2. Create redirect response upfront
 * 3. Pass redirect response to Supabase client for cookie writing
 * 4. Exchange code for session (cookies written to redirect response)
 * 5. Return the same redirect response with cookies
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  // No code provided - redirect to login
  if (!code) {
    return NextResponse.redirect(`${origin}/login`)
  }

  // Create redirect response upfront
  const redirectResponse = NextResponse.redirect(`${origin}/profile`)

  // Create Supabase client with redirect response for cookie handling
  const { supabase } = await createSupabaseRouteClient(request, redirectResponse)

  // Exchange code for session
  // Cookies are written directly into redirectResponse via setAll
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    // Failed to exchange code - redirect to login
    return NextResponse.redirect(`${origin}/login`)
  }

  // Success - return redirect response with cookies already set
  return redirectResponse
}
