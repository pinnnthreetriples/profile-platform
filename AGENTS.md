# AGENTS.md

Repository instructions for AI coding agents.

Follow this file before editing code. Keep changes small, staged, and aligned with the requested task.

## Project stack

Use only the approved stack:

- Next.js App Router
- TypeScript
- Supabase
- Supabase Edge Functions
- BTCPay Server
- Tether USDt Plugin
- Tailwind CSS
- shadcn/ui
- Motion.dev
- TanStack Query
- Vitest
- Playwright
- pnpm

Do not add WordPress, WooCommerce, PHP, Firebase, Prisma, Redux, TanStack Router, or unrelated state managers.

## Stage discipline

Implement only the requested stage.

- Stage 1: Supabase Auth only.
- Stage 2: Profiles only.
- Stage 3: Payment creation only.
- Stage 4: Webhook verification and payment status updates.
- Stage 5: UI polish only.

Do not build future-stage features early.

## Architecture rules

Use:

- `src/app` for routes and route-level composition.
- `src/components` for shared UI.
- `src/features` for business modules.
- `src/lib` for technical clients and utilities.
- `src/types` for shared types.
- `supabase/functions` for Edge Functions.
- `supabase/migrations` for SQL migrations.

Keep `page.tsx` files thin. They may compose feature components, but must not contain business logic, payment logic, large forms, direct Supabase mutations, or private env usage.

## Feature module convention

Feature code belongs in:

```text
src/features/<feature>/
```

Use these files only when real logic exists:

- `components/`
- `schemas.ts`
- `types.ts`
- `constants.ts`
- `actions.ts`
- `queries.ts`
- `server.ts`

Do not create empty files just to match the structure.

## Server/client boundaries

Server-only files must start with:

```typescript
import "server-only"
```

Private server code must never be imported into client components.

Never expose or use these in client code:

- `SUPABASE_SERVICE_ROLE_KEY`
- `BTCPAY_API_KEY`
- `BTCPAY_WEBHOOK_SECRET`
- `@/lib/env/server`
- server-only BTCPay clients
- server-only Supabase clients

Use:

- `getClientEnv()` from `@/lib/env` for public env.
- `getServerEnv()` from `@/lib/env/server` only in server-only code.
- `createSupabaseBrowserClient()` for browser code.
- `createSupabaseServerClient()` for server code.

## Stage 1 auth rules

Use Supabase Auth.

Do not store passwords manually.

Do not create custom password tables.

Do not expose service-role access to frontend code.

Do not implement payments during Stage 1.

Do not create profile/payment tables unless explicitly requested.

Auth forms must use Zod validation when implemented.

Protected routes must use session-aware server/middleware checks.

## Payment rules

Frontend never confirms payment.

Payment access/status may only be changed by trusted server or webhook logic.

Do not trust:

- redirect success URL
- client-side payment status
- user-submitted invoice status
- browser polling result as final proof

Webhook logic must be verified, idempotent, and auditable when implemented.

## TanStack Query rules

Use TanStack Query only for server state, caching, refetching, polling, and mutations.

Do not use it for simple local UI state.

Do not install:

- TanStack Router
- TanStack Table before admin/payment tables are explicitly needed

Query keys must stay centralized in `src/lib/query/keys.ts`.

## Quality rules

Do not weaken checks to make CI green.

Forbidden:

- removing tests instead of fixing code
- weakening E2E assertions without approval
- lowering jscpd threshold without approval
- removing `pnpm duplicates`
- removing `pnpm deadcode`
- disabling lint/security rules globally
- removing Gitleaks, Semgrep, or Dependency Audit
- changing required GitHub checks without approval

If a check fails, fix the root cause.

## Required checks

Before marking work complete, run:

```bash
pnpm quality:ci
```

For UI, route, auth, payment, or workflow changes, run:

```bash
pnpm quality:full
```

Individual checks:

```bash
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test:ci
pnpm build
pnpm duplicates
pnpm deadcode
pnpm test:e2e
```

If a local tool is unavailable, report exactly what could not be run and why.

## Dependency rules

Do not add dependencies unless necessary.

For every new dependency, explain:

- why it is needed
- why existing tools are insufficient
- whether it affects client bundle size
- whether it affects security surface

Do not replace approved project tools without explicit approval.

## Security rules

Never commit secrets.

Never store passwords manually.

Use Supabase Auth for authentication.

Do not use custom password storage.

Do not bypass RLS.

Do not expose service-role access to frontend code.

Validate external input with Zod where applicable.

Current security linting uses core ESLint security rules. Do not claim full eslint-plugin-security recommended coverage until it is actually enabled.

## Git and PR rules

Base branches on `master`.

Do not push directly to `master`.

Use focused PRs.

Do not include unrelated refactoring.

Do not mix documentation cleanup, UI redesign, auth, payment, and infrastructure changes in one task unless explicitly requested.

Use `.github/pull_request_template.md`.

## Documentation

Keep documentation consistent with code.

If commands, scripts, env vars, stages, or architecture change, update relevant docs:

- `README.md`
- `TODO.md`
- `docs/PROJECT_STRUCTURE.md`
- `docs/CODING_RULES.md`
- `docs/QUALITY_GATE.md`
- `docs/ENVIRONMENT.md`
- `docs/adr/*`

Detailed rules live in `docs/`. This file is the short operational contract for agents.
