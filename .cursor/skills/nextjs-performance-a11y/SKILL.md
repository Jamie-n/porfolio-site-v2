---
name: nextjs-performance-a11y
description: >-
  Applies Next.js and React practices for performance, accessibility, and SEO on
  this portfolio site. Use when changing layout, adding UI components, images,
  links, or interactive elements.
disable-model-invocation: true
---

# Next.js performance + accessibility (best practices)

## UI quality bar (clean + crisp)

- Prefer **simple, consistent spacing** (use a small set of gaps/padding values repeatedly).
- Prefer **strong typographic hierarchy**:
  - One primary heading per section, consistent subhead sizes.
  - Avoid long lines; keep readable measure.
- Prefer **subtle, consistent affordances**:
  - One shadow style (or none), one border radius scale, consistent hover/focus.
- Avoid visual noise:
  - Don’t mix multiple border/shadow/gradient styles in the same screen.
  - Favor whitespace and alignment over decorative elements.

## Performance defaults

- Prefer **server components**; keep client components small and isolated.
- Avoid creating new client boundaries high in the tree (especially in `layout.tsx` or top-level page) unless necessary.
- Avoid unnecessary re-renders:
  - Keep props stable; avoid inline object/array literals passed deep into trees.
  - Use `useMemo`/`useCallback` only when it meaningfully reduces work.
- Keep heavy computation out of render paths; move to utilities and precompute where possible.

## Images and media

- Prefer `next/image` for local/static images where applicable.
- Always provide meaningful `alt` text (or empty `alt=""` only for purely decorative images).
- Avoid layout shift: define sizes or use responsive patterns that reserve space.

## Navigation + links

- Use `next/link` for internal navigation.
- Ensure anchor links (section navigation) have correct `href="#id"` and matching unique IDs.
- Keep focus/keyboard navigation intact (no click-only UI without keyboard equivalents).

## Accessibility checklist for interactive components

- Buttons must be `<button>` (not clickable `<div>`).
- Controls have:
  - Accessible name (text, `aria-label`, or `aria-labelledby`)
  - Correct role/state (`aria-expanded`, `aria-controls` for accordions/menus)
- Ensure visible focus states (Tailwind `focus-visible:*`).
- Respect reduced motion (`prefers-reduced-motion`) for animations.

## SEO + metadata

- Keep global metadata in `src/app/layout.tsx`.
- For route-level metadata, use `export const metadata = { ... }` or `generateMetadata` in the route file.

## Test-it mindset

- For any new component, confirm:
  - Keyboard access works
  - Screen reader naming makes sense
  - Layout doesn’t shift unexpectedly
