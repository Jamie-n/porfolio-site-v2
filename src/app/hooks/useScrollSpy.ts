"use client";

import { useEffect } from "react";

export default function useScrollSpy(
  ref: React.RefObject<HTMLElement | null>,
  href: string,
) {
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const next = new URL(href, window.location.href);
          if (next.href !== window.location.href) {
            window.history.replaceState(null, "", href);
          }
        }
      },
      {
        rootMargin: "-10% 0px -90% 0px",
        threshold: 0,
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [href, ref]);
}
