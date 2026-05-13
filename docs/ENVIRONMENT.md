# Environment Guide

## Purpose

This document explains how environment variables are organized and which variables are safe for frontend usage.

## Public variables

These variables may be used in browser/client code:

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_PAYMENT_CURRENCY`
- `NEXT_PUBLIC_PAYMENT_NETWORK`

## Private variables

These variables must only be used in server-only code:

- `SUPABASE_SERVICE_ROLE_KEY`
- `BTCPAY_SERVER_URL`
- `BTCPAY_API_KEY`
- `BTCPAY_STORE_ID`
- `BTCPAY_WEBHOOK_SECRET`

## Rules

1. `NEXT_PUBLIC_*` variables may be used in client code.
2. Private variables must only be used in server-only files.
3. Never import `@/lib/env/server` in client components.
4. Never expose BTCPay API keys to the browser.
5. Never expose Supabase service role key to the browser.
6. Server-only files must use `import "server-only"`.
7. Do not duplicate env validation logic outside `src/lib/env/`.

## Env modules

- `src/lib/env/client.ts` validates public env.
- `src/lib/env/server.ts` validates server env.
- `src/lib/env/shared.ts` contains shared schemas.
- `src/lib/env/index.ts` exports public helpers.

## Stage usage

### Stage 1 — Auth

Requires:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Stage 2 — Profiles

Requires:

- Supabase Auth
- profile-related database migrations

### Stage 3+ — Payments

Requires:

- `BTCPAY_SERVER_URL`
- `BTCPAY_API_KEY`
- `BTCPAY_STORE_ID`
- `BTCPAY_WEBHOOK_SECRET`

## Local development

Create:

```bash
cp .env.example .env.local
```

Fill only variables needed for the current stage.

Do not commit `.env.local`.
