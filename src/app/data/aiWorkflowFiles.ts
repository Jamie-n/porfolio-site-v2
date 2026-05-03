import type { SkillFileItem } from "@/app/components/SkillFileBrowser";

export const aiWorkflowFiles: SkillFileItem[] = [
  {
    id: "ai-workflow-notes",
    title: "AI workflow notes",
    path: "/content/ai-workflow/workflow.md",
  },

  // Plans (what we decided to build)
  {
    id: "plan-journey-ai",
    title: "Plan: Journey + AI workflow section",
    path: "/api/raw/.cursor/plans/journey_+_ai_workflow_section_a4c04479.plan.md",
  },
  {
    id: "plan-roadmap-2026",
    title: "Plan: Portfolio site roadmap 2026",
    path: "/api/raw/.cursor/plans/portfolio_site_roadmap_2026_5434d5fd.plan.md",
  },
  {
    id: "plan-premium-ui-polish",
    title: "Plan: Premium UI styling polish",
    path: "/api/raw/.cursor/plans/premium_ui_styling_polish_e66ae2b2.plan.md",
  },

  // Skills (how we implemented)
  {
    id: "skill-nextjs-app-router-project",
    title: "Skill: Next.js App Router project conventions",
    path: "/api/raw/.cursor/skills/nextjs-app-router-project/SKILL.md",
  },
  {
    id: "skill-portfolio-design-style",
    title: "Skill: Portfolio design style",
    path: "/api/raw/.cursor/skills/portfolio-design-style/SKILL.md",
  },
  {
    id: "skill-testing-vitest-playwright",
    title: "Skill: Testing (Vitest + Playwright)",
    path: "/api/raw/.cursor/skills/testing-vitest-playwright/SKILL.md",
  },
  {
    id: "skill-nextjs-performance-a11y",
    title: "Skill: Next.js performance + a11y",
    path: "/api/raw/.cursor/skills/nextjs-performance-a11y/SKILL.md",
  },
  {
    id: "skill-repo-tooling-hygiene",
    title: "Skill: Repo tooling hygiene",
    path: "/api/raw/.cursor/skills/repo-tooling-hygiene/SKILL.md",
  },

  // CI (automated backstop)
  {
    id: "ci-workflow",
    title: "CI workflow (GitHub Actions)",
    path: "/api/raw/.github/workflows/ci.yml",
  },
];
