import ExperienceAccordion from "@/app/components/accordion/ExperienceAccordion";
import Header from "@/app/components/Header";
import { BruText } from "@/app/components/primitives/BruText";
import { Panel } from "@/app/components/primitives/Panel";
import {
  EXPERIENCE_IDS,
  OTHER_EXPERIENCE_IDS,
  experienceList,
  otherExperienceList,
} from "@/app/data/experiences";
import { sectionIntros } from "@/app/data/sectionIntros";

export default function Experience() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          {sectionIntros.experience}
        </BruText>
      </div>

      {experienceList.map((ex, idx) => (
        <ExperienceAccordion key={EXPERIENCE_IDS[idx]} {...ex} />
      ))}

      <Panel padding="sm" className="mt-14 mb-6">
        <BruText variant="label">More background</BruText>
        <Header variant="subheading">Community and earlier roles</Header>
      </Panel>

      {otherExperienceList.map((ex, idx) => (
        <ExperienceAccordion key={OTHER_EXPERIENCE_IDS[idx]} {...ex}>
          <BruText variant="proseMuted">
            I haven't added screenshots for this entry to the repo yet.
          </BruText>
        </ExperienceAccordion>
      ))}
    </>
  );
}
