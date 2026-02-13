import Header from "../components/Header";
import SegmentedProgressBar from "../components/ProgressBar";
import { skillCategories } from "../data/skills";
import { orderSkills } from "../utilities/skillUtils";

export default function Skills() {
  return (
    <>
      {skillCategories.map(({ title, skills }) => (
        <div key={title} className="mb-8">
          <Header variant="subheading">{title}</Header>

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
