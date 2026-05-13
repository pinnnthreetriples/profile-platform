# ADR 0001 — Core Stack

## Status

Accepted

## Decision

Use:

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

## Rejected

- WordPress
- WooCommerce
- PHP
- Firebase
- Prisma
- Redux
- TanStack Router

## Reason

This stack supports a custom professional application with authentication, user profiles, USDT payment flow, CI quality gates, and controlled scalability.

## Consequences

- The project remains custom-code based instead of CMS/plugin based.
- Payment and auth logic must be implemented explicitly.
- AI agents must not replace the stack without explicit approval.
