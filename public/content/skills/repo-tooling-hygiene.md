# Repo tooling + hygiene

The goal is simple: **keep the repo easy to work in and hard to break**. Tooling is there to catch basics early (formatting, lint, tests) and keep changes consistent.

## Working defaults

- Use a single package manager and keep the lockfile in sync.
- Prefer minimal dependency additions; remove unused deps when they appear.
- Keep app code organized with a clear split between reusable UI, page sections, typed content, and pure helpers.

## Local checks I rely on

- Development server for fast feedback
- Linting + formatting to keep the baseline consistent
- Unit/component tests for behavior checks
- End-to-end tests when interaction changes

## Guardrails

- Prefer fixing root causes over silencing warnings.
- If a suppression is genuinely necessary, keep it narrow and intentional.
- Avoid large “drive-by” reformatting unless it’s part of the goal (diffs stay reviewable).
