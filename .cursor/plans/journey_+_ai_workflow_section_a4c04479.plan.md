---
name: Journey + AI workflow section
overview: Add a new "Journey" area to the portfolio that tells the reinvention story and presents a secure, file-browser-style view of your AI workflow and skill docs, reusing the site’s existing brutalist drawer/overlay pattern.
todos:
  - id: survey-existing-overlay-patterns
    content: Reuse StyleguideOverlay drawer mechanics for a new Journey drawer trigger in the sidebar.
    status: completed
  - id: add-journey-ai-content
    content: Create Journey + AI workflow content files and wire them into a drawer UI with on-brand panels/typography.
    status: completed
  - id: build-skill-file-browser
    content: Implement a file-browser-style UI for skills docs with a secure markdown renderer.
    status: completed
  - id: secure-markdown-rendering
    content: Add markdown rendering dependencies and sanitize/lock down rendering to avoid unsafe HTML.
    status: completed
  - id: tests
    content: Add focused unit tests for drawer behavior and markdown safety (optional but recommended).
    status: completed
isProject: false
---

## Goal

Add an on-site area that:

- Tells the “reinvention” story (Laravel original → current Next.js portfolio) with a clear narrative.
- Includes an “inspiration” chapter explaining the design direction and why the UI looks the way it does (and how it was made consistent).
- Acknowledges agentic AI as a force multiplier (boilerplate speed + risks without human direction).
- Documents _your_ AI workflow for this repo (plan → execute → test → refine loops).
- Surfaces your “skills docs” in a **file-browser style UI** that renders markdown **securely**.

## Key constraints / decisions (defaults)

- **Navigation UX (default)**: use an **off-canvas drawer** (like the existing Styleguide drawer) instead of a full new page or a long scroll section. This keeps the single-page section navigation intact and avoids cluttering the main scroll.
- **Where the markdown lives (default)**: do **not** render directly from `.cursor/skills/**/SKILL.md` at runtime. Instead, copy/curate the content into a public, repo-tracked folder such as `docs/skills/` or `content/skills/`. This avoids coupling site content to Cursor internals and keeps security/auditing clearer.
- **Secure markdown rendering**:
  - Support **basic markdown only** (headings/paragraphs/lists/inline code/code fences/links).
  - Disallow raw HTML in markdown and sanitize output (allowlist).
  - External links open in a new tab with `rel="noopener noreferrer"`.
- **State / deep-linking**: drawer state is UI-only (no deep links). We may optionally _read_ a query param on first load later, but we won’t write history state.
- **Default open state**: the drawer always opens on the first tab (**Journey**).
- **Responsive**: drawer becomes full-screen on small viewports and uses the desktop drawer width on larger screens.
- **Public-doc redaction**: before copying Cursor skills into `content/skills/`, do a quick pass to remove anything sensitive or overly internal.

## What we’ll build

### 1) Journey drawer entry point (reusing existing overlay pattern)

- Reuse the drawer mechanics and accessibility approach from [`src/app/components/StyleguideOverlay.tsx`](src/app/components/StyleguideOverlay.tsx) (focus trap, Esc close, body scroll lock, portal).
- Add a new drawer component, e.g. `src/app/components/JourneyOverlay.tsx`, with a sidebar trigger similar to Styleguide.
- Add the trigger to the bottom cluster in [`src/app/components/nav/Sidebar.tsx`](src/app/components/nav/Sidebar.tsx), near `StyleguideOverlay`.
- Add a **prominent lead-in callout** in [`src/app/sections/About.tsx`](src/app/sections/About.tsx):
  - Use an on-brand panel (`bru-panel`) with an **accent-weak** wash and rule-first composition.
  - Include a short preview (2–3 bullets) plus a strong CTA button (“Read the build journey” / “How this site was built”) that opens the drawer.
  - Keep it high in the About section so it’s discoverable without scrolling deep.

### 2) Journey content structure inside the drawer

Inside the drawer, present three “chapters” (tabs or accordion) to keep it digestible:

- **Journey**
  - “Reinvention” narrative + link(s) to the original Laravel repo (GitHub) and this repo.
  - A short “What changed” list (tooling, architecture, UX, testing, CI).
