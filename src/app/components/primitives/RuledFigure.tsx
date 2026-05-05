import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BruText } from "./BruText";

type RuledFigureProps = {
  headerEyebrow: ReactNode;
  headerTitle: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Ruled figure shell: hairline border, header band (label + title), padded body.
 */
export function RuledFigure({
  headerEyebrow,
  headerTitle,
  children,
  className,
}: RuledFigureProps) {
  return (
    <figure
      className={cn(
        "border border-rulesolid bg-background/55 shadow-rule overflow-hidden",
        className,
      )}
    >
      <div className="px-4 py-3 border-b border-rulesolid">
        <BruText variant="label">{headerEyebrow}</BruText>
        <BruText variant="accTitle" className="mt-1 block">
          {headerTitle}
        </BruText>
      </div>
      <div className="p-4">{children}</div>
    </figure>
  );
}
