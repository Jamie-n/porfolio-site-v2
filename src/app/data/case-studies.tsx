import ChrisBradbrook from "@/app/sections/projects/ChrisBradbrook";
import PatientLeafletRepository from "@/app/sections/projects/PatientLeafletRepository";
import {
  caseStudyLinkButtonClassName,
  type CaseStudyCardProps,
} from "@/app/components/CaseStudyCard";
import CustomAnchor from "@/app/components/display/CustomAnchor";
import { OpenJourneyOverlayButton } from "@/app/components/JourneyOverlay";

export const CASE_STUDY_IDS = [
  "portfolio",
  "chris-bradbrook",
  "patient-leaflet-repository",
] as const;

export type CaseStudyId = (typeof CASE_STUDY_IDS)[number];

export type CaseStudyFields = {
  title: string;
  meta: string;
  chips: readonly string[];
  summary: string;
  bullets: readonly string[];
};

export type CaseStudyContent = { id: CaseStudyId } & CaseStudyFields;

const caseStudyCopy = {
  portfolio: {
    title: "This portfolio",
    meta: "Personal project · 2025",
    chips: [
      "end‑to‑end rebuild",
      "Next.js + design system",
      "AI‑assisted · human‑owned",
    ],
    summary:
      "I reimagined my Laravel portfolio in Next.js - same intent, clearer architecture and craft, with an editorial design system and AI‑assisted delivery kept under human direction, taste, and review.",
    bullets: [
      "I moved requirements, IA, and the front end together - not a reskin on old foundations.",
      "Print/editorial brutalism lives in tokens and components so the look scales without one‑offs.",
      "Plan → build → test → refine, with guardrails so generated work stays shippable and maintainable.",
    ],
  },
  "chris-bradbrook": {
    title: "Commercial WordPress site",
    meta: "Chris Bradbrook · 2025",
    chips: [
      "end‑to‑end delivery",
      "WordPress + custom theme",
      "Figma → build → deploy",
    ],
    summary:
      "I took a celebrant site from brief through Figma, custom WordPress theme, deployment, and handoff - responsive, production‑ready, and owned end to end.",
    bullets: [
      "I turned the brief and constraints into IA and a visual system before writing theme code.",
      "Responsive layouts and clear component boundaries - customisation only where it paid off.",
      "Tight client loops through launch: predictable milestones, steady go‑live, no last‑minute surprises.",
    ],
  },
  "patient-leaflet-repository": {
    title: "Patient Leaflet Repository",
    meta: "Calderdale & Huddersfield NHS Foundation Trust · 2022",
    chips: [
      "rebuild & migration",
      "central leaflet platform",
      "staff + public access",
    ],
    summary:
      "I helped build and evolve a Trust-wide platform to store, search, and maintain patient information leaflets. The hard part was a **rebuild and migration**: clearer architecture and a safer content lifecycle without losing day‑to‑day usability for clinicians or the public site.",
    bullets: [
      "I followed a migration path: inventory legacy content, normalise structure, and cut over with rollback in mind.",
      "Single place for governed leaflets - upload, versioning, and discovery so departments stay aligned.",
      "Dual audience: staff workflows for upkeep and a public‑facing surface that stays readable and trustworthy.",
    ],
  },
} satisfies Record<CaseStudyId, CaseStudyFields>;

export const caseStudies: readonly CaseStudyContent[] = CASE_STUDY_IDS.map(
  (id) => ({ id, ...caseStudyCopy[id] }),
);

export type CaseStudyUi = {
  footer?: CaseStudyCardProps["footer"];
  appendix?: CaseStudyCardProps["appendix"];
};

const journeyButtonClassName =
  "border border-border bg-background px-4 py-3 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const caseStudyUi = {
  portfolio: {
    footer: (
      <OpenJourneyOverlayButton className={journeyButtonClassName}>
        Read the build journey
      </OpenJourneyOverlayButton>
    ),
  },
  "chris-bradbrook": {
    footer: (
      <CustomAnchor
        href="https://chrisbradbrook.com"
        target="_blank"
        rel="noopener noreferrer"
        className={caseStudyLinkButtonClassName}
      >
        Visit chrisbradbrook.com
      </CustomAnchor>
    ),
    appendix: { label: "Screens", children: <ChrisBradbrook /> },
  },
  "patient-leaflet-repository": {
    footer: (
      <CustomAnchor
        href="https://plr.cht.nhs.uk/"
        target="_blank"
        rel="noopener noreferrer"
        className={caseStudyLinkButtonClassName}
      >
        Visit plr.cht.nhs.uk
      </CustomAnchor>
    ),
    appendix: { label: "Screens", children: <PatientLeafletRepository /> },
  },
} satisfies Record<CaseStudyId, CaseStudyUi>;
