/**
 * Route classification helpers for auth middleware
 */

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
 * Check if a route is public (accessible without auth)
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname)
}

/**
 * Check if a route is an auth route (login/register)
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.includes(pathname)
}

/**
 * Check if a route is protected (requires authentication)
 */
export function isProtectedRoute(pathname: string): boolean {
  // First check if it's explicitly public (exact match)
  if (PUBLIC_ROUTES.includes(pathname)) {
    return false
  }

  // Then check if it matches protected routes
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}
