# Stage 3+4 — Payments & Webhooks: Completion Report

## Summary

End-to-end payment flow using BTCPay Server with the Tether USDt Plugin for USDT on TRON (TRC20). Includes invoice creation, webhook signature verification, idempotent event processing, and server-side payment/profile status updates.

---

## What Was Implemented

### Database Migrations

**`supabase/migrations/20260515000001_create_payments.sql`**

#### payments table

| Column                 | Type          | Notes                                            |
| ---------------------- | ------------- | ------------------------------------------------ |
| id                     | uuid          | PK, gen_random_uuid()                            |
| user_id                | uuid          | FK auth.users                                    |
| profile_id             | uuid          | FK profiles                                      |
| provider               | text          | 'btcpay'                                         |
| provider_invoice_id    | text          | unique                                           |
| checkout_url           | text          |                                                  |
| amount                 | numeric(12,2) | server-controlled                                |
| currency               | text          | 'USDT'                                           |
| network                | text          | 'tron' (MVP only)                                |
| payment_method_id      | text          | 'USDT-TRON'                                      |
| status                 | text          | pending/processing/paid/failed/expired/cancelled |
| created_at, updated_at | timestamptz   | auto-managed                                     |
| expires_at, settled_at | timestamptz   | nullable                                         |

#### payment_events table

Audit log for all BTCPay webhook events. Idempotency enforced via unique index on `(provider, event_id)`.

### RLS Policies

| Table          | Policy                            | Rule                   |
| -------------- | --------------------------------- | ---------------------- |
| payments       | Users can read own payments       | `auth.uid() = user_id` |
| payment_events | Users can read own payment events | via payments join      |

Both tables: `revoke all from anon, authenticated; grant select to authenticated`. No direct INSERT/UPDATE/DELETE for users.

### Supabase Admin Client

`src/lib/supabase/admin.ts` — service role client, server-only, used exclusively for:

- Creating payment records
- Updating payment/profile status from verified webhooks
- Inserting payment events

### BTCPay Integration

- **`src/lib/btcpay/client.ts`** — real Greenfield API implementation
  - POST `/api/v1/stores/{storeId}/invoices`
  - Payment method: `USDT-TRON` (Tether USDt Plugin)
  - 15s timeout, no secret logging, safe error messages
- **`src/lib/btcpay/webhook.ts`** — HMAC-SHA256 signature verification
  - Header: `BTCPay-Sig`
  - Raw body used (not re-serialized)
  - `timingSafeEqual` for constant-time comparison

### Payment Feature Module

```
src/features/payment/
├── actions.ts       — createPaymentAction (server action)
├── constants.ts     — PAYMENT_AMOUNT=100, PAYMENT_CURRENCY=USDT, PAYMENT_NETWORK=tron
├── queries.ts       — TanStack Query options
├── schemas.ts       — Zod schemas for webhook payload, invoice response
├── server.ts        — payment server functions (admin client)
├── types.ts         — Payment, PaymentEvent, CreatePaymentResult
├── webhook.ts       — processBtcpayWebhook (idempotent event processing)
└── components/
    ├── PaymentCard.tsx        — create invoice button, checkout link, paid state
    ├── PaymentHistory.tsx     — list of past payments
    └── PaymentStatusCard.tsx  — account payment status badge
```

### API Route

`src/app/api/webhooks/btcpay/route.ts` — POST handler:

1. Read raw body
2. Verify `BTCPay-Sig` signature
3. Parse JSON (only after verification)
4. Validate payload schema
5. Process event (idempotent)

### Payment Page

`/payment` — server component showing:

- Account payment status
- Create invoice button (USDT TRC20)
- Checkout link if active invoice exists
- Paid state if already paid
- Payment history

### Success/Cancel Pages

Both pages are UX-only — they do NOT mutate payment state. Payment status is updated exclusively by verified webhook.

### Rate Limiting

In-memory rate limiter: 5 invoice creation attempts per user per 10 minutes.
**Limitation:** Per-process only. Not suitable for multi-instance/serverless deployments.

---

## BTCPay Runtime Verification

**Status: Pending** — requires a configured BTCPay instance with Tether USDt Plugin.

Checklist:

- [ ] BTCPay Server installed (v2.3.7+)
- [ ] Tether USDt Plugin installed
- [ ] Store configured
- [ ] TRON receiving address configured
- [ ] USDT-TRON payment method available
- [ ] Test invoice created from BTCPay UI
- [ ] Webhook URL configured: `POST /api/webhooks/btcpay`

---

## Tests

| File                                   | Tests                                                                            |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `src/lib/btcpay/client.test.ts`        | 8 — API call, USDT-TRON, metadata, success, errors, no secret logging            |
| `src/lib/btcpay/webhook.test.ts`       | 8 — valid/invalid/null signature, tampered body, constant-time                   |
| `src/features/payment/webhook.test.ts` | 8 — idempotency, paid/expired/processing/failed/unknown events, no payment found |
| `src/features/payment/server.test.ts`  | 9 — auth redirect, rate limit, alreadyPaid, reuse invoice, BTCPay failure        |

Total: 125 tests passing (34 new in Stage 3+4)

---

## Security Checklist

- ✅ No service role in frontend
- ✅ No BTCPay API key in frontend
- ✅ No webhook secret in frontend
- ✅ No secrets committed
- ✅ Webhook signature verified before processing
- ✅ Raw body used for signature verification
- ✅ Duplicate webhook events idempotent
- ✅ Unknown events do not mark paid
- ✅ Success redirect does not mark paid
- ✅ Payment status controlled server-side
- ✅ Profile payment status controlled server-side
- ✅ RLS enabled on payments and payment_events
- ✅ Users can read only own payments/events
- ✅ Users cannot insert/update/delete payments directly
- ✅ Payment amount/currency/network server-controlled
- ✅ USDT-TRON only in MVP UI

---

## Known Limitations

- No Polygon/Ethereum in UI (out of scope)
- No USDC
- No refunds
- No multiple payment tiers
- No admin panel
- Rate limiter is in-memory only (not production-grade for multi-instance)
- BTCPay runtime verification pending (requires live BTCPay instance)
