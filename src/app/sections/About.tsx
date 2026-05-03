"use client";

import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import CustomAnchor from "../components/display/CustomAnchor";
import Header from "../components/Header";
import { BruText } from "../components/primitives/BruText";

export default function About() {
  return (
    <>
      <div className="mt-8 mb-12 grid gap-4 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          I’m a pragmatic full‑stack engineer focused on turning messy,
          real‑world constraints into clean systems and crisp interfaces. I care
          about fast feedback loops, maintainable code, and UI details that hold
          up in production.
        </BruText>
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          Code and experiments live on{" "}
          <CustomAnchor
            href="https://github.com/Jamie-n"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </CustomAnchor>
          .
        </BruText>
      </div>

      <div className="mb-12 bru-panel px-6 py-5">
        <BruText variant="label">Working style</BruText>
        <Header variant="subheading">How I build</Header>

        <BruText
          variant="label"
          className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-foreground/70"
        >
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-[1px] bg-border" />
            ship proofs, not prototypes
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-[1px] bg-border" />
            crisp hierarchy
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-[1px] bg-border" />
            AI as a multiplier (with taste)
          </span>
        </BruText>

        <ul className="mt-5 list-none p-0 m-0 border border-rulesolid bg-background/55 shadow-rule">
          {[
            {
              k: "Feedback loops",
              v: "I prefer small, production‑shaped slices—measurable changes that can be rolled back cleanly.",
            },
            {
              k: "Maintainable systems",
              v: "I keep the core boring: clear boundaries, predictable data flow, and fewer “clever” moving parts.",
            },
            {
              k: "Interface craft",
              v: "I bias toward hierarchy and restraint: readable type, clear spacing, and interactions that don’t shout.",
            },
            {
              k: "Reliability",
              v: "I lean on guardrails over heroics: linting, targeted tests, and failure states that degrade gracefully.",
            },
          ].map((row) => (
            <li
              key={row.k}
              className="grid gap-1 border-b border-rulesolid last:border-b-0 px-5 py-3"
            >
              <BruText variant="label" className="text-foreground/70">
                {row.k}
              </BruText>
              <BruText as="p" variant="prose" className="m-0 max-w-none">
                {row.v}
              </BruText>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 bru-panel px-4 py-3">
        <BruText variant="label">Background</BruText>
        <Header variant="subheading">Education</Header>
      </div>

      <ExperienceAccordion
        title="Software Engineering MSc"
        startDate={2023}
        endDate={2024}
        company="The University of Huddersfield"
        colour="bg-blue-500"
        blurb="MSc in Software Engineering with a focus on AI and data-driven systems. My capstone applied ML and NLP to real-world text—sentiment and signals in clinical-adjacent data—so I could go deep on evaluation, ethics, and what the model was actually learning."
        highlights={[
          "Master’s project on AI-based sentiment analysis on textual data, with attention to mental-health-related signals and responsible interpretation.",
        ]}
      />

      <ExperienceAccordion
        title="Software Engineering BSc (Hons)"
        startDate={2019}
        endDate={2023}
        company="The University of Huddersfield"
        colour="bg-blue-500"
        blurb="First-class honours in Software Engineering. I cared most about systems thinking and shipping a final-year project that could justify its own complexity—computer vision for train autonomy and safety monitoring—which earned the top mark in the cohort."
        highlights={[
          "Highest grade for Final Year Project: a computer vision system for train autonomy and safety monitoring.",
        ]}
      />
    </>
  );
}
