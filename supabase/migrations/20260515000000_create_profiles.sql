-- Migration: create_profiles
-- Stage 2 — Profiles
-- Creates the profiles table linked to auth.users with RLS policies

-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  bio text,
  avatar_url text,
  payment_status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Constraints
alter table public.profiles
  add constraint profiles_display_name_length
  check (display_name is null or char_length(display_name) <= 80);

alter table public.profiles
  add constraint profiles_bio_length
  check (bio is null or char_length(bio) <= 500);

alter table public.profiles
  add constraint profiles_payment_status_check
  check (payment_status in ('pending', 'paid', 'failed', 'expired', 'cancelled'));

-- Enable RLS
alter table public.profiles enable row level security;

-- Column-level privileges
-- Authenticated users may read their own full profile through RLS, but they must not
-- be able to directly set payment_status. Payment status is controlled by later
-- server-side payment/webhook flows.
revoke all on table public.profiles from anon, authenticated;
grant select on table public.profiles to authenticated;
grant insert (id, display_name, bio, avatar_url) on table public.profiles to authenticated;
grant update (display_name, bio, avatar_url) on table public.profiles to authenticated;

-- RLS Policies
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- updated_at trigger function
create or replace function public.set_updated_at()
  returns trigger
  language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Attach trigger to profiles
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();
