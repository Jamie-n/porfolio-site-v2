import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { formatTwoDigits } from "@/lib/utils";
import { BruText } from "./primitives/BruText";
import { RuledFigure } from "./primitives/RuledFigure";

export type FlowchartStep = {
  id: string;
  label: string;
};

export type FlowchartSummaryRow = {
  eyebrow: string;
  title: string;
  meta?: string;
};

const COLUMN_LAYOUT = {
  2: "grid grid-cols-1 sm:grid-cols-2 gap-3",
  3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
  4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
} as const;

export type FlowchartColumnLayout = keyof typeof COLUMN_LAYOUT;

export type FlowchartProps = {
  /** Main title in the figure header (accent title style). */
  title: ReactNode;
  /** Uppercase tracked label above the title (default: "Flow"). */
  headerEyebrow?: ReactNode;
  /** Ordered nodes rendered as ruled step cells. */
  steps: readonly FlowchartStep[];
  /** Optional closing row (e.g. loop back) below the step grid. */
  summaryRow?: FlowchartSummaryRow | null;
  /** Accessible description for the diagram region. */
  ariaLabel?: string;
  /** Character shown in the step connector box (default: →). */
  stepConnector?: ReactNode;
  /** Responsive column count for the step grid (default: 4). */
  columnLayout?: FlowchartColumnLayout;
  /** Format for the step index line; receives 1-based index. */
  formatStepIndex?: (oneBasedIndex: number) => string;
  className?: string;
};

const defaultFormatStepIndex = (n: number) => `Step ${formatTwoDigits(n)}`;

export const AI_LOOP_FLOWCHART_PRESET = {
  headerEyebrow: "Flow",
  ariaLabel:
    "Plan leads to Execute, then Test, then Refine, and loops back to Plan.",
  steps: [
    { id: "plan", label: "Plan" },
    { id: "execute", label: "Execute" },
    { id: "test", label: "Test" },
    { id: "refine", label: "Refine" },
  ],
  summaryRow: {
    eyebrow: "Loop",
    title: "Refine → Plan",
    meta: "Re-scope, adjust constraints, run it again.",
  },
  columnLayout: 4,
  stepConnector: "→",
} as const satisfies Partial<FlowchartProps>;

export default function Flowchart({
  title,
  headerEyebrow = "Flow",
  steps,
  summaryRow,
  ariaLabel,
  stepConnector = "→",
  columnLayout = 4,
  formatStepIndex = defaultFormatStepIndex,
  className,
}: FlowchartProps) {
  const gridClass = COLUMN_LAYOUT[columnLayout];

  return (
    <RuledFigure
      className={className}
      headerEyebrow={headerEyebrow}
      headerTitle={title}
    >
      <div
        role={ariaLabel ? "img" : undefined}
        aria-label={ariaLabel ?? undefined}
        className="grid gap-3"
      >
        <div className={cn("grid", gridClass)}>
          {steps.map((s, idx) => (
            <div
              key={s.id}
              className="border border-rulesolid bg-background/35 shadow-rule"
            >
              <div className="px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <BruText variant="label">{formatStepIndex(idx + 1)}</BruText>
                  <BruText variant="accTitle" className="mt-1 block">
                    {s.label}
                  </BruText>
                </div>
                <div className="shrink-0 grid place-items-center border border-rulesolid bg-background w-8 h-8 text-[14px] font-semibold text-foreground/60 leading-none">
                  {stepConnector}
                </div>
              </div>
            </div>
          ))}
        </div>

        {summaryRow ? (
          <div className="border border-rulesolid bg-background/35 shadow-rule">
            <div className="px-4 py-3 grid gap-3 sm:flex sm:items-center sm:justify-between">
              <div className="grid gap-1">
                <BruText variant="label">{summaryRow.eyebrow}</BruText>
                <BruText variant="accTitle">{summaryRow.title}</BruText>
                {summaryRow.meta ? (
                  <BruText variant="accMetaMuted">{summaryRow.meta}</BruText>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </RuledFigure>
  );
}
