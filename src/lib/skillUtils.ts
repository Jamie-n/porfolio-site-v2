import type { Skill, SkillCategory, SkillUsage } from "@/app/data/skills";
import { SkillUsages } from "@/app/data/skills";

export type SkillsUsageGroup = { usage: SkillUsage; skills: Skill[] };

export type CategorizedSkill = Skill & { categoryTitle: string };

/** Flatten category panels into one list while keeping domain labels. */
export function flattenSkillCategories(
  categories: SkillCategory[],
): CategorizedSkill[] {
  return categories.flatMap((c) =>
    c.skills.map((skill) => ({ ...skill, categoryTitle: c.title })),
  );
}

/**
 * Buckets skills by usage tier (Daily → Exploring). Skills are sorted by
 * name within each tier. Empty tiers are omitted.
 */
export function skillsGroupedByUsage(skills: Skill[]): SkillsUsageGroup[] {
  const map = new Map<SkillUsage, Skill[]>();
  for (const u of SkillUsages) map.set(u, []);
  for (const s of skills) {
    map.get(s.usage)?.push(s);
  }
  return SkillUsages.map((usage) => ({
    usage,
    skills: (map.get(usage) ?? [])
      .slice()
      .sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
  })).filter((g) => g.skills.length > 0);
}
