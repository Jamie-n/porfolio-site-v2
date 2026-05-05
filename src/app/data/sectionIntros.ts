export const SECTION_INTRO_KEYS = [
  "projects",
  "experience",
  "skills",
  "certifications",
] as const;

type SectionIntroKey = (typeof SECTION_INTRO_KEYS)[number];

export const sectionIntros = {
  projects:
    "A short list of work I'm happy to stand behind - clear UX, maintainable systems, and delivery I owned end to end. Each card is a quick read on outcomes and the decisions that shaped them.",
  experience:
    "Roles where I've shipped production features, tightened UX, and improved reliability. I gravitate toward work that pairs product judgment with solid engineering - not either one in isolation.",
  skills:
    "I work in consultancy, so I ramp on client stacks and ship in their codebases - most of my day-to-day depth is in Laravel and Entity Framework, but I still reach for the rest of this list wherever an engagement needs it. The first panel is the technical stack - languages, frameworks, and tools from real projects - grouped by how often each one shows up (daily, regular, or occasional) so this reads as an honest snapshot, not a keyword list. A separate panel covers how I work with teammates and code: engineering habits and leadership. Anything I'm still mostly experimenting with is under Learning.",
  certifications:
    "Formal credentials on the fundamentals - Azure services, cloud concepts, and the operational basics I lean on when shipping to real environments.",
} as const satisfies Record<SectionIntroKey, string>;
