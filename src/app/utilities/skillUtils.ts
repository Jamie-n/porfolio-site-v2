import { Skill, skillLevelOrder } from "../data/skills";

/**
 * Orders an array of skills by skill level and progress.
 *
 * Sorting rules:
 * 1. Primary sort: by `level` according to `SkillLevels` (Expert → Beginner).
 *    Missing levels are treated as lowest priority.
 * 2. Secondary sort: within the same level, by `progress` in descending order.
 *    Missing progress values are treated as 0.
 *
 * @param {Skill[]} skills - Array of skill objects to sort. Each skill can have:
 *                            - `level?: SkillLevel` (optional, e.g., "Beginner" | "Intermediate" | "Advanced" | "Expert")
 *                            - `progress?: number` (optional numeric progress)
 * @returns {Skill[]} A new array of skills sorted by level and progress (highest level and progress first)
 */
export const orderSkills = (skills: Skill[]): Skill[] => {
  return [...skills].sort((a, b) => {
    // Map levels to numeric order; missing levels get -1
    const levelA = a.level ? skillLevelOrder[a.level] : -1;
    const levelB = b.level ? skillLevelOrder[b.level] : -1;

    // Primary sort: level descending (Expert first)
    const levelDiff = levelB - levelA;
    if (levelDiff !== 0) return levelDiff;

    // Secondary sort: progress descending
    return (b.progress ?? 0) - (a.progress ?? 0);
  });
};
