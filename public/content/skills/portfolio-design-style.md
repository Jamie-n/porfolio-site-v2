# Portfolio design style

The visual language is **print/editorial brutalism**: structure-first composition, hairline rules, type-led hierarchy, restrained accent color, and crisp motion.

## How I keep it consistent

- The **written spec** lives in `docs/design-system.md`.
- The **empirical source of truth** is the in-app styleguide: `src/app/components/StyleguideOverlay.tsx` — live demos, hierarchy (`StyleguideChapter` → `StyleguideSection`), and recipes beat ad-hoc markup.
- Tokens (`--background`, `--foreground`, `--surface`, `--muted`, `--border`, `--accent`, `--accent-weak`, `--ring`) are defined in `src/app/globals.css` and mapped via Tailwind.

## Components and content blocks

- **Componentise:** build UI from reusable **building blocks** and **content blocks** (named components in `src/app/components/` or shared primitives), not one-off copies in sections.
- **New content blocks** ship with a **styleguide recipe** in the same change: add a section (or clear subsection) in the overlay so the catalog stays ordered and discoverable.

## Working rules

- Build hierarchy with **type, rules, and spacing** before adding new colors.
- Reuse `bru-*` typography utilities and `bru-panel` for surfaces.
- Use `bru-divide-y` / `--rule-solid` for stacked rows on gridded panels.
- Hover is a **1px nudge** plus border/accent emphasis (no heavy fades).
- Always preserve a visible `:focus-visible` ring; respect `prefers-reduced-motion`.

## Don't accidentally break the look

- Avoid: glass blur, soft multi-layer shadows, large radii/pill buttons, glossy gradients, colorful badge clouds.
- Prefer: rectangles, rules, mono metadata, uppercase tracked labels, subtle accent wash, crisp 1px hover nudges.
