import { PropsWithChildren } from "react";
import Accordion from "./Accordion";

interface ExperienceAccordionProps extends PropsWithChildren {
  experienceTitle: string;
  experienceStartDate?: string;
  experienceEndDate?: string | null;
  experienceSubheading: string;
  experienceColour: string;
}

export default function ExperienceAccordion({
  experienceTitle,
  experienceStartDate,
  experienceEndDate,
  experienceSubheading,
  experienceColour,
  children,
}: ExperienceAccordionProps) {
  const headerElement = (
    <>
      <div
        className={`w-1 rounded-full me-3  ${experienceColour ?? "bg-blue-300"}`}
      />
      <div>
        {experienceStartDate && experienceEndDate && (
          <p>
            {experienceStartDate} - {experienceEndDate ?? "Present"}
          </p>
        )}
        <p className="text-3xl font-bold">{experienceSubheading}</p>
        <p className="text-xl font-bold">{experienceTitle}</p>
      </div>
    </>
  );

  return <Accordion Header={headerElement}>{children}</Accordion>;
}
