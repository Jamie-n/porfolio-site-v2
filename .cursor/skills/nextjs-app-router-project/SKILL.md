---
name: nextjs-app-router-project
description: Create and refactor features in this repository’s Next.js 15 App Router setup. Use when adding routes/sections/components, changing navigation, or touching `src/app/` (especially the catch-all route `src/app/[[...slug]]/page.tsx`).
disable-model-invocation: true
---

# Next.js App Router (project conventions)

## Quick orientation (this repo)

- Main entry route is **catch-all**: `src/app/[[...slug]]/page.tsx`
  - `/`, `/about`, `/projects`, etc. render the same page layout.
  - “Navigation” is section-based (sidebar/anchors), not separate pages by default.
- Sections live in `src/app/sections/`
- Shared UI components live in `src/app/components/`
- Hooks/utilities/data live under `src/app/` (e.g. `hooks/`, `utilities/`, `data/`)

## Default workflow for changes

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

- Prefer Tailwind utilities in components.
- Keep `globals.css` for base styles, tokens, and resets only.
