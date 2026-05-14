# Profile Flow

## Overview

The profile system links each authenticated user to a `profiles` row in Supabase. Profiles are created lazily on first visit to `/profile`.

## Data Model

```sql
public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,           -- max 80 chars
  bio text,                    -- max 500 chars
  avatar_url text,             -- valid URL
  payment_status text,         -- 'pending' | 'paid' | 'failed' | 'expired' | 'cancelled'
  created_at timestamptz,
  updated_at timestamptz       -- auto-updated by trigger
)
```

## RLS

- Users can only read, insert, and update their **own** profile (`auth.uid() = id`).
- No public read access.
- No cross-user access.
- `payment_status` is never mutated by the profile form — only by trusted server/webhook logic (Stage 4).

## Profile Page Flow

```
User visits /profile
       │
       ▼
Middleware checks session
  ├── No session → redirect /login
  └── Session valid → continue
       │
       ▼
ProfilePage (Server Component)
  └── ensureCurrentProfile()
        ├── getUser() from Supabase Auth
        ├── No user → redirect /login
        ├── Profile exists → return Profile
        └── No profile → INSERT new row → return Profile
       │
       ▼
Render ProfileCard (read-only)
Render ProfileForm (editable fields)
```

## Profile Update Flow

```
User submits ProfileForm
       │
       ▼
updateProfileAction (Server Action)
  ├── Parse FormData
  ├── Validate with profileUpdateSchema (Zod)
  │     ├── Invalid → return { ok: false, message }
  │     └── Valid → continue
  ├── ensureCurrentProfile() — creates row if missing
  ├── updateCurrentProfile(input) — UPDATE via anon client + RLS
  ├── revalidatePath("/profile")
  └── return { ok: true }
```

## Security Notes

- `server.ts` is server-only (`import "server-only"`).
- All DB operations use the anon SSR client — RLS enforces ownership.
- `payment_status` is not in the update schema — cannot be changed via profile form.
- No service role key used for profile operations.
