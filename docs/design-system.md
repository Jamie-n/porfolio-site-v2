# Design system - minimalist brutalism

**One sentence:** This portfolio uses **print/editorial brutalism** - exposed grids and rules, strong typography, high-contrast neutrals, one red accent, and crisp motion - so every screen reads like part of the same publication.

---

## Who this doc is for

| Audience          | How to use this                                                                                                                                            |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Humans**        | Read [Overview](#overview) and [Visual language](#visual-language); open the in-app styleguide from the sidebar (“Styleguide”) for live examples.          |
| **Coding agents** | Follow [Agent rules (mandatory)](#agent-rules-mandatory) and [Workflow](#workflow); treat paths under [Canonical files](#canonical-files) as ground truth. |

---

## Table of contents

1. [Canonical files](#canonical-files)
2. [Overview](#overview)
3. [Agent rules (mandatory)](#agent-rules-mandatory)
4. [Visual language](#visual-language)
5. [Tokens](#tokens)
6. [Typography](#typography)
7. [Motion and accessibility](#motion-and-accessibility)
8. [Recipes and styleguide](#recipes-and-styleguide)
9. [Workflow](#workflow)
10. [Ship checklist](#ship-checklist)

---

## Canonical files

These paths define what “on-brand” means in code:

| Role                              | Path                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| Live demos + recipes              | [`src/app/components/StyleguideOverlay.tsx`](../src/app/components/StyleguideOverlay.tsx) |
| CSS variables + `bru-*` utilities | [`src/app/globals.css`](../src/app/globals.css)                                           |
| Tailwind ↔ token mapping         | [`tailwind.config.ts`](../tailwind.config.ts)                                             |
| Written spec (this doc)           | [`docs/design-system.md`](design-system.md)                                               |

**Order of authority when implementing:** Styleguide overlay (behavior + composition) → `globals.css` / `tailwind.config.ts` → this document for intent and process.

---

## Overview

We aim for:

- **Structure over decoration:** Borders, grids, and alignment do the heavy lifting - not soft shadows or gradients.
- **Limited palette:** Neutrals plus **one accent** (red). Hierarchy comes from weight, case, tracking, and rules before adding new hues.
- **Typography as layout:** Labels are tracked and often uppercase; body copy stays readable with editorial line length.
- **Honest chrome:** Focus rings, dividers, and scrollbars are part of the design - never hidden for aesthetics alone.

Reference mood (Swiss / neo-brutalist posters): strong grids, vertical metadata, occasional halftone/grain - implemented subtly so readability stays first.

---

## Agent rules (mandatory)

Use this section as a compact instruction block for automation.

1. **Do not** introduce glass blur, heavy gradients, rounded-pill primary buttons, glossy cards, or rainbow badge strips unless explicitly overridden by a maintainer.
2. **Do** use theme tokens (`background`, `surface`, `foreground`, `muted`, `border`, `accent`, `ring`) via CSS variables / Tailwind mappings - avoid raw hex for UI chrome.
3. **Do** prefer existing **`bru-*`** classes (`bru-panel`, `bru-label`, `bru-h1` …) over ad-hoc font-size/letter-spacing stacks.
4. **Do** use **`bru-divide-y`** / **`--rule-solid`** for stacked rows on gridded panels (reduces moiré vs translucent borders on grids).
5. **Do** match hover/focus patterns from [`StyleguideOverlay.tsx`](../src/app/components/StyleguideOverlay.tsx): ~150–200ms `ease-out`, 1px hover nudge where appropriate, visible `:focus-visible` ring.
6. **Do** respect **`prefers-reduced-motion`** (global rules live in `globals.css`).
7. **Gap-fill:** If a pattern does not exist in the styleguide overlay, **add a recipe there first**, then ship the feature using that recipe.

---

## Visual language

### Motifs (use as structure, not clutter)

- **Rule-first composition:** Hairline borders + labeled headers; separation via rules, not only whitespace.
- **Grid overlays:** Light 1px grids on panels (`bru-panel`, `grid-overlay`) - low contrast.
- **Vertical labels / indices:** Sparingly - section index, years, “NOW”, folio-style metadata.
- **Display type:** Uppercase, tight tracking, high contrast - no gradient text or soft glow.
- **Echo headline (optional):** Solid + outline + faint repeat - only if documented in the styleguide.
- **Texture:** Global grain is subtle; avoid stacking grain + halftone + dense borders in one small region.

### Non-negotiables

**Do**

- Build hierarchy with type, rules, and spacing.
- Reserve red accent for interaction and a few focal moments.

**Don’t**

- Default to SaaS patterns (floating blurred panels, oversized radius, pastel rainbow tags).

---

## Tokens

Defined in `:root` / `.dark` in [`globals.css`](../src/app/globals.css), exposed to Tailwind via [`tailwind.config.ts`](../tailwind.config.ts).

**Core**

- `--background`, `--foreground`, `--surface`, `--muted`, `--border`
- `--accent` (red), `--accent-weak`, `--ring`

**Structure / texture**

- `--grid`, `--grain-opacity`, `--rule-solid`, `--shadow-1`
- `--swatch-1` … `--swatch-4` (print-style spacer marks)

**Usage**

- Prefer `bg-background`, `text-muted`, `border-border`, etc., over hard-coded neutrals.
- On gridded stacks, prefer **`bru-divide-y`** (uses `--rule-solid`).

---

## Typography

Primary system: **`bru-*`** utilities in `globals.css`.

- **Display / section titles:** `bru-h1`, `bru-h2`, `bru-h3`
- **Eyebrows / metadata:** `bru-label`, `bru-acc-meta`
- **Body:** `bru-body`, `bru-body-muted`, `bru-prose`, `bru-prose-muted`
- **Accordions:** `bru-acc-title`, `bru-acc-subtitle`

**Humans:** Open the Styleguide overlay → _Typography scale_ and _Typography recipes_ for side-by-side examples.

**Agents:** Reuse these class names; do not duplicate the same clamp/tracking/leading in JSX unless extending the system in `globals.css`.

---

## Motion and accessibility

- **Timing:** Default **150–200ms**, `ease-out` for interactive feedback.
- **Hover:** Prefer **1px translate** + border/accent emphasis over long opacity fades.
- **Focus:** `:focus-visible` uses `--ring`; keep keyboard paths usable.
- **Reduced motion:** Honor `prefers-reduced-motion` (animations/transitions shortened globally).

---

## Recipes and styleguide

The [**Styleguide overlay**](../src/app/components/StyleguideOverlay.tsx) is the **living catalog**: tokens, type scale, panels, nav states, accordions, forms, motion demos, section-break patterns.

**Minimum recipes** (extend the overlay when adding new patterns):

- Link / button-like control
- Panel / card (border-led)
- Nav item (default / hover / active)
- Accordion row
- Tag / label chip
- Table or index row (rules)
- Modal / drawer (focus trap + Esc)
- Inputs (text, textarea, select)

**Motif recipes** (add when first used in product UI):

- Poster grid overlay block
- Vertical label
- Echo headline
- Rule-first section header

Every recipe should show **default, hover, focus** (and disabled when relevant).

---

## Workflow

1. Find the closest match in **`StyleguideOverlay.tsx`**.
2. If missing, **add** a subsection demo there (tokens + spacing + states).
3. Implement production UI using the same classes and spacing rhythm.
4. Verify **light + dark**, **keyboard-only**, and **reduced motion**.

---

## Ship checklist

- [ ] Tokens only - no stray hex/rgb for theme chrome.
- [ ] Rule-first layout; `bru-divide-y` where stacks sit on grids.
- [ ] `bru-*` typography (or intentional extension in `globals.css`).
- [ ] Focus-visible visible; interactive targets usable with keyboard.
- [ ] Motion crisp; respects reduced motion.
- [ ] New pattern documented in styleguide overlay **before** or **with** first use.

---

_Maintainers: keep this file and the styleguide overlay in sync when changing tokens or introducing new motifs._
