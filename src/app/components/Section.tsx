"use client";

import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
import useScrollSpy from "../hooks/useScrollSpy";
import ContentContainer from "./ContentContainer";
import Header from "./Header";

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

  // Set data-text after hydration
  useEffect(() => {
    if (ref.current && data) {
      ref.current.dataset.text = data;
    }
  }, [data]);

  useScrollSpy(ref, href);

  return (
    <div
      id={href}
      ref={ref}
      {...rest}
      className={`relative min-h-screen ml-80 bg-text mb-10 ${rest.className ?? ""}`.trim()}
    >
      <ContentContainer>
        {title && <Header variant="title">#{title.toUpperCase()}</Header>}
        {children}
      </ContentContainer>
    </div>
  );
}
