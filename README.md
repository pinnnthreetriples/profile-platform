# USDT Profile Platform

Profile platform with USDT payments via BTCPay Server.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Animation:** Motion.dev
- **Database:** Supabase
- **Payments:** BTCPay Server
- **Package Manager:** pnpm

## Installation

```bash
# Install dependencies
pnpm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

### Required Variables

- `NEXT_PUBLIC_APP_URL` - Your app URL (e.g., http://localhost:3000)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (server-side only)
- `BTCPAY_SERVER_URL` - BTCPay Server URL
- `BTCPAY_API_KEY` - BTCPay API key
- `BTCPAY_STORE_ID` - BTCPay Store ID
- `BTCPAY_WEBHOOK_SECRET` - BTCPay webhook secret

## Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Supabase

```bash
# Initialize Supabase (requires Supabase CLI)
supabase init

# Start local Supabase (requires Docker)
supabase start

# Create migration
supabase migration new <migration_name>

# Apply migrations
supabase db push
```

## Folder Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components
├── features/         # Business logic
├── lib/              # Utilities
└── types/            # TypeScript types

supabase/
├── functions/        # Edge Functions
└── migrations/       # SQL migrations

docs/
├── PROJECT_STRUCTURE.md
├── CODING_RULES.md
└── PAYMENT_FLOW.md
```

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for detailed structure.

## Stage Roadmap

### ✅ Stage 0 - Skeleton (Current)
- Project setup
- Dependencies installed
- Folder structure created
- Placeholder pages
- Environment configuration
- Documentation

### 🔲 Stage 1 - Supabase Auth
- User registration
- User login
- User logout
- Protected routes

### 🔲 Stage 2 - Profiles
- Profiles table
- RLS policies
- Profile page

### 🔲 Stage 3 - Payments
- Payments table
- create-payment function
- BTCPay invoice creation

### 🔲 Stage 4 - Webhooks
- Webhook verification
- Payment status updates
- Payment events table

### 🔲 Stage 5 - UI Polish
- Motion animations
- Responsive design
- Loading states

## Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Coding Rules](docs/CODING_RULES.md)
- [Payment Flow](docs/PAYMENT_FLOW.md)

## License

Private project
