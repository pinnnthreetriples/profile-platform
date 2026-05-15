# Project Structure

## Overview

USDT Profile Platform — Next.js 15 App Router + TypeScript + Supabase + BTCPay Server.

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (no auth required)
│   │   ├── layout.tsx            # AppHeader + AppFooter (session-aware)
│   │   ├── loading.tsx           # Skeleton for public pages
│   │   └── page.tsx              # Landing page (stagger hero, ticker, model preview)
│   ├── (auth)/                   # Auth routes
│   │   ├── layout.tsx            # Minimal auth shell (logo only)
│   │   ├── loading.tsx           # Auth loading spinner
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/              # Protected routes (require auth)
│   │   ├── layout.tsx            # AppHeader (with user email) + AppFooter
│   │   ├── loading.tsx           # Dashboard skeleton
│   │   ├── error.tsx             # Error boundary with reset
│   │   ├── profile/page.tsx      # Profile page (server component)
│   │   └── payment/
│   │       ├── page.tsx          # Payment page (server component)
│   │       ├── success/page.tsx  # Payment submitted (UX only)
│   │       └── cancel/page.tsx   # Payment cancelled (UX only)
│   ├── api/
│   │   ├── payment/status/route.ts  # GET — latest payment for TanStack Query polling
│   │   ├── profile/route.ts         # GET — current profile for TanStack Query refetch
│   │   └── webhooks/btcpay/route.ts # POST — BTCPay webhook handler
│   ├── auth/callback/route.ts    # Supabase auth callback (code exchange)
│   ├── providers.tsx             # QueryClientProvider + NavigationProgress
│   ├── template.tsx              # PageTransition (Motion.dev, animates content only)
│   ├── layout.tsx                # Root layout (Providers, fonts, meta)
│   └── globals.css               # Design tokens + shadcn/ui CSS variables
│
├── components/
│   ├── ui/                       # shadcn/ui components (brand-themed)
│   │   ├── button.tsx            # Extended: primaryOrange, dark, outline, lilac, ghost, text
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── avatar.tsx
│   │   ├── dialog.tsx
│   │   └── separator.tsx
│   ├── layout/
│   │   ├── AppHeader.tsx         # Sticky nav, session-aware, mobile menu
│   │   ├── AppFooter.tsx         # Dark footer with nav/legal columns
│   │   ├── PageShell.tsx         # max-w-[1440px] centered container
│   │   ├── Container.tsx         # Legacy container (kept for compatibility)
│   │   ├── Header.tsx            # Legacy Stage 0 header (kept for compatibility)
│   │   └── Footer.tsx            # Legacy Stage 0 footer (kept for compatibility)
│   ├── motion/
│   │   ├── PageTransition.tsx    # motion.main — imports from lib/animations.ts
│   │   └── FadeIn.tsx            # Fade-in wrapper — imports from lib/animations.ts
│   ├── shared/
│   │   ├── AnimatedSection.tsx   # fadeUp reveal for sections (whileInView)
│   │   ├── StaggerWrapper.tsx    # Client wrapper for stagger in server components
│   │   ├── MotionButton.tsx      # Button with scale/tap/arrow animation
│   │   ├── NavigationProgress.tsx # CSS progress bar on navigation
│   │   ├── SectionLabel.tsx      # Pill label for section headings
│   │   ├── Ticker.tsx            # Infinite horizontal ticker (pause on hover)
│   │   ├── DecorativeStar.tsx    # SVG star decoration
│   │   └── StampBadge.tsx        # Circular stamp badge
│   ├── badges/
│   │   ├── PaymentStatusBadge.tsx  # paid/pending/processing/failed/expired/cancelled
│   │   └── ModelStatusBadge.tsx    # verified/available/new/top/campaign/risk
│   └── cards/
│       ├── ModelCard.tsx           # Model card with cardHover + stagger
│       ├── ProfileCard.tsx         # Profile display card
│       ├── StatCard.tsx            # Stat number card
│       └── InvestmentCampaignCard.tsx  # Campaign card with progress bar
│
├── features/                     # Business logic modules
│   ├── auth/
│   │   ├── components/           # AuthForm, AuthFormCard, LoginForm, RegisterForm, LogoutButton
│   │   ├── actions.ts            # loginAction, registerAction, logoutAction
│   │   ├── schemas.ts            # loginSchema, registerSchema (Zod)
│   │   ├── types.ts
│   │   └── constants.ts
│   ├── profile/
│   │   ├── components/
│   │   │   ├── ProfileFormClient.tsx  # Edit form with TanStack Query invalidation
│   │   │   └── ProfileCard.tsx        # Display card (legacy, kept for compatibility)
│   │   ├── actions.ts            # updateProfileAction
│   │   ├── queries.ts            # currentProfileQueryOptions (polls /api/profile)
│   │   ├── schemas.ts            # profileUpdateSchema (Zod, empty→null normalization)
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── server.ts             # getCurrentProfile, ensureCurrentProfile, updateCurrentProfile (server-only)
│   └── payment/
│       ├── components/
│       │   ├── PaymentCardClient.tsx  # TanStack Query polling + formErrorMotion
│       │   ├── PaymentStatusCard.tsx  # Account status display
│       │   ├── PaymentHistory.tsx     # Past payments list
│       │   └── PaymentCard.tsx        # Legacy (kept for compatibility)
│       ├── actions.ts            # createPaymentAction
│       ├── queries.ts            # currentPaymentQueryOptions (polls /api/payment/status, refetchInterval)
│       ├── schemas.ts            # btcpayWebhookPayloadSchema, createPaymentResultSchema
│       ├── types.ts
│       ├── constants.ts          # PAYMENT_AMOUNT=100, PAYMENT_CURRENCY=USDT, PAYMENT_NETWORK=tron
│       ├── server.ts             # createPaymentForCurrentUser, markPaymentPaid, etc. (server-only)
│       └── webhook.ts            # processBtcpayWebhook (idempotent, server-only)
│
├── hooks/
│   └── useReducedMotion.ts       # Wraps motion/react useReducedMotion
│
├── lib/
│   ├── animations.ts             # Motion.dev presets — SINGLE SOURCE OF TRUTH
│   │                             # pageTransition, fadeUp, staggerContainer, cardHover,
│   │                             # buttonHover, arrowHover, formErrorMotion, dialogContent, etc.
│   ├── constants.ts              # APP_NAME, PAYMENT_AMOUNT, etc.
│   ├── design-tokens.ts          # JS constants for dynamic styles
│   ├── mock-data.ts              # Mock models, campaigns, profile
│   ├── navigation.ts             # mainNav, footerNav, footerLegal
│   ├── utils.ts                  # cn() and other utilities
│   ├── env/
│   │   ├── index.ts              # Public exports
│   │   ├── client.ts             # getClientEnv() — browser-safe
│   │   ├── server.ts             # getServerEnv() — server-only
│   │   ├── shared.ts             # publicEnvSchema, serverEnvSchema
│   │   └── validate.ts           # Fail-fast validation
│   ├── supabase/
│   │   ├── client.ts             # createSupabaseBrowserClient()
│   │   ├── server.ts             # createSupabaseServerClient() — server-only
│   │   ├── route.ts              # createSupabaseRouteClient() — for route handlers
│   │   └── admin.ts              # createSupabaseAdminClient() — service role, server-only
│   ├── btcpay/
│   │   ├── client.ts             # createBtcpayInvoice() — Greenfield API, server-only
│   │   ├── webhook.ts            # verifyBtcpayWebhookSignature() — server-only
│   │   └── types.ts              # BtcpayInvoiceStatus, BTCPAY_STATUS_MAP, event types
│   ├── auth/
│   │   └── routes.ts             # isPublicRoute, isAuthRoute, isProtectedRoute
│   ├── query/
│   │   └── keys.ts               # Centralized query keys (auth, profile, payment)
│   ├── logger/
│   │   └── index.ts              # Centralized logger
│   └── security/
│       └── rate-limit.ts         # In-memory rate limiter (dev-only, not production-grade)
│
└── types/
    ├── database.ts               # Database types (profiles, payments, payment_events)
    ├── payment.ts                # PaymentStatus, PaymentProvider, PaymentCurrency
    ├── model.ts                  # ModelProfile, ModelCategory, ModelStatus, InvestmentCampaign
    ├── navigation.ts             # NavItem, NavGroup
    └── user.ts                   # UserProfile

