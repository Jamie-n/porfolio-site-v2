import Header from "../components/Header";
import SkillCategoryUsageGroups, {
  ExploringSkillsList,
} from "../components/SkillCategoryUsageGroups";
import { BruText } from "../components/primitives/BruText";
import { skillCategories } from "../data/skills";
import { flattenSkillCategories } from "../utilities/skillUtils";

export default function Skills() {
  const flat = flattenSkillCategories(skillCategories);
  const inUseSkills = flat.filter((s) => s.usage !== "Exploring");
  const exploringSkills = flat.filter((s) => s.usage === "Exploring");

  return (
    <>
      <div className="mt-8 mb-8 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          The languages, frameworks, and tools I draw on in real projects. I
          group them by how often each one shows up in my work—roughly daily,
          regular, or occasional—so this reads as an honest stack snapshot, not
          a keyword list. Anything I’m still mostly experimenting with is listed
          separately at the bottom.
        </BruText>
      </div>

      <div className="mb-8 bru-panel overflow-hidden p-0">
        <div className="border-b border-rulesolid px-4 py-3 sm:px-5">
          <BruText variant="label">Technical stack</BruText>
          <Header variant="subheading">What I build with</Header>
        </div>
        <SkillCategoryUsageGroups skills={inUseSkills} />
      </div>

      {exploringSkills.length > 0 ? (
        <div className="mb-8 bru-panel overflow-hidden p-0">
          <div className="border-b border-rulesolid px-4 py-3 sm:px-5">
            <BruText variant="label">Exploring</BruText>
            <Header variant="subheading">Learning, not shipping yet</Header>
          </div>
          <ExploringSkillsList skills={exploringSkills} />
        </div>
      ) : null}
    </>
  );
}
