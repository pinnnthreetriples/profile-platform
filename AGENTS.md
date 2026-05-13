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

## Required checks before finishing

Run:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If Playwright is installed:

```bash
pnpm test:e2e
```

## Architecture

Use:

- `src/app` for routes
- `src/components` for UI components
- `src/features` for business modules
- `src/lib` for technical clients
- `supabase/functions` for Edge Functions
- `supabase/migrations` for SQL migrations

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
