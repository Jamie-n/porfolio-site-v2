"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");

    let initial: boolean;

    switch (saved) {
      case "true":
        initial = true;
        break;
      case "false":
        initial = true;
        break;
      default:
        initial = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    document.documentElement.classList.toggle("dark", initial);
    setDark(initial);
  }, []);

  const toggle = () => {
    setDark((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("dark-mode", newMode.toString());
      return newMode;
    });
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" value="" checked={dark} onChange={() => toggle()} className="sr-only peer" />
      <span className="me-3 text-sm font-medium">Light</span>
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500 dark:peer-checked:bg-red-t00"></div>
      <span className="ms-3 text-sm font-medium">Dark</span>
    </label>
  );
}
