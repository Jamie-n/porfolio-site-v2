"use client";

import type { CSSProperties, ReactNode } from "react";
import { useCallback, useState } from "react";
import FirstVisitSplash from "@/app/components/FirstVisitSplash";

/** SSR cover until the client splash mounts; dismissed via state so the stub stays in React's tree (Fast Refresh / HMR safe). */
const SPLASH_STUB_STYLE = {
  position: "fixed",
  inset: 0,
  zIndex: 2147483646,
  background: "var(--background, #fff)",
} as const satisfies CSSProperties;

export function SplashGate({ children }: { children: ReactNode }) {
  const [stubShown, setStubShown] = useState(true);
  const dismissStub = useCallback(() => setStubShown(false), []);

  return (
    <>
      {stubShown && (
        <div id="jn-splash-stub" aria-hidden style={SPLASH_STUB_STYLE} />
      )}
      {children}
      <FirstVisitSplash dismissStub={dismissStub} />
    </>
  );
}
