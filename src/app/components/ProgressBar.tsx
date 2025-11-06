import { Skill, SkillLevel, SkillLevels } from "../sections/Skills";


const levelColors: Record<SkillLevel, string> = {
  Beginner: "bg-red-800",
  Intermediate: "bg-red-700",
  Advanced: "bg-red-600",
  Expert: "bg-red-400",
};


interface SegmentedProgressBarProps {
  skill: Skill;
}

export default function SegmentedProgressBar({ skill }: SegmentedProgressBarProps) {
  const totalSegments = SkillLevels.length;
  const filledIndex = SkillLevels.indexOf(skill.level);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span
          className={`ml-2 px-2 py-0.5 text-xs rounded-full text-white ${levelColors[skill.level]}`}
        >
          {skill.level}
        </span>
      </div>
      <div className="flex gap-1">
        {SkillLevels.map((lvl, idx) => (
          <div key={idx} className="flex-1 h-4 rounded relative bg-gray-300 dark:bg-gray-600">
            {
              idx < filledIndex && (
                <div
                  className={`h-4 rounded ${levelColors[lvl]}`}
                  style={{ width: "100%" }}
                />
              )
            }
            {idx === filledIndex && (
              <div
                className={`h-4 rounded ${levelColors[lvl]}`}
                style={{ width: `${(skill.progress ?? 0) * 100}%` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
