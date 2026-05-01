import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        muted: "var(--muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-weak": "var(--accent-weak)",
        ring: "var(--ring)",
        /** Opaque rules for tables / stacks on gridded panels (`globals.css` --rule-solid) */
        rulesolid: "var(--rule-solid)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        rule: "var(--shadow-1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
