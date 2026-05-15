# Webhook Flow

## Overview

BTCPay Server sends webhook events to `/api/webhooks/btcpay` when invoice status changes.

## Webhook Security

### Signature Verification

BTCPay signs each webhook delivery with HMAC-SHA256.

- **Header:** `BTCPay-Sig`
- **Format:** `sha256=<hmac-sha256-hex-of-raw-body>`
- **Secret:** `BTCPAY_WEBHOOK_SECRET` (set in BTCPay store webhook settings)
- **Reference:** https://docs.btcpayserver.org/Webhooks/#webhook-security

**Critical:** The raw request body must be used for verification — not re-serialized JSON. Parsing and re-serializing changes whitespace and breaks the signature.

### Constant-Time Comparison

`timingSafeEqual` from Node.js `crypto` module is used to prevent timing attacks.

## Processing Flow

```
POST /api/webhooks/btcpay
  │
  ├── 1. Read raw body (request.text())
  ├── 2. Read BTCPay-Sig header
  ├── 3. verifyBtcpayWebhookSignature()
  │     └── Invalid → 401 Unauthorized (no further processing)
  ├── 4. JSON.parse(rawBody)
  ├── 5. Validate payload with btcpayWebhookPayloadSchema (Zod)
  │     └── Invalid → 400 Bad Request
  └── 6. processBtcpayWebhook()
        ├── Check idempotency (event_id unique index)
        │     └── Duplicate → 200 (no-op, already processed)
        ├── Find payment by provider_invoice_id
        ├── INSERT payment_events (always — audit log)
        ├── Map event type → status transition
        └── Update payments + profiles (admin client)
```

## Event Type Mapping

| BTCPay Event          | Internal Status | Profile Updated          |
| --------------------- | --------------- | ------------------------ |
| InvoiceSettled        | paid            | ✅ payment_status = paid |
| InvoicePaymentSettled | paid            | ✅ payment_status = paid |
| InvoiceExpired        | expired         | ❌                       |
| InvoiceProcessing     | processing      | ❌                       |
| InvoiceInvalid        | failed          | ❌                       |
| InvoiceCreated        | (stored only)   | ❌                       |
| Unknown               | (stored only)   | ❌                       |

## Idempotency

Duplicate events are handled via a unique index:

```sql
create unique index payment_events_provider_event_id_unique
  on public.payment_events(provider, event_id)
  where event_id is not null;
```

If an event with the same `(provider, event_id)` already exists, the webhook returns 200 without re-processing.

## Audit Log

Every valid webhook event (after signature verification) is stored in `payment_events`, including:

- Unknown event types
- Events for unknown invoices (payment_id = null)

This provides a complete audit trail for debugging and compliance.

## Security Notes

- Signature verified before any JSON parsing or DB mutation.
- Unknown events are stored but never mark payment as paid.
- Success redirect URL never marks payment as paid.
- Admin client (service role) used only in server-only webhook processing code.
- No webhook secret exposed to frontend.
- Error responses do not leak internal details.
