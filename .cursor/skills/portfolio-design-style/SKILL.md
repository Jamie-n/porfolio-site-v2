---
name: portfolio-design-style
description: >-
  Applies this portfolio’s visual language using `docs/design-system.md`
  and the in-app styleguide (`StyleguideOverlay.tsx`) as the empirical
  source of truth. Enforces componentised building blocks and content blocks,
  mandatory styleguide recipes for new blocks, and a clear chapter/section
  hierarchy. Use when styling UI in `src/app/`, changing `globals.css` or
  `tailwind.config.mjs`, polishing sections/components, or when the user
  mentions the styleguide, design system, content blocks, brutalist style,
  print design, or visual consistency.
disable-model-invocation: true
---

# Portfolio design style

## Source of truth: the styleguide

**The live styleguide in `src/app/components/StyleguideOverlay.tsx` is the empirical source of truth** for this site: how blocks look, compose, and behave (spacing, type, states, motion). Read `docs/design-system.md` for intent and vocabulary, but **implement and validate against the overlay**. If prose and the overlay disagree, fix the drift (usually by updating the styleguide and/or the doc) - do not ship UI that only exists outside the styleguide.

**Before shipping UI changes, align with the styleguide.** Prefer matching documented recipes over inventing new ones.

### Componentize: building blocks and content blocks

- **Componentise the system by default:** favor small, reusable **building blocks** (primitives, panels, type bands, metadata rows, cards, section headers, list treatments) over long one-off JSX in section files.
- **Content blocks** are reusable compositions meant for real page content (not only chrome). Implement them as named components under `src/app/components/` (or shared primitives used by sections) with clear props so the same block can be dropped into multiple contexts.
- **Extract** repeated markup into components early; if a pattern might be reused, treat it as a block - not a copy-paste variant.

### Authority and source material (do not reinterpret)

- The brutalist design direction is defined in `[docs/design-system.md](docs/design-system.md)`.
- The reference posters (Swiss/brutalist print layout, grid overlays, big type, rules, vertical labels) are _already_ encoded into the site via tokens + motifs + styleguide demos. The job is to **extend consistently**, not “modernize” into a generic SaaS look.
- When this skill conflicts with ad-hoc styling, **this skill wins**.

### Don’t guess

- Read **`docs/design-system.md`** and **`StyleguideOverlay.tsx`** before inventing classes or motifs.
- Find the closest existing component/pattern in `src/app/` and mirror it; if unclear, search the codebase or ask - **do not** fill gaps with generic UI defaults.

### Gap-filling policy (how we prevent styling drift)

- If a new feature needs a UI pattern, token use, or **content block** that is not represented in the styleguide overlay:
  - **Add a live recipe to `StyleguideOverlay.tsx` first** (tokens + spacing + interaction states + `prefers-reduced-motion`), placed in the correct place in the hierarchy (see below).
  - Then build the feature by importing and composing that block (or matching its recipe exactly).

### Styleguide structure (definitive hierarchy)

- The overlay must stay a **clear, navigable tree**: use **`StyleguideChapter`** → **`StyleguideSection`** so readers scan top-to-bottom from foundations → surfaces/motifs → interaction → patterns → app shell.
- **New content blocks and new recipes** get their own **`StyleguideSection`** (or a clearly named subsection inside the closest existing section) - do not bury unrelated demos inside an arbitrary panel.
- Keep section titles descriptive and stable; match the ordering and grouping spirit of existing chapters when you extend the file.

The overlay documents these areas (read the corresponding sections in code when implementing):

- **Motifs** - grain, grid, halftone, registration marks, background numerals.
- **Tokens** - CSS variables and how they read in light/dark.
- **Typography recipes** - `bru-label`, `bru-prose`, accordion title/meta, etc.
- **Interaction** - focus, hover, disabled patterns.
- **Typography scale** - heading/body steps used across the site.
- **Color & contrast** - foreground/muted/accent usage.
- **Spacing & layout rhythm** - grid alignment and spacing steps.
- **Navigation states** - sidebar / nav item behavior.
- **Form controls** - toggles, inputs, accordions as shown.
- **Panels & elevation** - `bru-panel`, shadows, borders.
- **Motion** - entrance timing and reduced motion.
- **Iconography** - stroke weight and sizing.
- **Content patterns** - lists, links, metadata rows (`Row`-style label/value).
- **Section break patterns** - spacers, swatches, crosshair, meta lines.
- **Components** - composed examples.

