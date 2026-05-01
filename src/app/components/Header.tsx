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
      <h1 {...rest} className={cn("bru-h1", className)}>
        {children}
      </h1>
    );
  }

  return (
    <h2 {...rest} className={cn("bru-h2", className)}>
      {children}
    </h2>
  );
}