- **Inspiration**
  - A short, opinionated “design brief” referencing the original brutalist/print inspiration (grid discipline, rules, typography-first, one red accent, crisp motion).
  - Explicitly reference the earlier plan: `portfolio-website/.cursor/plans/premium_ui_styling_polish_e66ae2b2.plan.md` as “the spec” that guided the build and resulted in the current `docs/design-system.md` + `StyleguideOverlay` living system.
  - Tie the inspiration back to implementation artifacts: `docs/design-system.md` (written spec) + `src/app/components/StyleguideOverlay.tsx` (living catalog).
  - Include an **inspiration image gallery**:
    - Store images as static assets (recommended: `public/inspiration/`), not fetched from third-party URLs at runtime.
    - Display as a small grid/filmstrip with captions (source/credit + what was taken from it: grid, type, rules, motion).
    - Support click-to-enlarge (optional) using the same drawer/overlay accessibility approach (Esc close, focus management) to keep UX consistent and avoid adding a new route.
    - Ensure licensing/attribution is explicit in captions where required.
- **AI workflow**
  - Your loop: plan → execute → test → refine.
  - A short “guardrails” section about maintainability, prompt quality, and human review.
  - Link to CI as the backstop: `portfolio-website/.github/workflows/ci.yml` (no need to embed CI output; narrative-first).

Implementation-wise, the drawer can use:

- A small tab switcher, or just an `Accordion` (already exists at [`src/app/components/accordion/Accordion.tsx`](src/app/components/accordion/Accordion.tsx)).

### 3) File-browser-style view of skill docs

- Create a component like `src/app/components/SkillFileBrowser.tsx` that shows:
  - Left column: “files” list (skills)
  - Right column: rendered markdown preview
- Source of truth for list/labels:
  - Either a simple manifest (e.g. `content/skills/index.ts` exporting `{id,title,filepath}`), or derive from a folder at build time (if you want automatic discovery).
- Scope: render **basic markdown** (no tables/task lists/images) to keep parsing/sanitization tight.

### 4) Secure markdown rendering pipeline

- Add a markdown renderer component (e.g. `src/app/components/Markdown.tsx`) that:
  - Parses markdown
  - Supports GitHub-flavored markdown (tables, lists, code fences)
  - **Sanitizes output** (no arbitrary HTML/scripts)
  - Styles output with existing typography utilities (`bru-prose`, `bru-prose-muted`, link styling consistent with `CustomAnchor`).

Likely dependency approach (we’ll pick one and keep it minimal):

- **Option A (recommended)**: `react-markdown` + `remark-gfm` + `rehype-sanitize`.
- **Option B**: `unified` pipeline to HTML string + render (less ergonomic with React components).

### 5) Content authoring (new docs)

Add new markdown content files (example structure):

- `content/journey/overview.md` (reinvention story)
- `content/inspiration/overview.md` (design direction + references + how it was encoded in this repo)
- `content/ai-workflow/workflow.md` (loop + guardrails)
- `content/skills/*.md` (curated versions of your skill docs)

Then the drawer loads these files (either imported at build-time or served as static assets) and displays them.

### 6) Testing (optional but aligned with repo)

- Component/unit tests for:
  - Drawer open/close behavior (Esc closes, focus trap basics)
  - Markdown rendering: disallow raw HTML injection
  - File browser selection behavior
- Tests follow repo convention under `src/test/` (see existing tests like `src/test/app/components/nav/NavItem.test.tsx`).

## Files we’ll likely touch

- [`src/app/components/nav/Sidebar.tsx`](src/app/components/nav/Sidebar.tsx) (add Journey trigger)
- [`src/app/components/StyleguideOverlay.tsx`](src/app/components/StyleguideOverlay.tsx) (reference pattern; not necessarily modify)
- `src/app/components/JourneyOverlay.tsx` (new)
- `src/app/components/SkillFileBrowser.tsx` (new)
- `src/app/components/Markdown.tsx` (new)
- `content/**` or `docs/**` (new markdown content)

## Acceptance criteria

- Journey content is readable, on-brand (panels/rules/labels), and discoverable from the sidebar.
- Drawer is keyboard accessible (focus trapped, Esc closes, background scroll locked).
- Skill docs are presented in a file-browser layout.
- Markdown rendering is safe (no scriptable HTML) and link handling is sane.

## Open items I’ll resolve during implementation (no need to block)

- Whether to use tabs vs accordion inside the drawer (I’ll match existing patterns and visual rhythm).
- Whether markdown lives under `content/` or `docs/` (I’ll choose one consistent with your repo’s conventions once I inspect current docs usage in code).
