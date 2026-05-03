---
name: Premium UI styling polish
overview: Refactor UI styling and layout (Tailwind + global CSS + existing components) to achieve a minimalist brutalist portfolio aesthetic while preserving the single-page scroll experience with the fixed side nav and keeping all existing sections/content/functionality.
todos:
  - id: audit-style-entrypoints
    content: Confirm all style entrypoints (Tailwind + globals + any other CSS) and enumerate the key components that control the look-and-feel.
    status: completed
  - id: define-design-tokens
    content: Create a minimal token set in `globals.css` (light/dark) for background/surface/text/muted/border/accent/shadows and wire them into Tailwind.
    status: completed
  - id: typography-refresh
    content: Standardize on Geist Sans and apply a refined typography scale (tracking/leading/weights) via existing component classNames.
    status: completed
  - id: spacing-rhythm-pass
    content: Refine paddings/margins responsively (especially `ContentContainer`, section spacing) while preserving layout structure.
    status: completed
  - id: interactive-polish
    content: Update hover/focus/motion across nav, accordions, toggle, and icons using the accent token and consistent transitions.
    status: completed
  - id: visual-qa
    content: Do a light/dark visual pass plus basic accessibility checks (contrast, focus-visible) to ensure the polish feels premium and consistent.
    status: completed
  - id: styleguide-overlay
    content: Add a style/brand guidelines overlay (no new route) documenting tokens, type scale, spacing, components, and motion rules for future extension.
    status: completed
isProject: false
---

## Constraints I will enforce

- **Preserve the single-page scroll UX**: keep the “scroll-to-section” behavior and a fixed side navigation as the primary navigation model.
- **Content edits are allowed**: we can rewrite headlines and copy to better fit the brutalist design language (typography, rhythm, hierarchy), as long as we don’t remove core information needed for your portfolio.
- **No functionality regressions**: dark mode, scroll spy, accordion behavior, and navigation must continue to work.
- **Layout changes are allowed**: we can adjust spacing, grid, alignment, component sizing, borders/rules, and section composition visually.
- **Section order is flexible**: we can reorder existing sections to improve narrative and fit the design language, while keeping skills/experience prominently showcased.
- **Routes are allowed (optional)**: we can add routes/pages if useful, but the primary UX remains the single-page scroll with the side nav.
- **No new route required for styleguide**: implement the brand/design guidelines as an **overlay/drawer/modal**, not a new page.

## What I found (current styling architecture)

- Styling is **Tailwind-first** plus a small amount of global CSS.
- Global tokens exist via CSS variables `--background` / `--foreground` in `[src/app/globals.css](src/app/globals.css)` and are wired into Tailwind as `colors.background`/`colors.foreground` in `[tailwind.config.ts](tailwind.config.ts)`.
- Fonts are currently **inconsistent**: `[src/app/layout.tsx](src/app/layout.tsx)` loads **Geist** via `next/font`, but `[src/app/globals.css](src/app/globals.css)` imports **Roboto** from Google and forces `font-family: "Roboto"`.
- Accent color is hard-coded throughout as `red-500` (you chose to keep red).
- Notable styling hot-spots:
  - Sidebar/nav: `[src/app/components/nav/Sidebar.tsx](src/app/components/nav/Sidebar.tsx)`, `[src/app/components/nav/NavItem.tsx](src/app/components/nav/NavItem.tsx)`
  - Section wrapper and background index text: `[src/app/components/Section.tsx](src/app/components/Section.tsx)`, `.bg-text::after` in `[src/app/globals.css](src/app/globals.css)`
  - Hero and interactive accents: `[src/app/sections/Hero.tsx](src/app/sections/Hero.tsx)`
  - Accordions/cards: `[src/app/components/accordion/Accordion.tsx](src/app/components/accordion/Accordion.tsx)`, `[src/app/components/accordion/ExperienceAccordion.tsx](src/app/components/accordion/ExperienceAccordion.tsx)`
  - Spacing container: `[src/app/components/ContentContainer.tsx](src/app/components/ContentContainer.tsx)`
  - Dark mode toggle styling: `[src/app/components/DarkModeToggle.tsx](src/app/components/DarkModeToggle.tsx)` (includes an invalid class `dark:peer-checked:bg-red-t00` that needs to become a valid color)

