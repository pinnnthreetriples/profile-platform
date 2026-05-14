# Stage 2 — Profiles: Completion Report

## Summary

Stage 2 implements a full user profile system on top of the Supabase Auth foundation from Stage 1. Users can view and update their display name, bio, and avatar URL. Payment status is read-only and controlled server-side only.

---

## What Was Implemented

### Database

- **Migration:** `supabase/migrations/20260515000000_create_profiles.sql`
- **Table:** `public.profiles`
  - `id uuid` — primary key, references `auth.users(id)` on delete cascade
  - `display_name text` — nullable, max 80 chars (DB constraint)
  - `bio text` — nullable, max 500 chars (DB constraint)
  - `avatar_url text` — nullable
  - `payment_status text` — not null, default `'pending'`, enum constraint
  - `created_at timestamptz` — auto-set
  - `updated_at timestamptz` — auto-updated via trigger

### RLS Policies

| Policy                       | Operation | Rule                                   |
| ---------------------------- | --------- | -------------------------------------- |
| Users can read own profile   | SELECT    | `auth.uid() = id`                      |
| Users can insert own profile | INSERT    | `auth.uid() = id`                      |
| Users can update own profile | UPDATE    | `auth.uid() = id` (using + with check) |

No public read. No cross-user access. No service role used for profile operations.

### Column-Level Privileges

RLS restricts rows by owner. Column grants restrict what authenticated users can write:

- `authenticated` can select their own full profile.
- `authenticated` can insert only `id`, `display_name`, `bio`, and `avatar_url`.
- `authenticated` can update only `display_name`, `bio`, and `avatar_url`.
- `payment_status`, `created_at`, and `updated_at` are not user-writable.

This prevents users from directly changing `payment_status` through the Supabase API.

### `updated_at` Trigger

`public.set_updated_at()` trigger fires `BEFORE UPDATE` on `profiles` and sets `new.updated_at = now()`.

### Database Types

`src/types/database.ts` updated with full `Row`, `Insert`, and `Update` types for the `profiles` table.

### Profile Feature Module

```text
src/features/profile/
├── actions.ts        — updateProfileAction (server action)
├── constants.ts      — PROFILE_ROUTES, PAYMENT_STATUS_LABELS/VARIANTS
├── queries.ts        — currentProfileQueryOptions (TanStack Query)
├── schemas.ts        — profileUpdateSchema (Zod, with empty→null normalization)
├── server.ts         — getCurrentProfile, ensureCurrentProfile, updateCurrentProfile
├── types.ts          — Profile, ProfileUpdate, ProfileInput, ProfileActionResult
└── components/
    ├── ProfileCard.tsx   — displays profile info + payment status badge
    └── ProfileForm.tsx   — edit form with useActionState
```

### `/profile` Page

- Server component — fetches profile via `ensureCurrentProfile()` (creates row if missing)
- Displays `ProfileCard` (read-only: name, email, bio, payment status)
- Displays `ProfileForm` (editable: display name, bio, avatar URL)
- Payment status is **read-only** — not in the form and not user-writable by grants
- Logout button present
- Link to `/payment` (still placeholder)

### Security

- `server.ts` starts with `import "server-only"`
- All profile operations use anon SSR client + RLS
- No service role used
- No payment status mutation from profile form
- Column privileges prevent direct authenticated writes to `payment_status`
- `getUser()` used (not `getSession()`) for server-side auth checks per Supabase best practices

---

## Tests

### Unit Tests

| File              | Tests                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `schemas.test.ts` | 16 tests — displayName/bio/avatarUrl validation, empty→null normalization, length limits     |
| `server.test.ts`  | 10 tests — getCurrentProfile, ensureCurrentProfile, updateCurrentProfile with Supabase mocks |
| `actions.test.ts` | 8 tests — validation errors, success path, revalidatePath, error propagation                 |

### E2E Tests

- Unauthenticated `/profile` redirects to `/login` ✅ (existing test, still passing)

---

## Limitations / Out of Scope

- No authenticated E2E tests (requires real Supabase test credentials — deferred, credentials not committed)
- No avatar image upload (URL only)
- Payment status is always `pending` until Stage 4 webhooks
- No admin access to profiles

---

## Not Included (by design)

- Payments, BTCPay, webhooks
- Service role on frontend
- Custom users/password table
- UI polish (Stage 5)
- Auth stack changes
