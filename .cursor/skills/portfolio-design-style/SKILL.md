---
name: portfolio-design-style
description: >-
  Applies this portfolio’s visual language using the in-app styleguide
  (`StyleguideOverlay.tsx`) plus refined brutalism and print/editorial
  principles. Use when styling or building UI in `src/app/`, changing
  `globals.css` or `tailwind.config.ts`, polishing sections/components, or
  when the user mentions the styleguide, brutalist style, print design, or
  visual consistency.
disable-model-invocation: true
---

# Portfolio design style

## Source of truth: the styleguide

**Before shipping UI changes, align with the live styleguide** in `src/app/components/StyleguideOverlay.tsx`. It is the canonical catalog of tokens, recipes, and component demos. Prefer matching its patterns over inventing new ones.

The overlay documents these areas (read the corresponding sections in code when implementing):

- **Motifs** — grain, grid, halftone, registration marks, background numerals.
- **Tokens** — CSS variables and how they read in light/dark.
- **Typography recipes** — `bru-label`, `bru-prose`, accordion title/meta, etc.
- **Interaction** — focus, hover, disabled patterns.
- **Typography scale** — heading/body steps used across the site.
- **Color & contrast** — foreground/muted/accent usage.
- **Spacing & layout rhythm** — grid alignment and spacing steps.
- **Navigation states** — sidebar / nav item behavior.
- **Form controls** — toggles, inputs, accordions as shown.
- **Panels & elevation** — `bru-panel`, shadows, borders.
- **Motion** — entrance timing and reduced motion.
- **Iconography** — stroke weight and sizing.
- **Content patterns** — lists, links, metadata rows (`Row`-style label/value).
- **Section break patterns** — spacers, swatches, crosshair, meta lines.
- **Components** — composed examples.

**Primitives used by the styleguide:** section titles use `bru-label`; demo blocks use `StyleguidePanel` → `bru-panel` with consistent padding (`px-6 py-5`). New styleguide-worthy demos should follow the same primitives.

---

## Brutalist principles (refined)

Apply **structure and honesty**, not decoration for its own sake.

- **Exposed structure**: Prefer visible layout logic—borders, grids, clear rectangular regions—over soft “mystery” cards. Sharp or minimally rounded corners unless an existing control family uses otherwise.
- **Limited palette**: Neutral foreground/surface/border plus **one accent** (`--accent`, red). Use weight, case, and spacing for hierarchy before adding new hues.
- **Functional chrome**: Focus rings, scrollbars, and dividers are part of the design; do not hide focus to “clean up” the UI.
- **Typography as architecture**: Uppercase tracked labels, mono for specs/metadata, strong weight steps—brutalism here is **legibility and rhythm**, not shouty type.
- **Restraint on effects**: Grain and grid are atmospheric; use **one** dominant texture per region. Avoid stacking noise + halftone + heavy shadows in the same small panel.

---

## Print / editorial principles

Treat the page like **print layout** adapted for the web.

- **Registration & press cues**: Use existing motifs (`reg-marks`, halftone, spacer swatches, crosshair) where sections already establish that language; keep them aligned to the grid and subtle enough to read as craft, not clutter.
- **Rules and folios**: Think in **hairlines and rules** (`var(--border)`, `--rule-solid`, `bru-divide-y`) for separation. Small meta lines (mono, wide tracking) behave like **folio / slug** lines on a sheet.
- **Label vs body**: Eyebrows and captions are **caption-sized, tracked, often uppercase**; body copy uses `bru-prose` / `bru-prose-muted` for comfortable measure and line height.
- **Plate-based sections**: Major blocks read as **plates** (panels, spacers between chapters). Reuse `section-spacer` and panel patterns when adding new chapters so the scroll feels like turning spreads in a single publication.
- **Background type as form**: Large stroked/ghost numerals (`bg-text`) are **structural graphics**, not competing headlines—keep content hierarchy above them in z-order and contrast.

---

## Theme and implementation (summary)

- **Theme-first**: Color from `:root` / `.dark` variables; Tailwind colors in `tailwind.config.ts` map to those tokens.
- **Surfaces**: `bru-panel` (48px grid, border, rule shadow); `bru-divide-y` on stacks over grids; page `grain` on `body`.
- **Motion**: `animate-enter` / delays in `globals.css`; always respect **`prefers-reduced-motion`**.
- **New tokens**: extend `globals.css`, then Tailwind if needed; prefer **`color-mix(in oklab, var(--foreground) …)`** for translucent UI.

---

## Quick checklist

- [ ] Checked **StyleguideOverlay** for the closest existing recipe and matched spacing, type, and panel patterns.
- [ ] Brutalist: structure and type carry hierarchy; accent used with restraint; no gratuitous new colors or stacked textures.
- [ ] Print: rules, meta typography, and section breaks feel consistent with existing spacers and motifs.
- [ ] Theme CSS variables / existing Tailwind token names; `bru-*` text utilities where appropriate.
- [ ] Dividers on gridded stacks use `bru-divide-y` / `--rule-solid` where relevant.
- [ ] Motion respects reduced motion; focus and selection remain visible and on-brand.

---

## Testing convention (unit tests)

- **Location**: Unit tests live under `src/test/` (not alongside components).
- **Mirrored paths**: The test path mirrors the source path inside `src/`.
  - Example: `src/app/components/nav/NavItem.tsx` → `src/test/app/components/nav/NavItem.test.tsx`
- **Imports**: Prefer `@/…` imports (alias to `src/`) so tests are location-agnostic.
