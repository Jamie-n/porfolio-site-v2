"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ComponentProps } from "react";

const defaultCustomStyle: ComponentProps<
  typeof SyntaxHighlighter
>["customStyle"] = {
  margin: 0,
  background: "transparent",
  padding: 0,
  whiteSpace: "pre",
};

const defaultCodeTagProps: ComponentProps<
  typeof SyntaxHighlighter
>["codeTagProps"] = {
  style: {
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
};

type PrismCodeProps = {
  language: string;
  children: string;
};

export default function PrismCode({ language, children }: PrismCodeProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={oneDark}
      customStyle={defaultCustomStyle}
      codeTagProps={defaultCodeTagProps}
    >
      {children}
    </SyntaxHighlighter>
  );
}
