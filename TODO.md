# TODO

## Stage 0 — Skeleton ✅

- [x] Create Next.js app
- [x] Install dependencies
- [x] Setup shadcn/ui
- [x] Setup Motion components
- [x] Create folder structure
- [x] Create placeholder pages
- [x] Create env example
- [x] Create Supabase stubs
- [x] Create BTCPay stubs
- [x] Create Edge Function stubs
- [x] Create docs

## Stage 0.1 — Quality Gate ✅

- [x] Prettier
- [x] ESLint
- [x] TypeScript
- [x] Vitest
- [x] Playwright
- [x] GitHub Actions CI
- [x] GitHub Actions E2E
- [x] Gitleaks
- [x] Semgrep
- [x] Dependency Audit
- [x] Dependabot
- [x] AGENTS.md
- [x] QUALITY_GATE.md

## Stage 0.2 — Hardening ✅

- [x] Node/pnpm pinned
- [x] Env validation hardened
- [x] Supabase clients converted to factories
- [x] Real minimal tests added
- [x] Branch protection ready

## Stage 0.3 — Code Quality Guards ✅

- [x] jscpd
- [x] Knip
- [x] core security ESLint rules
- [x] duplicates check
- [x] deadcode check

## Stage 0.4 — Structure Governance ✅

- [x] server-only guards
- [x] feature module convention
- [x] docs/reports cleanup
- [x] AI agent documentation
- [x] documentation consistency cleanup

## Stage 1 — Supabase Auth ✅

- [x] Configure Supabase project connection
- [x] Install @supabase/ssr package
- [x] Configure Supabase SSR browser client
- [x] Configure Supabase SSR server client
- [x] Configure Supabase SSR route handler client
- [x] Add auth middleware with session refresh
- [x] Add protected route redirects
- [x] Add auth callback route with code exchange
- [x] Create auth schemas (Zod)
- [x] Implement register form
- [x] Implement login form
- [x] Implement logout
- [x] Add auth server actions
- [x] Add auth components
- [x] Add auth tests (41 unit tests, 7 E2E tests)
- [x] Document auth flow

## Stage 2 — Profiles

- [ ] Create profiles table
- [ ] Setup RLS policies
- [ ] Implement profile page
- [ ] Add profile update
- [ ] Link profile to auth

## Stage 3 — Payments

- [ ] Create payments table
- [ ] Setup BTCPay Server
- [ ] Implement create-payment function
- [ ] Create BTCPay invoice
- [ ] Add payment page UI
- [ ] Handle payment redirect

## Stage 4 — Webhooks

- [ ] Implement webhook verification
- [ ] Handle payment status updates
- [ ] Create payment_events table
- [ ] Add webhook logging
- [ ] Handle edge cases
- [ ] Add retry logic

## Stage 5 — UI Polish

- [ ] Add Motion animations
- [ ] Improve responsive design
- [ ] Add loading states
- [ ] Add error states
- [ ] Polish forms
- [ ] Add toast notifications
- [ ] Improve accessibility

## Future Enhancements

- [ ] Add admin panel
- [ ] Add analytics
- [ ] Add email notifications
- [ ] Add multiple payment tiers
- [ ] Add referral system
- [ ] Add API documentation
