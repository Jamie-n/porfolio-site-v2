import Header from "../components/Header";
import SegmentedProgressBar from "../components/ProgressBar";
import { skillCategories } from "../data/skills";
import { orderSkills } from "../utilities/skillUtils";

export default function Skills() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <p className="bru-prose-muted max-w-[72ch]">
          A practical snapshot of what I reach for day‑to‑day. I bias toward
          tools that make products faster, safer, and easier to maintain.
        </p>
      </div>

      {skillCategories.map(({ title, skills }) => (
        <div key={title} className="mb-8">
          <div className="mb-6 bru-panel px-4 py-3">
            <div className="bru-label">Category</div>
            <Header variant="subheading">{title}</Header>
          </div>

          <div className="flex flex-col gap-3">
            {orderSkills(skills).map((skill) => (
              <SegmentedProgressBar key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
