"use client";

import { ComponentPropsWithoutRef, PropsWithChildren, useRef } from "react";
import useScrollSpy from "../hooks/useScrollSpy";
import ContentContainer from "./ContentContainer";
import Header from "./Header";
import Reveal from "./Reveal";
import { cn } from "@/lib/cn";

interface SectionProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"div"> {
  href: string;
  data?: string;
  title?: string;
}

export default function Section({
  children,
  data = "01",
  href,
  title,
  ...rest
}: SectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useScrollSpy(ref, href);

  return (
    <div
      id={href}
      ref={ref}
      data-text={data}
      {...rest}
      className={cn(
        "relative min-h-screen ml-80 w-[calc(100%-20rem)] bg-text",
        rest.className,
      )}
    >
      <ContentContainer className="grid gap-8">
        {title && (
          <Reveal>
            <div className="grid gap-6">
              <div className="bru-panel px-4 py-3">
                <div className="bru-label">Section</div>
                <Header variant="title">{title}</Header>
              </div>
            </div>
          </Reveal>
        )}
        <Reveal delayMs={title ? 80 : 0}>
          <div className="min-w-0">{children}</div>
        </Reveal>
      </ContentContainer>
    </div>
  );
}
