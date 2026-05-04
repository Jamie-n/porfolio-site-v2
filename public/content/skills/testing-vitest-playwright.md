# Testing (Vitest + Playwright)

This repo uses two layers of automated tests:

- **Unit / component tests** with Vitest + Testing Library
- **End-to-end tests** with Playwright

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

- Use user-facing selectors: `getByRole`, `getByText`, `getByLabel`.
- Wait on UI state, not timeouts; avoid fixed sleeps.
- If a test needs IDs, add stable `data-testid` sparingly (prefer roles/labels).

## Debug workflow for failures

1. Run the narrowest scope (a single test file, a filtered test, or a single spec).
2. Identify if it's an environment/setup issue, flaky timing, or a real regression.
3. Fix by making the app behavior deterministic; only then adjust tests.
