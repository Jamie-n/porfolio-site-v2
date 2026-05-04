"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { BACKDROP_BASE_CLASSNAME } from "./backdrop";

const DEFAULT_TRANSITION_MS = 360;

function getFocusableElements(root: HTMLElement) {
  return Array.from(
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
}

export type OffcanvasSide = "left" | "right";

export function Offcanvas({
  open,
  onOpenChange,
  labelledBy,
  panelClassName,
  side = "left",
  transitionMs = DEFAULT_TRANSITION_MS,
  initialFocusRef,
  restoreFocus = true,
  testId,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  labelledBy: string;
  panelClassName?: string;
  side?: OffcanvasSide;
  transitionMs?: number;
  initialFocusRef?: React.RefObject<HTMLElement | null>;
  restoreFocus?: boolean;
  testId?: string;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef(false);

  const canPortal = typeof document !== "undefined";

  const panelTranslateClass = useMemo(() => {
    if (side === "right") return entered ? "translate-x-0" : "translate-x-full";
    return entered ? "translate-x-0" : "-translate-x-full";
  }, [entered, side]);

  // Mount/unmount + enter/exit animation.
  useEffect(() => {
    if (open) {
      closingRef.current = false;
      // Reset animation state synchronously before mounting so the panel starts off-screen.
      // React 18 batches these together; the separate RAF effect then triggers the enter transition.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEntered(false);
      setMounted(true);
      return;
    }

    if (!mounted) return;
    closingRef.current = true;
    setEntered(false);

    const id = window.setTimeout(() => {
      if (!closingRef.current) return;
      closingRef.current = false;
      setMounted(false);
    }, transitionMs + 120);
    return () => window.clearTimeout(id);
  }, [open, mounted, transitionMs]);

  useEffect(() => {
    if (!mounted) return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => setEntered(true));
    });
    return () => cancelAnimationFrame(id);
  }, [mounted]);

  // Scroll lock + focus trap + Esc.
  useEffect(() => {
    if (!mounted) return;

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
    initialFocusRef?.current?.focus?.();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);

      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = getFocusableElements(root);
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

      if (restoreFocus) {
        previouslyFocused?.focus?.();
      } else {
        previouslyFocused?.blur?.();
      }
    };
  }, [mounted, onOpenChange, initialFocusRef, restoreFocus]);

  if (!canPortal || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      ref={dialogRef}
      className="fixed inset-0 z-[9999] overflow-hidden isolate"
      data-testid={testId}
    >
      <div
        className={cn(
          "absolute inset-0",
          BACKDROP_BASE_CLASSNAME,
          entered ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDuration: `${Math.min(280, transitionMs)}ms` }}
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      <div
        className={cn(
          "absolute top-0 h-dvh w-full bg-background text-foreground border-border shadow-rule grain overflow-y-auto overflow-x-hidden overscroll-contain",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
          "transform-gpu transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
          panelTranslateClass,
          panelClassName,
        )}
        style={{ transitionDuration: `${transitionMs}ms` }}
        onTransitionEnd={(e) => {
          if (e.propertyName !== "transform") return;
          if (closingRef.current) {
            closingRef.current = false;
            setMounted(false);
          }
        }}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
