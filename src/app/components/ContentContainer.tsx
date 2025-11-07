import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface SectionProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"div"> {
  title?: string;
}

export default function ContentContainer({ children, ...rest }: SectionProps) {
  return (
    <div className={`px-36 py-12 ${rest.className ?? ""}`.trim()}>
      {children}
    </div>
  );
}
