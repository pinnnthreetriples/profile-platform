# ADR 0004: Authentication Architecture

**Status:** Accepted  
**Date:** 2026-05-14  
**Deciders:** Development Team

## Context

The application requires secure user authentication for profile management and payment processing. We need to choose an authentication strategy that is:

- Secure and production-ready
- Easy to integrate with Next.js App Router
- Supports SSR and client-side rendering
- Provides session management
- Scalable for future features (OAuth, MFA, etc.)

## Decision

We will use **Supabase Auth** as our authentication provider with the following architecture:

### Core Components

1. **Supabase Auth Service**
   - Handles user registration, login, and session management
   - Provides secure password hashing (bcrypt)
   - Manages email verification and password reset flows
   - Stores user credentials securely

2. **SSR-Compatible Clients**
   - `@supabase/ssr` package for Next.js App Router
   - Server client for Server Components and API Routes
   - Browser client for Client Components
   - Route client for Route Handlers with cookie management

3. **Middleware-Based Protection**
   - Next.js middleware intercepts all requests
   - Validates session before reaching protected routes
   - Redirects unauthenticated users to login
   - Refreshes expired sessions automatically

4. **Server Actions for Auth Operations**
   - `loginAction` - handles user login with Zod validation
   - `registerAction` - handles user registration
   - `logoutAction` - handles user logout
   - All actions use server-side validation and redirect

### Authentication Flow

```
1. User submits login form
   ↓
2. Client Component calls loginAction (Server Action)
   ↓
3. Server validates input with Zod schema
   ↓
4. Server calls Supabase Auth API
   ↓
5. Supabase sets session cookie
   ↓
6. Server revalidates path and redirects to /profile
   ↓
7. Middleware validates session on next request
```

### Session Management

- Sessions stored in HTTP-only cookies
- Automatic session refresh via middleware
- Session expiry handled by Supabase (default: 1 hour access token, 7 days refresh token)
- No manual token management required

### Security Measures

- Passwords never stored manually (handled by Supabase)
- Service role key never exposed to client
- Server-only imports enforced with `"server-only"` package
- Protected routes validated in middleware before page load
- CSRF protection via SameSite cookies

## Consequences

### Positive

- **No custom password storage**: Supabase handles all password security
- **Built-in security features**: Email verification, password reset, rate limiting
- **SSR-compatible**: Works seamlessly with Next.js App Router
- **Scalable**: Easy to add OAuth providers, MFA, etc.
- **Maintained**: Supabase team handles security updates
- **Type-safe**: Full TypeScript support

### Negative

- **Vendor lock-in**: Tightly coupled to Supabase
- **External dependency**: Requires Supabase service availability
- **Migration complexity**: Moving to another auth provider would require significant refactoring

### Neutral

- **Learning curve**: Team needs to understand Supabase Auth concepts
- **Testing complexity**: Requires mocking Supabase client in tests

## Alternatives Considered

### 1. NextAuth.js

**Pros:**

- Popular in Next.js ecosystem
- Supports many OAuth providers
- Self-hosted option

**Cons:**

- More complex setup for basic auth
- Requires separate database for sessions
- Less integrated with our Supabase stack

### 2. Custom JWT Auth

**Pros:**

- Full control over implementation
- No external dependencies

**Cons:**

- High security risk (easy to implement incorrectly)
- Requires manual password hashing, token management
- No built-in features (email verification, password reset)
- Significant development and maintenance overhead

### 3. Auth0

**Pros:**

- Enterprise-grade features
- Excellent documentation
- Many integrations

**Cons:**

- Additional cost
- Overkill for current requirements
- Another external service to manage

## Implementation Notes

### File Structure

```
src/
├── lib/
│   └── supabase/
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── route.ts       # Route handler client
├── features/
│   └── auth/
│       ├── actions.ts     # Server actions
│       ├── schemas.ts     # Zod validation
│       └── components/    # Auth forms
└── middleware.ts          # Session validation
```

### Environment Variables

Required:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Server-only service role key

### Testing Strategy

- Unit tests for auth actions with mocked Supabase client
- Integration tests for auth flow (login, register, logout)
- E2E tests for protected route redirects
- Middleware tests for session validation

## References

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase SSR Guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [ADR 0001: Core Stack](./0001-core-stack.md)
