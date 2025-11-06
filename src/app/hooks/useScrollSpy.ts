"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useScrollSpy(ref: React.RefObject<HTMLElement | null>, href: string) {
  const router = useRouter();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.history.replaceState(null, "", href);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [href, router]);
}
