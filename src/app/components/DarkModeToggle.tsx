"use client";

import { useEffect, useState } from "react";
import Toggle from "./Toggle";

export default function DarkModeToggle() {
  const getInitialDark = () => {
    const saved = localStorage.getItem("dark-mode");
    switch (saved) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  };

  const [dark, setDark] = useState(() => getInitialDark());

  // Apply class to document on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggle = () => {
    setDark((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("dark-mode", newMode.toString());
      return newMode;
    });
  };

  return (
    <Toggle
      checked={dark}
      onChange={toggle}
      labels={{
        left: "Light",
        right: "Dark",
      }}
    />
  );
}
