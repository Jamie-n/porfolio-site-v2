import { ComponentPropsWithoutRef } from "react";

type ToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  labels: { left: string; right: string };
} & Omit<ComponentPropsWithoutRef<"input">, "type" | "checked" | "onChange">;

export default function Toggle({
  checked,
  onCheckedChange,
  labels,
  ...rest
}: ToggleProps) {
  const { left, right } = labels;
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        {...rest}
        type="checkbox"
        value=""
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="sr-only peer"
      />
      <span className="me-3 bru-button text-foreground/72">{left}</span>
      <div className="relative w-11 h-6 bg-surface border border-border rounded-none shadow-rule peer-checked:bg-accent-weak peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[color:var(--ring)] transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-foreground after:rounded-none after:h-5 after:w-5 after:transition-transform after:duration-200 after:ease-out peer-checked:after:translate-x-full" />
      <span className="ms-3 bru-button text-foreground/72">{right}</span>
    </label>
  );
}
