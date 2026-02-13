export type ExperienceContent = {
  title: string;
  company: string;
  startDate: number;
  endDate: number | undefined | null;
  colour: string;
  blurb: string;
  highlights: string[];
};

type Experiences = "the-curve" | "chft" | "apple-designs" | "js-wetherspoon";
type OtherExperiences = "media-and-merch";

export const experiences: Record<Experiences, ExperienceContent> = {
  "the-curve": {
    title: "Software Engineer",
    company: "The Curve",
    startDate: 2024,
    endDate: undefined,
    colour: "bg-red-500",
    blurb:
      "Delivering pragmatic software solutions in a fast-paced consultancy environment through close collaboration with clients and partner organisations to solve complex business challenges. Leveraging strong technical leadership and communication skills to shape implementation approaches, guide junior and offshore developers, and translate stakeholder pain points into scalable, high-quality digital solutions delivered across the full development lifecycle.",
    highlights: [
      "Worked closely with partner organisations to deliver technical solutions to complex business problems",
      "Provided technical guidance and support to junior developers and offshore team members",
      "Helped shape technical approaches and implementation decisions within project teams",
      "Communicated directly with clients to identify pain points and process blockers, translating them into actionable technical requirements",
      "Assisted in leading multiple digital transformation initiatives from design through implementation",
      "Took ownership of features across the full development lifecycle, with a specific focus on quality, usability and maintainability",
      "Contributed to code reviews, refactoring efforts, and continuous improvements",
      "Acted as a technical bridge between stakeholders and development teams to ensure clear communication and smooth delivery",
    ],
  },
  chft: {
    title: "Web Developer",
    company: "The Health Informatics Service",
    startDate: 2022,
    endDate: 2024,
    colour: "bg-blue-500",
    blurb:
      "Collaborated with Calderdale & Huddersfield Foundation NHS Trust (CHFT) and partner healthcare organisations to deliver innovative digital maturity solutions that enhanced operational efficiency. Leveraged technical expertise and strong collaborative skills to bridge the gap between healthcare requirements and effective, solution-aligned delivery.",
    highlights: [
      "Conducted the design and delivery of a return to work system, replacing an existing paper process. This system is now the de facto application for reporting workplace accidents & absences across the trust.",
      "Designed and developed the CHFT Patient leaflet repository to help streamline leaflet management and help consultants access the correct up-to-date information.",
      "Led a successful overhaul of an end-of-life training system for an external partner.",
    ],
  },
  "apple-designs": {
    title: "Freelance Application Developer",
    company: "Apple Designs Ltd",
    startDate: 2023,
    endDate: 2023,
    colour: "bg-green-500",
    blurb:
      "Led technical direction and end-to-end feature delivery, delivering a bespoke start up mobile application tailored to the operational needs of a small business client. Leveraging strong technical expertise and client-facing communication skills to translate business requirements a scalable, high-quality digital solutions delivered on time.",
    highlights: [
      "Led technical direction and feature delivery for client projects",
      "Delivered bespoke web applications for small business clients",
      "Managed client communication, requirements gathering, and delivery timelines",
    ],
  },
  "js-wetherspoon": {
    title: "Shift Leader",
    company: "JD Wetherspoon",
    startDate: 2017,
    endDate: 2019,
    colour: "bg-black",
    blurb:
      "Led shift operations and supported team members within a fast-paced, customer-focused environment, ensuring smooth daily service delivery and high performance standards. Leveraging strong organisational skills and accountability to manage opening and closing procedures, cash handling responsibilities, and deliver a consistently positive customer experience.",
    highlights: [
      "Led shifts and supported team members in a fast-paced environment",
      "Responsible for opening/closing duties, cash handling, and customer experience",
    ],
  },
};

export const otherExperiences: Record<OtherExperiences, ExperienceContent> = {
  "media-and-merch": {
    title: "Media and Merchandise Secretary",
    company: "Huddersfield University Snowsports Society",
    startDate: 2023,
    endDate: 2024,
    colour: "bg-blue-500",
    blurb:
      "Created and maintained a unified brand presence across all social media platforms, actively driving engagement and collaborating closely with brand partners. Leveraged design and promotional expertise to deliver high-quality merchandise, promotional items, and branded apparel that strengthened audience connection and visibility.",

    highlights: [
      "Developed and maintained a consistent visual identity across all social media channels.",
      "Worked closely with brand partners to design and produce promotional and merchandise items, including competition squad uniforms and club merchandise.",
      "Implemented strategies that actively increased audience engagement and brand recognition.",
    ],
  },
};
