# Quality Gate

## Overview

This project enforces quality standards through automated checks before code can be merged.

## Local Quality Checks

### 1. Prettier (Code Formatting)

```bash
pnpm format:check  # Check formatting
pnpm format        # Auto-fix formatting
```

**Configuration:** `.prettierrc`

**Rules:**

- No semicolons
- Double quotes
- ES5 trailing commas
- 90 character line width

### 2. ESLint (Code Linting)

```bash
pnpm lint
```

**Configuration:** `.eslintrc.json`

**Rules:**

- Next.js core web vitals
- No unused imports
- Max warnings: 0

### 3. TypeScript (Type Checking)

```bash
pnpm typecheck
```

**Configuration:** `tsconfig.json`

**Rules:**

- Strict mode enabled
- No emit (type checking only)

### 4. Vitest (Unit Tests)

```bash
pnpm test              # Run tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

**Configuration:** `vitest.config.ts`

**Setup:**

- jsdom environment
- Testing Library integration
- Coverage with v8

### 5. Playwright (E2E Tests)

```bash
pnpm test:e2e
```

**Configuration:** `playwright.config.ts`

**Tests:**

- Home page loads
- Login page loads
- Profile page loads

### 6. Next.js Build

```bash
pnpm build
```

Ensures the production build succeeds.

## Combined Quality Check

Run all checks at once:

```bash
pnpm quality
```

This runs:

1. Format check
2. Lint
3. Typecheck
4. Unit tests
5. Build

## GitHub Actions CI

### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and PR to `main`/`master`:

1. ✅ Format check
2. ✅ Lint
3. ✅ Typecheck
4. ✅ Unit tests
5. ✅ Build

### E2E Workflow (`.github/workflows/e2e.yml`)

Runs on PRs to `main`/`master`:

1. ✅ Playwright E2E tests

### Secret Scan (`.github/workflows/secrets.yml`)

Runs on every push and PR:

1. ✅ Gitleaks secret detection

### CodeQL (`.github/workflows/codeql.yml`)

Runs on:

- Every push and PR
- Weekly schedule (Monday 3 AM)

1. ✅ Static code analysis
2. ✅ Security vulnerability detection

### Dependency Review (`.github/workflows/dependency-review.yml`)

Runs on PRs:

1. ✅ Check for vulnerable dependencies
2. ✅ Fail on moderate+ severity

## Dependabot

**Configuration:** `.github/dependabot.yml`

Automatically creates PRs for:

- npm package updates (weekly)
- GitHub Actions updates (weekly)

## Branch Protection (Recommended)

For production repositories, enable:

1. **Require status checks to pass:**
   - Quality Gate
   - Playwright E2E
   - Secret Scan
   - CodeQL

2. **Require branches to be up to date**

3. **Require linear history**

4. **Do not allow bypassing**

## Quality Standards

### Code Coverage

- Target: 80%+ (not enforced in Stage 0)
- Measured by Vitest

### Security

- No secrets in code (Gitleaks)
- No vulnerable dependencies (Dependabot + Dependency Review)
- Static analysis (CodeQL)

### Performance

- Next.js build must succeed
- No TypeScript errors
- No ESLint warnings

## Troubleshooting

### Format check fails

```bash
pnpm format
```

### Lint fails

Check ESLint output and fix issues manually or:

```bash
pnpm lint --fix
```

### Typecheck fails

Fix TypeScript errors in reported files.

### Tests fail

Check test output and fix failing tests.

### Build fails

Check Next.js build output for errors.

### E2E tests fail

- Ensure dev server starts correctly
- Check Playwright output for details
- Run locally: `pnpm test:e2e`

## Stage 0 Status

✅ All quality gates implemented and passing
