"use client";

import type { SectionItem } from "@/app/types/sectionItem";
import { formatIndex } from "@/lib/utils";
import { aiWorkflowFiles } from "@/app/data/aiWorkflowFiles";
import DarkModeToggle from "@/app/components/DarkModeToggle";
import JourneyOverlay from "@/app/components/JourneyOverlay";
import StyleguideOverlay from "@/app/components/StyleguideOverlay";
import { BruText } from "@/app/components/primitives/BruText";
import NavItem from "./NavItem";
import { SocialLinks } from "@/app/components/SocialLinks";
import { cn } from "@/lib/cn";
import { useEffect, useId, useState } from "react";
import { BACKDROP_BASE_CLASSNAME } from "@/app/components/overlay/backdrop";

/** Matches Tailwind default `lg` breakpoint */
const LG_MIN_WIDTH = 1024;

interface SidebarProps {
  sections: Pick<SectionItem, "title" | "href">[];
}

export default function Sidebar({ sections }: SidebarProps) {
  const navId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LG_MIN_WIDTH}px)`);
    const sync = () => {
      if (mql.matches) setMobileOpen(false);
    };
    sync();
    mql.addEventListener("change", sync);
    return () => mql.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    if (window.matchMedia(`(min-width: ${LG_MIN_WIDTH}px)`).matches) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <button
        type="button"
        className={cn(
          "fixed z-[60] flex h-11 w-11 items-center justify-center border border-border bg-background shadow-rule",
          "transition-[color,transform,left,right] duration-200 ease-out hover:border-accent/40 lg:hidden",
          "top-[max(1rem,env(safe-area-inset-top))]",
          /* Closed: top-left. Open: top-right so the drawer "Jamie." plate is not covered. */
          mobileOpen
            ? "left-auto right-[max(1rem,env(safe-area-inset-right))]"
            : "right-auto left-[max(1rem,env(safe-area-inset-left))]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "touch-manipulation motion-reduce:transition-none",
        )}
        aria-controls={navId}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => setMobileOpen((o) => !o)}
      >
        <span className="sr-only">
          {mobileOpen ? "Close menu" : "Open menu"}
        </span>
        {mobileOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
            aria-hidden
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
            aria-hidden
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 6.75h16.5"
            />
          </svg>
        )}
      </button>

      <button
        type="button"
        className={cn(
          `fixed inset-0 z-[45] ${BACKDROP_BASE_CLASSNAME} duration-200 lg:hidden`,
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobileOpen}
        tabIndex={-1}
        onClick={closeMobile}
      />

      <div
        id={navId}
        className={cn(
          "fixed left-0 top-0 z-[50] flex h-dvh flex-col justify-between overflow-y-auto overscroll-contain border-r border-border bg-background pb-6 pt-12",
          "lg:bg-surface/75",
          "w-[min(20rem,100svw)] px-6 transition-transform duration-200 ease-out motion-reduce:transition-none",
          "lg:translate-x-0 lg:px-10",
          mobileOpen
            ? "translate-x-0 max-lg:shadow-[6px_0_24px_color-mix(in_oklab,var(--foreground)_14%,transparent)]"
            : "-translate-x-full",
        )}
      >
        <div>
          <div className="mb-7 bru-panel px-4 py-4 animate-enter">
            <BruText as="p" variant="displayH2">
              Jamie.
            </BruText>
            <BruText as="p" variant="label" className="mt-2">
              Full‑stack engineer · UI focused
            </BruText>
          </div>

          <div className="flex flex-col gap-1">
            {sections.map(({ title, href }, idx) => (
              <NavItem
                key={href}
                linkText={`${formatIndex(idx)}. ${title}`}
                href={href}
                itemClassName="animate-enter"
                itemStyle={{ animationDelay: `${72 + idx * 42}ms` }}
                onClick={closeMobile}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 animate-enter animate-enter-delay-2">
          <SocialLinks className="border-t border-border pt-5" />
          <DarkModeToggle />
          <JourneyOverlay skills={aiWorkflowFiles} />
          <StyleguideOverlay />
        </div>
      </div>
    </>
  );
}
