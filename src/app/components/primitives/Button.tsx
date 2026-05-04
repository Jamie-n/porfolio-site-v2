import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "default" | "accent" | "surface";
type ButtonSize = "compact" | "sm" | "md";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  default: "bg-background",
  accent: "bg-accent-weak",
  surface: "bg-surface/40 text-foreground/75 hover:text-accent",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  compact: "px-4 py-2",
  sm: "px-3 py-2",
  md: "px-4 py-3",
};

export const BASE_BUTTON_CLASS =
  "border border-border bru-button shadow-rule transition-all duration-200 ease-out " +
  "hover:-translate-y-[1px] hover:border-accent/40 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "default", size = "md", className, children, ...props },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          BASE_BUTTON_CLASS,
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export type LinkButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function LinkButton({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      className={cn(
        BASE_BUTTON_CLASS,
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        "inline-flex items-center justify-center no-underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
