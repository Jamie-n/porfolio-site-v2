"use client";

/**
 * Full-document load intro. The root layout does not remount on client navigations,
 * so this only runs the sequence on real page loads. Pairs with the server-rendered
 * `#jn-splash-stub` in `layout.tsx` so the first paint is never uncovered content.
 */

import { cn } from "@/lib/cn";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

export default function FirstVisitSplash() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const prefersReducedMotionRef = useRef(false);

  const finish = useCallback(() => {
    document.getElementById("jn-splash-stub")?.remove();
    setVisible(false);
    setExiting(false);
  }, []);

  useLayoutEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    queueMicrotask(() => {
      setVisible(true);
    });
  }, []);

  // Hide page scrollbar while splash is visible, but keep layout width stable by
  // compensating for the removed scrollbar width.
  useLayoutEffect(() => {
    if (!visible) return;
    document.getElementById("jn-splash-stub")?.remove();

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousHtmlOverscroll = html.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscroll;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPaddingRight;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    if (prefersReducedMotionRef.current) {
      const id = window.setTimeout(finish, 420);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(() => setExiting(true), 2280);
    return () => window.clearTimeout(id);
  }, [visible, finish]);

  const onTransitionEnd = useCallback(
    (e: React.TransitionEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      if (e.propertyName !== "opacity" || !exiting) return;
      finish();
    },
    [exiting, finish],
  );

  if (!visible) return null;

  const cornersBaseClassName =
    "first-visit-splash__corners pointer-events-none absolute inset-[-1.25rem] sm:inset-[-1.75rem]";

  return (
    <div
      className={cn(
        "first-visit-splash fixed inset-0 z-[2147483647] flex items-center justify-center overflow-hidden",
        exiting && "first-visit-splash--exiting",
      )}
      role="presentation"
      aria-hidden="true"
      onTransitionEnd={onTransitionEnd}
    >
      <div
        className="bru-noise pointer-events-none absolute inset-0 opacity-90 mix-blend-overlay"
        aria-hidden="true"
      />
      <div
        className="grid-overlay pointer-events-none absolute inset-0 opacity-50"
        aria-hidden="true"
      />

      <div className="first-visit-splash__frame relative flex flex-col items-center gap-8 px-8">
        <div
          className={cn(
            cornersBaseClassName,
            "first-visit-splash__corners--top",
          )}
          aria-hidden="true"
        />
        <div
          className={cn(
            cornersBaseClassName,
            "first-visit-splash__corners--bottom",
          )}
          aria-hidden="true"
        />

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-baseline gap-[0.12em] font-sans text-[clamp(4.5rem,18vw,9rem)] font-bold leading-none tracking-[-0.08em] text-foreground">
            <span className="first-visit-splash__letter first-visit-splash__letter--j">
              J
            </span>
            <span className="first-visit-splash__letter first-visit-splash__letter--n">
              N
            </span>
          </div>

          <p className="first-visit-splash__caption font-mono text-[0.65rem] uppercase text-muted">
            Loading
          </p>
        </div>

        <div className="first-visit-splash__swatches flex items-center gap-[6px]">
          <span className="first-visit-splash__swatch" />
          <span className="first-visit-splash__swatch" />
          <span className="first-visit-splash__swatch" />
          <span className="first-visit-splash__swatch" />
        </div>

        <div className="first-visit-splash__rule h-px w-[min(12rem,55vw)] bg-border" />
      </div>

      <div
        className="first-visit-splash__sweep pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        aria-hidden="true"
      />
    </div>
  );
}
