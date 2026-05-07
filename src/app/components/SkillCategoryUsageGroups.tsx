import type { Skill } from "../data/skills";
import { skillUsagePresentation } from "../data/skillUsagePresentation";
import { skillsGroupedByUsage } from "@/lib/skillUtils";
import { formatTwoDigits } from "@/lib/utils";
import { BruText } from "./primitives/BruText";
import { cn } from "@/lib/cn";

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full min-w-0 items-center justify-center border border-rulesolid border-foreground/18",
        "bg-background/50 px-2.5 py-1 font-mono text-[0.6875rem] font-bold leading-[1.2]",
        "text-foreground/90",
      )}
    >
      <span className="min-w-0 whitespace-normal break-words text-center">
        {skill.name}
      </span>
    </span>
  );
}

export function ExploringSkillsList({
  skills,
}: {
  skills: Array<Skill & { categoryTitle: string }>;
}) {
  if (skills.length === 0) return null;

  const sorted = skills
    .slice()
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
    );

  return (
    <div className="px-4 py-4 sm:px-5 sm:py-4">
      <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" role="list">
        {sorted.map((skill) => (
          <li key={`${skill.name}-${skill.categoryTitle}`}>
            <SkillPill skill={skill} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SkillCategoryUsageGroups({
  skills,
  tierCountAriaNoun = "tools",
}: {
  skills: Skill[];
  tierCountAriaNoun?: string;
}) {
  const groups = skillsGroupedByUsage(skills);

  return (
    <div className="bru-divide-y">
      {groups.map(({ usage, skills: tierSkills }) => {
        const tier = skillUsagePresentation[usage];
        const count = tierSkills.length;
        return (
          <div key={usage} className="px-4 py-3 sm:px-5 sm:py-4">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex shrink-0 items-center gap-2 sm:w-[7.5rem] sm:flex-col sm:items-start sm:gap-1">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      tier.railBgClass,
                    )}
                  />
                  <BruText as="h3" variant="label">
                    {usage}
                  </BruText>
                </div>
                <BruText
                  variant="accMeta"
                  className="tabular-nums text-foreground/40 sm:ps-3.5"
                  aria-label={`${count} ${tierCountAriaNoun}`}
                >
                  {formatTwoDigits(count)}
                </BruText>
              </div>
              <ul
                className="m-0 flex min-w-0 flex-1 list-none flex-wrap gap-1.5 p-0"
                role="list"
              >
                {tierSkills.map((skill) => (
                  <li key={skill.name}>
                    <SkillPill skill={skill} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
