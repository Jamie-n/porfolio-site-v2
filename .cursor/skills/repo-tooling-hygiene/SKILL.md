---
name: repo-tooling-hygiene
description: >-
  Keeps this repository aligned with ESLint, Prettier, Husky, lint-staged, and
  Next.js conventions. Use when adding dependencies, changing npm scripts,
  formatting code, or preparing commits or pull requests.
disable-model-invocation: true
---

# Repo hygiene + tooling (project practices)

## Package management

- Use npm and keep `package-lock.json` in sync with `package.json`.
- Prefer minimal dependency additions; remove unused dependencies.

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
