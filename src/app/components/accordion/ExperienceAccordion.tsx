"use client";

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
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-none ${colour ?? "bg-accent"}`}
      />
      <div className="ps-4">
        <div className="bru-acc-meta">
          {startDate}
          {endDate !== null ? ` — ${endDate ?? "Present"}` : ""}
        </div>
        <div className="mt-1 bru-acc-title">{company}</div>
        <div className="mt-0.5 bru-acc-subtitle">{title}</div>
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
            <div className="bru-label">Summary</div>
            <p className="mt-2 max-w-[72ch] bru-prose">{blurb}</p>
          </div>

          <div className="px-4 py-4 sm:px-5">
            <div className="max-w-[72ch] border border-rulesolid border-l-2 border-l-accent bg-background/55 shadow-rule">
              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rulesolid px-4 py-2.5">
                <div className="bru-label">Highlights</div>
                <span
                  className="bru-acc-meta text-foreground/50"
                  aria-hidden="true"
                >
                  {String(total).padStart(2, "0")}
                </span>
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
                    <div className="flex items-start justify-center bg-background/35 px-2 py-3 bru-acc-meta text-foreground/45">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <p className="m-0 px-4 py-3 bru-prose max-w-none">
                      {content}
                    </p>
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
