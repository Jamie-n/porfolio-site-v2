# Next.js App Router (project conventions)

This repo is a **Next.js 15 App Router** project with a section-based single-page layout.

## What to know in this codebase

- The main route is a **catch-all** so `/`, `/about`, `/projects`, etc. render the same page layout.
  - Navigation is section-based (sidebar/anchors), not separate pages by default.
- Sections, shared UI components, and utilities are separated so the layout stays simple and features stay modular.

## How I keep changes consistent

- Align with the written design spec and the in-app styleguide
- Extend existing patterns before inventing new ones
- Prefer server components by default; only add client components when state/effects/events are required
