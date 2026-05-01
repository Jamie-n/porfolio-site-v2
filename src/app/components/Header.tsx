import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

interface HeaderProps
  extends PropsWithChildren,
    Omit<ComponentPropsWithoutRef<"h2">, "children"> {
  variant: "title" | "subheading";
}

export default function Header({ variant, children, ...rest }: HeaderProps) {
  const className = rest.className;

  if (variant === "title") {
    return (
      <h1
        {...rest}
        className={cn(
          "font-bold tracking-[-0.06em] leading-[0.9] text-[clamp(3.2rem,6vw,5.25rem)]",
          className,
        )}
      >
        {children}
      </h1>
    );
  }

  return (
    <h2
      {...rest}
      className={cn(
        "font-bold tracking-[-0.04em] leading-tight text-[clamp(1.55rem,2.4vw,2.25rem)]",
        className,
      )}
    >
      {children}
    </h2>
  );
}
