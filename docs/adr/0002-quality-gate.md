# ADR 0002 — Quality Gate

## Status

Accepted

## Decision

Every PR must pass:

- Quality Gate
- Playwright E2E
- Gitleaks
- Semgrep SAST
- Dependency Audit

Quality Gate includes:

- format check
- lint
- typecheck
- unit tests with coverage
- build
- duplicates check
- deadcode check

## Reason

The project is developed through multiple AI coding sessions. Automated checks are required to prevent regressions, duplicated code, dead code, secrets, and vulnerable dependencies.

## Rules

1. Do not weaken checks to make CI green.
2. Do not remove required checks.
3. If a check fails, fix the root cause.
4. Any change to quality tools must be documented.
