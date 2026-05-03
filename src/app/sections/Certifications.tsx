import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import { BruText } from "../components/primitives/BruText";

export default function Certifications() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          Formal credentials on the fundamentals—Azure services, cloud concepts,
          and the operational basics I lean on when shipping to real
          environments.
        </BruText>
      </div>

      <ExperienceAccordion
        title="AZ-900: Azure Fundamentals"
        startDate={2025}
        endDate={undefined}
        company="Microsoft"
        colour="bg-blue-500"
        blurb="Foundational Azure: core services, pricing models, governance, and how the platform fits together—useful context when I design or deploy cloud-backed work."
        highlights={[]}
      />
    </>
  );
}
