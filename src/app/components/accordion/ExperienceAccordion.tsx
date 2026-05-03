"use client";

import { PropsWithChildren } from "react";
import { ExperienceContent } from "../../data/experiences";
import { BruText } from "../primitives/BruText";
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
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-none ${colour ?? "bg-accent"}`}
      />
      <div className="ps-4">
        <BruText variant="accMeta">
          {startDate}
          {endDate !== null ? ` — ${endDate ?? "Present"}` : ""}
        </BruText>
        <BruText variant="accTitle" className="mt-1 block">
          {company}
        </BruText>
        <BruText variant="accSubtitle" className="mt-0.5 block">
          {title}
        </BruText>
      </div>
    </>
  );

  return (
    <Accordion header={headerElement}>
      <StyledContent {...rest} />
      {children}
    </Accordion>
  );
}

function StyledContent({
  blurb,
  highlights,
}: Pick<ExperienceContent, "blurb" | "highlights">) {
  const total = highlights.length;

  return (
    <>
      <div className="mb-6 bru-panel overflow-hidden p-0">
        <div className="bru-divide-y">
          <div className="px-4 py-4 sm:px-5">
            <BruText variant="label">Summary</BruText>
            <BruText as="p" variant="prose" className="mt-2 max-w-[72ch]">
              {blurb}
            </BruText>
          </div>

          <div className="px-4 py-4 sm:px-5">
            <div className="max-w-[72ch] border border-rulesolid border-l-2 border-l-accent bg-background/55 shadow-rule">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rulesolid px-4 py-2.5">
                <BruText variant="label">Highlights</BruText>
                <BruText
                  variant="accMeta"
                  className="text-foreground/50"
                  aria-hidden="true"
                >
                  {String(total).padStart(2, "0")}
                </BruText>
              </div>

              <ol
                className="m-0 list-none divide-y divide-rulesolid p-0"
                aria-label="Highlights"
              >
                {highlights.map((content, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-[2.75rem_minmax(0,1fr)] divide-x divide-rulesolid"
                  >
                    <BruText
                      variant="accMeta"
                      className="flex items-start justify-center bg-background/35 px-2 py-3 text-foreground/45"
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </BruText>
                    <BruText
                      as="p"
                      variant="prose"
                      className="m-0 px-4 py-3 max-w-none"
                    >
                      {content}
                    </BruText>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
