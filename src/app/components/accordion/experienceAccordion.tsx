import Accordion from "./Accordion";

interface ExperienceAccordionProps {

  experienceTitle: string;
  experienceStartDate: string;
  experienceEndDate?: string;
  experienceCompany: string;
  experienceColour: string;
}


export default function ExperienceAccordion({ experienceTitle, experienceStartDate, experienceEndDate, experienceCompany, experienceColour }: ExperienceAccordionProps) {

  return (
    <Accordion>
      <div className={`w-1 rounded-full me-3  ${experienceColour ?? "bg-blue-300"}`} />
      <div>
        <p>{experienceStartDate} - {experienceEndDate ?? "Present"}</p>
        <p className="text-3xl font-bold">{experienceCompany}</p>
        <p className="text-xl font-bold">{experienceTitle}</p>
      </div>
    </Accordion>
  )
}
