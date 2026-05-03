"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Header from "./Header";
import AiLoopFlowchart from "./AiLoopFlowchart";
import Markdown from "./Markdown";
import { BruText } from "./primitives/BruText";
import SkillFileBrowser, { type SkillFileItem } from "./SkillFileBrowser";

const panelTransitionMs = 360;

export type JourneyTab = "journey" | "inspiration" | "ai";

export const OPEN_JOURNEY_OVERLAY_EVENT = "open-journey-overlay";

type OpenJourneyOverlayDetail = {
  tab?: JourneyTab;
};

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

async function fetchText(path: string) {
  const res = await fetch(path, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load content: ${path}`);
  return await res.text();
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
      className={[
        "border border-border bg-background px-4 py-2 bru-button shadow-rule transition-all duration-200 ease-out",
        "hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "text-accent border-accent/50 bg-accent-weak"
          : "text-foreground/75",
      ].join(" ")}
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
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayEntered, setOverlayEntered] = useState(false);
  const [tab, setTab] = useState<JourneyTab>("journey");
  const [journeyMd, setJourneyMd] = useState<string>("");
  const [inspirationMd, setInspirationMd] = useState<string>("");
  const [aiMd, setAiMd] = useState<string>("");
  const [loadingError, setLoadingError] = useState<string | null>(null);

  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openByKeyboardRef = useRef(false);
  const closingRef = useRef(false);
  const canPortal = typeof document !== "undefined";

  const openOverlay = useCallback((nextTab?: JourneyTab) => {
    closingRef.current = false;
    setLoadingError(null);
    setTab(nextTab ?? "journey");
    setOverlayEntered(false);
    setOverlayMounted(true);
  }, []);

  const requestClose = useCallback(() => {
    closingRef.current = true;
    setOverlayEntered(false);
  }, []);

  useEffect(() => {
    if (!overlayMounted) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOverlayEntered(true);
      });
    });
    return () => cancelAnimationFrame(id);
  }, [overlayMounted]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenJourneyOverlayDetail>).detail;
      openOverlay(detail?.tab);
    };
    window.addEventListener(
      OPEN_JOURNEY_OVERLAY_EVENT,
      handler as EventListener,
    );
    return () =>
      window.removeEventListener(
        OPEN_JOURNEY_OVERLAY_EVENT,
        handler as EventListener,
      );
  }, [openOverlay]);

  useEffect(() => {
    if (!overlayMounted) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousHtmlOverscroll =
      document.documentElement.style.overscrollBehavior;
    const previousHtmlScrollBehavior =
      document.documentElement.style.scrollBehavior;

    const scrollY = window.scrollY;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const shouldRestoreFocus = openByKeyboardRef.current;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();

      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          [
            'a[href]:not([tabindex="-1"])',
            'button:not([disabled]):not([tabindex="-1"])',
            'input:not([disabled]):not([tabindex="-1"])',
            'select:not([disabled]):not([tabindex="-1"])',
            'textarea:not([disabled]):not([tabindex="-1"])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(","),
        ),
      ).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
      );

      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === root)) {
        e.preventDefault();
        last.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      closingRef.current = false;
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.documentElement.style.overscrollBehavior =
        previousHtmlOverscroll;

      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPaddingRight;

      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, scrollY);
      document.documentElement.style.scrollBehavior =
        previousHtmlScrollBehavior;

      if (shouldRestoreFocus) {
        previouslyFocused?.focus?.();
      } else {
        previouslyFocused?.blur?.();
      }
    };
  }, [overlayMounted, requestClose]);

  useEffect(() => {
    if (!overlayMounted || overlayEntered || !closingRef.current) return;
    const id = window.setTimeout(() => {
      if (!closingRef.current) return;
      closingRef.current = false;
      setOverlayMounted(false);
    }, panelTransitionMs + 120);
    return () => window.clearTimeout(id);
  }, [overlayMounted, overlayEntered]);

  useEffect(() => {
    if (!overlayMounted) return;
    let cancelled = false;
    void (async () => {
      try {
        setLoadingError(null);
        const [j, i, a] = await Promise.all([
          journeyMd
            ? Promise.resolve(journeyMd)
            : fetchText("/content/journey/overview.md"),
          inspirationMd
            ? Promise.resolve(inspirationMd)
            : fetchText("/content/inspiration/overview.md"),
          aiMd
            ? Promise.resolve(aiMd)
            : fetchText("/content/ai-workflow/workflow.md"),
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
  }, [overlayMounted, journeyMd, inspirationMd, aiMd]);

  const activeMarkdown = useMemo(() => {
    if (tab === "journey") return journeyMd;
    if (tab === "inspiration") return inspirationMd;
    return aiMd;
  }, [aiMd, inspirationMd, journeyMd, tab]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onPointerDown={() => {
          openByKeyboardRef.current = false;
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openByKeyboardRef.current = true;
          }
        }}
        onClick={() => openOverlay("journey")}
        className="w-full bru-panel px-4 py-3 text-left transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40"
      >
        <BruText variant="label">Build</BruText>
        <BruText variant="displayH3" className="mt-1 block">
          {triggerLabel}
        </BruText>
      </button>

      {canPortal &&
        overlayMounted &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            className="fixed inset-0 z-[9999] overflow-hidden isolate"
            data-testid="journey-overlay"
          >
            <div
              className={[
                "absolute inset-0 bg-black transition-opacity ease-out",
                overlayEntered ? "opacity-60" : "opacity-0",
              ].join(" ")}
              style={{
                transitionDuration: `${Math.min(280, panelTransitionMs)}ms`,
              }}
              onClick={requestClose}
              aria-hidden="true"
            />

            <div
              className={[
                "absolute left-0 top-0 h-dvh w-full sm:max-w-[880px] bg-background text-foreground border-r border-border shadow-rule grain overflow-y-auto overflow-x-hidden overscroll-contain",
                "transform-gpu transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                overlayEntered ? "translate-x-0" : "-translate-x-full",
              ].join(" ")}
              style={{ transitionDuration: `${panelTransitionMs}ms` }}
              onTransitionEnd={(e) => {
                if (e.propertyName !== "transform") return;
                if (closingRef.current) {
                  closingRef.current = false;
                  setOverlayMounted(false);
                }
              }}
            >
              <div className="p-6 sm:p-8 pb-10">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div className="min-w-0">
                    <BruText as="p" id={titleId} variant="label">
                      Build notes
                    </BruText>
                    <BruText as="h1" variant="displayH2" className="mt-2">
                      Portfolio journey
                    </BruText>
                    <BruText
                      as="p"
                      variant="proseMuted"
                      className="mt-3 max-w-[72ch]"
                    >
                      Why I rebuilt the site, what guided the visual direction,
                      and how I use AI to move faster without handing off taste
                      or accountability.
                    </BruText>
                  </div>

                  <button
                    type="button"
                    onClick={requestClose}
                    ref={closeButtonRef}
                    className="shrink-0 self-start border border-border bg-surface/40 px-4 py-2 bru-button text-foreground/75 shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Close
                  </button>
                </header>

                <div className="mt-6 flex flex-wrap gap-3 border-t border-rulesolid pt-6">
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
                          <>
                            {(() => {
                              const { before, after } = splitMarkdownSection(
                                activeMarkdown,
                                "The loop I use",
                              );
                              return (
                                <div className="grid gap-6">
                                  {before ? (
                                    <Markdown>{before}</Markdown>
                                  ) : null}
                                  <AiLoopFlowchart title="Plan → Execute → Test → Refine" />
                                  {after ? <Markdown>{after}</Markdown> : null}
                                </div>
                              );
                            })()}
                          </>
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
                                  <BruText variant="accTitle">
                                    {img.title}
                                  </BruText>
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
                          Browse the workflow notes, CI setup, and supporting
                          skill docs I used while building and refining this
                          site.
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
                    <span className="text-foreground font-semibold">Esc</span>{" "}
                    to close.
                  </BruText>
                </footer>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
