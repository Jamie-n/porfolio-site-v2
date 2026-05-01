import { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export default function CustomAnchor({
  children,
  className,
  ...rest
}: ComponentProps<"a">) {
  return (
    <a
      {...rest}
      className={cn("underline hover:text-accent transition-colors", className)}
    >
      {children}
    </a>
  );
}
