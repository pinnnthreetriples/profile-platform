# Auth Flow

## Stage 1.1 — Supabase Auth Setup ✅

Implemented:

- Supabase SSR client foundation
- Browser client factory using `@supabase/ssr`
- Server client factory using `@supabase/ssr` with cookie handling
- Middleware session refresh foundation
- Auth callback route placeholder for email/magic link/OAuth

Not implemented yet:

- Login form logic
- Register form logic
- Logout functionality
- Protected route redirects
- Profile table
- Payments

## Rules

- Use Supabase Auth for all authentication
- Do not store passwords manually
- Do not create custom users table
- Do not expose service role key to client code
- Use server-side session-aware checks for protected routes
- Use `createSupabaseBrowserClient()` for client components
- Use `createSupabaseServerClient()` for server components
- Middleware handles session refresh automatically

## Architecture

### Browser Client

File: `src/lib/supabase/client.ts`

- Uses `createBrowserClient` from `@supabase/ssr`
- Safe for client components
- Uses public anon key
- Handles session persistence automatically

### Server Client

File: `src/lib/supabase/server.ts`

- Uses `createServerClient` from `@supabase/ssr`
- Server-only (protected by `import "server-only"`)
- Uses public anon key (service role only when needed)
- Handles cookies via Next.js `cookies()` API
- Async function (required for Next.js 15+)

### Middleware

File: `middleware.ts`

- Refreshes auth session on every request
- Updates auth cookies automatically
- Uses `supabase.auth.getUser()` for session validation
- Does not implement protected route redirects yet (Stage 1.2+)

### Auth Callback

File: `src/app/auth/callback/route.ts`

- Handles email confirmation links
- Handles magic link authentication
- Exchanges auth code for session
- Redirects to profile or login based on result
- OAuth support ready for future implementation

## Environment Variables

Required for Stage 1:

- `NEXT_PUBLIC_APP_URL` - Application URL
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (public)

Server-only (not required for basic auth):

- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (admin operations only)

## Supabase Dashboard Configuration

Required Auth settings:

- **Site URL:** `http://localhost:3000` (development)
- **Redirect URLs:**
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/**`

Production redirect URL pending until production domain is known.

## Next Steps

### Stage 1.2 — Auth Schemas and Forms

- Create Zod schemas for login/register
- Implement register form
- Implement login form
- Add form validation
- Add error handling

### Stage 1.3 — Auth Session Handling

- Implement logout functionality
- Add session state management
- Add auth context/hooks
- Add loading states

### Stage 1.4 — Protected Routes

- Add protected route middleware redirects
- Implement auth guards
- Add role-based access (future)

## Testing

Current test coverage:

- Browser client factory exists
- Server client factory exists
- Middleware matcher configuration
- Auth callback route exists
- Environment validation for Supabase keys

Future test coverage:

- Login flow E2E
- Register flow E2E
- Logout flow E2E
- Protected route redirects
- Session persistence
- Token refresh

## Security Considerations

- Never expose service role key to client
- Always use anon key for client-side operations
- Validate sessions server-side
- Use RLS policies for data access (Stage 2+)
- Implement CSRF protection via Supabase Auth
- Use secure cookies (handled by Supabase SSR)
