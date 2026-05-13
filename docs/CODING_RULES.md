# Coding Rules

## General Rules

1. **TypeScript Only**
   - All code must be written in TypeScript
   - Use strict type checking
   - Avoid `any` type

2. **Separation of Concerns**
   - Do not mix UI and business logic
   - Keep components small and focused
   - Use features/ for business logic

3. **Import Aliases**
   - Always use `@/*` alias for imports
   - Example: `import { Button } from "@/components/ui/button"`

4. **File Organization**
   - Group related files by feature
   - Keep types close to their usage
   - Use index files sparingly

## Technology Restrictions

### ❌ Do Not Use

- WordPress
- PHP
- WooCommerce
- Firebase
- Prisma
- Redux
- jQuery
- Class components (use functional components)
- TanStack Router (use Next.js App Router)
- TanStack Query for local UI state
- Duplicated code (extract to shared helpers/components)
- Unused files, exports, or dependencies

### ✅ Use

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion.dev
- Supabase
- Supabase Edge Functions
- BTCPay Server
- Tether USDt Plugin
- TanStack Query (for server state only)
- Vitest
- Playwright
- pnpm

## Architecture Rules

Use:

- `src/app` for routes
- `src/components` for shared UI components
- `src/features` for business modules
- `src/lib` for technical clients
- `supabase/functions` for Edge Functions
- `supabase/migrations` for SQL migrations

## Feature Module Rules

Feature code belongs in:

```
src/features/<feature>/
```

Recommended structure:

- `components/` - Feature-specific UI components
- `schemas.ts` - Zod schemas for validation
- `types.ts` - TypeScript types
- `constants.ts` - Feature constants
- `actions.ts` - Server Actions (if needed)
- `queries.ts` - TanStack Query options
- `server.ts` - Server-only logic (must have `import "server-only"`)

**Do not create empty files just to match this structure. Create files only when real logic is added.**

Rules:

1. Keep `page.tsx` files thin - delegate to feature modules
2. Business logic belongs in feature modules, not in page components
3. Server-only code must have `import "server-only"` at the top
4. Do not mix client and server logic in the same file

## Page Rules

Next.js `page.tsx` files must remain thin.

**Allowed in `page.tsx`:**

- Route-level composition
- Metadata
- Loading/error boundary usage
- Importing a feature component

**Not allowed in `page.tsx`:**

- Business logic
- Direct payment logic
- Direct Supabase mutations
- Large forms
- Webhook logic
- Private env usage

## Server-only Rules

1. Server-only files must use `import "server-only"` at the top
2. Never import `@/lib/env/server` in client components
3. Do not use `SUPABASE_SERVICE_ROLE_KEY` outside server-only code
4. Do not use `BTCPAY_API_KEY` outside server-only code
5. Do not mix client and server logic in the same file

## TanStack Query Rules

1. Use TanStack Query only for server state, caching, refetching, and mutations
2. Do not use TanStack Query for simple local UI state
3. Do not install TanStack Router. Next.js App Router is the router
4. Do not install TanStack Table until admin/payment tables are needed
5. Query keys must be centralized in `src/lib/query/keys.ts`
6. Payment status polling must use TanStack Query only after real payment flow is implemented

## Security Rules

1. Never expose private env variables to client components
2. Use `NEXT_PUBLIC_*` prefix only for public env vars
3. Keep `SUPABASE_SERVICE_ROLE_KEY` and `BTCPAY_API_KEY` server-side only
4. Do not confirm payments on frontend
5. All payment status updates must come from backend/webhook
6. Never trust client-side payment status

**Current security linting uses core ESLint security rules:**

- `no-eval`
- `no-implied-eval`
- `no-new-func`
- `no-script-url`

Full `eslint-plugin-security` recommended config is deferred until stable ESLint 9 flat config compatibility is confirmed.

## Code Quality Rules

1. Do not duplicate code - extract to shared helpers/components
2. Do not leave unused files, exports, or dependencies
3. Do not disable jscpd/knip/security rules globally
4. If false positive - disable specific rule with comment explaining why
5. All new code must pass duplicates and deadcode checks

### Quality Tools

**jscpd (Code Duplication Detection)**

```bash
pnpm duplicates
```

- Detects copy-paste code
- Threshold: 2%
- Min lines: 8
- Forces extraction to shared code

**Knip (Dead Code Detection)**

```bash
pnpm deadcode
```

- Finds unused files
- Finds unused exports
- Finds unused dependencies
- Keeps codebase clean

## Naming Conventions

- Components: PascalCase (`UserProfile.tsx`)
- Functions: camelCase (`createPayment()`)
- Constants: UPPER_SNAKE_CASE (`PAYMENT_ROUTES`)
- Types: PascalCase (`PaymentStatus`)

## Environment Variables

### Public (Frontend Safe)

```
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_PAYMENT_CURRENCY
NEXT_PUBLIC_PAYMENT_NETWORK
```

### Private (Server-Side Only)

```
SUPABASE_SERVICE_ROLE_KEY
BTCPAY_SERVER_URL
BTCPAY_API_KEY
BTCPAY_STORE_ID
BTCPAY_WEBHOOK_SECRET
```

**Rules:**

1. Use `getClientEnv()` from `@/lib/env` in client components
2. Use `getServerEnv()` from `@/lib/env/server` in server components/API routes
3. Never import `@/lib/env/server` in client components
4. Environment validation is strict - no fallbacks or console.warn
5. All env vars must be defined in `.env.local` for development

## Git Workflow

1. Create feature branch from `main`
2. Make small, focused commits
3. Write descriptive commit messages
4. Test before pushing
5. Create pull request for review

## AI Agent Rules

1. Do not weaken tests to make CI green
2. Do not remove required checks
3. Do not disable lint, security, deadcode, or duplicates checks globally
4. Do not move business logic into `page.tsx`
5. Do not introduce new dependencies without explaining why
6. Do not change the selected stack
7. Do not implement out-of-stage features
8. Do not expose private env vars to client code
9. Do not confirm payments from frontend
10. If a check fails, fix the root cause, not the check
11. Do not create empty files only to match a documented tree
12. Do not refactor unrelated files
13. Do not add admin features unless explicitly requested
14. Do not add final UI/design polish during backend/auth/payment stages

## Code Style

### File Structure

```typescript
// 1. Imports
import { useState } from "react"
import { Button } from "@/components/ui/button"

// 2. Types
type Props = {
  userId: string
}

// 3. Component
export function MyComponent({ userId }: Props) {
  // Component logic
}
```

### TypeScript Best Practices

- Use `type` for object shapes
- Use `interface` for extendable contracts
- Export types that are used in multiple files
- Use `const` assertions for literal types

## Styling

- Use Tailwind CSS for styling
- Use shadcn/ui components when possible
- Follow Tailwind best practices
- Use Motion.dev only for UI animations
- Avoid complex animations
