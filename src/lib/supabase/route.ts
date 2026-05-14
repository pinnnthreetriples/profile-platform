import "server-only"

import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Create a Supabase client for Route Handlers
 * Handles cookies properly for auth callback routes
 *
 * @param request - Next.js request object
 * @returns Tuple of [supabase client, response object]
 */
export async function createSupabaseRouteClient(request: NextRequest) {
  const cookieStore = await cookies()

  let response = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  return { supabase, response }
}
