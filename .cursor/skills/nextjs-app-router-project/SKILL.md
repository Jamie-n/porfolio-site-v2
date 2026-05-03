---
name: nextjs-app-router-project
description: >-
  Creates and refactors features in this repository's Next.js 15 App Router setup.
  Before coding, reads docs/ (especially docs/design-system.md), mirrors existing
  patterns in src/app/, and treats StyleguideOverlay as the empirical catalog for
  new content blocks (componentised building blocks). Use when adding routes,
  sections, or components; changing navigation; or editing src/app/ (especially
  the catch-all route src/app/[[...slug]]/page.tsx).
disable-model-invocation: true
---

# Next.js App Router (project conventions)

## Before you change code (required)

1. **Read project docs first** — Start with [`docs/README.md`](docs/README.md). For UI work, read [`docs/design-system.md`](docs/design-system.md) and align with the live styleguide (`src/app/components/StyleguideOverlay.tsx`), which is the **empirical** catalog of blocks and recipes (not optional for new content blocks).
2. **Ground decisions in existing code** — Find similar features (sections, components, hooks) and match their structure, naming, imports, and styling conventions. Prefer extending what exists over inventing parallel patterns.
3. **Do not guess** — If something is unclear (routing behavior, data shape, design rule, env vars), **search/read the codebase** or **ask the user**. Unknowns are not an excuse to assume defaults from “typical Next.js apps.”

## Quick orientation (this repo)

- Main entry route is **catch-all**: `src/app/[[...slug]]/page.tsx`
  - `/`, `/about`, `/projects`, etc. render the same page layout.
  - “Navigation” is section-based (sidebar/anchors), not separate pages by default.
- Sections live in `src/app/sections/`
- Shared UI components live in `src/app/components/`
- Hooks/utilities/data live under `src/app/` (e.g. `hooks/`, `utilities/`, `data/`)

## Default workflow for changes

0. Completed **[Before you change code](#before-you-change-code-required)** (docs + existing patterns + no guessing).
1. Identify whether the change is:
   - **Section content/layout** → edit/add `src/app/sections/*`
   - **Reusable UI** → edit/add `src/app/components/*`
   - **Cross-cutting behavior** (scroll spy, theme, etc.) → `src/app/hooks/*` or `src/app/utilities/*`
2. Keep “page shell” responsibilities in `src/app/layout.tsx` and the catch-all page; push everything else into sections/components.
3. Prefer server components by default; add `"use client"` only when needed for state/effects/events.

## Component philosophy (important)

- **Favor existing components** before adding new ones.
  - Search `src/app/components/` for something close; extend it if the extension benefits multiple places.
- **Favor generic components** that can be composed into specific UI.
  - Prefer “primitives” like `Section`, containers, typography wrappers, anchors/links, and small interactive building blocks.
  - Avoid one-off components that hardcode content or a single page’s layout unless it truly won’t be reused.
- **Componentise with reusable content blocks:** treat repeated or sharable compositions as named components (clear props, single responsibility) so sections assemble from **building blocks** rather than bespoke markup. See the **`portfolio-design-style`** skill for brutalist rules and the mandatory styleguide workflow.
- **Styleguide is the empirical source of truth:** any **new content block** or new visual pattern needs a **live demo** in `src/app/components/StyleguideOverlay.tsx`, placed under the correct `StyleguideChapter` → `StyleguideSection` so the catalog keeps a **definitive hierarchy**. Add the styleguide entry in the same work that introduces the block.
- **Keep components single-purpose**:
  - Layout primitives should not fetch data.
  - Data modules should not depend on React.
  - Client components should focus on interaction; server components on composition.

## Routing rules (important)

- Do **not** create new routes for new sections unless you explicitly want a separate page.
- If you need a real separate page/route:
  - Add a new `src/app/<route>/page.tsx`
  - Ensure the section/sidebar logic still behaves as intended (don’t break the catch-all page)

## Client vs server components

Use a client component only when you need one of:

- React state (`useState`, `useReducer`)
- Effects (`useEffect`, `useLayoutEffect`)
- Browser-only APIs (`window`, `document`, `localStorage`, `IntersectionObserver`)
- Event handlers (onClick, onChange, etc.)

Otherwise:

- Prefer server components for rendering and composition.
- Pass data down as props; keep client components small.

## Data and constants

- Keep static lists (skills, experiences, etc.) in `src/app/data/` as typed exports.
- Keep pure helpers in `src/app/utilities/` and ensure they are side-effect free.

## Styling

- Follow **[`docs/design-system.md`](docs/design-system.md)** and the **`portfolio-design-style`** skill for brutalist UI rules; implement against recipes in `StyleguideOverlay.tsx`.
- Prefer Tailwind utilities in components (mapped tokens from `tailwind.config.ts`).
- Keep `globals.css` for base styles, tokens, and shared utilities (`bru-*`).
