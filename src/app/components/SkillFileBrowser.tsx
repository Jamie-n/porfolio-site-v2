"use client";

import { useEffect, useMemo, useState } from "react";
import Markdown from "./Markdown";
import { BruText } from "./primitives/BruText";
import { cn } from "@/lib/cn";
import LazyPrism from "./syntax/LazyPrism";

export type SkillFileItem = {
  id: string;
  title: string;
  path: string;
};

async function fetchText(path: string) {
  const res = await fetch(path, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed to load content: ${path}`);
  return await res.text();
}

type LoadedDoc = {
  path: string;
  content: string;
  error: string | null;
};

function formatDisplayPath(rawPath: string) {
  if (rawPath.startsWith("/content/")) return rawPath.replace("/content/", "");
  if (rawPath.startsWith("/api/raw/")) return rawPath.replace("/api/raw/", "");
  return rawPath;
}

function languageFromPath(p: string) {
  const lower = p.toLowerCase();
  if (lower.endsWith(".yml") || lower.endsWith(".yaml")) return "yaml";
  if (lower.endsWith(".sh")) return "bash";
  if (lower.endsWith(".ps1")) return "powershell";
  if (lower.endsWith(".ts")) return "typescript";
  if (lower.endsWith(".tsx")) return "tsx";
  if (lower.endsWith(".js")) return "javascript";
  if (lower.endsWith(".jsx")) return "jsx";
  if (lower.endsWith(".json")) return "json";
  if (lower.endsWith(".css")) return "css";
  if (lower.endsWith(".scss")) return "scss";
  if (lower.endsWith(".md")) return "markdown";
  return "";
}

export default function SkillFileBrowser({
  items,
}: {
  items: SkillFileItem[];
}) {
  const [activeId, setActiveId] = useState(() => items[0]?.id ?? "");
  const active = useMemo(
    () => items.find((i) => i.id === activeId) ?? items[0],
    [activeId, items],
  );
  const [doc, setDoc] = useState<LoadedDoc | null>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    void (async () => {
      try {
        const text = await fetchText(active.path);
        if (cancelled) return;
        setDoc({ path: active.path, content: text, error: null });
      } catch (err) {
        if (cancelled) return;
        setDoc({
          path: active.path,
          content: "",
          error: err instanceof Error ? err.message : "Failed to load file.",
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [active]);

  const isLoading = !doc || doc.path !== active?.path;
  const content = !isLoading ? (doc?.content ?? "") : "";
  const error = !isLoading ? (doc?.error ?? null) : null;
  const isMarkdown = Boolean(active?.path?.toLowerCase().endsWith(".md"));
  const codeLanguage = active?.path ? languageFromPath(active.path) : "";

  if (items.length === 0) {
    return (
      <div className="border border-rulesolid bg-background/55 shadow-rule px-5 py-4">
        <BruText variant="label">No files</BruText>
        <BruText as="p" variant="proseMuted" className="mt-2">
          No skill docs were provided.
        </BruText>
      </div>
    );
  }

  return (
    <div className="border border-rulesolid bg-background/40 shadow-rule overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,16rem)_1fr]">
        <div className="border-b border-rulesolid md:border-b-0 md:border-r md:border-r-rulesolid bg-background/50">
          <div className="px-4 py-3 flex items-center justify-between">
            <BruText variant="label">Files</BruText>
            <div className="font-mono text-[0.75rem] text-foreground/45">
              {String(items.length).padStart(2, "0")}
            </div>
          </div>
          <div className="border-t border-rulesolid">
            {items.map((i) => {
              const isActive = i.id === active?.id;
              return (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => setActiveId(i.id)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-rulesolid transition-all duration-200 ease-out",
                    "hover:-translate-y-[1px] hover:text-accent",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "bg-accent-weak text-accent"
                      : "text-foreground/80",
                  )}
                >
                  <BruText
                    variant="accTitle"
                    className="break-words whitespace-normal"
                  >
                    {i.title}
                  </BruText>
                  <div className="mt-1 font-mono text-[0.75rem] leading-snug text-foreground/45 break-all whitespace-normal">
                    {formatDisplayPath(i.path)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
          <div className="px-4 py-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <BruText variant="label">Preview</BruText>
              <BruText variant="accTitle" className="mt-1 truncate">
                {active?.title ?? "—"}
              </BruText>
            </div>
            {active?.path && (
              <a
                href={active.path}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 border border-border bg-background px-3 py-2 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Open raw
              </a>
            )}
          </div>
          <div className="border-t border-rulesolid px-4 py-4">
            {error ? (
              <BruText as="p" variant="proseMuted">
                {error}
              </BruText>
            ) : isLoading ? (
              <BruText as="p" variant="proseMuted">
                Loading…
              </BruText>
            ) : (
              <>
                {isMarkdown ? (
                  <Markdown>{content}</Markdown>
                ) : (
                  <pre className="overflow-x-auto whitespace-pre border border-rulesolid bg-background/50 px-4 py-3 shadow-rule font-mono text-[0.8125rem] leading-relaxed text-foreground/85">
                    <LazyPrism language={codeLanguage}>{content}</LazyPrism>
                  </pre>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
