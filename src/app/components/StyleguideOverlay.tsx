"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import Homepage from "@/assets/chris-bradbrook/hero.png";
import Accordion from "./accordion/Accordion";
import ExperienceAccordion from "./accordion/ExperienceAccordion";
import CaseStudyCard, { caseStudyLinkButtonClassName } from "./CaseStudyCard";
import AiLoopFlowchart from "./AiLoopFlowchart";
import Flowchart from "./Flowchart";
import DarkModeToggle from "./DarkModeToggle";
import BrutalScreenshot from "./display/BrutalScreenshot";
import CustomAnchor from "./display/CustomAnchor";
import Header from "./Header";
import Markdown from "./Markdown";
import { OpenJourneyOverlayButton } from "./JourneyOverlay";
import NavItem from "./nav/NavItem";
import Reveal from "./Reveal";
import SkillCategoryUsageGroups from "./SkillCategoryUsageGroups";
import SkillFileBrowser, { type SkillFileItem } from "./SkillFileBrowser";
import Toggle from "./Toggle";
import { BruText } from "./primitives/BruText";
import { Offcanvas } from "./overlay/Offcanvas";
import { OverlayStickyHeader } from "./overlay/OverlayStickyHeader";
import { OverlayTriggerCard } from "./overlay/OverlayTriggerCard";

const styleguideFileBrowserItems: SkillFileItem[] = [
  {
    id: "styleguide-ai-workflow",
    title: "AI workflow notes",
    path: "/content/ai-workflow/workflow.md",
  },
  {
    id: "styleguide-journey-overview",
    title: "Journey overview",
    path: "/content/journey/overview.md",
  },
];

const demoSkillsForStyleguide = [
  { name: "TypeScript", usage: "Daily" as const },
  { name: "React", usage: "Daily" as const },
  { name: "Playwright", usage: "Regular" as const },
  { name: "Rust", usage: "Exploring" as const },
];

const demoMarkdownSample = `## Markdown preview

A **short** sample with a [link](https://example.com) and \`inline code\`.

\`\`\`ts
const ok = true;
\`\`\`
`;

interface StyleguideOverlayProps {
  triggerLabel?: string;
}

const styleguideTokens = [
  { name: "background", css: "--background", previewClass: "bg-background" },
  { name: "surface", css: "--surface", previewClass: "bg-surface" },
  { name: "foreground", css: "--foreground", previewClass: "bg-foreground" },
  { name: "muted", css: "--muted", previewClass: "bg-muted" },
  { name: "border", css: "--border", previewClass: "bg-border" },
  { name: "accent", css: "--accent", previewClass: "bg-accent" },
  { name: "accent weak", css: "--accent-weak", previewClass: "bg-accent-weak" },
  { name: "ring", css: "--ring", previewClass: "bg-ring" },
];

function StyleguideSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-10 ${className}`.trim()}>
      <BruText as="h2" variant="label">
        {title}
      </BruText>
      {children}
    </section>
  );
}

function StyleguidePanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-4 bru-panel px-6 py-5 ${className}`.trim()}>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-3 py-3 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6">
      <BruText variant="label" className="sm:pt-0.5">
        {label}
      </BruText>
      <BruText variant="body" className="text-foreground">
        {value}
      </BruText>
    </div>
  );
}

function StyleguideChapter({
  className,
  eyebrow,
  title,
  description,
}: {
  className?: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        "mt-14 scroll-mt-8 border-t border-rulesolid pt-10",
        className,
      )}
    >
      <BruText as="p" variant="label">
        {eyebrow}
      </BruText>
      <BruText as="h2" variant="displayH2" className="mt-2 text-balance">
        {title}
      </BruText>
      {description ? (
        <BruText as="p" variant="proseMuted" className="mt-3 max-w-[72ch]">
          {description}
        </BruText>
      ) : null}
    </div>
  );
}

const panelTransitionMs = 360;

