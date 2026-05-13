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

**Configuration:** `eslint.config.mjs`

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

### 7. jscpd (Code Duplication Detection)

```bash
pnpm duplicates
```

**Configuration:** `.jscpd.json`

**Rules:**

- Threshold: 2%
- Min lines: 8
- Min tokens: 50
- Detects copy-paste code

**Purpose:**

- Catch duplicated code
- Force extraction to shared helpers/components
- Maintain DRY principle

### 8. Knip (Dead Code Detection)

```bash
pnpm deadcode
```

**Configuration:** `knip.json`

**Detects:**

- Unused files
- Unused exports
- Unused dependencies
- Unused scripts

**Purpose:**

- Keep codebase clean
- Remove unused code
- Optimize bundle size

### 9. Security Linting

Integrated in `pnpm lint`

**Configuration:** `eslint.config.mjs`

**Current security linting uses core ESLint security rules:**

- `no-eval`
- `no-implied-eval`
- `no-new-func`
- `no-script-url`

**Note:** `eslint-plugin-security` is installed, but the full recommended config is deferred until stable ESLint 9 flat config compatibility is confirmed.

**Purpose:**

- Catch security issues early
- Enforce secure coding patterns

**Do not claim full eslint-plugin-security recommended coverage until it is actually enabled.**

## Combined Quality Commands

### `pnpm quality`

Runs local non-E2E checks:

1. Format check
2. Lint
3. Typecheck
4. Unit tests
5. Build
6. Duplicates check
7. Deadcode check

### `pnpm quality:ci`

Runs CI Quality Gate checks:

1. Format check
2. Lint
3. Typecheck
4. Unit tests with coverage
5. Build
6. Duplicates check
7. Deadcode check

### `pnpm quality:full`

Runs full local validation:

- `pnpm quality:ci`
- Playwright E2E

## GitHub Actions

### CI / Quality Gate

Runs on every push and PR to `main`/`master`:

1. ✅ Format check
2. ✅ Lint (includes security rules)
3. ✅ Typecheck
4. ✅ Unit tests with coverage
5. ✅ Build
6. ✅ Duplicates check
7. ✅ Deadcode check

**Does not run E2E.**

### Playwright E2E

Runs Playwright tests as a separate required workflow on PRs to `main`/`master`.

### Required branch protection checks

- Quality Gate
- Playwright E2E
- Gitleaks
- Semgrep SAST
- Dependency Audit

### Secret Scan (`.github/workflows/secrets.yml`)

Runs on every push and PR:

1. ✅ Gitleaks secret detection

### Semgrep (`.github/workflows/semgrep.yml`)

Runs on every push and PR:

1. ✅ Static code analysis (SAST)
2. ✅ Security vulnerability detection

**Note:** Semgrep CE is used instead of CodeQL for private repositories without GitHub Advanced Security.

### Dependency Audit (`.github/workflows/dependency-audit.yml`)

Runs on every push and PR:

1. ✅ Check for vulnerable dependencies
2. ✅ Fail on moderate+ severity

**Note:** Dependency Audit (`pnpm audit`) is used instead of Dependency Review for private repositories without GitHub Advanced Security.

## Dependabot

**Configuration:** `.github/dependabot.yml`

Automatically creates PRs for:

- npm package updates (weekly)
- GitHub Actions updates (weekly)

## Branch Protection (Recommended)

For production repositories, enable:

1. **Require status checks to pass:**
   - CI (Quality Gate)
   - Playwright E2E
   - Secret Scan (Gitleaks)
   - Semgrep SAST
   - Dependency Audit

2. **Require branches to be up to date**

3. **Require linear history**

4. **Do not allow bypassing**

## No Weakening Policy

Agents must not weaken checks to make CI green.

**Forbidden:**

- Removing tests instead of fixing code
- Lowering jscpd threshold without approval
- Removing `pnpm deadcode`
- Removing `pnpm duplicates`
- Disabling lint rules globally
- Removing Gitleaks/Semgrep/Dependency Audit
- Changing required GitHub checks without approval

**If a check fails, fix the cause, not the check.**

## Quality Standards

### Code Coverage

- Target: 80%+ (not enforced in Stage 0)
- Measured by Vitest

### Security

- No secrets in code (Gitleaks)
- No vulnerable dependencies (Dependabot + Dependency Audit)
- Static analysis (Semgrep CE)

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

### Duplicates check fails

- Review jscpd output
- Extract duplicated code to shared helpers/components
- If false positive, add to `.jscpd.json` ignore list with comment

### Deadcode check fails

- Remove unused files/exports/dependencies
- If false positive (e.g., used in config), add to `knip.json` ignoreDependencies with comment

## Code Quality Standards

### No Code Duplication

- Extract repeated logic to shared helpers
- Extract repeated UI to shared components
- Keep DRY (Don't Repeat Yourself)

### No Dead Code

- Remove unused files
- Remove unused exports
- Remove unused dependencies
- Keep codebase clean

### Security

- Follow eslint-plugin-security recommendations
- Do not disable security rules globally
- If false positive, disable specific rule with comment explaining why

## Stage 0 Status

✅ All quality gates implemented and passing
