import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import Header from "../components/Header";
import { BruText } from "../components/primitives/BruText";
import { experiences, otherExperiences } from "../data/experiences";

export default function Experience() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          A snapshot of roles and projects where I shipped production features,
          tightened UX, and improved reliability. I like work that blends
          product thinking with strong engineering fundamentals.
        </BruText>
      </div>

      {Object.values(experiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex} />
      ))}

      <div className="mt-14 mb-6 bru-panel px-4 py-3">
        <BruText variant="label">Appendix</BruText>
        <Header variant="subheading">Other experiences</Header>
      </div>
      {Object.values(otherExperiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex}>
          <BruText variant="proseMuted">
            Images for this project aren’t currently included in the repository.
          </BruText>
        </ExperienceAccordion>
      ))}
    </>
  );
}
