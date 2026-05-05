import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Portfolio typography tokens (`bru-label`, `bru-h1`, `bru-prose`, …).
 * Switch roles via `variant` (and optional `className` for layout/spacing).
 */
type BruTextVariant =
  | "label"
  | "labelCompact"
  | "accTitle"
  | "accSubtitle"
  | "accMeta"
  | "accMetaMuted"
  | "prose"
  | "proseMuted"
  | "body"
  | "bodyMuted"
  | "displayH1"
  | "displayH2"
  | "displayH3";

const VARIANT_CLASSES: Record<BruTextVariant, string> = {
  label: "bru-label",
  labelCompact: "bru-label-compact",
  accTitle: "bru-acc-title",
  accSubtitle: "bru-acc-subtitle",
  accMeta: "bru-acc-meta",
  accMetaMuted: "bru-acc-meta text-foreground/60",
  prose: "bru-prose",
  proseMuted: "bru-prose-muted",
  body: "bru-body",
  bodyMuted: "bru-body-muted text-foreground/72",
  displayH1: "bru-h1",
  displayH2: "bru-h2",
  displayH3: "bru-h3",
};

type BruTextOwnProps<T extends ElementType> = {
  as?: T;
  variant: BruTextVariant;
  className?: string;
  children?: ReactNode;
};

type BruTextProps<T extends ElementType = "div"> = BruTextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BruTextOwnProps<T>>;

export function BruText<T extends ElementType = "div">({
  as,
  variant,
  className,
  children,
  ...rest
}: BruTextProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<T>)}
      className={cn(VARIANT_CLASSES[variant], className)}
    >
      {children}
    </Component>
  );
}
