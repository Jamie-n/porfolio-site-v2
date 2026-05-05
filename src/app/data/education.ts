import type { ExperienceContent } from "@/app/data/experiences";

export const EDUCATION_IDS = ["msc", "bsc"] as const;

type EducationId = (typeof EDUCATION_IDS)[number];

const educationById = {
  msc: {
    title: "Software Engineering MSc",
    company: "The University of Huddersfield",
    startDate: 2023,
    endDate: 2024,
    colour: "bg-blue-500",
    blurb:
      "MSc in Software Engineering with a focus on AI and data-driven systems. My capstone applied ML and NLP to real-world text - sentiment and signals in clinical-adjacent data - so I could go deep on evaluation, ethics, and what the model was actually learning.",
    highlights: [
      "Master's project on AI-based sentiment analysis on textual data, with attention to mental-health-related signals and responsible interpretation.",
    ],
  },
  bsc: {
    title: "Software Engineering BSc (Hons)",
    company: "The University of Huddersfield",
    startDate: 2019,
    endDate: 2023,
    colour: "bg-blue-500",
    blurb:
      "First-class honours in Software Engineering. I cared most about systems thinking and shipping a final-year project that could justify its own complexity - computer vision for train autonomy and safety monitoring - which earned the top mark in the cohort.",
    highlights: [
      "Highest grade for Final Year Project: a computer vision system for train autonomy and safety monitoring.",
    ],
  },
} satisfies Record<EducationId, ExperienceContent>;

export const education: readonly ExperienceContent[] = EDUCATION_IDS.map(
  (id) => educationById[id],
);
