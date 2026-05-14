# Auth Flow

## Stage 1 — Supabase Auth Core ✅

Implemented:

- Supabase SSR client foundation (`@supabase/ssr`)
- Browser client factory using `createBrowserClient`
- Server client factory using `createServerClient` with cookie handling
- Route handler client factory for auth callbacks
- Middleware session refresh with protected route redirects
- Auth callback route with code exchange
- Auth schemas (Zod validation for login/register)
- Auth server actions (loginAction, registerAction, logoutAction)
- Auth components (LoginForm, RegisterForm, LogoutButton)
- Protected routes: `/profile`, `/payment`
- Public routes: `/`, `/login`, `/register`, `/auth/callback`, `/payment/success`, `/payment/cancel`
- Auth route redirects (authenticated users redirected from `/login` and `/register` to `/profile`)

Not implemented yet (Stage 2+):

- Profile table
- Profile management
- Payments
- Service role usage

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

### Route Handler Client

File: `src/lib/supabase/route.ts`

- Uses `createServerClient` from `@supabase/ssr`
- Designed for Route Handlers (GET/POST endpoints)
- Handles cookies via `NextRequest` and `NextResponse`
- Used in auth callback route

### Middleware

File: `middleware.ts`

- Refreshes auth session on every request
- Updates auth cookies automatically
- Uses `supabase.auth.getUser()` for session validation
- Redirects unauthenticated users from protected routes to `/login`
- Redirects authenticated users from `/login` and `/register` to `/profile`
- Uses route helpers from `src/lib/auth/routes.ts`

### Auth Callback

File: `src/app/auth/callback/route.ts`

- Handles email confirmation links
- Handles magic link authentication
- Exchanges auth code for session using route helper
- Redirects to profile on success
- Redirects to login on error
- OAuth support ready for future implementation

### Auth Schemas

File: `src/features/auth/schemas.ts`

- Zod schemas for login and register forms
- Email validation
- Password minimum 8 characters
- Type-safe form validation

### Auth Actions

File: `src/features/auth/actions.ts`

- Server actions for login, register, logout
- Zod validation on server side
- Uses Supabase Auth (no manual password storage)
- Returns typed `AuthActionResult`
- Handles errors gracefully

### Auth Components

Files:
- `src/features/auth/components/AuthForm.tsx` - Shared form component
- `src/features/auth/components/AuthFormCard.tsx` - Card wrapper
- `src/features/auth/components/LoginForm.tsx` - Login form
- `src/features/auth/components/RegisterForm.tsx` - Register form
- `src/features/auth/components/LogoutButton.tsx` - Logout button

Features:
- Client components using server actions
- Form state management with `useActionState`
- Loading states during submission
- Error message display
- Minimal UI (no final design yet)

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

### Stage 2 — Profiles

- Create profiles table with RLS policies
- Implement profile page
- Add profile update functionality
- Link profile to auth user

### Stage 3 — Payments

- Create payments table
- Implement create-payment Edge Function
- Integrate BTCPay Server
- Add payment page UI

### Stage 4 — Webhooks

- Implement webhook verification
- Handle payment status updates
- Add payment events logging

## Testing

Current test coverage:

- Browser client factory (3 tests)
- Server client factory (3 tests)
- Middleware matcher configuration (3 tests)
- Auth schemas validation (6 tests)
- Route classification helpers (6 tests)
- E2E tests for login/register pages (7 tests)
- E2E tests for protected route redirects

Total: 41 unit tests passing, 7 E2E tests passing

Future test coverage:

- Auth actions (login/register/logout)
- Session persistence
- Token refresh
- Profile management (Stage 2+)

## Security Considerations

- Never expose service role key to client
- Always use anon key for client-side operations
- Validate sessions server-side
- Use RLS policies for data access (Stage 2+)
- Implement CSRF protection via Supabase Auth
- Use secure cookies (handled by Supabase SSR)
