# Inspiration (and how it became code)

The visual direction is **print/editorial brutalism**: exposed rules, grid discipline, typography-first hierarchy, high-contrast neutrals, and a restrained red accent.

This isn’t “decoration” for its own sake—the goal is to make the layout feel like a coherent publication, where structure and type do most of the work.

## The spec (before the pixels)

This direction was originally captured as a concrete plan:

- `portfolio-website/.cursor/plans/premium_ui_styling_polish_e66ae2b2.plan.md`

That plan is what guided the refactor into a consistent language, and it’s why the UI feels deliberate instead of “random Tailwind.”

## The living system

In this repo the inspiration is encoded into two artifacts:

- `docs/design-system.md` (the written spec)
- `src/app/components/StyleguideOverlay.tsx` (a living catalog of tokens + recipes + interaction rules)

Together they keep new features from drifting stylistically.
