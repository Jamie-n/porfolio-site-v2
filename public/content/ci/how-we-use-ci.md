# How I use CI on this project

CI exists to **protect the quality bar** when changes land: it catches obvious breakage early and keeps the baseline consistent.

## What CI is for

- **Fast feedback** on the “must not break” layer:
  - formatting
  - linting
  - typechecking (where applicable)
  - unit/component tests
  - build validation (`next build`)
- **Consistency** across machines (the same checks run the same way for every change).

## What CI is not (on purpose)

- It’s not a replacement for **human review** (design, UX, copy, interaction feel).
- It doesn’t guarantee correctness—only that the agreed checks pass.
- For this portfolio, **E2E tests are a local tool first**: run them when interaction changes, but don’t force them into every CI run unless the project needs that cost/complexity.

## How it fits the build loop

- **Plan** the change with clear “done” criteria.
- **Execute** the smallest slice that matches the existing patterns.
- **Test** locally while building, then let CI confirm the baseline.
- **Refine** once the basics are safe, and iterate.
