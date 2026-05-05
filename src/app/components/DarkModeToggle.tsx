"use client";

import { useEffect, useState } from "react";
import Toggle from "./Toggle";

function readSavedDarkMode(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = window.localStorage.getItem("dark-mode");
    if (saved === "true") return true;
    if (saved === "false") return false;
  } catch {
    // ignore
  }
  return null;
}

export default function DarkModeToggle() {
  // Start with a deterministic value to avoid SSR hydration mismatches.
  const [dark, setDark] = useState(false);

  // Sync from saved preference/system on mount (and respond to OS changes if no saved pref).
  useEffect(() => {
    let raf = 0;
    const saved = readSavedDarkMode();
    if (saved !== null) {
      raf = requestAnimationFrame(() => setDark(saved));
      return () => cancelAnimationFrame(raf);
    }

    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    const apply = () => setDark(mq?.matches ?? false);
    raf = requestAnimationFrame(apply);

    if (!mq) return;
    const onChange = () => apply();
    mq.addEventListener?.("change", onChange);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener?.("change", onChange);
    };
  }, []);

  // Apply class to document on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    setDark((prev) => {
      const newMode = !prev;
      try {
        window.localStorage.setItem("dark-mode", newMode.toString());
      } catch {
        // ignore
      }
      return newMode;
    });
  };

  return (
    <Toggle
      checked={dark}
      onCheckedChange={() => toggle()}
      labels={{
        left: "Light",
        right: "Dark",
      }}
      testId="dark-mode-toggle"
    />
  );
}
