"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/cn";
import Header from "./Header";
import AiLoopFlowchart from "./AiLoopFlowchart";
import Markdown from "./Markdown";
import { BruText } from "./primitives/BruText";
import SkillFileBrowser, { type SkillFileItem } from "./SkillFileBrowser";
import { Offcanvas } from "./overlay/Offcanvas";
import { OverlayStickyHeader } from "./overlay/OverlayStickyHeader";
import { OverlayTriggerCard } from "./overlay/OverlayTriggerCard";
import { fetchText } from "@/lib/fetchText";

const panelTransitionMs = 360;

export type JourneyTab = "journey" | "inspiration" | "ai";

export const OPEN_JOURNEY_OVERLAY_EVENT = "open-journey-overlay";

type OpenJourneyOverlayDetail = {
  tab?: JourneyTab;
};

function isOpenJourneyOverlayEvent(
  e: Event,
): e is CustomEvent<OpenJourneyOverlayDetail> {
  return e instanceof CustomEvent && e.type === OPEN_JOURNEY_OVERLAY_EVENT;
}

function emitOpenJourneyOverlay(detail?: OpenJourneyOverlayDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_JOURNEY_OVERLAY_EVENT, { detail }));
}

export function OpenJourneyOverlayButton({
  tab,
  children,
  className,
}: {
  tab?: JourneyTab;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => emitOpenJourneyOverlay({ tab })}
    >
      {children}
    </button>
  );
}

function splitMarkdownSection(markdown: string, heading: string) {
  const needle = `## ${heading}`;
  const start = markdown.indexOf(needle);
  if (start === -1) {
    return { before: markdown, after: "" };
  }

  const afterStart = markdown.slice(start + needle.length);
  const nextHeadingOffset = afterStart.search(/\n##\s+/);
  const end =
    nextHeadingOffset === -1
      ? markdown.length
      : start + needle.length + nextHeadingOffset;

  const before = markdown.slice(0, start).trimEnd();
  const after = markdown.slice(end).trimStart();
  return { before, after };
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border border-border bg-background px-4 py-2 bru-button shadow-rule transition-all duration-200 ease-out",
        "hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "text-accent border-accent/50 bg-accent-weak"
          : "text-foreground/75",
      )}
    >
      {label}
    </button>
  );
}

