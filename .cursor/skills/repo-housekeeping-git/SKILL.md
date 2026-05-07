---
name: repo-housekeeping-git
description: >-
  Keeps this repository aligned with ESLint, Prettier, Husky, lint-staged, and
  Next.js conventions, and outlines git/commit/PR “house style”. Use when doing
  housekeeping (dependencies, scripts, tooling, formatting), interacting with
  git (branches, worktrees, staging, rebases, merges), writing commit messages,
  or preparing pull requests.
---

# Repo hygiene + tooling (project practices)

## Git: day-to-day workflow (house style)

- Prefer short-lived branches named like:
  - `fix/<slug>` for bugfixes
  - `feat/<slug>` for features
  - `chore/<slug>` for tooling/docs/refactors (non-user-facing)
- Use **git worktrees** when you need parallel efforts without context-switching the main working directory.
- Before any commit/PR housekeeping, always check:
  - `git status -sb`
  - `git diff` (unstaged) and `git diff --staged` (staged)
  - recent context with `git log -10 --oneline`
- Keep commits small and coherent; avoid “grab-bag” commits.
- Avoid force pushes unless the user explicitly requests it (and never to shared branches by default).

## Commit messages (house style)

Default to **Conventional Commits** to match existing history (e.g. `fix: ...`, `chore(deps): ...`, `refactor(data): ...`).

### Format

Use:

`<type>(<scope>): <summary>`

- **type**: `feat` | `fix` | `chore` | `refactor` | `test` | `docs` | `ci`
- **scope** (optional): a short area like `data`, `deps`, `nav`, `tests`, `ci`
- **summary**: imperative, present tense; start lowercase; no trailing period
- If relevant, append the PR/issue reference at the end: `(#123)` or `(issue #123)`

### Examples (aligned with this repo)

- `fix: align tailwind config for vercel build`
- `chore(deps): bump next from 15.1.4 to 16.2.4`
- `refactor(data): centralise portfolio copy in typed data modules`
- `fix(nav): prevent mobile overflow in header layout (#43)`

### What to avoid

- Vague summaries like “cleanup”, “wip”, “changes”
- Mixing unrelated concerns (e.g. dependency bump + UI change) in one commit

## Package management

- Use npm and keep `package-lock.json` in sync with `package.json`.
- Prefer minimal dependency additions; remove unused dependencies.
  - If changing dependencies, ensure the lockfile reflects exactly those changes (no drive-by lock churn).

## Scripts (what to run)

- Dev: `npm run dev`
- Lint: `npm run lint`
- Unit tests: `npm run test` / `npm run test:watch` / `npm run test:coverage`
- E2E tests: `npm run test:e2e` / `npm run test:e2e:ui`

## Formatting and linting

- This repo uses **Prettier** and **ESLint**.
- Expect **Husky + lint-staged** to run formatting/linting on commit.
- When changing many files, run format/lint before finalizing.
- **Do not treat warning suppression as design**:
  - Avoid “fixing” problems with `// eslint-disable-next-line`, `/* eslint-disable */`, `@ts-ignore`, `@ts-expect-error`, or similar.
  - If suppression is truly necessary, keep it **narrow**, document the reason in-place, and prefer refactoring to remove the underlying issue.

## File organization defaults

- App code stays under `src/app/`
- Prefer co-locating component modules in `src/app/components/` (and subfolders like `nav/`, `accordion/`, `display/`)
- Keep shared data in `src/app/data/` and pure helpers in `src/app/utilities/`

## “Good changes” checklist

- No unused exports / dead code added
- Types are explicit where it matters (public props, exported helpers)
- No new `"use client"` at high-level without a reason
- Tests updated when behavior changes

## Pull request housekeeping (when applicable)

- PRs should have:
  - **Summary**: what/why in 1–3 bullets
  - **Test plan**: how you verified it (commands run, manual checks)
- Keep PRs focused; if changes are orthogonal, split them into separate PRs/commits.
