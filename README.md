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

# Code quality
pnpm format          # Format code
pnpm format:check    # Check formatting
pnpm lint            # Lint code
pnpm typecheck       # Type check

# Testing
pnpm test            # Run unit tests
pnpm test:watch      # Run tests in watch mode
pnpm test:coverage   # Run tests with coverage
pnpm test:e2e        # Run E2E tests

# Code quality checks
pnpm duplicates      # Check for code duplication
pnpm deadcode        # Check for unused code

# Quality gate (run all checks)
pnpm quality         # Local checks without E2E
pnpm quality:ci      # CI Quality Gate without E2E
pnpm quality:full    # Full local validation including E2E
```

## Node.js Version

This project requires Node.js >= 20.19.0 and pnpm >= 10.30.3.

Use nvm or similar to switch versions:

```bash
nvm use
# or
nvm install 20.19.0
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

### ✅ Stage 0 - Skeleton

- Project setup
- Dependencies installed
- Folder structure created
- Placeholder pages
- Environment configuration
- Documentation

### ✅ Stage 0.1 - Quality Gate

- Prettier, ESLint, TypeScript
- Vitest unit tests
- Playwright E2E tests
- GitHub Actions CI/CD
- Security scanning (Gitleaks, Semgrep CE)
- Dependency audit (pnpm audit)
- TanStack Query foundation
- Smooth page transitions

### ✅ Stage 0.2 - Hardening

- Version pinning (Node.js 20.19.0, pnpm 10.30.3)
- Strict environment validation
- Supabase client factories
- Real unit tests (20 tests)
- Expanded E2E tests (7 tests)
- CI fixes (all workflows passing)
- Branch protection ready

### ✅ Stage 0.3 - Code Quality Guards

- jscpd (code duplication detection)
- Knip (dead code detection)
- eslint-plugin-security (security linting)
- Updated CI pipeline
- Documentation updates

### ✅ Stage 0.4 - Structure Governance

- server-only guards
- feature module convention
- docs/reports cleanup
- documentation governance
- AI agent instructions

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
- [Quality Gate](docs/QUALITY_GATE.md)
- [Environment Guide](docs/ENVIRONMENT.md)
- [ADR 0001 — Core Stack](docs/adr/0001-core-stack.md)
- [ADR 0002 — Quality Gate](docs/adr/0002-quality-gate.md)
- [ADR 0003 — Payment Architecture](docs/adr/0003-payment-architecture.md)
- [Agent Guidelines](AGENTS.md)

## License

Private project
