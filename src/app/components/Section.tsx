"use client";

import { ComponentPropsWithoutRef, PropsWithChildren, useRef } from "react";
import useScrollSpy from "../hooks/useScrollSpy";
import ContentContainer from "./ContentContainer";
import Header from "./Header";
import { BruText } from "./primitives/BruText";
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
        "relative w-full bg-text",
        /* Align with `main` max-lg top padding (pt-14): one viewport = pad + section */
        "min-h-[calc(100svh-3.5rem)] lg:min-h-screen",
        "lg:ml-80 lg:w-[calc(100%-20rem)]",
        rest.className,
      )}
    >
      <ContentContainer className="grid gap-8">
        {title && (
          <Reveal>
            <div className="grid gap-6">
              <div className="bru-panel px-4 py-3">
                <BruText variant="label">Section</BruText>
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