export default function StyleguideOverlay({
  triggerLabel = "Styleguide",
}: StyleguideOverlayProps) {
  const [open, setOpen] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const [restoreFocusOnClose, setRestoreFocusOnClose] = useState(false);
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const openOverlay = (openedByKeyboard = false) => {
    setRestoreFocusOnClose(openedByKeyboard);
    setOpen(true);
  };

  const requestClose = () => setOpen(false);

  return (
    <>
      <OverlayTriggerCard
        eyebrow="Reference"
        title={triggerLabel}
        onOpen={openOverlay}
      />

      <Offcanvas
        open={open}
        onOpenChange={setOpen}
        labelledBy={titleId}
        transitionMs={panelTransitionMs}
        initialFocusRef={closeButtonRef}
        restoreFocus={restoreFocusOnClose}
        panelClassName="max-w-[880px]"
      >
        <div className="flex h-dvh flex-col">
          <OverlayStickyHeader
            labelledBy={titleId}
            label="Design language"
            title="Brutalist styleguide"
            closeButtonRef={closeButtonRef}
            onClose={requestClose}
          />

          <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-6 sm:px-8 pb-10 pt-6">
            <StyleguideChapter
              className="mt-8 border-t-0 pt-0"
              eyebrow="I. Foundations"
              title="Tokens, typography, spacing"
              description="Read in this order: semantic colour tokens, then typography (recipes and scale), then spacing rhythm. Later sections build on these primitives."
            />

            <StyleguideSection title="Tokens">
              <StyleguidePanel className="py-0 px-0">
                <div className="bru-divide-y">
                  {styleguideTokens.map((t) => (
                    <div
                      key={t.css}
                      className="grid grid-cols-1 gap-3 px-6 py-3 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6 sm:items-center"
                    >
                      <div className="bru-label sm:pt-0.5">{t.name}</div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div
                          className={cn(
                            "h-6 w-10 shrink-0 border border-border",
                            t.previewClass,
                          )}
                        />
                        <div className="font-mono text-[0.8125rem] text-foreground/68">
                          {t.css}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Typography">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Recipes name the roles you pair in UI; scale shows the steps
                from display through body and captions. Keep headings tight and
                body copy within a comfortable measure.
              </p>
              <div className="mt-6 grid gap-8">
                <div>
                  <div className="bru-label">Recipes</div>
                  <StyleguidePanel className="mt-3 py-0 px-0">
                    <div className="bru-divide-y px-6">
                      <Row
                        label="Display"
                        value={<div className="bru-h1">City</div>}
                      />
                      <Row
                        label="Signage"
                        value={
                          <div className="bru-h3 text-foreground/70">
                            Wild Fire City
                          </div>
                        }
                      />
                      <Row
                        label="Metadata"
                        value={<div className="bru-label">104 High St. W</div>}
                      />
                      <Row
                        label="Body"
                        value={
                          <p className="bru-body max-w-[72ch]">
                            Strong hierarchy, tight tracking in headers, and
                            readable editorial line-length for paragraphs.
                          </p>
                        }
                      />
                    </div>
                  </StyleguidePanel>
                </div>
                <div>
                  <div className="bru-label">Scale</div>
                  <StyleguidePanel className="mt-3">
                    <div className="grid gap-6">
                      <div className="grid gap-1">
                        <div className="bru-label">Display / H1</div>
                        <div className="bru-h1">Brutal City</div>
                      </div>

                      <div className="grid gap-1 border-t border-rulesolid pt-6">
                        <div className="bru-label">H2</div>
                        <div className="bru-h2">Section heading</div>
                      </div>

                      <div className="grid gap-1 border-t border-rulesolid pt-6">
                        <div className="bru-label">H3 / panel title</div>
                        <div className="bru-h3">Panel title</div>
                      </div>

                      <div className="grid gap-2 border-t border-rulesolid pt-6">
                        <div className="bru-label">Body</div>
                        <p className="bru-body max-w-[72ch]">
                          Strong hierarchy, tight tracking in headers, and an
                          editorial line-length for paragraphs. Keep body text
                          readable in both light and dark themes.
                        </p>
                        <p className="bru-body-muted max-w-[72ch]">
                          Muted body is for supporting copy, secondary metadata,
                          and less important detail.
                        </p>
                      </div>

                      <div className="grid gap-1 border-t border-rulesolid pt-6">
                        <div className="bru-label">Metadata / caption</div>
                        <div className="bru-label">104 High St. W - 2026</div>
                      </div>

                      <div className="grid gap-2 border-t border-rulesolid pt-6">
                        <div className="bru-label">
                          Compact label (hero strips)
                        </div>
                        <div className="flex flex-wrap gap-6 border border-rulesolid bg-background/50 px-4 py-3">
                          <span className="bru-label-compact text-foreground/70">
                            imprint
                          </span>
                          <span className="bru-label-compact text-foreground/70">
                            edition 2026
                          </span>
                        </div>
                      </div>
                    </div>
                  </StyleguidePanel>
                </div>
              </div>
            </StyleguideSection>

            <StyleguideSection title="Spacing & layout rhythm">
              <StyleguidePanel>
                <div className="grid gap-6">
                  <p className="bru-prose-muted max-w-[80ch]">
                    Use a small set of repeatable spacing steps. Panels
                    typically use 20–24px padding; section separators use a thin
                    rule plus a label.
                  </p>
                  <div className="grid gap-3 border-t border-rulesolid pt-6">
                    <div className="bru-label">Spacing steps (px)</div>
                    <div className="flex flex-wrap items-end gap-6">
                      {[4, 8, 12, 16, 24, 32, 48].map((n) => (
                        <div key={n} className="grid gap-2">
                          <div
                            className="w-10 border border-border bg-background"
                            style={{ height: `${n}px` }}
                          />
                          <div className="bru-label text-center">{n}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideChapter
              eyebrow="II. Patterns"
              title="Visual language, layout, and interaction"
              description="Motifs and colour sit on the token base. Case study cards, navigation, forms, motion, iconography, writing style, and components follow."
            />

            <StyleguideSection title="Motifs">
              <StyleguidePanel className="py-4 sm:py-5">
                <p className="bru-prose max-w-[80ch]">
                  Boxed panels, subtle grid overlays, vertical/metadata labels,
                  high contrast neutrals, and crisp physical hover motion.
                  Accent red is reserved for interactive states and key
                  hierarchy moments.
                </p>
                <div className="mt-6 border-t border-rulesolid pt-6 grid gap-3">
                  <div className="bru-label">
                    Hero / print surfaces (live site)
                  </div>
                  <ul className="m-0 list-disc pl-5 bru-prose-muted max-w-[80ch] space-y-1">
                    <li>
                      <span className="text-foreground/80 font-medium">
                        bru-label-compact
                      </span>{" "}
                      - imprint strips and microcopy in tight rails.
                    </li>
                    <li>
                      <span className="text-foreground/80 font-medium">
                        halftone
                      </span>{" "}
                      and{" "}
                      <span className="text-foreground/80 font-medium">
                        reg-marks
                      </span>{" "}
                      - texture overlays on the hero portrait card.
                    </li>
                    <li>
                      Dashed frame:{" "}
                      <code className="font-mono text-[0.8125rem]">
                        border-dashed
                      </code>{" "}
                      outer rule with a slight{" "}
                      <code className="font-mono text-[0.8125rem]">
                        group-hover:rotate-1
                      </code>{" "}
                      on the hero stack.
                    </li>
                    <li>
                      Strips:{" "}
                      <code className="font-mono text-[0.8125rem]">
                        bg-background/80 backdrop-blur-sm
                      </code>{" "}
                      for top/bottom imprint bars on the portrait.
                    </li>
                  </ul>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Color & contrast">
              <StyleguidePanel>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="bru-label">Foreground on background</div>
                    <div className="text-sm leading-7">
                      <span className="text-foreground">Primary text </span>
                      <span className="text-muted">Muted text </span>
                      <a
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="text-muted hover:text-accent transition-colors duration-200"
                      >
                        Link hover accent
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-rulesolid pt-6">
                    <div className="bru-label">Accent usage</div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 border border-border px-3 py-2 bru-button">
                        Neutral
                      </span>
                      <span className="inline-flex items-center gap-2 border border-border bg-accent-weak px-3 py-2 bru-button">
                        Accent weak
                      </span>
                      <span className="inline-flex items-center gap-2 border border-border px-3 py-2 bru-button text-accent">
                        Accent text
                      </span>
                    </div>
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Case study card">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Projects use this panel: eyebrow, title, optional meta line,
                three metadata chips, muted summary, ruled bullet list, CTA row,
                and an optional appendix (for example a screenshot grid).
              </p>
              <CaseStudyCard
                className="mt-6 mb-0"
                title="Example shipped product"
                meta="Client ltd · 2024"
                chips={["Next.js · App Router", "RBAC", "design tokens"]}
                summary={
                  <p>
                    Two sentences max: what shipped, for whom, and the
                    constraint that mattered most.
                  </p>
                }
                bullets={[
                  "Framed the problem before touching the stack-clear success criteria and rollback.",
                  "Cut scope into shippable slices so review stayed honest and timelines stayed credible.",
                  "Chose boring foundations where possible; complexity only where it earned rent.",
                ]}
                footer={
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={caseStudyLinkButtonClassName}
                  >
                    Visit live site
                  </a>
                }
                appendix={{
                  label: "Screens",
                  children: (
                    <p className="bru-body-muted text-sm leading-relaxed">
                      Appendix slot: screenshot grid, diagrams, or repository
                      notes.
                    </p>
                  ),
                }}
              />
            </StyleguideSection>

            <StyleguideSection title="Interaction">
              <StyleguidePanel className="py-0 px-0">
                <div className="bru-divide-y px-6">
                  <Row
                    label="Timing"
                    value="Default transitions: 150–200ms, ease-out."
                  />
                  <Row
                    label="Hover"
                    value="A 1px nudge plus border/rule emphasis (avoid heavy fades)."
                  />
                  <Row
                    label="Focus"
                    value="Always visible ring via `:focus-visible` and the `--ring` token."
                  />
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Navigation states">
              <StyleguidePanel>
                <div className="bru-label">Default / active recipes</div>
                <div className="mt-4 border border-rulesolid bru-divide-y bg-background/40">
                  <div className="flex items-center gap-3 py-3 px-4">
                    <span className="h-5 w-px shrink-0 bg-border" />
                    <span className="bru-h3">01. Default item</span>
                  </div>
                  <div className="flex items-center gap-3 py-3 px-4">
                    <span className="h-5 w-px shrink-0 bg-accent" />
                    <span className="bru-h3 text-accent">02. Active item</span>
                  </div>
                  <div className="flex items-center gap-3 py-3 px-4 group">
                    <span className="h-5 w-px shrink-0 bg-border transition-colors duration-200 ease-out group-hover:bg-accent" />
                    <span className="bru-h3 transition-all duration-200 ease-out group-hover:text-accent group-hover:-translate-y-[1px]">
                      03. Hover item
                    </span>
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Form controls">
              <StyleguidePanel>
                <div className="grid gap-6">
                  <label className="grid gap-2">
                    <span className="bru-label">Input</span>
                    <input
                      type="text"
                      placeholder="Type here…"
                      className="w-full border border-border bg-background px-4 py-3 text-sm shadow-rule placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                  </label>

                  <label className="grid gap-2 border-t border-rulesolid pt-6">
                    <span className="bru-label">Textarea</span>
                    <textarea
                      rows={3}
                      placeholder="Longer message…"
                      className="w-full border border-border bg-background px-4 py-3 text-sm shadow-rule placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                  </label>

                  <label className="grid gap-2 border-t border-rulesolid pt-6">
                    <span className="bru-label">Select</span>
                    <select className="w-full border border-border bg-background px-4 py-3 text-sm shadow-rule focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      <option>Option A</option>
                      <option>Option B</option>
                      <option>Option C</option>
                    </select>
                  </label>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Panels & elevation">
              <StyleguidePanel>
                <div className="grid gap-4">
                  <div className="border border-rulesolid bg-background/50 px-5 py-4">
                    <div className="bru-label">Standard panel</div>
                    <p className="mt-2 bru-prose-muted">
                      Border-led structure with minimal elevation.
                    </p>
                  </div>
                  <div className="border border-rulesolid bg-accent-weak px-5 py-4">
                    <div className="bru-label">Accent panel</div>
                    <p className="mt-2 bru-prose-muted">
                      Weak accent wash for interactive or highlight moments.
                    </p>
                  </div>
                  <div className="border-2 border-rulesolid bg-background px-5 py-4 shadow-rule">
                    <div className="bru-label">Emphasis rule (2px)</div>
                    <p className="mt-2 bru-prose-muted">
                      Use sparingly for the strongest hierarchy.
                    </p>
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Motion">
              <StyleguidePanel>
                <p className="bru-prose-muted max-w-[80ch]">
                  Prefer 150–200ms ease-out. Hover is a 1px nudge plus rule
                  emphasis (avoid heavy fades).
                </p>
                <div className="mt-6 flex flex-wrap gap-4 border-t border-rulesolid pt-6">
                  <button
                    type="button"
                    className="border border-border bg-background px-4 py-3 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Hover nudge
                  </button>
                  <button
                    type="button"
                    className="border border-border bg-background px-4 py-3 bru-button shadow-rule transition-colors duration-200 ease-out hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Color shift
                  </button>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Iconography">
              <StyleguidePanel className="py-0 px-0">
                <div className="bru-divide-y">
                  <div className="px-6 py-5">
                    <div className="bru-label">Stroke icons (UI chrome)</div>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                      <button
                        type="button"
                        className="grid shrink-0 place-items-center border border-border bg-background h-10 w-10 shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label="Example stroke icon control"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      </button>
                      <p className="bru-prose-muted max-w-[72ch] m-0">
                        Boxed controls:{" "}
                        <span className="text-foreground/85 font-medium">
                          20×20px
                        </span>{" "}
                        glyph in a{" "}
                        <span className="text-foreground/85 font-medium">
                          40×40px
                        </span>{" "}
                        hit area,{" "}
                        <span className="text-foreground/85 font-medium">
                          strokeWidth 1.5
                        </span>
                        , round caps/joins - same hover and focus recipes as
                        bordered buttons.
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-5">
                    <div className="bru-label">
                      Inline social (16×16, fill) - live site
                    </div>
                    <p className="mt-3 bru-prose-muted max-w-[80ch] m-0">
                      Sidebar and hero reuse identical GitHub and LinkedIn
                      marks:{" "}
                      <code className="font-mono text-[0.8125rem]">
                        fill=&quot;currentColor&quot;
                      </code>
                      ,{" "}
                      <code className="font-mono text-[0.8125rem]">
                        width=&quot;16&quot; height=&quot;16&quot;
                      </code>
                      , no extra wrapper - hover is{" "}
                      <code className="font-mono text-[0.8125rem]">
                        transition-all duration-200 ease-out hover:text-accent
                        hover:-translate-y-[1px]
                      </code>
                      . Icon-only anchors always set a descriptive{" "}
                      <code className="font-mono text-[0.8125rem]">
                        aria-label
                      </code>
                      .
                    </p>
                    <div className="mt-4 flex items-center gap-6">
                      <a
                        href="https://github.com/Jamie-n"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile (demo link)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="transition-all duration-200 ease-out hover:text-accent hover:-translate-y-[1px]"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/jamie-neighbours/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile (demo link)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-linkedin transition-all duration-200 ease-out hover:text-accent hover:-translate-y-[1px]"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="px-6 py-5">
                    <div className="bru-label">Arrows & marks in layout</div>
                    <p className="mt-3 bru-prose-muted max-w-[80ch] m-0">
                      Flow diagrams use the character{" "}
                      <span className="font-mono text-foreground/85">→</span>{" "}
                      inside ruled cells (see AI workflow flowchart). Hero
                      colour squares beside the monogram are bordered{" "}
                      <code className="font-mono text-[0.8125rem]">span</code>
                      s, not icon fonts - keep decorative marks in CSS/boxes
                      unless a glyph needs to scale with user font settings.
                    </p>
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Writing style">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Voice, structure, and microcopy patterns used across sections -
                align new copy with these before inventing a new tone. Cursor
                agents: project skill{" "}
                <code className="font-mono text-[0.8125rem] text-foreground/85">
                  portfolio-site-voice
                </code>{" "}
                (
                <code className="font-mono text-[0.8125rem] text-foreground/85">
                  .cursor/skills/portfolio-site-voice/SKILL.md
                </code>
                ) should stay in sync with this section.
              </p>
              <StyleguidePanel className="py-0 px-0">
                <div className="bru-divide-y px-6">
                  <Row
                    label="Point of view"
                    value={
                      <span>
                        First person, direct: intros say what you do and how you
                        work (
                        <span className="text-foreground/90">
                          “I build…”, “I bias toward…”
                        </span>
                        ). Avoid third-person bio voice in section leads.
                      </span>
                    }
                  />
                  <Row
                    label="Dialect"
                    value={
                      <span>
                        UK English where it matters (
                        <span className="text-foreground/90">
                          honours, behaviour, organisation
                        </span>
                        ). Keep product names and proper nouns as published.
                      </span>
                    }
                  />
                  <Row
                    label="Hyphens & wraps"
                    value={
                      <span>
                        For fixed compounds in UI, prefer a non-breaking hyphen
                        (<code className="font-mono text-[0.8125rem]">‑</code>
                        U+2011) so lines do not split awkwardly - e.g.{" "}
                        <span className="text-foreground/90">
                          full‑stack
                        </span>,{" "}
                        <span className="text-foreground/90">day‑to‑day</span>,{" "}
                        <span className="text-foreground/90">end‑to‑end</span>.
                      </span>
                    }
                  />
                  <Row
                    label="Section intros"
                    value={
                      <span>
                        Open with one or two short paragraphs in{" "}
                        <code className="font-mono text-[0.8125rem]">
                          bru-prose-muted
                        </code>{" "}
                        and{" "}
                        <code className="font-mono text-[0.8125rem]">
                          max-w-[72ch]
                        </code>
                        ; state scope and audience, not marketing fluff.
                      </span>
                    }
                  />
                  <Row
                    label="Portfolio narrative"
                    value={
                      <span>
                        Blurbs and leads stay{" "}
                        <span className="text-foreground/90">first person</span>
                        : say what shipped, for whom, and the trade-offs-not
                        consultancy filler (
                        <span className="text-foreground/90">
                          leveraging, solutions-oriented
                        </span>
                        , undifferentiated stakeholder paragraphs). Case studies
                        and experience highlights read like interview answers:
                        specific, not keyword-stuffed. Skills and certifications
                        explain structure honestly (e.g. frequency in real work,
                        not implied proficiency scores). Journey markdown, meta
                        descriptions, and overlay helper text use the same
                        direct voice.
                      </span>
                    }
                  />
                  <Row
                    label="Rails & eyebrows"
                    value={
                      <span>
                        Panel rails use{" "}
                        <code className="font-mono text-[0.8125rem]">
                          bru-label
                        </code>
                        : short category nouns (
                        <span className="text-foreground/90">
                          Technical stack, More background, Exploring, Case
                          study, Section
                        </span>
                        ). Pair with{" "}
                        <code className="font-mono text-[0.8125rem]">
                          Header
                        </code>{" "}
                        subheading for the human-readable title (
                        <span className="text-foreground/90">
                          What I build with
                        </span>
                        , etc.).
                      </span>
                    }
                  />
                  <Row
                    label="Headlines"
                    value={
                      <span>
                        Hero and major titles: sentence case, concrete claim (
                        <code className="font-mono text-[0.8125rem]">
                          variant=&quot;title&quot;
                        </code>
                        ). In-panel headings:{" "}
                        <code className="font-mono text-[0.8125rem]">
                          variant=&quot;subheading&quot;
                        </code>
                        , title case or sentence case to match the phrase.
                      </span>
                    }
                  />
                  <Row
                    label="Chips & metadata"
                    value={
                      <span>
                        Case study chips are neutral phrases with middle dots
                        between stack tokens; meta lines stay compact (
                        <span className="text-foreground/90">
                          Client · year
                        </span>
                        ). Section spacer microtype uses caps labels with colons
                        (
                        <span className="text-foreground/90">
                          LOC:, BUILD:, STATE:
                        </span>
                        ).
                      </span>
                    }
                  />
                  <Row
                    label="Lists"
                    value={
                      <span>
                        Bullets are full sentences: lead with a capital, end
                        with a period. Highlights rows keep the same rhythm as
                        case-study bullets.
                      </span>
                    }
                  />
                  <Row
                    label="Calls to action"
                    value={
                      <span>
                        Verbs first, few words:{" "}
                        <span className="text-foreground/90">
                          View projects, See experience, Email, Visit…
                        </span>
                        . Prefer action over clever label copy on primary
                        buttons.
                      </span>
                    }
                  />
                  <Row
                    label="Numbers"
                    value={
                      <span>
                        Nav indices are zero-padded two digits (
                        <code className="font-mono text-[0.8125rem]">
                          formatIndex
                        </code>
                        → <span className="text-foreground/90">01</span>,{" "}
                        <span className="text-foreground/90">10</span>
                        ). Years in experience rails are plain numerals;
                        highlight counts use two-digit padding in rails.
                      </span>
                    }
                  />
                  <Row
                    label="Avoid"
                    value={
                      <span>
                        Hype stacks, exclamation marks in primary chrome, emoji
                        in navigation or section titles, vague superlatives
                        without a concrete claim, and résumé boilerplate (
                        <span className="text-foreground/90">
                          leveraging, utilised, demonstrates strong,
                          best-in-class
                        </span>
                        ).
                      </span>
                    }
                  />
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Content patterns">
              <StyleguidePanel>
                <div className="grid gap-8">
                  <div className="grid gap-2">
                    <div className="bru-label">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Next.js", "CI/CD"].map((t) => (
                        <span
                          key={t}
                          className="border border-border bg-background px-3 py-1 bru-tag"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-2 border-t border-rulesolid pt-8">
                    <div className="bru-label">Label/value row</div>
                    <div className="border border-rulesolid overflow-hidden rounded-none">
                      <div className="bru-divide-y px-6">
                        <Row label="Role" value="Full-stack engineer" />
                        <Row label="Location" value="UK / Remote" />
                        <Row label="Focus" value="Craft + clarity + speed" />
                      </div>
                    </div>
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Section break patterns">
              <StyleguidePanel>
                <p className="bru-prose-muted max-w-[80ch]">
                  Use these as modular layers in the divider spacer. The live
                  site spacer is offset for the fixed sidebar; styleguide
                  previews use the{" "}
                  <span className="text-foreground font-medium">
                    styleguide
                  </span>{" "}
                  wrapper to render full-width.
                </p>

                <div className="mt-6 border border-rulesolid bg-background/40 overflow-hidden">
                  <div className="bru-divide-y px-6">
                    <Row
                      label="Band"
                      value={
                        <div className="styleguide border border-border bg-background overflow-hidden">
                          <div className="section-spacer" />
                        </div>
                      }
                    />
                    <Row
                      label="Crosshair"
                      value={
                        <div className="styleguide border border-border bg-background overflow-hidden">
                          <div className="section-spacer">
                            <div
                              className="section-spacer__crosshair"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      }
                    />
                    <Row
                      label="Swatches"
                      value={
                        <div className="grid gap-2">
                          <div className="styleguide border border-border bg-background overflow-hidden">
                            <div className="section-spacer">
                              <div
                                className="section-spacer__swatches"
                                aria-hidden="true"
                              >
                                <span />
                                <span />
                                <span />
                                <span />
                              </div>
                            </div>
                          </div>
                          <div className="bru-label">
                            Set `--swatch-1`…`--swatch-4` in `globals.css`
                          </div>
                        </div>
                      }
                    />
                    <Row
                      label="Microtype"
                      value={
                        <div className="styleguide border border-border bg-background overflow-hidden">
                          <div className="section-spacer">
                            <div
                              className="section-spacer__meta"
                              aria-hidden="true"
                            >
                              <span>LOC: UK / REMOTE</span>
                              <span>BUILD: 2026</span>
                              <span>STATE: LIVE</span>
                            </div>
                          </div>
                        </div>
                      }
                    />
                    <Row
                      label="Composed"
                      value={
                        <div className="styleguide border border-border bg-background overflow-hidden">
                          <div className="section-spacer">
                            <div
                              className="section-spacer__crosshair"
                              aria-hidden="true"
                            />
                            <div
                              className="section-spacer__swatches"
                              aria-hidden="true"
                            >
                              <span />
                              <span />
                              <span />
                              <span />
                            </div>
                            <div
                              className="section-spacer__meta"
                              aria-hidden="true"
                            >
                              <span>LOC: UK / REMOTE</span>
                              <span>BUILD: 2026</span>
                              <span>STATE: LIVE</span>
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Components">
              <div className="mt-4 grid gap-4">
                <div className="bru-panel px-6 py-5">
                  <div className="bru-label">Links & buttons</div>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="bru-link text-muted hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-none"
                    >
                      Inline link
                    </a>
                    <button
                      type="button"
                      className="border border-border bg-background px-4 py-2 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Button
                    </button>
                    <button
                      type="button"
                      className="border border-border bg-accent-weak px-4 py-2 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      Accent
                    </button>
                  </div>
                </div>

                <div className="bru-panel px-6 py-5">
                  <div className="bru-label">Toggle</div>
                  <div className="mt-4">
                    <Toggle
                      disabled={true}
                      checked={demoChecked}
                      onCheckedChange={(next) => setDemoChecked(next)}
                      labels={{ left: "Off", right: "On" }}
                    />
                  </div>
                </div>

                <div className="bru-panel px-6 py-5">
                  <div className="bru-label">Accordion</div>
                  <div className="mt-4">
                    <Accordion
                      id="styleguide-accordion-demo"
                      header={
                        <div className="grid gap-1">
                          <div className="bru-acc-meta">Example</div>
                          <div className="bru-acc-title">
                            Expand for details
                          </div>
                          <div className="bru-acc-subtitle">
                            Rule-led structure, minimal noise
                          </div>
                        </div>
                      }
                    >
                      <div className="bru-prose max-w-[72ch]">
                        Panels use a thin rule, subtle grid overlay, crisp hover
                        motion, and tokenized colors so the whole UI stays
                        consistent in light/dark.
                      </div>
                    </Accordion>
                  </div>

                  <div className="mt-6 border-t border-rulesolid pt-6">
                    <div className="bru-label">
                      Accordion / highlights pattern
                    </div>
                    <div className="mt-4">
                      <Accordion
                        id="styleguide-accordion-highlights-demo"
                        header={
                          <div className="grid gap-1">
                            <div className="bru-acc-meta">Role</div>
                            <div className="bru-acc-title">Senior Engineer</div>
                            <div className="bru-acc-subtitle">
                              Spec-sheet list with index rail
                            </div>
                          </div>
                        }
                      >
                        <div className="max-w-[72ch] border border-rulesolid border-l-2 border-l-accent bg-background/55 shadow-rule">
                          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rulesolid px-4 py-2.5">
                            <div className="bru-label">Highlights</div>
                            <span className="bru-acc-meta" aria-hidden="true">
                              03
                            </span>
                          </div>
                          <ol className="m-0 list-none divide-y divide-rulesolid p-0">
                            {[
                              "Shipped a feature end-to-end with crisp UI + tests.",
                              "Reduced load time by simplifying layout layers.",
                              "Built a reusable pattern for structured content.",
                            ].map((t, idx) => (
                              <li
                                key={idx}
                                className="grid grid-cols-[2.75rem_minmax(0,1fr)] divide-x divide-rulesolid"
                              >
                                <div className="flex items-start justify-center bg-background/35 px-2 py-3 bru-acc-meta text-foreground/45">
                                  {String(idx + 1).padStart(2, "0")}
                                </div>
                                <p className="m-0 px-4 py-3 bru-prose max-w-none">
                                  {t}
                                </p>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </StyleguideSection>

            <StyleguideChapter
              eyebrow="III. Application"
              title="Components used on the live site"
              description="These are the same React building blocks imported by pages and sections (not mock-only markup). Use them as the empirical catalog when extending the UI."
            />

            <StyleguideSection title="Layout shell">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Main scroll uses{" "}
                <span className="text-foreground font-medium">Section</span>{" "}
                (fixed sidebar offset{" "}
                <code className="font-mono text-[0.8125rem]">ml-80</code>,{" "}
                <code className="font-mono text-[0.8125rem]">min-h-screen</code>
                , scroll-spy id per route) wrapping{" "}
                <span className="text-foreground font-medium">
                  ContentContainer
                </span>{" "}
                for horizontal padding (
                <code className="font-mono text-[0.8125rem]">
                  px-6 … 2xl:px-32
                </code>
                ). Section titles use a{" "}
                <code className="font-mono text-[0.8125rem]">bru-panel</code> +{" "}
                <span className="text-foreground font-medium">Header</span> (
                <code className="font-mono text-[0.8125rem]">
                  variant=&quot;title&quot;
                </code>{" "}
                → <code className="font-mono text-[0.8125rem]">bru-h1</code>;{" "}
                <code className="font-mono text-[0.8125rem]">
                  variant=&quot;subheading&quot;
                </code>{" "}
                → <code className="font-mono text-[0.8125rem]">bru-h2</code>
                ).
              </p>
              <StyleguidePanel className="mt-4">
                <div className="bru-label">Header variants</div>
                <div className="mt-4 grid gap-6 border-t border-rulesolid pt-6">
                  <div>
                    <div className="bru-label">title → bru-h1</div>
                    <Header variant="title" className="mt-2 text-balance">
                      Example page title
                    </Header>
                  </div>
                  <div className="border-t border-rulesolid pt-6">
                    <div className="bru-label">subheading → bru-h2</div>
                    <Header variant="subheading" className="mt-2">
                      Example panel heading
                    </Header>
                  </div>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Scroll reveal (Reveal)">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Sections wrap content in{" "}
                <span className="text-foreground font-medium">Reveal</span>:
                intersection-triggered opacity + translate, ~680ms easing,
                optional stagger delay. Respects scroll direction so content can
                replay when re-entering from below.
              </p>
              <StyleguidePanel className="mt-4 max-w-xl">
                <Reveal>
                  <div className="border border-rulesolid bg-background/55 px-4 py-3 shadow-rule">
                    <div className="bru-label">Revealed block</div>
                    <p className="mt-2 m-0 bru-prose-muted text-sm">
                      Scroll this drawer until this panel enters view - it uses
                      the same Reveal component as the main page sections.
                    </p>
                  </div>
                </Reveal>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Sidebar navigation (NavItem)">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Primary nav uses{" "}
                <span className="text-foreground font-medium">NavItem</span>{" "}
                with{" "}
                <code className="font-mono text-[0.8125rem]">aria-current</code>{" "}
                when active, rail colour transition, and smooth in-page scroll
                to section ids.
              </p>
              <StyleguidePanel className="mt-4 py-0 px-0 overflow-hidden">
                <NavItem linkText="00. Example home" href="/" />
                <NavItem linkText="01. Example about" href="/about" />
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Theme toggle (DarkModeToggle)">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Theme switching reuses{" "}
                <span className="text-foreground font-medium">Toggle</span> with
                persisted preference and{" "}
                <code className="font-mono text-[0.8125rem]">dark</code> class
                on{" "}
                <code className="font-mono text-[0.8125rem]">
                  document.documentElement
                </code>
                . This control is live - it updates the whole app theme.
              </p>
              <StyleguidePanel className="mt-4 max-w-md">
                <DarkModeToggle />
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Experience accordion">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                <span className="text-foreground font-medium">
                  ExperienceAccordion
                </span>{" "}
                composes Accordion with a coloured left rail, date meta, and the
                highlights index-rail panel used on About, Experience, and
                Certifications.
              </p>
              <div className="mt-4">
                <ExperienceAccordion
                  title="Example position"
                  startDate={2024}
                  endDate={undefined}
                  company="Example organisation"
                  colour="bg-blue-500"
                  blurb="Summary slot: one tight paragraph that reads like the live experience entries."
                  highlights={[
                    "First highlight row (index rail + bru-prose).",
                    "Second highlight row demonstrates the numbered list pattern.",
                  ]}
                />
              </div>
            </StyleguideSection>

            <StyleguideSection title="Skills: usage groups">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                The live Skills section uses one merged usage panel (minimal
                pills) plus Exploring. Implemented in{" "}
                <code className="font-mono text-[0.8125rem]">
                  SkillCategoryUsageGroups.tsx
                </code>{" "}
                with{" "}
                <code className="font-mono text-[0.8125rem]">
                  skillsGroupedByUsage
                </code>
                .
              </p>
              <StyleguidePanel className="mt-4 max-w-2xl">
                <SkillCategoryUsageGroups skills={demoSkillsForStyleguide} />
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Links: CustomAnchor vs bru-link">
              <StyleguidePanel className="mt-4">
                <div className="grid gap-4">
                  <p className="m-0 bru-prose-muted max-w-[80ch]">
                    <span className="text-foreground font-medium">
                      CustomAnchor
                    </span>{" "}
                    - default underline + hover accent (used inside prose and
                    case-study CTAs when you need a plain anchor).
                  </p>
                  <p className="m-0">
                    <CustomAnchor
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      External CustomAnchor
                    </CustomAnchor>
                  </p>
                  <p className="m-0 bru-prose-muted max-w-[80ch] border-t border-rulesolid pt-4">
                    <span className="text-foreground font-medium">
                      bru-link
                    </span>{" "}
                    - muted inline link pattern (see Components and Markdown
                    demos).
                  </p>
                  <p className="m-0">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="bru-link text-muted hover:text-accent transition-colors duration-200"
                    >
                      Inline bru-link preview
                    </a>
                  </p>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Screenshot frame (BrutalScreenshot)">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Project appendices use{" "}
                <span className="text-foreground font-medium">
                  BrutalScreenshot
                </span>
                : hard black border, offset drop shadow, mono caption bar with
                swatches - distinct from token-soft{" "}
                <code className="font-mono text-[0.8125rem]">bru-panel</code>{" "}
                cards.
              </p>
              <div className="mt-4 max-w-md">
                <BrutalScreenshot
                  src={Homepage}
                  alt="Styleguide sample screenshot"
                  label="Sample / hero"
                  sizes="400px"
                />
              </div>
            </StyleguideSection>

            <StyleguideSection title="Markdown body">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                Journey tabs render markdown through{" "}
                <span className="text-foreground font-medium">Markdown</span>:
                sanitized HTML,{" "}
                <code className="font-mono text-[0.8125rem]">bru-prose</code>{" "}
                body,{" "}
                <code className="font-mono text-[0.8125rem]">bru-link</code> on
                anchors, fenced blocks via syntax highlighter.
              </p>
              <StyleguidePanel className="mt-4">
                <Markdown>{demoMarkdownSample}</Markdown>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="File browser (SkillFileBrowser)">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                The Journey overlay embeds{" "}
                <span className="text-foreground font-medium">
                  SkillFileBrowser
                </span>
                : two-column ruled layout, file list buttons, raw preview pane,
                markdown vs monospace + Prism for other extensions.
              </p>
              <div className="mt-4 min-h-[12rem]">
                <SkillFileBrowser items={styleguideFileBrowserItems} />
              </div>
            </StyleguideSection>

            <StyleguideSection title="Flowchart">
              <p className="mt-4 max-w-[80ch] bru-prose-muted">
                <span className="text-foreground font-medium">Flowchart</span>{" "}
                is the shared ruled diagram: header band, responsive step grid,
                optional summary row, and props for steps, labels, column
                layout, and connector glyph.{" "}
                <span className="text-foreground font-medium">
                  AiLoopFlowchart
                </span>{" "}
                is a thin preset for the plan → execute → test → refine loop
                used in Journey content.
              </p>
              <div className="mt-4 grid gap-6">
                <AiLoopFlowchart title="AI workflow loop" />
                <StyleguidePanel>
                  <p className="m-0 mb-4 bru-prose-muted max-w-[80ch]">
                    Same building blocks with custom{" "}
                    <code className="font-mono text-[0.8125rem]">steps</code>{" "}
                    and no loop row:
                  </p>
                  <Flowchart
                    title="Hand-off"
                    headerEyebrow="Sequence"
                    ariaLabel="Design leads to Build."
                    columnLayout={2}
                    steps={[
                      { id: "design", label: "Design" },
                      { id: "build", label: "Build" },
                    ]}
                    summaryRow={null}
                  />
                </StyleguidePanel>
              </div>
            </StyleguideSection>

            <StyleguideSection title="Journey overlay trigger">
              <StyleguidePanel className="mt-4">
                <p className="m-0 bru-prose-muted max-w-[80ch]">
                  Projects can open the Journey drawer programmatically via{" "}
                  <code className="font-mono text-[0.8125rem]">
                    OpenJourneyOverlayButton
                  </code>{" "}
                  (custom event). Styling matches primary bordered buttons.
                </p>
                <div className="mt-4">
                  <OpenJourneyOverlayButton
                    tab="journey"
                    className="border border-border bg-background px-4 py-3 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Open Journey overlay
                  </OpenJourneyOverlayButton>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Segmented tabs (Journey overlay)">
              <StyleguidePanel className="mt-4">
                <p className="m-0 bru-prose-muted max-w-[80ch]">
                  In-app tab controls for multi-pane drawers use this pressed /
                  default recipe (
                  <code className="font-mono text-[0.8125rem]">
                    aria-pressed
                  </code>
                  , accent weak fill when active).
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    aria-pressed="true"
                    className="border border-border bg-background px-4 py-2 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-accent border-accent/50 bg-accent-weak"
                  >
                    Journey
                  </button>
                  <button
                    type="button"
                    aria-pressed="false"
                    className="border border-border bg-background px-4 py-2 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-foreground/75"
                  >
                    Inspiration
                  </button>
                  <button
                    type="button"
                    aria-pressed="false"
                    className="border border-border bg-background px-4 py-2 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-foreground/75"
                  >
                    AI
                  </button>
                </div>
              </StyleguidePanel>
            </StyleguideSection>

            <StyleguideSection title="Key / value list (About-style panel)">
              <StyleguidePanel className="mt-4">
                <p className="m-0 bru-prose-muted max-w-[80ch]">
                  Working-style lists use a ruled{" "}
                  <code className="font-mono text-[0.8125rem]">ul</code> with{" "}
                  <code className="font-mono text-[0.8125rem]">bru-label</code>{" "}
                  keys and{" "}
                  <code className="font-mono text-[0.8125rem]">bru-prose</code>{" "}
                  values - same structure as the About section.
                </p>
                <ul className="mt-4 list-none p-0 m-0 border border-rulesolid bg-background/55 shadow-rule max-w-xl">
                  {[
                    {
                      k: "Example axis",
                      v: "Short supporting sentence in body prose.",
                    },
                    {
                      k: "Second row",
                      v: "Another value cell; last row drops bottom border via last:border-b-0.",
                    },
                  ].map((row) => (
                    <li
                      key={row.k}
                      className="grid gap-1 border-b border-rulesolid last:border-b-0 px-5 py-3"
                    >
                      <div className="bru-label text-foreground/70">
                        {row.k}
                      </div>
                      <p className="m-0 bru-prose max-w-none">{row.v}</p>
                    </li>
                  ))}
                </ul>
              </StyleguidePanel>
            </StyleguideSection>

            <footer className="mt-12 border-t border-rulesolid pt-6">
              <p className="bru-body-muted text-foreground/72">
                Tip: Press{" "}
                <span className="text-foreground font-semibold">Esc</span> to
                close.
              </p>
            </footer>
          </div>
        </div>
      </Offcanvas>
    </>
  );
}
