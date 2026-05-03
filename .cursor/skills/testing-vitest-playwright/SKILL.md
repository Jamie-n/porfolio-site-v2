---
name: testing-vitest-playwright
description: >-
  Adds or updates tests using Vitest, Testing Library, and Playwright in this
  repository. Use when writing unit or component tests, updating test setup, or
  debugging failures from npm run test or npm run test:e2e.
disable-model-invocation: true
---

# Testing (Vitest + Testing Library + Playwright)

## What this repo uses

- Unit/component tests: **Vitest** (`npm run test`, `npm run test:watch`, `npm run test:coverage`)
- E2E tests: **Playwright** (`npm run test:e2e`, `npm run test:e2e:ui`)

## Vitest guidelines

- Prefer Testing Library patterns:
  - Query by accessible role/name (`getByRole`, `findByRole`)
  - Avoid brittle selectors (class names, deep DOM structure)
- Test behavior, not implementation:
  - User-visible text/state changes
  - Keyboard/mouse interactions
- For async UI, use `findBy*` and `await`.

## Mocking rules

- Prefer mocking **boundaries** (network, time, browser APIs) rather than internal helpers.
- Keep mocks local to the test file when possible.
- Avoid global shared mutable state across tests; reset between tests.

## Playwright guidelines

- Use user-facing selectors:
  - `getByRole`, `getByText`, `getByLabel`
- Keep tests resilient:
  - Wait on UI state, not timeouts
  - Avoid fixed sleeps
- If a test needs IDs, add stable `data-testid` sparingly (prefer roles/labels).

## Debug workflow for failures

1. Run the narrowest command:
   - `npm run test -- <pattern>` (Vitest) or Playwright test filtering
2. Identify if it’s:
   - Environment/setup issue
   - Flaky timing
   - Real regression
3. Fix by making the app behavior deterministic; only then adjust tests.
