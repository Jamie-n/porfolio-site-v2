/** How often this tool shows up in real work - not a proficiency score. */
export const SkillUsages = [
  "Daily",
  "Regular",
  "Occasional",
  "Exploring",
] as const;

export type SkillUsage = (typeof SkillUsages)[number];

export interface Skill {
  name: string;
  usage: SkillUsage;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
  /** `practice` = habits, collaboration, leadership (shown in its own panel). Omitted = technical stack. */
  section?: "practice";
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", usage: "Daily" },
      { name: "CSS", usage: "Daily" },
      { name: "PHP", usage: "Daily" },
      { name: "TypeScript", usage: "Daily" },
      { name: "C#", usage: "Daily" },
      { name: "AL (Business Central)", usage: "Regular" },
      { name: "Ruby", usage: "Occasional" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Bootstrap", usage: "Daily" },
      { name: "React", usage: "Daily" },
      { name: "React Native", usage: "Exploring" },
      { name: "Tailwind", usage: "Occasional" },
      { name: ".NET", usage: "Daily" },
      { name: "Laravel", usage: "Daily" },
      { name: "Entity Framework", usage: "Daily" },
      { name: "WordPress", usage: "Occasional" },
      { name: "Next.js", usage: "Exploring" },
      { name: "Ruby on Rails", usage: "Occasional" },
    ],
  },

  {
    title: "Testing Frameworks",
    skills: [
      { name: "XUnit", usage: "Daily" },
      { name: "Jest", usage: "Daily" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", usage: "Daily" },
      { name: "PostgreSQL", usage: "Occasional" },
      { name: "MS SQL", usage: "Daily" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git", usage: "Daily" },
      { name: "Git Hooks", usage: "Regular" },
      { name: "Docker", usage: "Daily" },
      { name: "Terraform", usage: "Occasional" },
      { name: "CI/CD", usage: "Regular" },
    ],
  },
  {
    title: "UI/UX & Design",
    skills: [
      { name: "Figma", usage: "Occasional" },
      { name: "Adobe Illustrator", usage: "Occasional" },
    ],
  },
  {
    title: "Cloud / Hosting",
    skills: [
      { name: "Azure", usage: "Exploring" },
      { name: "Digital Ocean", usage: "Regular" },
      { name: "AWS", usage: "Occasional" },
    ],
  },
  {
    title: "Engineering Practice",
    section: "practice",
    skills: [
      { name: "Code Reviews", usage: "Daily" },
      { name: "Refactoring", usage: "Daily" },
      { name: "Systems Migration", usage: "Daily" },
      { name: "API Design", usage: "Regular" },
      { name: "Accessibility (WCAG/ARIA)", usage: "Regular" },
    ],
  },
  {
    title: "Team Leadership",
    section: "practice",
    skills: [
      { name: "Leading & Supporting Engineers", usage: "Daily" },
      { name: "Mentoring & Onboarding", usage: "Daily" },
      { name: "Agile / Scrum Delivery", usage: "Regular" },
      { name: "Stakeholder Alignment", usage: "Regular" },
      { name: "Backlog, Tickets & Scoping", usage: "Regular" },
      { name: "Incident Leadership", usage: "Regular" },
    ],
  },
];