**Primitives used by the styleguide:** section titles use `bru-label`; demo blocks use `StyleguidePanel` → `bru-panel` with consistent padding (`px-6 py-5`). New styleguide-worthy demos should follow the same primitives.

### Related: portfolio copy voice

This skill covers **visual** language. **Prose, tone, and narrative** for the site live in the **`portfolio-site-voice`** project skill (`.cursor/skills/portfolio-site-voice/SKILL.md`) and the styleguide **Writing style** section in `StyleguideOverlay.tsx`. When you add or reshape sections, update copy guidance in both places if the rules change.

### Required “poster brutalism” motifs (from inspiration)

Use these motifs as _structure_, not decoration:

- **Rule-first composition**: hairline dividers + labeled headers; use `--border`/`--rule-solid` and `bru-divide-y` for stacks over grids.
- **Grid overlays**: subtle 1px grid behind key panels (Hero, case study headers, quality panels) via `bru-panel`/`grid-overlay`.
- **Vertical labels/indices**: use sparingly for section indices, years, or “NOW” signage.
- **Big type with tight tracking**: hierarchy via type, tracking, and rules; avoid gradients or soft shadows.
- **Echo headlines (optional)**: a solid + outline + low-opacity “repeat” treatment for hero/section title moments (document the recipe in the styleguide if used).
- **Texture discipline**: grain is subtle; don’t stack grain + halftone + heavy borders in small areas.

---

## Brutalist principles (refined)

Apply **structure and honesty**, not decoration for its own sake.

- **Exposed structure**: Prefer visible layout logic - borders, grids, clear rectangular regions - over soft “mystery” cards. Sharp or minimally rounded corners unless an existing control family uses otherwise.
- **Limited palette**: Neutral foreground/surface/border plus **one accent** (`--accent`, red). Use weight, case, and spacing for hierarchy before adding new hues.
- **Functional chrome**: Focus rings, scrollbars, and dividers are part of the design; do not hide focus to “clean up” the UI.
- **Typography as architecture**: Uppercase tracked labels, mono for specs/metadata, strong weight steps - brutalism here is **legibility and rhythm**, not shouty type.
- **Restraint on effects**: Grain and grid are atmospheric; use **one** dominant texture per region. Avoid stacking noise + halftone + heavy shadows in the same small panel.

---

## Print / editorial principles

Treat the page like **print layout** adapted for the web.

- **Registration & press cues**: Use existing motifs (`reg-marks`, halftone, spacer swatches, crosshair) where sections already establish that language; keep them aligned to the grid and subtle enough to read as craft, not clutter.
- **Rules and folios**: Think in **hairlines and rules** (`var(--border)`, `--rule-solid`, `bru-divide-y`) for separation. Small meta lines (mono, wide tracking) behave like **folio / slug** lines on a sheet.
- **Label vs body**: Eyebrows and captions are **caption-sized, tracked, often uppercase**; body copy uses `bru-prose` / `bru-prose-muted` for comfortable measure and line height.
- **Plate-based sections**: Major blocks read as **plates** (panels, spacers between chapters). Reuse `section-spacer` and panel patterns when adding new chapters so the scroll feels like turning spreads in a single publication.
- **Background type as form**: Large stroked/ghost numerals (`bg-text`) are **structural graphics**, not competing headlines - keep content hierarchy above them in z-order and contrast.

---

## Theme and implementation (summary)

- **Theme-first**: Color from `:root` / `.dark` variables; Tailwind colors in `tailwind.config.mjs` map to those tokens.
- **Surfaces**: `bru-panel` (48px grid, border, rule shadow); `bru-divide-y` on stacks over grids; page `grain` on `body`.
- **Motion**: `animate-enter` / delays in `globals.css`; always respect **`prefers-reduced-motion`**.
- **New tokens**: extend `globals.css`, then Tailwind if needed; prefer **`color-mix(in oklab, var(--foreground) …)`** for translucent UI.

### Don’t accidentally break the brutalist look

- Avoid: glass blur, soft multi-layer shadows, large radii/pill buttons, glossy gradients, colorful badge clouds.
- Prefer: rectangles, rules, mono metadata, uppercase tracked labels, subtle accent wash (`--accent-weak`), and crisp 1px hover nudges.

---

## Quick checklist

- [ ] Checked **StyleguideOverlay** for the closest existing recipe and matched spacing, type, and panel patterns.
- [ ] **Componentised** new UI into reusable building blocks or content blocks where appropriate (no unnecessary one-off markup in sections).
- [ ] If the pattern or block didn’t exist, added a **live styleguide recipe** under the right **chapter → section** hierarchy, then composed the feature from that block or recipe.
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
