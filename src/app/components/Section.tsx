"use client"

import { ComponentPropsWithoutRef, PropsWithChildren, useEffect, useRef } from "react";
import useIsVisible from "../hooks/useIsVisible";

export default function Section({ children, data = "01", onIsVisible, ...rest }: { data?: string, onIsVisible?: () => void } & PropsWithChildren & ComponentPropsWithoutRef<"div">) {

  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(sectionRef);

  useEffect(() => {
    if (isVisible) {
      if (onIsVisible) {
        onIsVisible();
      }
    }
  }, [isVisible, onIsVisible])

  return (
    <div ref={sectionRef} {...rest} className={"relative ml-80 bg-text min-h-screen my-10 " + rest.className} data-text={data}>
      {children}
    </div>
  )
}
