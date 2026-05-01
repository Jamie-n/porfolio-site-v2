"use client";

import Header from "../components/Header";
import type { MouseEvent } from "react";
import { scrollToHref } from "@/utils";
import Link from "next/link";

export default function Hero() {
  const handleInternalJump = async (
    e: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    await scrollToHref(href);
  };

  return (
    <div className="relative grid min-h-screen items-center">
      <div className="relative grid gap-14 sm:gap-16 lg:block">
        <div className="relative animate-enter group transition-all duration-200 ease-out lg:absolute lg:left-0 lg:top-10 lg:translate-y-0">
          <div className="absolute -inset-6 border border-border border-dashed transition-transform duration-200 ease-out group-hover:rotate-1" />

          <div
            aria-label="Profile"
            className="relative w-80 h-80 bg-surface border border-border shadow-rule overflow-hidden"
          >
            <div className="absolute inset-0 halftone opacity-[0.55]" />
            <div className="absolute inset-0 reg-marks opacity-[0.95]" />

            <div className="absolute inset-x-0 top-0 border-b border-border bg-background/80 backdrop-blur-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/70">
                  imprint
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/70">
                  edition 2026
                </span>
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid gap-3 text-center">
                <div className="inline-flex items-center justify-center gap-3">
                  <span className="inline-block h-3 w-3 border border-border bg-accent" />
                  <span className="inline-block h-3 w-3 border border-border bg-background" />
                  <span className="inline-block h-3 w-3 border border-border bg-foreground" />
                </div>

                <span className="text-7xl font-bold tracking-[-0.08em] text-foreground">
                  JN
                </span>

                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/70">
                  portfolio mark
                </span>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/85">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/70">
                  uk / remote
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-foreground/70">
                  build / ship / iterate
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 animate-enter animate-enter-delay-1 lg:pl-[24rem] lg:pt-10">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bru-label">
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-[1px] bg-border" />
                  Full‑stack engineer
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-[1px] bg-border" />
                  UI obsessed
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-3 w-[1px] bg-border" />
                  UK / Remote
                </span>
              </div>

              <Header variant="title" className="text-balance">
                I build sharp, print‑influenced web products that ship.
              </Header>

              <p className="max-w-[62ch] bru-prose-muted">
                I’m Jamie Neighbours — a software engineer who turns messy
                problems into clean systems and crisp interfaces. Fast
                iteration, strong UX, and details that hold up in production.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-rulesolid pt-6">
            <Link
              href="/projects"
              onClick={(e) => handleInternalJump(e, "/projects")}
              className="border border-border bg-background px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40"
            >
              View projects
            </Link>
            <Link
              href="/experience"
              onClick={(e) => handleInternalJump(e, "/experience")}
              className="border border-border bg-accent-weak px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40"
            >
              See experience
            </Link>
            <a
              href="mailto:jamie.neighbours@outlook.com"
              className="px-2 py-3 text-xs font-medium uppercase tracking-[0.1em] text-foreground/72 transition-colors duration-200 ease-out hover:text-accent"
            >
              Email
            </a>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Jamie-n"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="transition-all duration-200 ease-out hover:text-accent hover:-translate-y-[1px]"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/jamie-neighbours/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-linkedin transition-all duration-200 ease-out hover:text-accent hover:-translate-y-[1px]"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