middleware.ts                     # Session refresh + protected route redirects

supabase/
├── functions/                    # Supabase Edge Functions (stubs)
│   ├── create-payment/index.ts
│   └── btcpay-webhook/index.ts
└── migrations/
    ├── 20260515000000_create_profiles.sql   # profiles table + RLS + trigger
    └── 20260515000001_create_payments.sql   # payments + payment_events + RLS

docs/
├── reports/                      # Stage completion reports
├── adr/                          # Architecture Decision Records
├── PROJECT_STRUCTURE.md          # This file
├── CODING_RULES.md
├── QUALITY_GATE.md
├── ENVIRONMENT.md
├── AUTH_FLOW.md
├── PAYMENT_FLOW.md
├── PROFILE_FLOW.md
└── WEBHOOK_FLOW.md
```

## Architecture Rules

### Server/Client boundary

- Server components fetch data, pass as props to client components
- Client components handle interactivity, TanStack Query, Motion.dev
- `server.ts` files start with `import "server-only"`
- Admin client (service role) only in server-only files

### Animation system

All animation values live in `src/lib/animations.ts`. Components import from there — never hardcode values.

- `PageTransition` — page-level enter animation (template.tsx)
- `AnimatedSection` — section reveal (whileInView)
- `StaggerWrapper` — stagger container for server components
- `MotionButton` — button with scale/arrow animation
- `useReducedMotion` — respects prefers-reduced-motion

### TanStack Query

- Query keys centralized in `src/lib/query/keys.ts`
- `queryFn` fetches from API routes (`/api/profile`, `/api/payment/status`)
- `refetchInterval` on payment query: 10s while pending/processing, stops on final status
- `invalidateQueries` after mutations (profile save, payment creation)

### Feature module convention

```
src/features/<feature>/
├── components/     # Feature-specific UI
├── schemas.ts      # Zod validation
├── types.ts        # TypeScript types
├── constants.ts    # Feature constants
├── actions.ts      # Server Actions
├── queries.ts      # TanStack Query options
└── server.ts       # Server-only logic (import "server-only")
```

Only create files when real logic exists.
