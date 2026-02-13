import { PropsWithChildren } from "react";
import { ExperienceContent } from "../../data/experiences";
import Accordion from "./Accordion";

export default function ExperienceAccordion({
  title,
  company,
  startDate,
  endDate,
  colour,
  children,
  ...rest
}: ExperienceContent & PropsWithChildren) {
  const headerElement = (
    <>
      <div className={`w-1 rounded-full me-3  ${colour ?? "bg-blue-300"}`} />
      <div>
        <p>
          {startDate}
          {endDate !== null ? ` - ${endDate ?? "Present"}` : ""}
        </p>
        <p className="text-3xl font-bold">{company}</p>
        <p className="text-xl font-bold">{title}</p>
      </div>
    </>
  );

  return (
    <Accordion Header={headerElement}>
      <StyledContent {...rest} />
      {children}
    </Accordion>
  );
}

function StyledContent({
  blurb,
  highlights,
}: Pick<ExperienceContent, "blurb" | "highlights">) {
  return (
    <>
      <p className="text-neutral-500 mb-5">{blurb}</p>

      <ul className="list-disc list-outside ml-5 mb-5">
        {highlights.map((content, idx) => (
          <li key={idx}>{content}</li>
        ))}
      </ul>
    </>
  );
}
