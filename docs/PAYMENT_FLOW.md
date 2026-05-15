# Payment Flow

## Overview

End-to-end payment flow using BTCPay Server with the Tether USDt Plugin for USDT on TRON.

**MVP scope:** USDT on TRON (TRC20) only. Polygon and Ethereum are out of scope.

## Provider Decision

- **BTCPay Server** — self-hosted payment processor
- **Tether USDt Plugin** — `BTCPayServer.Plugins.USDt` v0.6.0+, minimum BTCPay v2.3.7
- **Payment method id:** `USDT-TRON` (TRON network)
- Reference: https://github.com/btcpayserver-tether/BTCPayServer.Plugins.USDt

## Payment Lifecycle

```
User clicks "Pay with USDT TRC20"
       │
       ▼
createPaymentAction (Server Action)
  ├── Auth check (getUser)
  ├── Rate limit check (5 req / 10 min per user, in-memory)
  ├── Profile payment_status check
  │     └── "paid" → return alreadyPaid
  ├── Check for existing active pending/processing payment
  │     └── exists with checkout_url → reuse
  ├── INSERT payments row (status=pending, admin client)
  ├── createBtcpayInvoice (BTCPay Greenfield API)
  │     └── paymentMethods: ["USDT-TRON"]
  ├── UPDATE payments row (provider_invoice_id, checkout_url, expires_at)
  └── Return { ok: true, checkoutUrl }
       │
       ▼
User redirected to BTCPay checkout
       │
       ▼
User pays on TRON network
       │
       ▼
BTCPay sends webhook POST /api/webhooks/btcpay
  ├── Read raw body
  ├── Verify BTCPay-Sig header (HMAC-SHA256)
  │     └── Invalid → 401
  ├── Parse JSON (only after verification)
  ├── Validate payload schema
  ├── Check idempotency (event_id unique index)
  │     └── Duplicate → 200 (no-op)
  ├── Find payment by provider_invoice_id
  ├── INSERT payment_events (audit log)
  ├── Map event type to status:
  │     InvoiceSettled / InvoicePaymentSettled → paid
  │     InvoiceExpired → expired
  │     InvoiceProcessing → processing
  │     InvoiceInvalid → failed
  │     Unknown → stored, no status change
  └── Update payments.status + profiles.payment_status (admin client)
       │
       ▼
User sees updated payment status on /profile and /payment
```

## Security Rules

- Frontend never confirms payment.
- `/payment/success` and `/payment/cancel` are UX-only pages — they do NOT mutate payment state.
- Payment status is controlled exclusively by verified webhook or server-side logic.
- Amount, currency, network, and payment method are server-controlled.
- Users cannot set payment status via profile form or direct API.
- Webhook signature verified before any JSON parsing or DB mutation.
- Raw body used for signature verification (not re-serialized JSON).
- Duplicate webhook events are idempotent (unique index on provider + event_id).
- Admin client (service role) used only in server-only files.
- No BTCPay API key or webhook secret exposed to frontend.

## DB Schema

### payments

| Column              | Type          | Notes                                            |
| ------------------- | ------------- | ------------------------------------------------ |
| id                  | uuid          | PK, gen_random_uuid()                            |
| user_id             | uuid          | FK auth.users                                    |
| profile_id          | uuid          | FK profiles                                      |
| provider            | text          | 'btcpay'                                         |
| provider_invoice_id | text          | unique, BTCPay invoice id                        |
| checkout_url        | text          | BTCPay checkout link                             |
| amount              | numeric(12,2) | server-controlled                                |
| currency            | text          | 'USDT'                                           |
| network             | text          | 'tron' (MVP only)                                |
| payment_method_id   | text          | 'USDT-TRON'                                      |
| status              | text          | pending/processing/paid/failed/expired/cancelled |
| created_at          | timestamptz   |                                                  |
| updated_at          | timestamptz   | auto via trigger                                 |
| expires_at          | timestamptz   | from BTCPay                                      |
| settled_at          | timestamptz   | set on paid                                      |

### payment_events

| Column              | Type        | Notes                                   |
| ------------------- | ----------- | --------------------------------------- |
| id                  | uuid        | PK                                      |
| payment_id          | uuid        | FK payments (nullable)                  |
| provider            | text        | 'btcpay'                                |
| provider_invoice_id | text        |                                         |
| event_type          | text        | BTCPay event type string                |
| event_id            | text        | BTCPay deliveryId (unique per provider) |
| payload             | jsonb       | full webhook payload                    |
| processed_at        | timestamptz |                                         |

## RLS

- `payments`: authenticated users can SELECT own rows only (`user_id = auth.uid()`). No direct INSERT/UPDATE/DELETE.
- `payment_events`: authenticated users can SELECT events for own payments only. No direct INSERT/UPDATE/DELETE.
- All writes go through admin client (service role) in server-only code.

## BTCPay Setup Notes

1. Install BTCPay Server (v2.3.7+)
2. Install Tether USDt Plugin from Plugin Builder
3. Create a store
4. Configure TRON receiving address in store settings
5. Verify USDT-TRON payment method is available
6. Create a Greenfield API key with store-level invoice permissions
7. Add webhook in store settings:
   - URL: `https://your-app.com/api/webhooks/btcpay`
   - Events: InvoiceSettled, InvoicePaymentSettled, InvoiceExpired, InvoiceProcessing, InvoiceInvalid, InvoiceCreated
   - Copy the webhook secret to `BTCPAY_WEBHOOK_SECRET`

## BTCPay Runtime Verification

**Status: Pending** — BTCPay Server runtime verification (live invoice creation, webhook delivery) requires a configured BTCPay instance with the Tether USDt Plugin installed. The implementation is built against the documented BTCPay Greenfield API interface. Verify before production deployment:

- [ ] BTCPay Server installed and accessible
- [ ] BTCPay version ≥ 2.3.7
- [ ] Tether USDt Plugin installed
- [ ] Store configured
- [ ] TRON receiving address configured
- [ ] USDT-TRON payment method available
- [ ] Test invoice created from BTCPay UI
- [ ] Webhook URL configured and receiving events

## Rate Limiting

In-memory rate limiter: 5 invoice creation attempts per user per 10 minutes.

**Limitation:** In-memory store is per-process only. Does not work correctly in multi-instance or serverless deployments. Replace with Redis-backed rate limiter for production.

## Known Limitations

- No Polygon/Ethereum support in UI (out of scope for MVP)
- No USDC support
- No refunds
- No multiple payment tiers
- No admin panel
- Rate limiter is in-memory only (not production-grade for multi-instance)