export default function JourneyOverlay({
  triggerLabel = "Journey",
  skills,
}: {
  triggerLabel?: string;
  skills: SkillFileItem[];
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<JourneyTab>("journey");
  const [journeyMd, setJourneyMd] = useState<string>("");
  const [inspirationMd, setInspirationMd] = useState<string>("");
  const [aiMd, setAiMd] = useState<string>("");
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [restoreFocusOnClose, setRestoreFocusOnClose] = useState(false);

  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const openOverlay = useCallback(
    (nextTab?: JourneyTab, openedByKeyboard = false) => {
      setLoadingError(null);
      setTab(nextTab ?? "journey");
      setRestoreFocusOnClose(openedByKeyboard);
      setOpen(true);
    },
    [],
  );

  const requestClose = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      if (!isOpenJourneyOverlayEvent(e)) return;
      openOverlay(e.detail?.tab);
    };
    window.addEventListener(OPEN_JOURNEY_OVERLAY_EVENT, handler);
    return () =>
      window.removeEventListener(OPEN_JOURNEY_OVERLAY_EVENT, handler);
  }, [openOverlay]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    void (async () => {
      try {
        setLoadingError(null);
        const [j, i, a] = await Promise.all([
          fetchText("/content/journey/overview.md"),
          fetchText("/content/inspiration/overview.md"),
          fetchText("/content/ai-workflow/workflow.md"),
        ]);
        if (cancelled) return;
        setJourneyMd(j);
        setInspirationMd(i);
        setAiMd(a);
      } catch (err) {
        if (cancelled) return;
        setLoadingError(
          err instanceof Error ? err.message : "Failed to load content.",
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const activeMarkdown = useMemo(() => {
    if (tab === "journey") return journeyMd;
    if (tab === "inspiration") return inspirationMd;
    return aiMd;
  }, [aiMd, inspirationMd, journeyMd, tab]);

  const aiLoopSections = useMemo(() => {
    if (tab !== "ai") return null;
    return splitMarkdownSection(activeMarkdown, "The loop I use");
  }, [activeMarkdown, tab]);

  return (
    <>
      <OverlayTriggerCard
        eyebrow="Build"
        title={triggerLabel}
        onOpen={(kb) => openOverlay("journey", kb)}
      />

      <Offcanvas
        open={open}
        onOpenChange={setOpen}
        labelledBy={titleId}
        transitionMs={panelTransitionMs}
        initialFocusRef={closeButtonRef}
        restoreFocus={restoreFocusOnClose}
        panelClassName="sm:max-w-[880px]"
        testId="journey-overlay"
      >
        <div className="flex h-dvh flex-col">
          <OverlayStickyHeader
            labelledBy={titleId}
            label="Build notes"
            title="Portfolio journey"
            description="Why I rebuilt the site, what guided the visual direction, and how I use AI to move faster without handing off taste or accountability."
            closeButtonRef={closeButtonRef}
            onClose={requestClose}
          />

          <div className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-6 sm:px-8 pb-10 pt-6">
            <div className="flex flex-wrap gap-3">
              <TabButton
                label="Journey"
                active={tab === "journey"}
                onClick={() => setTab("journey")}
              />
              <TabButton
                label="Inspiration"
                active={tab === "inspiration"}
                onClick={() => setTab("inspiration")}
              />
              <TabButton
                label="AI workflow"
                active={tab === "ai"}
                onClick={() => setTab("ai")}
              />
            </div>

            {loadingError ? (
              <div className="mt-6 border border-rulesolid bg-background/55 shadow-rule px-5 py-4">
                <BruText variant="label">Error</BruText>
                <BruText as="p" variant="proseMuted" className="mt-2">
                  {loadingError}
                </BruText>
              </div>
            ) : (
              <>
                <div className="mt-6 bru-panel px-6 py-5">
                  <BruText variant="label">Notes</BruText>
                  <div className="mt-4">
                    {tab === "ai" ? (
                      <div className="grid gap-6">
                        {aiLoopSections?.before ? (
                          <Markdown>{aiLoopSections.before}</Markdown>
                        ) : null}
                        <AiLoopFlowchart title="Plan → Execute → Test → Refine" />
                        {aiLoopSections?.after ? (
                          <Markdown>{aiLoopSections.after}</Markdown>
                        ) : null}
                      </div>
                    ) : (
                      <Markdown>{activeMarkdown}</Markdown>
                    )}
                  </div>
                </div>

                {tab === "inspiration" && (
                  <div className="mt-6 bru-panel px-6 py-5">
                    <BruText variant="label">Inspiration gallery</BruText>
                    <Header variant="subheading">References</Header>
                    <BruText
                      as="p"
                      variant="proseMuted"
                      className="mt-3 max-w-[72ch]"
                    >
                      Drop original reference images in{" "}
                      <span className="font-mono text-[0.8125rem] text-foreground/70">
                        public/inspiration/
                      </span>{" "}
                      to populate this gallery.
                    </BruText>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {[
                        {
                          src: "/inspiration/placeholder-grid.svg",
                          title: "Grid + rules",
                          caption:
                            "Structure-first composition and hairline rules.",
                        },
                        {
                          src: "/inspiration/placeholder-type.svg",
                          title: "Type-first hierarchy",
                          caption:
                            "Bold display type, tracked labels, minimal palette.",
                        },
                      ].map((img) => (
                        <figure
                          key={img.src}
                          className="border border-rulesolid bg-background/55 shadow-rule overflow-hidden flex h-full flex-col"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.src}
                            alt={img.title}
                            className="block w-full h-auto aspect-[5/3] object-cover"
                          />
                          <figcaption className="bru-divide-y flex flex-1 flex-col">
                            <div className="px-4 py-3 flex-1">
                              <BruText variant="accTitle">{img.title}</BruText>
                              <BruText
                                as="p"
                                variant="proseMuted"
                                className="mt-1"
                              >
                                {img.caption}
                              </BruText>
                            </div>
                            <div className="px-4 py-2">
                              <BruText as="span" variant="label">
                                Credit: add source here
                              </BruText>
                            </div>
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  </div>
                )}

                {tab === "ai" && (
                  <div className="mt-6 bru-panel px-6 py-5">
                    <BruText variant="label">
                      Workflow + skills (browse)
                    </BruText>
                    <Header variant="subheading">File browser</Header>
                    <BruText
                      as="p"
                      variant="proseMuted"
                      className="mt-3 max-w-[72ch]"
                    >
                      Browse the workflow notes and the supporting skill
                      summaries I used while building and refining this site.
                    </BruText>
                    <div className="mt-5">
                      <SkillFileBrowser items={skills} />
                    </div>
                    <div className="mt-6 border-t border-rulesolid pt-4">
                      <a
                        href="https://github.com/Jamie-n"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bru-link text-muted hover:text-accent transition-colors duration-200"
                      >
                        View source on GitHub
                      </a>
                    </div>
                  </div>
                )}
              </>
            )}

            <footer className="mt-12 border-t border-rulesolid pt-6">
              <BruText as="p" variant="bodyMuted">
                Tip: Press{" "}
                <span className="text-foreground font-semibold">Esc</span> to
                close.
              </BruText>
            </footer>
          </div>
        </div>
      </Offcanvas>
    </>
  );
}
