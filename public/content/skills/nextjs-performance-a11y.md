# Next.js performance + accessibility

This site aims for **fast, readable, keyboard-friendly UI** by default: server-first rendering, small client boundaries, and interaction patterns that keep focus + semantics intact.

## Performance defaults I follow

- Prefer **server components**; introduce `"use client"` only when state/effects/browser APIs are actually needed.
- Keep client components **small and isolated** (avoid pushing client boundaries high up the tree).
- Avoid unnecessary re-renders: keep props stable and heavy work out of render paths.
- For media, avoid layout shift by reserving space and using appropriate image patterns (with meaningful `alt`).

## Accessibility checklist for interactive UI

- Use real controls (`<button>`, `<a>`, `<input>`) rather than clickable `<div>`s.
- Ensure every control has an **accessible name** (visible text, `aria-label`, or `aria-labelledby`).
- Use the right states (`aria-expanded`, `aria-controls`, etc.) for disclosure/menus.
- Maintain visible `:focus-visible` styles and keep keyboard navigation predictable.
- Respect `prefers-reduced-motion` for animation.

## Quick “done” checks

- Keyboard-only use works end-to-end (Tab order, Escape, Enter/Space).
- Headings and landmarks make sense for scanning.
- No obvious layout shift on load/interaction.
