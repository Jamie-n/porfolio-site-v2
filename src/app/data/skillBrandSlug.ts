import type { Skill } from "./skills";

/**
 * Simple Icons slug for `https://cdn.simpleicons.org/{slug}`.
 * Keys must match `Skill.name` in `skills.ts`.
 */
const SKILL_NAME_TO_SIMPLE_ICON_SLUG: Record<string, string> = {
  HTML: "html5",
  CSS: "css3",
  PHP: "php",
  TypeScript: "typescript",
  "C#": "csharp",
  Bootstrap: "bootstrap",
  React: "react",
  "React Native (Expo)": "expo",
  Tailwind: "tailwindcss",
  ".NET": "dotnet",
  Laravel: "laravel",
  "Entity Framework": "dotnet",
  Wordpress: "wordpress",
  XUnit: "xunit",
  Jest: "jest",
  MySQL: "mysql",
  PostgreSQL: "postgresql",
  "MS SQL": "microsoftsqlserver",
  "Git & Hooks": "git",
  Docker: "docker",
  "CI/CD": "githubactions",
  Figma: "figma",
  "Adobe Illustrator": "adobeillustrator",
  Azure: "microsoftazure",
  "Digital Ocean": "digitalocean",
};

export function simpleIconCdnUrl(slug: string): string {
  return `https://cdn.simpleicons.org/${encodeURIComponent(slug)}`;
}

/** Brand icon slug, or `undefined` to show the text fallback mark. */
export function skillBrandIconSlug(skill: Skill): string | undefined {
  if (skill.iconSlug) return skill.iconSlug;
  return SKILL_NAME_TO_SIMPLE_ICON_SLUG[skill.name];
}
