"use client";

import { useEffect, useState } from "react";
import Toggle from "./Toggle";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    // Client component, but Next can still render it on the server.
    if (typeof window === "undefined") return false;

    try {
      const saved = window.localStorage.getItem("dark-mode");
      if (saved === "true") return true;
      if (saved === "false") return false;
    } catch {
      // ignore
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

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
