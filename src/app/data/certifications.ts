import type { ExperienceContent } from "@/app/data/experiences";

export const CERTIFICATION_IDS = ["az-900"] as const;

export type CertificationId = (typeof CERTIFICATION_IDS)[number];

const certificationsById = {
  "az-900": {
    title: "AZ-900: Azure Fundamentals",
    company: "Microsoft",
    startDate: 2025,
    endDate: undefined,
    colour: "bg-blue-500",
    blurb:
      "Foundational Azure: core services, pricing models, governance, and how the platform fits together - useful context when I design or deploy cloud-backed work.",
    highlights: [] as string[],
  },
} satisfies Record<CertificationId, ExperienceContent>;

export const certifications: readonly ExperienceContent[] =
  CERTIFICATION_IDS.map((id) => certificationsById[id]);
