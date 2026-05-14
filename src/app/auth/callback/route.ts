import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

/**
 * Auth callback route for Supabase Auth
 *
 * Handles:
 * - Email confirmation links
 * - Magic link authentication
 * - OAuth provider callbacks (future)
 *
 * Stage 1.1: Basic code exchange only
 * Stage 1.2+: Full auth flow implementation
 */
export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = requestUrl.origin

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              request.cookies.set(name, value)
            })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirect to profile page after successful auth
      // Profile page will be implemented in Stage 2
      return NextResponse.redirect(`${origin}/profile`)
    }
  }

  // If no code or error, redirect to login
  return NextResponse.redirect(`${origin}/login`)
}
