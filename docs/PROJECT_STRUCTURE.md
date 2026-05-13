# Project Structure

## Overview

This document describes the folder structure of the USDT Profile Platform.

## Directory Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public routes
│   │   └── page.tsx         # Landing page
│   ├── (auth)/              # Auth routes
│   │   ├── login/           # Login page
│   │   └── register/        # Register page
│   ├── (dashboard)/         # Protected routes
│   │   ├── profile/         # Profile page
│   │   └── payment/         # Payment pages
│   ├── providers.tsx        # App-level client providers
│   ├── template.tsx         # Smooth route transition wrapper
│   ├── loading.tsx          # Route loading placeholder
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Container.tsx
│   └── motion/              # Motion.dev components
│       ├── FadeIn.tsx
│       └── PageTransition.tsx
│
├── features/                # Business logic modules
│   ├── auth/                # Auth feature
│   │   ├── components/      # Feature-specific components
│   │   ├── schemas.ts       # Zod validation schemas
│   │   ├── types.ts         # TypeScript types
│   │   ├── constants.ts     # Feature constants
│   │   ├── actions.ts       # Server Actions (if needed)
│   │   ├── queries.ts       # TanStack Query options
│   │   └── server.ts        # Server-only logic (server-only)
│   ├── profile/             # Profile feature
│   │   ├── components/
│   │   ├── schemas.ts
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   ├── queries.ts
│   │   └── server.ts        # (server-only)
│   └── payment/             # Payment feature
│       ├── components/
│       ├── schemas.ts
│       ├── types.ts
│       ├── constants.ts
│       ├── queries.ts
│       └── server.ts        # (server-only)
│
├── lib/                     # Technical utilities
│   ├── env/                 # Environment validation
│   │   ├── index.ts         # Public exports
│   │   ├── client.ts        # Client-side env (browser-safe)
│   │   ├── server.ts        # Server-side env (server-only)
│   │   └── shared.ts        # Shared schemas
│   ├── supabase/            # Supabase clients
│   │   ├── client.ts        # Browser client
│   │   └── server.ts        # Server client (server-only)
│   ├── btcpay/              # BTCPay integration
│   │   ├── client.ts        # BTCPay client (server-only)
│   │   └── types.ts         # BTCPay types
│   ├── query/               # TanStack Query utilities
│   │   └── keys.ts          # Query keys
│   └── utils.ts             # Utility functions
│
└── types/                   # Shared TypeScript types
    ├── database.ts          # Database types
    └── payment.ts           # Payment types

supabase/
├── functions/               # Supabase Edge Functions
│   ├── create-payment/      # Create payment function
│   │   └── index.ts
│   └── btcpay-webhook/      # BTCPay webhook handler
│       └── index.ts
└── migrations/              # SQL migrations
    └── .gitkeep

docs/
├── reports/                 # Stage completion reports
│   ├── STAGE_0_COMPLETE.md
│   ├── STAGE_0.1_COMPLETE.md
│   ├── STAGE_0.1_TANSTACK_COMPLETE.md
│   ├── STAGE_0.2_COMPLETE.md
│   ├── STAGE_0.2.1_COMPLETE.md
│   ├── STAGE_0.2_PR_SUMMARY.md
│   └── STAGE_0.3_COMPLETE.md
├── PROJECT_STRUCTURE.md     # This file
├── CODING_RULES.md          # Coding standards
├── QUALITY_GATE.md          # Quality checks
└── PAYMENT_FLOW.md          # Payment flow documentation
```

## Key Directories

### `src/app/`

Next.js App Router pages and layouts. Uses route groups for organization:

- `(public)` - Public pages (landing)
- `(auth)` - Authentication pages
- `(dashboard)` - Protected pages

### `src/components/`

Reusable React components:

- `ui/` - shadcn/ui components
- `layout/` - Layout components (Header, Footer, Container)
- `motion/` - Motion.dev animation components

### `src/features/`

Business logic organized by feature:

- Each feature has its own types and constants
- Keeps business logic separate from UI

**Feature module convention:**

Each feature should follow this structure:

- `components/` - Feature-specific UI components
- `schemas.ts` - Zod schemas for validation
- `types.ts` - TypeScript types
- `constants.ts` - Feature constants
- `actions.ts` - Server Actions (if needed)
- `queries.ts` - TanStack Query options
- `server.ts` - Server-only logic (must have `import "server-only"`)

**Rules:**

1. Keep `page.tsx` files thin - delegate to feature modules
2. Business logic belongs in feature modules, not in page components
3. Server-only code must have `import "server-only"` at the top
4. Do not mix client and server logic in the same file

### `src/lib/`

Technical integrations and utilities:

- `supabase/` - Supabase client setup
- `btcpay/` - BTCPay Server integration
- `query/` - TanStack Query keys and query utilities
- `env.ts` - Environment variable validation
- `utils.ts` - Shared utilities

### `supabase/`

Supabase-specific files:

- `functions/` - Edge Functions (serverless functions)
- `migrations/` - Database migrations

### `docs/`

Project documentation
