"use client";

import { useEffect, useState, type ComponentType } from "react";

type PrismCodeProps = {
  language: string;
  children: string;
};

function PlainCode({ children }: { children: string }) {
  return (
    <code className="font-mono text-[0.8125rem] leading-relaxed whitespace-pre text-foreground/85">
      {children}
    </code>
  );
}

/**
 * Loads react-syntax-highlighter (refractor) only on the client so Next.js
 * does not emit broken server vendor-chunks for `./vendor-chunks/refractor.js`.
 */
export default function LazyPrism({ language, children }: PrismCodeProps) {
  const [Inner, setInner] = useState<ComponentType<PrismCodeProps> | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    void import("./PrismCode").then((m) => {
      if (!cancelled) setInner(() => m.default);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Inner) {
    return <PlainCode>{children}</PlainCode>;
  }

  return <Inner language={language}>{children}</Inner>;
}
