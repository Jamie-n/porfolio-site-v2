"use client";

import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import CustomAnchor from "../components/display/CustomAnchor";
import Header from "../components/Header";

export default function About() {
  return (
    <>
      <div className="mt-8 mb-12 grid gap-4 max-w-[72ch]">
        <p className="bru-prose-muted max-w-[72ch]">
          I’m a pragmatic full‑stack engineer focused on turning messy,
          real‑world constraints into clean systems and crisp interfaces. I care
          about fast feedback loops, maintainable code, and UI details that hold
          up in production.
        </p>
        <p className="bru-prose-muted max-w-[72ch]">
          If you want the raw code, my work lives on{" "}
          <CustomAnchor
            href="https://github.com/Jamie-n"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </CustomAnchor>
          .
        </p>
      </div>

      <div className="mb-8 bru-panel px-4 py-3">
        <div className="bru-label">Background</div>
        <Header variant="subheading">Education</Header>
      </div>

      <ExperienceAccordion
        title="Software Engineering MSc"
        startDate={2023}
        endDate={2024}
        company="The University of Huddersfield"
        colour="bg-blue-500"
        blurb="Completed a Master's in Software Engineering with a focus on AI and data-driven solutions. Developed advanced technical skills through a capstone project analyzing sentiment in real-world datasets, combining machine learning and natural language processing techniques."
        highlights={[
          "Delivered a Master's project on AI-based sentiment analysis, applying ML algorithms to analyze textual data with a focus on identifying underlying mental health conditions.",
        ]}
      />

      <ExperienceAccordion
        title=" Software Engineering BSc (Hons)"
        startDate={2019}
        endDate={2023}
        company="The University of Huddersfield"
        colour="bg-blue-500"
        blurb="Graduated with first-class honours in Software Engineering. Recognized for academic excellence, including achieving the highest grade for the Final Year Project, demonstrating strong problem-solving and software development skills."
        highlights={[
          "Awarded highest grade for Final Year Project, developing a computer vision system for train autonomy and safety monitoring.",
        ]}
      />
    </>
  );
}
