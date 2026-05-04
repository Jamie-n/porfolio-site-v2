import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BruText } from "./BruText";

export type RuledListProps = {
  children: ReactNode;
  className?: string;
};

export function RuledList({ children, className }: RuledListProps) {
  return (
    <ul
      className={cn(
        "list-none p-0 m-0 border border-rulesolid bg-background/55 shadow-rule",
        className,
      )}
    >
      {children}
    </ul>
  );
}

export type RuledListItemProps = {
  children: ReactNode;
  className?: string;
};

export function RuledListItem({ children, className }: RuledListItemProps) {
  return (
    <li className={cn("border-b border-rulesolid last:border-b-0", className)}>
      {children}
    </li>
  );
}

export type KeyValueListItemProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function KeyValueListItem({
  label,
  children,
  className,
}: KeyValueListItemProps) {
  return (
    <RuledListItem className={cn("grid gap-1 px-5 py-3", className)}>
      <BruText variant="label" className="text-foreground/70">
        {label}
      </BruText>
      <BruText as="p" variant="prose" className="m-0 max-w-none">
        {children}
      </BruText>
    </RuledListItem>
  );
}
