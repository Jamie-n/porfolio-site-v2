# Next.js App Router (project conventions)

This repo is a **Next.js 15 App Router** project with a section-based single-page layout.

## What to know in this codebase

- Main entry route is a **catch-all**: `src/app/[[...slug]]/page.tsx`
  - `/`, `/about`, `/projects`, etc. render the same page layout.
  - Navigation is section-based (sidebar/anchors), not separate pages by default.
- Sections live in `src/app/sections/`
- Shared UI components live in `src/app/components/`
- Hooks/utilities/data live under `src/app/` (`hooks/`, `utilities/`, `data/`)

## How I keep changes consistent

- Read `docs/design-system.md` and align with the in-app styleguide: `src/app/components/StyleguideOverlay.tsx`
- Extend existing patterns before inventing new ones
- Prefer server components by default; only add client components when state/effects/events are required
