export const SkillLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

export type SkillLevel = (typeof SkillLevels)[number];

export const skillLevelOrder: Record<SkillLevel, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
  Expert: 3,
};

export interface Skill {
  name: string;
  level: SkillLevel;
  progress?: number; // 0-1 within the current level, default = 1
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { name: "HTML", level: "Advanced", progress: 1 },
      { name: "CSS", level: "Advanced", progress: 1 },
      { name: "PHP", level: "Advanced", progress: 0.5 },
      { name: "TypeScript", level: "Advanced", progress: 0.9 },
      { name: "C#", level: "Advanced", progress: 0.9 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "Bootstrap", level: "Advanced", progress: 1 },
      { name: "React", level: "Advanced", progress: 0.9 },
      { name: "React Native (Expo)", level: "Beginner", progress: 0.9 },
      { name: "Tailwind", level: "Intermediate", progress: 0.6 },
      { name: ".NET", level: "Advanced", progress: 1 },
      { name: "Laravel", level: "Advanced", progress: 0.8 },
      { name: "Entity Framework", level: "Advanced", progress: 0.9 },
      { name: "Wordpress", level: "Beginner", progress: 0.5 },
    ],
  },

  {
    title: "Testing Frameworks",
    skills: [
      { name: "XUnit", level: "Advanced", progress: 0.9 },
      { name: "Jest", level: "Advanced", progress: 1 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", level: "Intermediate", progress: 0.8 },
      { name: "PostgreSQL", level: "Intermediate", progress: 0.7 },
      { name: "MS SQL", level: "Intermediate", progress: 0.5 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Git & Hooks", level: "Advanced", progress: 1 },
      { name: "Docker", level: "Intermediate", progress: 0.8 },
      { name: "CI/CD", level: "Intermediate", progress: 0.75 },
    ],
  },
  {
    title: "UI/UX & Design",
    skills: [
      { name: "Figma", level: "Advanced", progress: 0.2 },
      { name: "Adobe Illustrator", level: "Intermediate", progress: 0.7 },
    ],
  },
  {
    title: "Cloud / Hosting",
    skills: [
      { name: "Azure", level: "Beginner", progress: 0.75 },
      { name: "Digital Ocean", level: "Beginner", progress: 0.4 },
    ],
  },
];
