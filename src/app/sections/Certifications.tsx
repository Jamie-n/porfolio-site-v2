import ExperienceAccordion from "../components/accordion/ExperienceAccordion";

export default function Certifications() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <p className="bru-prose-muted max-w-[72ch]">
          Certifications that back up the fundamentals: cloud concepts, platform
          services, and the operational basics that matter when you ship.
        </p>
      </div>

      <ExperienceAccordion
        title="AZ-900: Azure Fundamentals"
        startDate={2025}
        endDate={undefined}
        company="Microsoft"
        colour="bg-blue-500"
        blurb="Professional certification demonstrating foundational knowledge of Microsoft Azure cloud services."
        highlights={[]}
      />
    </>
  );
}
