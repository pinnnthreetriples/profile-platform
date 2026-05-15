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
- [x] Add auth tests (54 unit tests, 7 E2E tests)
- [x] Document auth flow

## Stage 1.1 — Production Hardening ✅

- [x] Merge master into PR branch
- [x] Fix auth callback cookie handling
- [x] Strengthen auth actions tests
- [x] Add TruffleHog workflow
- [x] Add security headers (CSP, X-Frame-Options, etc.)
- [x] Add centralized logger
- [x] Add env validation fail-fast
- [x] Add rate limiting architecture
- [x] Add ADR documentation (0004-auth, 0005-middleware)
- [x] Enhance middleware matcher
- [x] Verify no client-side secret leaks
- [x] Reduce code duplication to 1.1%
- [x] Update documentation (QUALITY_GATE.md, AGENTS.md)
- [x] Create comprehensive final report

## Stage 2 — Profiles ✅

- [x] Create profiles table (supabase/migrations/20260515000000_create_profiles.sql)
- [x] Setup RLS policies (select/insert/update own profile only)
- [x] Implement profile page (/profile — real data, no longer placeholder)
- [x] Add profile update (updateProfileAction + updateCurrentProfile)
- [x] Link profile to auth (profiles.id = auth.users.id, ensureCurrentProfile)
- [x] Database types updated (src/types/database.ts)
- [x] Profile feature module (schemas, types, server, actions, queries, components)
- [x] Unit tests (schemas, server functions, actions)
- [x] E2E tests (unauthenticated redirect verified)

## Stage 3+4 — Payments & Webhooks ✅

- [x] Create payments table (supabase/migrations/20260515000001_create_payments.sql)
- [x] Create payment_events table
- [x] Setup RLS policies for payments (select own only, no direct write)
- [x] Supabase admin client (service role, server-only)
- [x] BTCPay Greenfield API client (USDT-TRON, real implementation)
- [x] Webhook signature verification (HMAC-SHA256, timingSafeEqual)
- [x] Idempotent webhook processing (unique event_id index)
- [x] Update payment/profile status from verified webhook
- [x] Payment page UI (PaymentCardClient with TanStack Query polling)
- [x] Payment success/cancel pages
- [x] API routes: /api/payment/status, /api/profile
- [x] Unit tests (BTCPay client, webhook verifier, webhook processing, payment server, queries)
- [x] E2E smoke tests

## Stage 5 — UI Foundation & Polish (in progress)

### Foundation (carried over) ✅

- [x] Design tokens (globals.css — colors, radii, spacing, shadows)
- [x] Tailwind config extended with brand palette
- [x] shadcn/ui uses brand tokens
- [x] Button variants (primaryOrange, dark, outline, lilac, ghost, text)
- [x] Badge system (PaymentStatusBadge, ModelStatusBadge)
- [x] Layout components (AppHeader, AppFooter, PageShell)
- [x] Shared components (AnimatedSection, SectionLabel, DecorativeStar, StampBadge, Ticker, StaggerWrapper)
- [x] Card components (ModelCard, ProfileCard, StatCard, InvestmentCampaignCard)
- [x] Animation system (lib/animations.ts — single source of truth)
- [x] Motion.dev: page transition, stagger, fadeUp, cardHover, formErrorMotion
- [x] MotionButton wrapper with arrow animation
- [x] useReducedMotion hook
- [x] NavigationProgress (CSS-driven, brand-orange)
- [x] Stagger on home page (hero, stats, model cards)
- [x] Stagger on profile and payment pages
- [x] TanStack Query: real polling via API routes, cache invalidation
- [x] Session-aware AppHeader
- [x] Loading/error states (loading.tsx, error.tsx per route group)
- [x] Mock data (models, campaigns, profile)
- [x] Types (user.ts, model.ts, navigation.ts)

### PR 1 — visual foundation, /, /login, /register, /models ✅

- [x] next/font: Inter (body) + Oswald (display, latin + cyrillic)
- [x] Tailwind: fontFamily.sans/display, animation/keyframes, screens
- [x] globals.css: .display, .script, .bg-grain, .hand-underline, .rotate-tilt-\*, reduced-motion overrides
- [x] Decorative components (src/components/decor): DottedPath, HandDrawnArrow, ModelPlaceholder, PaperCard, StickyNote, TornTape, VerifiedStamp
- [x] SVG ModelPlaceholder (deterministic by seed, no network, works in CI)
- [x] Mock data extended: 8 models with initials and Cyrillic display names; filter options
- [x] ModelCard redesigned: editorial typography, status badge, wishlist heart, CTA arrow, link to detail
- [x] InvestmentCampaignCard uses ModelPlaceholder
- [x] Navigation updated: Модели · Как работает · Клиентам · Моделям · Тарифы · О нас
- [x] AppHeader: animated underline (layoutId), session-aware, transparent variant
- [x] AppFooter: ticker strip, multi-currency note
- [x] Home page (/): collage hero with sticky note, mustard ticket, paper photo card, profile mini-card, verified stamp, hand-drawn arrow; category strip; model preview; payment trust strip
- [x] Auth split-layout: editorial side with collage + form side
- [x] AuthTabs: animated tab switch between /login and /register
- [x] AuthForm: 12px height inputs with icon, password visibility toggle, remember/forgot row (login only), Cyrillic labels
- [x] /models catalog: editorial header with verified stamp, ModelsFilters (category/location/status via search params), responsive 1/2/4/5 columns grid, empty state
- [x] /apply-model coming-soon page (full UI + Zod form arrives in PR 2)
- [x] /models/[id] minimal placeholder page (full editorial layout arrives in PR 2)

### PR 2 — pending

- [ ] /models/[id] full editorial layout with portfolio gallery
- [ ] /apply-model full Zod form with success state (UI-only, no backend)
- [ ] /invest UI page

### Other

- [ ] Toast notifications
- [ ] Final responsive polish
- [ ] Accessibility audit

## Future Enhancements

- [ ] Add admin panel
- [ ] Add analytics
- [ ] Add email notifications
- [ ] Add multiple payment tiers
- [ ] Add referral system
- [ ] Add API documentation
