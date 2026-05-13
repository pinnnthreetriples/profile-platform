# AGENTS.md

## Project stack

This project uses:

- Next.js App Router
- TypeScript
- Supabase
- Supabase Edge Functions
- BTCPay Server
- Tether USDt Plugin
- Tailwind CSS
- shadcn/ui
- Motion.dev
- Vitest
- Playwright

## Core rules

1. Do not change the selected stack.
2. Do not add WordPress, PHP, WooCommerce, Firebase, Prisma, Redux, or random state managers.
3. Use TypeScript.
4. Keep UI separate from business logic.
5. Keep payment logic separate from React components.
6. Never expose private env variables to client components.
7. Do not use `SUPABASE_SERVICE_ROLE_KEY` outside server-only code.
8. Do not use `BTCPAY_API_KEY` outside server-only code.
9. Do not confirm payments on frontend.
10. Payment status may only be changed by trusted backend/webhook logic.
11. Do not implement real auth/payment logic during Stage 0.
12. Do not create final design during Stage 0.
13. Do not add unnecessary dependencies.
14. Respect existing folder structure.

## TanStack rules

1. Use TanStack Query only for server state, caching, refetching, and mutations.
2. Do not use TanStack Query for simple local UI state.
3. Do not install TanStack Router. Next.js App Router is the router.
4. Do not install TanStack Table until admin/payment tables are needed.
5. Query keys must be centralized in `src/lib/query/keys.ts`.
6. Payment status polling must use TanStack Query only after real payment flow is implemented.

## Required checks before finishing

Run:

```bash
pnpm quality:ci
```

Or individually:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:ci
pnpm build
pnpm test:e2e
pnpm duplicates
pnpm deadcode
```

## Code quality tools

1. **jscpd** - Detects code duplication
   - Threshold: 2%
   - Min lines: 8
   - Min tokens: 50
   - Run: `pnpm duplicates`

2. **Knip** - Finds unused code
   - Detects unused files, exports, dependencies
   - Run: `pnpm deadcode`

3. **eslint-plugin-security** - Security linting
   - Detects unsafe patterns
   - Integrated in `pnpm lint`

### Code quality rules

1. Do not duplicate code - extract to shared helpers/components
2. Do not leave unused files, exports, or dependencies
3. Do not disable jscpd/knip/security rules globally
4. If false positive - disable specific rule with comment explaining why
5. All new code must pass duplicates and deadcode checks

### Future improvements (after Stage 1)

- eslint-plugin-boundaries for architectural rules

## Environment validation

1. Use `getClientEnv()` from `@/lib/env` in client components.
2. Use `getServerEnv()` from `@/lib/env/server` in server components/API routes.
3. Never import `@/lib/env/server` in client components.
4. Environment validation is strict - no fallbacks or console.warn.
5. All env vars must be defined in `.env.local` for development.

## Supabase clients

1. Use `createSupabaseBrowserClient()` for client components.
2. Use `createSupabaseServerClient()` for server components/API routes.
3. Do not create singleton clients - always call factory functions.
4. Clients use validated environment variables.

## Architecture

Use:

- `src/app` for routes
- `src/components` for UI components
- `src/features` for business modules
- `src/lib` for technical clients
- `supabase/functions` for Edge Functions
- `supabase/migrations` for SQL migrations

## Feature module convention

Each feature in `src/features/` should follow this structure:

- `components/` - Feature-specific UI components
- `schemas.ts` - Zod schemas for validation
- `types.ts` - TypeScript types
- `constants.ts` - Feature constants
- `actions.ts` - Server Actions (if needed)
- `queries.ts` - TanStack Query options
- `server.ts` - Server-only logic (with `import "server-only"`)

Rules:

1. Keep `page.tsx` files thin - delegate to feature modules
2. Business logic belongs in feature modules, not in page components
3. Server-only code must have `import "server-only"` at the top
4. Do not mix client and server logic in the same file

## Stage 0 restrictions

Do not implement:

- real login
- real registration
- real payment creation
- real BTCPay API calls
- webhook verification
- production database schema
- admin panel
- final UI design
