import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import Header from "../components/Header";
import { experiences, otherExperiences } from "../data/experiences";

export default function Experience() {
  return (
    <>
      {Object.values(experiences).map((ex) => (
        <ExperienceAccordion {...ex} />
      ))}

      <Header variant="subheading">#OTHER EXPERIENCES</Header>
      {Object.values(otherExperiences).map((ex) => (
        <ExperienceAccordion {...ex} />
      ))}
    </>
  );
}
