---
name: repo-tooling-hygiene
description: Keep this repo consistent with its tooling (ESLint, Prettier, Husky, lint-staged) and Next.js conventions. Use when adding dependencies, changing scripts, formatting, or preparing commits/PRs.
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

## File organization defaults

- App code stays under `src/app/`
- Prefer co-locating component modules in `src/app/components/` (and subfolders like `nav/`, `accordion/`, `display/`)
- Keep shared data in `src/app/data/` and pure helpers in `src/app/utilities/`

## “Good changes” checklist

- No unused exports / dead code added
- Types are explicit where it matters (public props, exported helpers)
- No new `"use client"` at high-level without a reason
- Tests updated when behavior changes
