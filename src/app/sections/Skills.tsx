import Header from "../components/Header";
import SegmentedProgressBar from "../components/ProgressBar";

export const SkillLevels = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;
export type SkillLevel = (typeof SkillLevels)[number];

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
      { name: "React Native (Expo)", level: "Intermediate", progress: 0.8 },
      { name: "Tailwind", level: "Intermediate", progress: 0.6 },
      { name: "Wordpress", level: "Beginner", progress: 0.5 },
      { name: ".NET", level: "Advanced", progress: 1 },
      { name: "Entity Framework", level: "Advanced", progress: 0.9 },
    ],
  },

  {
    title: "Testing Frameworks",
    skills: [
      { name: "XUnit", level: "Advanced", progress: 0.9 },
      { name: "Jest", level: "Advanced", progress: 1 },
      { name: "PHP Unit", level: "Intermediate", progress: 0.7 },
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
      { name: "Git", level: "Advanced", progress: 1 },
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
    skills: [{ name: "Azure", level: "Intermediate", progress: 0.75 }],
  },
];

export default function Skills() {
  return (
    <>
      {skillCategories.map(({ title, skills }) => (
        <div key={title} className="mb-8">
          <Header variant="subheading">{title}</Header>

          <div className="flex flex-col gap-3">
            {skills.map((skill) => (
              <SegmentedProgressBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
