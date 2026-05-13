# ADR 0003 — Payment Architecture

## Status

Accepted

## Decision

Use BTCPay Server with Tether USDt Plugin for USDT payments.

## Rules

1. Frontend never confirms payment.
2. Payment status is updated only by trusted server/webhook logic.
3. Webhooks must be verified.
4. Payment processing must be idempotent.
5. Supabase RLS must protect payment/user data.
6. Payment events must be auditable.
7. Access must only be granted after trusted settled/paid status.

## Reason

Crypto payments require backend-controlled confirmation, webhook verification, and auditable payment state transitions.

## Rejected

- Frontend-only payment confirmation
- Manual payment marking from frontend
- Trusting redirect success URL as payment proof
