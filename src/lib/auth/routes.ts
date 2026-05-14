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
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

/**
 * Check if a route is an auth route (login/register)
 */
export function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}

/**
 * Check if a route is protected (requires authentication)
 */
export function isProtectedRoute(pathname: string): boolean {
  // Check if it's explicitly public first
  if (isPublicRoute(pathname)) {
    return false
  }

  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )
}