## Design direction (minimalist brutalist spec)

Based on your references and what you called out (type, grid, motion, nav, cards, borders), the site will move toward:

- **Typography-first**: strong display type, confident weights, tighter tracking where appropriate, and clear hierarchy. (Geist Sans as the primary font.)
- **Grid discipline**: fewer arbitrary paddings, more consistent column alignment and vertical rhythm.
- **Rules & borders**: thin lines/dividers used intentionally to create structure (brutalist “print layout” feel).
- **Surfaces/cards**: flatter surfaces with subtle elevation as needed (often border-led rather than shadow-led), consistent radii (likely small/near-zero).
- **High contrast neutrals**: black/white/neutral-first, with a **refined red accent** for interactive and highlight moments.
- **Tasteful motion**: quick, crisp transitions; micro-interactions on hover/active; reduced-motion friendly.

## Concrete brutalist “rules” we’ll implement (so it matches the references)

These are the explicit, repeatable style decisions we’ll encode into tokens/utilities and document in the overlay styleguide.

### Composition motifs (directly from your references)

- **Boxed panels**: content frequently sits inside bordered rectangles with generous inner padding.
- **Grid overlays**: subtle 1px gridlines behind content (especially in hero/feature panels) using low-contrast lines.
- **Vertical labels**: occasional vertical/rotated metadata (e.g. section index, years) for brutalist “poster” energy.
- **Repeated display text**: stacked/echoed headlines (solid → outline → low-opacity) as a hero motif (we’ll do this via styling, not by changing your content).
- **Textured neutrals**: faint “paper/grain” texture in backgrounds and images; kept subtle so it doesn’t hurt readability.

### Typography

- **Font**: Geist Sans (already loaded in `[src/app/layout.tsx](src/app/layout.tsx)`), no Roboto.
- **Display titles**: very bold, tight tracking, slightly condensed feel via tracking/leading rather than a new font.
  - Example target: `font-semibold` → `font-bold`, `tracking-[-0.04em]` to `tracking-[-0.06em]`, `leading-[0.9]` to `leading-[1.0]`.
- **Section headings**: uppercase or smallcaps-like effect via tracking (optional) rather than changing content.
  - Example target: `tracking-[0.08em]` and `text-xs`–`text-sm` labels for metadata (dates, indices).
- **Body**: readable, editorial spacing.
  - Example target: `leading-7` for paragraphs; muted color for secondary text.
  - Add a consistent **max line-length** for paragraphs (measure) for that “editorial poster” feel.

### “Signage” typography (from your WILD FIRE CITY refs)

We’ll incorporate this as a reusable recipe for hero + key section headers:

- **Wide-tracked uppercase wordmarks**:
  - Example target: `uppercase font-bold tracking-[0.35em]` (large display) and `tracking-[0.18em]` (supporting lines).
- **Split headline composition**: words separated by large tracking and spacing; centered primary word with secondary words flanking it.
  - Implementation approach: preserve your content, but apply layout via existing containers (e.g. `flex justify-between`) and type styling (tracking/uppercase).
- **Micro-metadata line** (e.g. address/date vibe):
  - Example target: `text-xs uppercase tracking-[0.22em] text-muted` placed above/between display lines.
- **Hard contrast**: white on near-black; minimal gradients; optional subtle grain.

### Grid & spacing rhythm

- **Baseline rhythm**: spacing steps derived from 4/8px scale; avoid one-off paddings.
- **Content width**: keep the single-page sections but align inner content to a consistent max-width and gutters (responsive).
- **Dividers**: use rules to separate nav items and content blocks instead of large whitespace alone.
  - Prefer “rule + label” separators (thin border with small uppercase label) rather than large headings everywhere.

