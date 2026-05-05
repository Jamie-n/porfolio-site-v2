"use client";

import { cn } from "@/lib/cn";
import { BruText } from "@/app/components/primitives/BruText";
import { Button } from "@/app/components/primitives/Button";

export function OverlayStickyHeader({
  labelledBy,
  label,
  title,
  description,
  closeButtonRef,
  onClose,
  className,
}: {
  labelledBy: string;
  label: string;
  title: string;
  description?: string;
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "shrink-0 bg-background/97 backdrop-blur-sm border-b border-border",
        className,
      )}
    >
      <div className="px-6 sm:px-8 pt-[max(1rem,env(safe-area-inset-top))] pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <BruText as="p" id={labelledBy} variant="label">
              {label}
            </BruText>
            <BruText as="h1" variant="displayH2" className="mt-2">
              {title}
            </BruText>
            {description ? (
              <BruText
                as="p"
                variant="proseMuted"
                className="mt-3 max-w-[72ch]"
              >
                {description}
              </BruText>
            ) : null}
          </div>

          <Button
            ref={closeButtonRef}
            variant="surface"
            size="compact"
            onClick={onClose}
            className="shrink-0 self-start"
          >
            Close
          </Button>
        </div>
      </div>
    </header>
  );
}
