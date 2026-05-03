import type { ReactNode } from "react";
import Header from "./Header";
import { BruText } from "./primitives/BruText";
import { cn } from "@/lib/cn";

export const caseStudyLinkButtonClassName = cn(
  "inline-flex items-center justify-center border border-border bg-background px-4 py-3 bru-button shadow-rule transition-all duration-200 ease-out",
  "hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent no-underline",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export type CaseStudyCardProps = {
  className?: string;
  eyebrow?: string;
  title: ReactNode;
  meta?: ReactNode;
  chips: readonly string[];
  summary: ReactNode;
  bullets: readonly string[];
  footer?: ReactNode;
  appendix?: { label: string; children: ReactNode };
};

export default function CaseStudyCard({
  className,
  eyebrow = "Case study",
  title,
  meta,
  chips,
  summary,
  bullets,
  footer,
  appendix,
}: CaseStudyCardProps) {
  return (
    <div className={cn("bru-panel px-6 py-5", className ?? "mb-12")}>
      <BruText variant="label">{eyebrow}</BruText>
      <Header variant="subheading">{title}</Header>
      {meta ? (
        <BruText variant="accMeta" className="mt-1 text-foreground/55">
          {meta}
        </BruText>
      ) : null}

      <BruText
        variant="label"
        className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-foreground/70"
      >
        {chips.map((chip) => (
          <span key={chip} className="inline-flex items-center gap-2">
            <span className="h-3 w-[1px] bg-border" />
            {chip}
          </span>
        ))}
      </BruText>

      <BruText variant="proseMuted" className="mt-4 max-w-[72ch] [&>p]:m-0">
        {summary}
      </BruText>

      <ul className="mt-5 list-none p-0 m-0 border border-rulesolid bg-background/55 shadow-rule">
        {bullets.map((t) => (
          <li key={t} className="border-b border-rulesolid last:border-b-0">
            <BruText
              as="p"
              variant="prose"
              className="m-0 px-5 py-3 max-w-none"
            >
              {t}
            </BruText>
          </li>
        ))}
      </ul>

      {footer ? (
        <div className="mt-5 flex flex-wrap gap-3 border-t border-rulesolid pt-6">
          {footer}
        </div>
      ) : null}

      {appendix ? (
        <div className="mt-8 border-t border-rulesolid pt-8">
          <BruText variant="label" className="mb-4 block">
            {appendix.label}
          </BruText>
          {appendix.children}
        </div>
      ) : null}
    </div>
  );
}
