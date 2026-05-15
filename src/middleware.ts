import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

/**
 * Public routes that don't require authentication
 */
const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/auth/callback",
  "/payment/success",
  "/payment/cancel",
]

/**
 * Auth routes that authenticated users should not access
 */
const AUTH_ROUTES = ["/login", "/register"]

/**
 * Protected routes that require authentication
 */
const PROTECTED_ROUTES = ["/profile", "/payment"]

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
        "Check your .env.local file or GitHub Actions secrets configuration."
    )
  }

  return { url, anonKey }
}

/**
 * Check if a route is an auth route (login/register)
 */
function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.includes(pathname)
}

/**
 * Check if a route is protected (requires authentication)
 */
function isProtectedRoute(pathname: string): boolean {
  // First check if it's explicitly public (exact match)
  if (PUBLIC_ROUTES.includes(pathname)) {
    return false
  }

  // Then check if it matches protected routes
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

/**
 * Middleware for Supabase Auth
 *
 * Responsibilities:
 * - Refresh auth session on every request
 * - Update auth cookies automatically
 * - Redirect unauthenticated users from protected routes
 * - Redirect authenticated users from auth routes
 */
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  let supabaseResponse = NextResponse.next({
    request,
  })

  const { url, anonKey } = getSupabaseEnv()

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  // Refresh session if expired - required for Server Components
  // IMPORTANT: Don't use getUser() in middleware as it makes a network request
  // Use getSession() instead which only reads from cookies
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  /**
   * Helper to create a redirect response preserving session cookies
   */
  function redirectWithCookies(destination: string): NextResponse {
    const redirectUrl = new URL(destination, request.url)
    const redirectResponse = NextResponse.redirect(redirectUrl)
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value)
    })
    return redirectResponse
  }

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute(pathname) && !user) {
    return redirectWithCookies("/login")
  }

  // Redirect authenticated users from auth routes to profile
  if (isAuthRoute(pathname) && user) {
    return redirectWithCookies("/profile")
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, robots.txt, sitemap.xml
     * - public files (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
}
