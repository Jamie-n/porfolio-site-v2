import type { SkillUsage } from "./skills";

/**
 * Absolute left rail fill (see `ExperienceAccordion` colour bar pattern).
 */
export const skillUsagePresentation: Record<
  SkillUsage,
  { railBgClass: string }
> = {
  Daily: { railBgClass: "bg-accent" },
  Regular: { railBgClass: "bg-foreground/58" },
  Occasional: { railBgClass: "bg-foreground/36" },
  Exploring: { railBgClass: "bg-foreground/22" },
};
