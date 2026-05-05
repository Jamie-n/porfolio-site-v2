"use client";

import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactNode,
  useId,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/cn";

interface AccordionProps
  extends PropsWithChildren, ComponentPropsWithoutRef<"div"> {
  header: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function Accordion({
  header,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  ...rest
}: AccordionProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const reactId = useId();
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;
  const contentId = useMemo(
    () => (rest.id ? `${rest.id}__content` : `accordion_${reactId}__content`),
    [reactId, rest.id],
  );

  const setIsOpen = (next: boolean | ((prev: boolean) => boolean)) => {
    const resolved = typeof next === "function" ? next(isOpen) : next;
    if (!isControlled) setUncontrolledOpen(resolved);
    onOpenChange?.(resolved);
  };

  return (
    <div
      {...rest}
      data-state={isOpen ? "open" : "closed"}
      className={cn("my-4", rest.className)}
    >
      <button
        type="button"
        className={cn(
          "group relative w-full text-left py-3 px-6 flex overflow-hidden bru-panel",
          "transition-[border-color,background-color,box-shadow] duration-200 ease-out",
          "hover:border-accent/40 hover:bg-surface/80 hover:shadow-rule",
          "data-[state=open]:bg-surface/85 data-[state=open]:border-accent/45 data-[state=open]:shadow-rule",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-expanded={isOpen}
        aria-controls={contentId}
        data-state={isOpen ? "open" : "closed"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {header}

        <div
          className={cn(
            "self-center ms-auto",
            "transition-[transform,opacity] duration-200 ease-out motion-reduce:transition-none",
            "opacity-70 group-hover:opacity-100",
            isOpen && "rotate-180 scale-[1.06] opacity-100",
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </button>

      <div
        id={contentId}
        data-testid="accordion-collapsible"
        className={cn(
          "overflow-hidden",
          "transition-[max-height,opacity,filter] duration-500",
          "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none",
          isOpen
            ? "max-h-[99999px] opacity-100 blur-0"
            : "max-h-0 opacity-0 blur-[1px]",
        )}
      >
        <div className="-mt-px border border-rulesolid border-t-0 bg-surface/65 shadow-rule">
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
