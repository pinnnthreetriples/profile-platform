## Summary

Describe what changed and why.

## Scope

- [ ] This PR is limited to the requested stage/task.
- [ ] No unrelated refactoring.
- [ ] No stack changes.
- [ ] No new dependencies unless justified below.

## New dependencies

List new dependencies and explain why they are needed.

## Architecture

- [ ] Business logic is not placed directly in `page.tsx`.
- [ ] Server-only code uses `import "server-only"`.
- [ ] Private env vars are not imported into client components.
- [ ] Feature code follows `src/features/<feature>/` convention.

## Quality checks

Run locally before marking complete:

- [ ] pnpm format:check
- [ ] pnpm lint
- [ ] pnpm typecheck
- [ ] pnpm test:ci
- [ ] pnpm build
- [ ] pnpm duplicates
- [ ] pnpm deadcode
- [ ] pnpm test:e2e
- [ ] pnpm quality:full

## Security

- [ ] No secrets committed.
- [ ] No private env vars exposed to frontend.
- [ ] No payment confirmation on frontend.
- [ ] No disabled security checks.

## Testing notes

Explain what was tested.

## Known limitations

List any limitations or follow-up work.
