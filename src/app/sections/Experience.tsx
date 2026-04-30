import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import Header from "../components/Header";
import { experiences, otherExperiences } from "../data/experiences";

export default function Experience() {
  return (
    <>
      {Object.values(experiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex} />
      ))}

      <Header variant="subheading">#OTHER EXPERIENCES</Header>
      {Object.values(otherExperiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex}>
          <div className="text-neutral-500">
            Images for this project aren’t currently included in the repository.
          </div>
        </ExperienceAccordion>
      ))}
    </>
  );
}
