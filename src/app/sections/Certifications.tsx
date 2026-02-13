import ExperienceAccordion from "../components/accordion/ExperienceAccordion";

export default function Certifications() {
  return (
    <ExperienceAccordion
      title="AZ-900: Azure Fundamentals"
      startDate={2025}
      endDate={undefined}
      company="Microsoft"
      colour="bg-blue-500"
      blurb="Professional certification demonstrating foundational knowledge of Microsoft Azure cloud services."
      highlights={[]}
    />
  );
}
