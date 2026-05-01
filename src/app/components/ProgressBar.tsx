import { SkillLevel, Skill, SkillLevels } from "../data/skills";

const levelStyles: Record<
  SkillLevel,
  { fill: string; tag: string; tick: string }
> = {
  Beginner: {
    fill: "bg-accent opacity-40",
    tag: "border-accent text-accent",
    tick: "bg-accent opacity-60",
  },
  Intermediate: {
    fill: "bg-accent opacity-55",
    tag: "border-accent text-accent",
    tick: "bg-accent opacity-75",
  },
  Advanced: {
    fill: "bg-accent opacity-70",
    tag: "border-accent text-accent",
    tick: "bg-accent",
  },
  Expert: {
    fill: "bg-accent",
    tag: "bg-accent text-white border-accent",
    tick: "bg-accent",
  },
};

interface SegmentedProgressBarProps {
  skill: Skill;
}

export default function SegmentedProgressBar({
  skill,
}: SegmentedProgressBarProps) {
  const filledIndex = SkillLevels.indexOf(skill.level);
  const progressPct =
    Math.round(((skill.progress ?? 0) * 100 + Number.EPSILON) * 10) / 10;
  const active = levelStyles[skill.level];

  return (
    <div className="grid gap-2">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold truncate">{skill.name}</div>
          <div className="bru-label">
            {skill.level}
            {filledIndex >= 0 ? ` • ${progressPct}%` : ""}
          </div>
        </div>
      </div>

      <div
        className={["relative bru-panel", "px-2 py-2"].join(" ")}
        role="img"
        aria-label={`${skill.name} proficiency: ${skill.level}${filledIndex >= 0 ? ` (${progressPct}%)` : ""}`}
      >
        <div className="flex gap-2">
          {SkillLevels.map((lvl, idx) => {
            const isBefore = idx < filledIndex;
            const isActive = idx === filledIndex;
            const segmentFill = isBefore
              ? levelStyles[lvl].fill
              : isActive
                ? active.fill
                : "";

            return (
              <div key={lvl} className="flex-1">
                <div className="relative h-4 border border-border bg-background/40">
                  {(isBefore || isActive) && (
                    <div
                      className={`h-full ${segmentFill}`}
                      style={{
                        width: isBefore ? "100%" : `${progressPct}%`,
                      }}
                    />
                  )}

                  {isActive && (
                    <div
                      className={[
                        "absolute top-0 bottom-0 w-[2px]",
                        "shadow-rule",
                        active.tick,
                      ].join(" ")}
                      style={{ left: `calc(${progressPct}% - 1px)` }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="mt-2 bru-label-compact">{lvl}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
