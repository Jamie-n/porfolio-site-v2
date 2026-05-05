import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BruText } from "./BruText";
import Header from "@/app/components/Header";

type PanelPadding = "none" | "sm" | "md";

const PADDING_CLASS: Record<PanelPadding, string> = {
  none: "overflow-hidden p-0",
  sm: "px-4 py-3",
  md: "px-6 py-5",
};

type PanelProps = {
  children: ReactNode;
  className?: string;
  padding?: PanelPadding;
};

export function Panel({ children, className, padding = "md" }: PanelProps) {
  return (
    <div className={cn("bru-panel", PADDING_CLASS[padding], className)}>
      {children}
    </div>
  );
}

type PanelHeaderProps = {
  eyebrow: string;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function PanelHeader({
  eyebrow,
  title,
  children,
  className,
}: PanelHeaderProps) {
  return (
    <div
      className={cn("border-b border-rulesolid px-4 py-3 sm:px-5", className)}
    >
      <BruText variant="label">{eyebrow}</BruText>
      {title ? <Header variant="subheading">{title}</Header> : null}
      {children}
    </div>
  );
}
