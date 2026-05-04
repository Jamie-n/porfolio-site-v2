import SkillCategoryUsageGroups, {
  ExploringSkillsList,
} from "@/app/components/SkillCategoryUsageGroups";
import { BruText } from "@/app/components/primitives/BruText";
import { Panel, PanelHeader } from "@/app/components/primitives/Panel";
import { skillCategories } from "@/app/data/skills";
import { sectionIntros } from "@/app/data/sectionIntros";
import { flattenSkillCategories } from "@/lib/skillUtils";

export default function Skills() {
  const flat = flattenSkillCategories(skillCategories);
  const inUseSkills = flat.filter((s) => s.usage !== "Exploring");
  const exploringSkills = flat.filter((s) => s.usage === "Exploring");

  return (
    <>
      <div className="mt-8 mb-8 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          {sectionIntros.skills}
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
