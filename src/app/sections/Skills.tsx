import SkillCategoryUsageGroups, {
  ExploringSkillsList,
} from "@/app/components/SkillCategoryUsageGroups";
import { BruText } from "@/app/components/primitives/BruText";
import { Panel, PanelHeader } from "@/app/components/primitives/Panel";
import { skillCategories } from "@/app/data/skills";
import { flattenSkillCategories } from "@/lib/skillUtils";

export default function Skills() {
  const flat = flattenSkillCategories(skillCategories);
  const inUseSkills = flat.filter((s) => s.usage !== "Exploring");
  const exploringSkills = flat.filter((s) => s.usage === "Exploring");

  return (
    <>
      <div className="mt-8 mb-8 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          I adapt to whatever stack a project needs, but these are the
          technologies I'm strongest with and feel most at home using. The
          languages, frameworks, and tools I draw on in real projects. I group
          them by how often each one shows up in my work—roughly daily, regular,
          or occasional—so this reads as an honest stack snapshot, not a keyword
          list. Anything I'm still mostly experimenting with is listed
          separately at the bottom.
        </BruText>
      </div>

      <Panel padding="none" className="mb-8">
        <PanelHeader eyebrow="Technical stack" title="What I build with" />
        <SkillCategoryUsageGroups skills={inUseSkills} />
      </Panel>

      {exploringSkills.length > 0 ? (
        <Panel padding="none" className="mb-8">
          <PanelHeader eyebrow="Exploring" title="Learning, not shipping yet" />
          <ExploringSkillsList skills={exploringSkills} />
        </Panel>
      ) : null}
    </>
  );
}
