# Portfolio design style

The visual language is **print/editorial brutalism**: structure-first composition, hairline rules, type-led hierarchy, restrained accent color, and crisp motion.

## How I keep it consistent

- I keep a **written spec** (rules, type scale, spacing rhythm) and an **in-app styleguide** (live demos + recipes). The living version wins whenever docs and reality drift.
- Design tokens cover color, surfaces, borders, accent, and focus rings - and everything maps back to those tokens.

## Components and content blocks

- **Componentise:** build UI from reusable **building blocks** and **content blocks** (named components or shared primitives), not one-off copies in sections.
- **New content blocks** ship with a **styleguide recipe** in the same change: add a section (or clear subsection) in the overlay so the catalog stays ordered and discoverable.

## Working rules

- Build hierarchy with **type, rules, and spacing** before adding new colors.
- Reuse the site’s existing typography and surface patterns instead of inventing one-offs.
- Use hairline rules to separate stacked rows on gridded panels.
- Hover is a **1px nudge** plus border/accent emphasis (no heavy fades).
- Always preserve a visible focus ring; respect reduced-motion preferences.

## Don't accidentally break the look

- Avoid: glass blur, soft multi-layer shadows, large radii/pill buttons, glossy gradients, colorful badge clouds.
- Prefer: rectangles, rules, mono metadata, uppercase tracked labels, subtle accent wash, crisp 1px hover nudges.
