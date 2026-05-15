-- Migration: create_payments
-- Stage 3+4 — Payments & Webhooks
-- Creates payments and payment_events tables with RLS

-- ============================================================
-- 1. payments table
-- ============================================================
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,

  provider text not null default 'btcpay',
  provider_invoice_id text unique,
  checkout_url text,

  amount numeric(12, 2) not null,
  currency text not null default 'USDT',
  network text not null default 'tron',
  payment_method_id text not null default 'USDT-TRON',

  status text not null default 'pending',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz,
  settled_at timestamptz
);

-- Constraints
alter table public.payments
  add constraint payments_provider_check
  check (provider in ('btcpay'));

alter table public.payments
  add constraint payments_amount_positive
  check (amount > 0);

alter table public.payments
  add constraint payments_currency_check
  check (currency in ('USDT', 'USDt'));

alter table public.payments
  add constraint payments_network_check
  check (network in ('tron'));

alter table public.payments
  add constraint payments_payment_method_id_check
  check (payment_method_id in ('USDT-TRON'));

alter table public.payments
  add constraint payments_status_check
  check (status in ('pending', 'processing', 'paid', 'failed', 'expired', 'cancelled'));

-- Indexes
create index payments_user_id_idx on public.payments(user_id);
create index payments_profile_id_idx on public.payments(profile_id);
create index payments_provider_invoice_id_idx on public.payments(provider_invoice_id);
create index payments_status_idx on public.payments(status);
create index payments_created_at_idx on public.payments(created_at desc);

-- updated_at trigger (reuses function from Stage 2 migration)
create trigger payments_set_updated_at
  before update on public.payments
  for each row
  execute function public.set_updated_at();

-- ============================================================
-- 2. payment_events table
-- ============================================================
create table public.payment_events (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid references public.payments(id) on delete cascade,
  provider text not null default 'btcpay',
  provider_invoice_id text,
  event_type text not null,
  event_id text,
  payload jsonb not null,
  processed_at timestamptz not null default now()
);

-- Constraints
alter table public.payment_events
  add constraint payment_events_provider_check
  check (provider in ('btcpay'));

-- Idempotency: unique (provider, event_id) when event_id is not null
create unique index payment_events_provider_event_id_unique
  on public.payment_events(provider, event_id)
  where event_id is not null;

-- Indexes
create index payment_events_payment_id_idx on public.payment_events(payment_id);
create index payment_events_provider_invoice_id_idx on public.payment_events(provider_invoice_id);
create index payment_events_processed_at_idx on public.payment_events(processed_at desc);

-- ============================================================
-- 3. RLS — payments
-- ============================================================
alter table public.payments enable row level security;

-- Revoke direct write access from authenticated users
revoke all on table public.payments from anon, authenticated;
grant select on table public.payments to authenticated;

-- Users can only read their own payments
create policy "Users can read own payments"
  on public.payments
  for select
  to authenticated
  using (auth.uid() = user_id);

-- ============================================================
-- 4. RLS — payment_events
-- ============================================================
alter table public.payment_events enable row level security;

-- Revoke direct write access from authenticated users
revoke all on table public.payment_events from anon, authenticated;
grant select on table public.payment_events to authenticated;

-- Users can only read events for their own payments
create policy "Users can read own payment events"
  on public.payment_events
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.payments p
      where p.id = payment_events.payment_id
        and p.user_id = auth.uid()
    )
  );