### Borders, rules, and surfaces

- **Border weight**: prefer `1px` rules (`border`), occasionally `2px` for emphasis (active nav marker / key card).
- **Radius**: minimal.
  - Example target: `rounded-none` or `rounded-sm` for most surfaces; reserve larger radius only for the hero portrait circle (keep intent).
- **Shadows**: minimal-to-none; when used, make them sharp/functional rather than “soft material”.
  - Example target: a single tokenized `shadow-[0_1px_0_0_rgba(...)]` or subtle shadow only in light mode.
  - Add **outline/offset** effects sparingly (border + slight translate on hover) to emulate poster cutouts without heavy shadows.

### Accent (keep red)

- **Accent usage**: red is reserved for interactive states (hover/active/focus ring) and 1–2 hero highlights.
- **Accent tint**: allow a very weak red wash for hover backgrounds (low opacity) to match brutalist “print overlay” vibe.
  - Use red for **key display headlines** only when it improves hierarchy (inspired by the “BRUTALISM” poster image).

### Motion

- **Default timing**: fast and crisp.
  - Example target: `duration-150` / `duration-200`, `ease-out`.
- **Hover**: small transforms (1–2px translate) and border/underline transitions.
- **Reduced motion**: respect `prefers-reduced-motion` by disabling transforms and long transitions globally.
  - Prefer “physical” motion: tiny nudge + rule/border change (rather than fades).

### Texture & media treatment

- Keep the site readable first, but add **subtle grain** and **high-contrast image treatment** where appropriate:
  - Optional global noise overlay (very low opacity, toggled per theme).
  - Images can use `contrast`/`grayscale` in brutalist sections, with red accent as the only strong color.

## Approach (tokens + layout pass + living styleguide)

I’ll implement a small set of **design tokens** (CSS variables) in `globals.css`, map them into Tailwind, and then do a layout/spacing pass across key components:

- **Tokens**: `--bg`, `--fg`, `--muted`, `--border`, `--surface`, `--accent`, `--accent-weak`, `--ring`, plus a small set of shadows (if any).
- **Typography scale**: a deliberate set of sizes/leading/tracking for titles, section headings, body, captions.
- **Layout pass**: adjust spacing/alignment rules (while keeping single-page sections and side nav model).
- **Styleguide overlay**: a UI overlay that documents the tokens + type scale + spacing rules + component recipes (nav item, button/link, card/accordion, toggle), so future extensions stay consistent.

## Concrete edits (styling-only)

### 1) Global theme + font unification

- Update `[src/app/globals.css](src/app/globals.css)`:
  - Remove the Roboto `@import` and the forced `font-family: "Roboto"`.
  - Apply Geist via the CSS variable already provided by `[src/app/layout.tsx](src/app/layout.tsx)`:
    - `body { font-family: var(--font-geist-sans), system-ui, ... }`
  - Expand `:root` and `.dark` tokens beyond `--background/--foreground`:
    - add brutalist-appropriate tokens for **surface**, **borders/rules**, **muted text**, **accent red**, and **focus ring**.
  - Normalize base element styling via `@layer base`: selection, focus-visible ring, default link affordances (minimal but obvious), and reduced-motion support.
  - Refine `.bg-text::after` to feel more brutalist/editorial:
    - keep it huge + positioned as-is, but adjust opacity/color via tokens (and possibly tracking/weight) so it reads structured rather than decorative fluff.

### 2) Tailwind theme extensions to use tokens

- Update `[tailwind.config.ts](tailwind.config.ts)`:
  - Extend colors to include `surface`, `muted`, `border`, `accent` (all pointing at CSS vars).
  - Extend `fontFamily` to reference `var(--font-geist-sans)`.
  - Optionally add a small `boxShadow` set that maps to tokenized shadows.

### 3) Component/layout refinements (single-page model preserved)

- `[src/app/components/ContentContainer.tsx](src/app/components/ContentContainer.tsx)`:
  - Make padding responsive and more grid-consistent (less “magic number” feel, cleaner brutalist rhythm).
