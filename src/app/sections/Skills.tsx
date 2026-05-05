import SkillCategoryUsageGroups, {
  ExploringSkillsList,
} from "@/app/components/SkillCategoryUsageGroups";
import { BruText } from "@/app/components/primitives/BruText";
import { Panel, PanelHeader } from "@/app/components/primitives/Panel";
import { skillCategories } from "@/app/data/skills";
import { sectionIntros } from "@/app/data/sectionIntros";
import type { CategorizedSkill } from "@/lib/skillUtils";
import { flattenSkillCategories } from "@/lib/skillUtils";

export default function Skills() {
  const flat = flattenSkillCategories(skillCategories);
  const inUseStackSkills: CategorizedSkill[] = [];
  const inUsePracticeSkills: CategorizedSkill[] = [];
  const exploringSkills: CategorizedSkill[] = [];
  for (const s of flat) {
    if (s.usage === "Exploring") {
      exploringSkills.push(s);
      continue;
    }
    if (s.section === "practice") inUsePracticeSkills.push(s);
    else inUseStackSkills.push(s);
  }

  return (
    <>
      <div className="mt-5 mb-8 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          {sectionIntros.skills}
        </BruText>
      </div>

      <Panel padding="none" className="mb-8">
        <PanelHeader eyebrow="Technical stack" title="What I build with" />
        <SkillCategoryUsageGroups skills={inUseStackSkills} />
      </Panel>

      {inUsePracticeSkills.length > 0 ? (
        <Panel padding="none" className="mb-8">
          <PanelHeader eyebrow="How I work" title="Practice & Leadership" />
          <SkillCategoryUsageGroups
            skills={inUsePracticeSkills}
            tierCountAriaNoun="skills"
          />
        </Panel>
      ) : null}

      {exploringSkills.length > 0 ? (
        <Panel padding="none" className="mb-8">
          <PanelHeader eyebrow="Other" title="Learning" />
          <ExploringSkillsList skills={exploringSkills} />
        </Panel>
      ) : null}
    </>
  );
}
