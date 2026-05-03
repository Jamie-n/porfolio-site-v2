"use client";

import { BruText } from "./primitives/BruText";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/cn";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a ?? []),
      ["target", "_blank"],
      ["rel", "noopener noreferrer"],
    ],
    code: [...(defaultSchema.attributes?.code ?? []), ["className"]],
    pre: [...(defaultSchema.attributes?.pre ?? []), ["className"]],
  },
  tagNames: [
    "a",
    "p",
    "br",
    "strong",
    "em",
    "ul",
    "ol",
    "li",
    "code",
    "pre",
    "blockquote",
    "hr",
    "h1",
    "h2",
    "h3",
    "h4",
  ],
};

export default function Markdown({ children }: { children: string }) {
  return (
    <div className="grid gap-4">
      <ReactMarkdown
        disallowedElements={[
          "img",
          "table",
          "thead",
          "tbody",
          "tr",
          "td",
          "th",
        ]}
        unwrapDisallowed
        rehypePlugins={[[rehypeSanitize, schema]]}
        components={{
          p: ({ className, ...props }) => (
            <BruText
              as="p"
              variant="prose"
              className={cn("max-w-[80ch]", className)}
              {...props}
            />
          ),
          li: ({ className, ...props }) => (
            <BruText
              as="li"
              variant="prose"
              className={cn("max-w-[80ch]", className)}
              {...props}
            />
          ),
          a: ({ href, ...props }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bru-link text-muted hover:text-accent transition-colors duration-200"
              {...props}
            />
          ),
          code: ({ className, children, ...props }) => {
            const isBlock =
              typeof className === "string" && /language-/.test(className);
            if (!isBlock) {
              return (
                <code
                  className="font-mono text-[0.875em] text-foreground/85"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const lang = className?.replace("language-", "") ?? "";
            const raw = String(children ?? "").replace(/\n$/, "");

            return (
              <SyntaxHighlighter
                language={lang}
                style={oneDark}
                customStyle={{
                  margin: 0,
                  background: "transparent",
                  padding: 0,
                  whiteSpace: "pre",
                }}
                codeTagProps={{
                  style: {
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  },
                }}
              >
                {raw}
              </SyntaxHighlighter>
            );
          },
          pre: ({ children, ...props }) => (
            <pre
              className="overflow-x-auto whitespace-pre border border-rulesolid bg-background/50 px-4 py-3 shadow-rule"
              {...props}
            >
              {children}
            </pre>
          ),
          h1: ({ className, ...props }) => (
            <BruText
              as="h2"
              variant="displayH2"
              className={className}
              {...props}
            />
          ),
          h2: ({ className, ...props }) => (
            <BruText
              as="h3"
              variant="displayH3"
              className={className}
              {...props}
            />
          ),
          h3: ({ className, ...props }) => (
            <BruText
              as="h4"
              variant="accTitle"
              className={className}
              {...props}
            />
          ),
          h4: ({ className, ...props }) => (
            <BruText variant="label" className={className} {...props} />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