- `[src/app/components/Header.tsx](src/app/components/Header.tsx)`:
  - Keep variants and element type, but refine typography classes:
    - consistent tracking/leading and responsive scaling aligned to the brutalist type scale.
- Sidebar/nav polish:
  - `[src/app/components/nav/Sidebar.tsx](src/app/components/nav/Sidebar.tsx)`: introduce thin rules/borders, stronger typographic branding, and consistent icon affordances.
  - `[src/app/components/nav/NavItem.tsx](src/app/components/nav/NavItem.tsx)`: brutalist active state (rule/marker + accent), crisp hover treatment, and better spacing.
- Section wrapper:
  - `[src/app/components/Section.tsx](src/app/components/Section.tsx)`: keep `ml-80` and `min-h-screen`, but refine spacing (`mb`) and ensure text/background token usage is consistent.
- Accordions/cards:
  - `[src/app/components/accordion/Accordion.tsx](src/app/components/accordion/Accordion.tsx)`: emphasize rules/borders, make hover/active states snappy, and improve focus-visible styling.
  - `[src/app/components/accordion/ExperienceAccordion.tsx](src/app/components/accordion/ExperienceAccordion.tsx)`: tune muted text and list rhythm, and align type scale with the new hierarchy.
- Dark mode toggle:
  - `[src/app/components/DarkModeToggle.tsx](src/app/components/DarkModeToggle.tsx)`: keep same control/behavior, but:
    - fix invalid `dark:peer-checked:bg-red-t00` to a real accent class.
    - switch greys to tokenized border/surface colors so it looks intentionally brutalist in both themes.

### 4) Style/brand guidelines overlay (no route)

- Add a small overlay component (modal/drawer) reachable from the sidebar area (e.g. a “Styleguide” link/button near the bottom).
  - Content: tokens (light/dark), typography scale, spacing rules, border/radius rules, motion rules, and “component recipes” with live examples (nav item, link, card/accordion row, toggle).
  - Include a “motifs” section: boxed panels, grid overlays, vertical labels, repeated display text, texture rules.
  - No new route, no change to single-page scroll navigation model.

## Responsiveness (preserve layout)

- I will keep a fixed side nav + scroll sections as the core model, but I will:
  - Make paddings and large type scale responsive.
  - Ensure the huge `.bg-text` decoration doesn’t cause awkward overflow on smaller viewports.
  - Make borders/rules and card spacing scale cleanly across breakpoints.

## Verification checklist

- Visual smoke check in light + dark mode:
  - Sidebar, active nav item, hover states, accordion transitions, hero accent.
- Accessibility:
  - Contrast for body text vs background, muted text still readable.
  - Focus-visible rings on interactive elements (anchors, toggle).
- Performance:
  - No heavy new dependencies; keep it Tailwind + CSS variables.

## Files I expect to touch

- `[src/app/globals.css](src/app/globals.css)`
- `[tailwind.config.ts](tailwind.config.ts)`
- `[src/app/layout.tsx](src/app/layout.tsx)` (only if needed to finalize font application; likely no change)
- `[src/app/components/ContentContainer.tsx](src/app/components/ContentContainer.tsx)`
- `[src/app/components/Header.tsx](src/app/components/Header.tsx)`
- `[src/app/components/Section.tsx](src/app/components/Section.tsx)`
- `[src/app/components/nav/Sidebar.tsx](src/app/components/nav/Sidebar.tsx)`
- `[src/app/components/nav/NavItem.tsx](src/app/components/nav/NavItem.tsx)`
- `[src/app/components/accordion/Accordion.tsx](src/app/components/accordion/Accordion.tsx)`
- `[src/app/components/accordion/ExperienceAccordion.tsx](src/app/components/accordion/ExperienceAccordion.tsx)`
- `[src/app/components/DarkModeToggle.tsx](src/app/components/DarkModeToggle.tsx)`
