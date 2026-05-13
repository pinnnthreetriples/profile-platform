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
│   │   ├── types.ts
│   │   └── constants.ts
│   ├── profile/             # Profile feature
│   │   ├── types.ts
│   │   ├── constants.ts
│   │   └── queries.ts       # TanStack Query options
│   └── payment/             # Payment feature
│       ├── types.ts
│       ├── constants.ts
│       └── queries.ts       # TanStack Query options
│
├── lib/                     # Technical utilities
│   ├── supabase/            # Supabase clients
│   │   ├── client.ts        # Browser client
│   │   └── server.ts        # Server client
│   ├── btcpay/              # BTCPay integration
│   │   ├── client.ts        # BTCPay client
│   │   └── types.ts         # BTCPay types
│   ├── query/               # TanStack Query utilities
│   │   └── keys.ts          # Query keys
│   ├── env.ts               # Environment validation
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
├── PROJECT_STRUCTURE.md     # This file
├── CODING_RULES.md          # Coding standards
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
