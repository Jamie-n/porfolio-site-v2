export type ExperienceContent = {
  title: string;
  company: string;
  startDate: number;
  endDate: number | undefined | null;
  colour: string;
  blurb: string;
  highlights: string[];
};

type Experiences = "the-curve" | "chft" | "apple-designs";
type OtherExperiences = "media-and-merch" | "jd-wetherspoon";

/** Sort by newest `startDate` first; ties broken by id for stable output. */
function sortExperienceIdsByStartDateDesc<T extends string>(
  ids: readonly T[],
  record: Record<T, ExperienceContent>,
): readonly T[] {
  return [...ids].sort((a, b) => {
    const delta = record[b].startDate - record[a].startDate;
    return delta !== 0 ? delta : a.localeCompare(b);
  });
}

const MAIN_IDS_UNORDERED = [
  "the-curve",
  "chft",
  "apple-designs",
] as const satisfies readonly Experiences[];

const OTHER_IDS_UNORDERED = [
  "media-and-merch",
  "jd-wetherspoon",
] as const satisfies readonly OtherExperiences[];

const experiences: Record<Experiences, ExperienceContent> = {
  "the-curve": {
    title: "Software Engineer",
    company: "The Curve",
    startDate: 2024,
    endDate: undefined,
    colour: "bg-red-500",
    blurb:
      "Software engineer at The Curve, a consultancy where I ship pragmatic solutions with clients and partners. I spend my time clarifying what actually needs building, owning features across the stack, and helping junior and offshore developers stay unblocked - without losing sight of quality, usability, or how work lands in production.",
    highlights: [
      "I partner with clients and external organisations on complex delivery - turning pain points into clear requirements and incremental releases.",
      "I mentor junior and offshore teammates through pairing and reviews, and I keep handoffs explicit so scope doesn’t drift.",
      "I own features end to end with a bias toward maintainable code, sensible UX, and releases that can be rolled back cleanly.",
      "I bridge stakeholders and engineering: surfacing risks early and keeping expectations aligned with what we ship.",
      "I help shape technical direction inside teams - approach, sequencing, and trade-offs that fit the business constraint.",
      "I stay in refactors, code review, and continuous improvement alongside day-to-day feature work.",
    ],
  },
  chft: {
    title: "Web Developer",
    company: "The Health Informatics Service",
    startDate: 2022,
    endDate: 2024,
    colour: "bg-blue-500",
    blurb:
      "Web developer with the Health Informatics Service, supporting Calderdale & Huddersfield NHS Foundation Trust and partner organisations. I replaced fragile paper and legacy surfaces with dependable web tools - always with an eye on what clinical and operational staff need at the point of use.",
    highlights: [
      "Designed and delivered a return-to-work system that replaced a paper accident-and-absence process; it became the Trust’s default channel for reporting.",
      "Built and evolved the CHFT Patient Leaflet Repository so consultants can find accurate, governed leaflets in one place.",
      "Led the overhaul of an end-of-life training system for an external partner, from discovery through cutover.",
    ],
  },
  "apple-designs": {
    title: "Freelance Application Developer",
    company: "Apple Designs Ltd",
    startDate: 2023,
    endDate: 2023,
    colour: "bg-green-500",
    blurb:
      "Freelance engagement where I owned technical direction and delivery for a bespoke mobile app for a small-business client. I translated day-to-day operations into a focused product, kept communication tight, and shipped on a timeline we could both trust.",
    highlights: [
      "Set technical direction and shipped end-to-end features for a startup-style mobile product.",
      "Delivered bespoke web work for small businesses with clear boundaries and predictable milestones.",
      "Ran requirements, client communication, and sequencing so releases stayed manageable.",
    ],
  },
};

const otherExperiences: Record<OtherExperiences, ExperienceContent> = {
  "media-and-merch": {
    title: "Media and Merchandise Secretary",
    company: "Huddersfield University Snowsports Society",
    startDate: 2023,
    endDate: 2024,
    colour: "bg-blue-500",
    blurb:
      "Volunteered as media and merchandise secretary - keeping social channels cohesive, working with brand partners on kit and promo, and making sure what we published actually looked like the same club.",
    highlights: [
      "Maintained a consistent visual identity across social channels.",
      "Collaborated with sponsors on squad uniforms, club merchandise, and promotional drops.",
      "Ran campaigns that lifted engagement and made the society easier to recognise on campus.",
    ],
  },
  "jd-wetherspoon": {
    title: "Shift Leader",
    company: "JD Wetherspoon",
    startDate: 2017,
    endDate: 2019,
    colour: "bg-black",
    blurb:
      "Before I moved into engineering full time, I led shifts in a high-volume pub: opening and closing, cash handling, and keeping service steady when the floor was full.",
    highlights: [
      "Led shifts and supported the team during busy service.",
      "Accountable for opening and closing, cash procedures, and a consistent customer experience.",
    ],
  },
};

export const EXPERIENCE_IDS = sortExperienceIdsByStartDateDesc(
  MAIN_IDS_UNORDERED,
  experiences,
);

export const OTHER_EXPERIENCE_IDS = sortExperienceIdsByStartDateDesc(
  OTHER_IDS_UNORDERED,
  otherExperiences,
);

export const experienceList: readonly ExperienceContent[] = EXPERIENCE_IDS.map(
  (id) => experiences[id],
);

export const otherExperienceList: readonly ExperienceContent[] =
  OTHER_EXPERIENCE_IDS.map((id) => otherExperiences[id]);
