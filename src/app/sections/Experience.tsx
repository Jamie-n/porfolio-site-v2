import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import Header from "../components/Header";
import { BruText } from "../components/primitives/BruText";
import { experiences, otherExperiences } from "../data/experiences";

export default function Experience() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          Roles where I’ve shipped production features, tightened UX, and
          improved reliability. I gravitate toward work that pairs product
          judgment with solid engineering—not either one in isolation.
        </BruText>
      </div>

      {Object.values(experiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex} />
      ))}

      <div className="mt-14 mb-6 bru-panel px-4 py-3">
        <BruText variant="label">More background</BruText>
        <Header variant="subheading">Community and earlier roles</Header>
      </div>
      {Object.values(otherExperiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex}>
          <BruText variant="proseMuted">
            I haven’t added screenshots for this entry to the repo yet.
          </BruText>
        </ExperienceAccordion>
      ))}
    </>
  );
}
