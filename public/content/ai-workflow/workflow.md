# AI workflow (with human guardrails)

Agentic AI is great at scaffolding fast - but it still needs **human judgment** to stay unique and maintainable.

Used well, it’s a **force multiplier**, not a replacement.

## The loop I use

- **Plan**: define the goal, constraints, and what “done” means.
- **Execute**: ship the smallest slice that fits the existing patterns.
- **Test**: run checks, hit edge cases, confirm accessibility.
- **Refine**: tighten names, structure, and polish; then loop back (**Refine → Plan**) to re-scope and run it again.

## Guardrails (what I’m careful about)

- **Boilerplate is easy**; maintainable architecture is not.
- Without clear prompts and review, AI can produce **dangerous or unmaintainable code** (leaky abstractions, inconsistent patterns, brittle logic).
- The goal is to move faster **without lowering the quality bar**.

## Automated backstop

CI is the safety net for the basics (format, lint, tests). I keep a short explanation of what it protects, what it doesn’t, and how it fits the loop here:

- [How I use CI](/content/ci/how-we-use-ci.md)
