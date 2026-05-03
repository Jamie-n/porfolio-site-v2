import Header from "../components/Header";
import { BruText } from "../components/primitives/BruText";
import SegmentedProgressBar from "../components/ProgressBar";
import { skillCategories } from "../data/skills";
import { orderSkills } from "../utilities/skillUtils";

export default function Skills() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          A practical snapshot of what I reach for day‑to‑day. I bias toward
          tools that make products faster, safer, and easier to maintain.
        </BruText>
      </div>

      {skillCategories.map(({ title, skills }) => (
        <div key={title} className="mb-8">
          <div className="mb-6 bru-panel px-4 py-3">
            <BruText variant="label">Category</BruText>
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
