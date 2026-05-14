# ADR 0005: Middleware Strategy

**Status:** Accepted  
**Date:** 2026-05-14  
**Deciders:** Development Team

## Context

Next.js middleware runs on every request before the page is rendered. We need a strategy for:

- Protecting authenticated routes
- Validating sessions efficiently
- Avoiding middleware execution on static assets
- Handling auth redirects
- Maintaining good performance

## Decision

We will implement a **matcher-based middleware** with the following strategy:

### Middleware Responsibilities

1. **Session Validation**
   - Check for valid Supabase session on protected routes
   - Refresh expired sessions automatically
   - Redirect unauthenticated users to login

2. **Route Protection**
   - Define protected routes: `/profile`, `/payment`
   - Define public routes: `/`, `/login`, `/register`
   - Define auth routes: `/login`, `/register` (redirect if authenticated)

3. **Performance Optimization**
   - Use matcher config to exclude static assets
   - Exclude Next.js internal routes (`/_next/*`)
   - Exclude public assets (`/favicon.ico`, `/images/*`)
   - Early return for public routes

### Matcher Configuration

```typescript
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon file)
     * - public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
}
```

### Route Classification

```typescript
// Public routes - no auth required
const PUBLIC_ROUTES = ["/", "/payment/success", "/payment/cancel"]

// Auth routes - redirect to /profile if authenticated
const AUTH_ROUTES = ["/login", "/register"]

// Protected routes - require authentication
const PROTECTED_ROUTES = ["/profile", "/payment"]
```

### Middleware Flow

```
1. Request arrives
   ↓
2. Check matcher - skip if static asset
   ↓
3. Check if public route → allow
   ↓
4. Check if auth route + authenticated → redirect to /profile
   ↓
5. Check if protected route + unauthenticated → redirect to /login
   ↓
6. Validate session with Supabase
   ↓
7. Refresh session if needed
   ↓
8. Continue to route handler
```

### Session Refresh Strategy

- Supabase automatically refreshes sessions via `@supabase/ssr`
- Middleware creates Supabase client with cookie handlers
- Client checks session and refreshes if expired
- New session cookies set in response
- No manual token management required

## Consequences

### Positive

- **Centralized auth logic**: All route protection in one place
- **Automatic session refresh**: No manual token handling
- **Performance optimized**: Static assets bypass middleware
- **Type-safe**: Route helpers with TypeScript
- **Testable**: Middleware logic can be unit tested

### Negative

- **Middleware overhead**: Runs on every matched request
- **Cold start impact**: Serverless functions may have latency
- **Debugging complexity**: Middleware errors can be hard to trace

### Neutral

- **Matcher maintenance**: Need to update matcher for new asset types
- **Route list maintenance**: Need to update route lists as app grows

## Alternatives Considered

### 1. Component-Level Auth Checks

**Pros:**

- More granular control
- No middleware overhead

**Cons:**

- Duplicated auth logic across components
- Page loads before redirect (bad UX)
- Harder to maintain consistency

### 2. API Route Protection Only

**Pros:**

- Simpler middleware
- Client-side routing flexibility

**Cons:**

- Pages load before auth check
- Poor user experience
- Potential security gaps

### 3. Catch-All Middleware (No Matcher)

**Pros:**

- Simpler configuration
- No risk of missing routes

**Cons:**

- Runs on every request including static assets
- Significant performance impact
- Unnecessary overhead

## Implementation Notes

### File Structure

```
src/
├── middleware.ts          # Main middleware
└── lib/
    └── auth/
        └── routes.ts      # Route classification helpers
```

### Helper Functions

```typescript
// Check if route is public
export function isPublicRoute(pathname: string): boolean

// Check if route is auth route
export function isAuthRoute(pathname: string): boolean

// Check if route is protected
export function isProtectedRoute(pathname: string): boolean
```

### Testing Strategy

- Unit tests for route classification helpers
- Integration tests for middleware flow
- E2E tests for protected route redirects
- Performance tests for middleware overhead

### Performance Considerations

1. **Matcher Optimization**
   - Exclude as many static assets as possible
   - Use regex patterns efficiently
   - Test matcher with various URLs

2. **Early Returns**
   - Return early for public routes
   - Avoid unnecessary Supabase calls
   - Cache session validation when possible

3. **Session Caching**
   - Supabase client caches session in request
   - No need for manual caching
   - Session validated once per request

## Migration Path

### Current State (Stage 1)

- Basic middleware with session validation
- Simple route protection
- Manual route lists

### Future Enhancements (Stage 2+)

- Role-based access control (RBAC)
- Permission-based route protection
- Rate limiting integration
- Audit logging
- A/B testing support

## References

- [Next.js Middleware Documentation](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Supabase SSR Middleware](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Middleware Matcher Configuration](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher)
- [ADR 0004: Auth Architecture](./0004-auth-architecture.md)
