# Repo tooling + hygiene

The goal is simple: **keep the repo easy to work in and hard to break**. Tooling is there to catch basics early (formatting, lint, tests) and keep changes consistent.

## Working defaults

- **npm** for package management; keep `package-lock.json` in sync.
- Prefer minimal dependency additions; remove unused deps when they appear.
- Keep app code under `src/app/` with a clear split:
  - `components/` for reusable UI
  - `sections/` for page sections
  - `data/` for typed static content
  - `utilities/` for pure helpers

## Local checks I rely on

- Dev: `npm run dev`
- Lint: `npm run lint`
- Unit tests: `npm run test` (plus watch/coverage as needed)
- E2E tests: `npm run test:e2e` (run locally when interaction changes)

## Guardrails

- Prefer fixing root causes over silencing warnings.
- If a suppression is genuinely necessary, keep it narrow and intentional.
- Avoid large “drive-by” reformatting unless it’s part of the goal (diffs stay reviewable).
