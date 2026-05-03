import { ComponentPropsWithoutRef, PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

type ContentContainerProps = PropsWithChildren<ComponentPropsWithoutRef<"div">>;

export default function ContentContainer({
  children,
  className,
  ...rest
}: ContentContainerProps) {
  return (
    <div
      {...rest}
      className={cn(
        "px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 py-10 sm:py-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
