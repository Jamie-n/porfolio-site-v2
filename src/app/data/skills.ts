/** How often this tool shows up in real work - not a proficiency score. */
export const SkillUsages = [
  "Daily",
  "Regular",
  "Occasional",
  "Exploring",
] as const;

export type SkillUsage = (typeof SkillUsages)[number];

export const skillUsageOrder: Record<SkillUsage, number> = {
  Daily: 3,
  Regular: 2,
  Occasional: 1,
  Exploring: 0,
};

export interface Skill {
  name: string;
  usage: SkillUsage;
  /** Override Simple Icons slug when `name` does not map cleanly. */
  iconSlug?: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", usage: "Daily" },
      { name: "CSS", usage: "Daily" },
      { name: "PHP", usage: "Regular" },
      { name: "TypeScript", usage: "Daily" },
      { name: "C#", usage: "Regular" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Bootstrap", usage: "Regular" },
      { name: "React", usage: "Daily" },
      { name: "React Native (Expo)", usage: "Occasional" },
      { name: "Tailwind", usage: "Regular" },
      { name: ".NET", usage: "Regular" },
      { name: "Laravel", usage: "Regular" },
      { name: "Entity Framework", usage: "Regular" },
      { name: "Wordpress", usage: "Occasional" },
    ],
  },

  {
    title: "Testing Frameworks",
    skills: [
      { name: "XUnit", usage: "Regular" },
      { name: "Jest", usage: "Regular" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", usage: "Occasional" },
      { name: "PostgreSQL", usage: "Occasional" },
      { name: "MS SQL", usage: "Occasional" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git & Hooks", usage: "Daily" },
      { name: "Docker", usage: "Occasional" },
      { name: "CI/CD", usage: "Occasional" },
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
      { name: "Digital Ocean", usage: "Exploring" },
    ],
  },
];
