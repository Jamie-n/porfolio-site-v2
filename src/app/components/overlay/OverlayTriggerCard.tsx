"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { BruText } from "@/app/components/primitives/BruText";

type OverlayTriggerCardProps = {
  eyebrow: string;
  title: string;
  onOpen: (openedByKeyboard: boolean) => void;
  className?: string;
};

export function OverlayTriggerCard({
  eyebrow,
  title,
  onOpen,
  className,
}: OverlayTriggerCardProps) {
  const openByKeyboardRef = useRef(false);

  return (
    <button
      type="button"
      onPointerDown={() => {
        openByKeyboardRef.current = false;
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          openByKeyboardRef.current = true;
        }
      }}
      onClick={() => onOpen(openByKeyboardRef.current)}
      className={cn(
        "w-full bru-panel px-4 py-3 text-left transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40",
        className,
      )}
    >
      <BruText variant="label">{eyebrow}</BruText>
      <BruText variant="displayH3" className="mt-1 block">
        {title}
      </BruText>
    </button>
  );
}
