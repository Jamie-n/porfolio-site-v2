"use client";

import ExperienceAccordion from "@/app/components/accordion/ExperienceAccordion";
import CustomAnchor from "@/app/components/display/CustomAnchor";
import Header from "@/app/components/Header";
import { BruText } from "@/app/components/primitives/BruText";
import { Panel } from "@/app/components/primitives/Panel";
import {
  RuledList,
  KeyValueListItem,
} from "@/app/components/primitives/RuledList";
import {
  aboutIntro,
  workingStyle,
  workingStyleChips,
} from "@/app/data/aboutContent";
import { education, EDUCATION_IDS } from "@/app/data/education";

export default function About() {
  return (
    <>
      <div className="mt-5 mb-12 grid gap-4 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          {aboutIntro.lead}
        </BruText>
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          {aboutIntro.codeLine.before}
          <CustomAnchor
            href={aboutIntro.codeLine.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {aboutIntro.codeLine.linkText}
          </CustomAnchor>
          {aboutIntro.codeLine.after}
        </BruText>
      </div>

      <Panel className="mb-12">
        <BruText variant="label">Working style</BruText>
        <Header variant="subheading">How I build</Header>

        <BruText
          variant="label"
          className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-foreground/70"
        >
          {workingStyleChips.map((chip) => (
            <span key={chip} className="inline-flex items-center gap-2">
              <span className="h-3 w-[1px] bg-border" />
              {chip}
            </span>
          ))}
        </BruText>

        <RuledList className="mt-5">
          {workingStyle.map((row) => (
            <KeyValueListItem key={row.label} label={row.label}>
              {row.body}
            </KeyValueListItem>
          ))}
        </RuledList>
      </Panel>

      <Panel padding="sm" className="mb-8">
        <BruText variant="label">Background</BruText>
        <Header variant="subheading">Education</Header>
      </Panel>

      {education.map((entry, idx) => (
        <ExperienceAccordion key={EDUCATION_IDS[idx]} {...entry} />
      ))}
    </>
  );
}
