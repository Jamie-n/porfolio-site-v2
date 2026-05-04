---
name: portfolio-site-voice
description: >-
  Applies consistent first-person portfolio prose for this site’s sections,
  experience data, case studies, journey markdown, root metadata, and journey
  overlay copy. Use when editing copy in src/app/sections/, src/app/data/,
  public/content/, layout.tsx, JourneyOverlay.tsx, or when the user mentions
  tone, voice, narrative, blurbs, writing style, or portfolio communication.
disable-model-invocation: true
---

# Portfolio site voice

## Authority (keep in sync)

1. **`src/app/components/StyleguideOverlay.tsx`** - **Writing style** section: live reference for voice, typography habits, and anti-patterns in UI.
2. **This skill** - checklist for narrative and data copy the styleguide does not spell out file-by-file.

If guidance diverges, update **both** the styleguide and this skill.

## Principles

- **First person** for section intros, experience blurbs, project summaries, overlay deck copy, and personal framing in site metadata where it fits.
- **Concrete over abstract**: what shipped, for whom, constraints, outcomes - not “delivering solutions” or capability lists without context.
- **Honest framing**: skills grouped by how often tools show up in real work; exploring called out separately; certifications described as how they support shipping, not generic exam blurbs.
- **UK English** and typographic habits (e.g. _I’m_, non‑breaking hyphens for compounds like _full‑stack_) - match existing sections and the styleguide **Hyphens & wraps** row.
- **Hero / Home** (`Hero.tsx`): preserve its editorial/print tone unless the user explicitly asks to change it.

## Patterns

- **Section intros:** `BruText` `variant="proseMuted"`, `max-w-[72ch]`; one or two short paragraphs; state scope and why the reader should care - no marketing fluff.
- **Panel headers:** `bru-label` (short category) + `Header` `variant="subheading"` (human-readable title), e.g. _Technical stack_ / _What I build with_; _More background_ / _Community and earlier roles_.
- **Bullets:** Full sentences; sentence case start, closing period; use **I** when it clarifies ownership (case studies, highlights), otherwise keep tight achievement lines if the blurb already carries voice.

## Anti-patterns (copy)

Résumé / consultancy filler: _leveraging_, _utilised_, _demonstrates strong_, _best-in-class_, undifferentiated “stakeholder” paragraphs. Third-person bio voice in section leads. Hype or superlatives without a concrete claim. Keyword dumps framed as proficiency.

## Files to treat as “voice surface”

| Area               | Typical locations                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Sections           | `src/app/sections/*.tsx` (except Hero when user says leave home as-is)                                            |
| Experience data    | `src/app/data/experiences.ts`                                                                                     |
| Site + social meta | `src/app/layout.tsx` (`metadata`, `openGraph`, `twitter`)                                                         |
| Journey UI         | `src/app/components/JourneyOverlay.tsx` (header, tab helper copy)                                                 |
| Journey / AI notes | `public/content/journey/`, `public/content/inspiration/`, `public/content/ai-workflow/`, `public/content/skills/` |
| Case studies       | `src/app/sections/Projects.tsx` and appendix components under `src/app/sections/projects/`                        |

## After edits

Skim **About → Experience → Projects → Skills → Certifications** (and any overlay you touched) so the same person reads consistently end-to-end.
