export const SECTION_INTRO_KEYS = [
  "projects",
  "experience",
  "skills",
  "certifications",
] as const;

export type SectionIntroKey = (typeof SECTION_INTRO_KEYS)[number];

export const sectionIntros = {
  projects:
    "A short list of work I'm happy to stand behind - clear UX, maintainable systems, and delivery I owned end to end. Each card is a quick read on outcomes and the decisions that shaped them.",
  experience:
    "Roles where I've shipped production features, tightened UX, and improved reliability. I gravitate toward work that pairs product judgment with solid engineering - not either one in isolation.",
  skills:
    "I adapt to whatever stack a project needs, but these are the technologies I'm strongest with and feel most at home using. The languages, frameworks, and tools I draw on in real projects. I group them by how often each one shows up in my work - roughly daily, regular, or occasional - so this reads as an honest stack snapshot, not a keyword list. Anything I'm still mostly experimenting with is listed separately at the bottom.",
  certifications:
    "Formal credentials on the fundamentals - Azure services, cloud concepts, and the operational basics I lean on when shipping to real environments.",
} as const satisfies Record<SectionIntroKey, string>;
