"use client";

import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = PropsWithChildren<
  {
    /** Delay after intersecting before the transition runs (ms). */
    delayMs?: number;
    /** Passed to IntersectionObserver. */
    rootMargin?: string;
  } & Omit<ComponentPropsWithoutRef<"div">, "children">
>;

export default function Reveal({
  children,
  className,
  delayMs = 0,
  rootMargin = "0px 0px -10% 0px",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.06 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} {...rest}>
      <div
        className={[
          "transition-[opacity,transform] duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[opacity,transform]",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
        ].join(" ")}
        style={{
          ...style,
          transitionDelay: visible ? `${delayMs}ms` : "0ms",
        }}
      >
        {children}
      </div>
    </div>
  );
}
