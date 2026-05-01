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
import Accordion from "./accordion/Accordion";
import Toggle from "./Toggle";

interface StyleguideOverlayProps {
  triggerLabel?: string;
}

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
      <h2 className="bru-label">{title}</h2>
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
      <div className={`bru-label sm:pt-0.5`}>{label}</div>
      <div className="bru-body text-foreground">{value}</div>
    </div>
  );
}

const panelTransitionMs = 360;

export default function StyleguideOverlay({
  triggerLabel = "Styleguide",
}: StyleguideOverlayProps) {
  const [overlayMounted, setOverlayMounted] = useState(false);
  const [overlayEntered, setOverlayEntered] = useState(false);
  const [demoChecked, setDemoChecked] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const openByKeyboardRef = useRef(false);
  const closingRef = useRef(false);
  const canPortal = typeof document !== "undefined";

  const openOverlay = useCallback(() => {
    closingRef.current = false;
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

    // Freeze page scroll position (prevents background content from moving).
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

      // Avoid animated "re-scroll" due to global `scroll-behavior: smooth`.
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

  const tokens = useMemo(
    () => [
      {
        name: "background",
        css: "--background",
        previewClass: "bg-background",
      },
      { name: "surface", css: "--surface", previewClass: "bg-surface" },
      {
        name: "foreground",
        css: "--foreground",
        previewClass: "bg-foreground",
      },
      { name: "muted", css: "--muted", previewClass: "bg-muted" },
      { name: "border", css: "--border", previewClass: "bg-border" },
      { name: "accent", css: "--accent", previewClass: "bg-accent" },
      {
        name: "accent weak",
        css: "--accent-weak",
        previewClass: "bg-accent-weak",
      },
      { name: "ring", css: "--ring", previewClass: "bg-ring" },
    ],
    [],
  );

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
        onClick={openOverlay}
        className="w-full bru-panel px-4 py-3 text-left transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40"
      >
        <div className="bru-label">Reference</div>
        <div className="mt-1 bru-h3">{triggerLabel}</div>
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
                "absolute left-0 top-0 h-dvh w-full max-w-[880px] bg-background text-foreground border-r border-border shadow-rule grain overflow-y-auto overflow-x-hidden overscroll-contain",
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
                    <p id={titleId} className="bru-label">
                      Design language
                    </p>
                    <h1 className="mt-2 bru-h2">Brutalist styleguide</h1>
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

                <StyleguideSection title="Motifs">
                  <StyleguidePanel className="py-4 sm:py-5">
                    <p className="bru-prose max-w-[80ch]">
                      Boxed panels, subtle grid overlays, vertical/metadata
                      labels, high contrast neutrals, and crisp physical hover
                      motion. Accent red is reserved for interactive states and
                      key hierarchy moments.
                    </p>
                  </StyleguidePanel>
                </StyleguideSection>

                <StyleguideSection title="Tokens">
                  <StyleguidePanel className="py-0 px-0">
                    <div className="bru-divide-y">
                      {tokens.map((t) => (
                        <div
                          key={t.css}
                          className="grid grid-cols-1 gap-3 px-6 py-3 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6 sm:items-center"
                        >
                          <div className="bru-label sm:pt-0.5">{t.name}</div>
                          <div className="flex flex-wrap items-center gap-4">
                            <div
                              className={[
                                "h-6 w-10 shrink-0 border border-border",
                                t.previewClass,
                              ].join(" ")}
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

                <StyleguideSection title="Typography recipes">
                  <StyleguidePanel className="py-0 px-0">
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

                <StyleguideSection title="Typography scale">
                  <StyleguidePanel>
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
                        <div className="bru-label">104 High St. W — 2026</div>
                      </div>
                    </div>
                  </StyleguidePanel>
                </StyleguideSection>

                <StyleguideSection title="Color & contrast">
                  <StyleguidePanel>
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <div className="bru-label">
                          Foreground on background
                        </div>
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

                <StyleguideSection title="Spacing & layout rhythm">
                  <StyleguidePanel>
                    <div className="grid gap-6">
                      <p className="bru-prose-muted max-w-[80ch]">
                        Use a small set of repeatable spacing steps. Panels
                        typically use 20–24px padding; section separators use a
                        thin rule plus a label.
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
                        <span className="bru-h3 text-accent">
                          02. Active item
                        </span>
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
                  <StyleguidePanel>
                    <div className="bru-label">Sizes & hover</div>
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                      <button
                        type="button"
                        className="grid shrink-0 place-items-center border border-border bg-background h-10 w-10 shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label="Icon button"
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
                      <p className="bru-prose-muted max-w-[72ch]">
                        Prefer 16–20px icons, ~1.5 stroke, and the same hover
                        rules as links (accent + 1px nudge when appropriate).
                      </p>
                    </div>
                  </StyleguidePanel>
                </StyleguideSection>

                <StyleguideSection title="Content patterns">
                  <StyleguidePanel>
                    <div className="grid gap-8">
                      <div className="grid gap-2">
                        <div className="bru-label">Tags</div>
                        <div className="flex flex-wrap gap-2">
                          {["React", "TypeScript", "Next.js", "CI/CD"].map(
                            (t) => (
                              <span
                                key={t}
                                className="border border-border bg-background px-3 py-1 bru-tag"
                              >
                                {t}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      <div className="grid gap-2 border-t border-rulesolid pt-8">
                        <div className="bru-label">Label/value row</div>
                        <div className="border border-rulesolid overflow-hidden rounded-none">
                          <div className="bru-divide-y px-6">
                            <Row label="Role" value="Full-stack engineer" />
                            <Row label="Location" value="UK / Remote" />
                            <Row
                              label="Focus"
                              value="Craft + clarity + speed"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </StyleguidePanel>
                </StyleguideSection>

                <StyleguideSection title="Section break patterns">
                  <StyleguidePanel>
                    <p className="bru-prose-muted max-w-[80ch]">
                      Use these as modular layers in the divider spacer. The
                      live site spacer is offset for the fixed sidebar;
                      styleguide previews use the{" "}
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
                            Panels use a thin rule, subtle grid overlay, crisp
                            hover motion, and tokenized colors so the whole UI
                            stays consistent in light/dark.
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
                                <div className="bru-acc-title">
                                  Senior Engineer
                                </div>
                                <div className="bru-acc-subtitle">
                                  Spec-sheet list with index rail
                                </div>
                              </div>
                            }
                          >
                            <div className="max-w-[72ch] border border-rulesolid border-l-2 border-l-accent bg-background/55 shadow-rule">
                              <div className="flex flex-wrap items-end justify-between gap-3 border-b border-rulesolid px-4 py-2.5">
                                <div className="bru-label">Highlights</div>
                                <span
                                  className="bru-acc-meta"
                                  aria-hidden="true"
                                >
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

                <footer className="mt-12 border-t border-rulesolid pt-6">
                  <p className="bru-body-muted text-foreground/72">
                    Tip: Press{" "}
                    <span className="text-foreground font-semibold">Esc</span>{" "}
                    to close.
                  </p>
                </footer>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
