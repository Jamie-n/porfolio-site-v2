export const WORKING_STYLE_IDS = [
  "feedbackLoops",
  "maintainableSystems",
  "interfaceCraft",
  "reliability",
] as const;

export type WorkingStyleId = (typeof WORKING_STYLE_IDS)[number];

export type WorkingStyleRow = {
  label: string;
  body: string;
};

const workingStyleById = {
  feedbackLoops: {
    label: "Feedback loops",
    body: "I prefer small, production‑shaped slices - measurable changes that can be rolled back cleanly.",
  },
  maintainableSystems: {
    label: "Maintainable systems",
    body: "I keep the core boring: clear boundaries, predictable data flow, and fewer \u201cclever\u201d moving parts.",
  },
  interfaceCraft: {
    label: "Interface craft",
    body: "I bias toward hierarchy and restraint: readable type, clear spacing, and interactions that don't shout.",
  },
  reliability: {
    label: "Reliability",
    body: "I lean on guardrails over heroics: linting, targeted tests, and failure states that degrade gracefully.",
  },
} satisfies Record<WorkingStyleId, WorkingStyleRow>;

export const workingStyle: readonly WorkingStyleRow[] = WORKING_STYLE_IDS.map(
  (id) => workingStyleById[id],
);

export const workingStyleChips = [
  "ship proofs, not prototypes",
  "crisp hierarchy",
  "AI as a multiplier (with taste)",
] as const;

export const aboutIntro = {
  lead: "I'm a pragmatic full‑stack engineer focused on turning messy, real‑world constraints into clean systems and crisp interfaces. I care about fast feedback loops, maintainable code, and UI details that hold up in production.",
  codeLine: {
    before: "Code and experiments live on ",
    linkText: "GitHub",
    href: "https://github.com/Jamie-n",
    after: ".",
  },
} as const;
