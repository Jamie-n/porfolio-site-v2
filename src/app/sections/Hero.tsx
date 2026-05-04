"use client";

import Header from "@/app/components/Header";
import { BruText } from "@/app/components/primitives/BruText";
import { SocialLinks } from "@/app/components/SocialLinks";
import { ScrollLink } from "@/app/components/ScrollLink";

export default function Hero() {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center max-lg:min-h-0 max-lg:justify-start">
      {/* `lg:flex-1` + `lg:items-center` so the imprint column can sit on the true vertical midline of the home section (absolute card does not set parent height). */}
      <div className="relative grid w-full gap-10 sm:gap-14 lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:gap-16">
        {/* Dashed ring uses padding (no negative inset) so section overflow does not clip it. */}
        <div className="relative mx-auto w-full max-w-[min(17rem,78svw)] animate-enter transition-all duration-200 ease-out sm:max-w-[18rem] lg:absolute lg:left-0 lg:top-1/2 lg:mx-0 lg:w-auto lg:max-w-none lg:-translate-y-1/2">
          <div className="group border-2 border-dashed border-border p-2.5 shadow-rule transition-transform duration-200 ease-out hover:rotate-1 sm:p-3 lg:border lg:p-3">
            <div
              aria-label="Profile"
              className="relative aspect-square w-full bg-surface border border-border shadow-rule overflow-hidden lg:aspect-auto lg:h-80 lg:w-80"
            >
              <div className="absolute inset-0 z-0 halftone opacity-[0.4] sm:opacity-[0.48] lg:opacity-[0.55]" />
              <div className="absolute inset-0 z-[1] reg-marks opacity-[0.95]" />

              <div className="absolute inset-x-0 top-0 z-20 border-b border-border bg-background max-lg:backdrop-blur-none lg:bg-background/80 lg:backdrop-blur-sm">
                <div className="flex items-center justify-between px-4 py-3">
                  <BruText
                    as="span"
                    variant="labelCompact"
                    className="text-foreground/70"
                  >
                    imprint
                  </BruText>
                  <BruText
                    as="span"
                    variant="labelCompact"
                    className="text-foreground/70"
                  >
                    edition 2026
                  </BruText>
                </div>
              </div>

              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex flex-col items-center gap-2 text-5xl font-bold leading-none tracking-[-0.08em] text-foreground sm:text-6xl md:text-7xl">
                    <div
                      className="portfolio-mark__swatches translate-x-[0.04em]"
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <span>JN</span>
                  </div>

                  <BruText
                    as="span"
                    variant="labelCompact"
                    className="text-foreground/70"
                  >
                    portfolio mark
                  </BruText>
                </div>
              </div>

              <div className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-background lg:bg-background/85">
                <div className="flex items-center justify-between px-4 py-3">
                  <BruText
                    as="span"
                    variant="labelCompact"
                    className="text-foreground/70"
                  >
                    uk / remote
                  </BruText>
                  <BruText
                    as="span"
                    variant="labelCompact"
                    className="text-foreground/70"
                  >
                    build / ship / iterate
                  </BruText>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 animate-enter animate-enter-delay-1 lg:pl-[24rem]">
          <div className="grid gap-4">
            <div className="grid gap-3">
              <BruText
                variant="label"
                className="flex flex-wrap items-center gap-x-4 gap-y-2"
              >
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
              </BruText>

              <Header variant="title" className="text-balance">
                I build sharp, print‑influenced web products that ship.
              </Header>

              <BruText as="p" variant="proseMuted" className="max-w-[62ch]">
                I'm Jamie Neighbours — a software engineer who turns messy
                problems into clean systems and crisp interfaces. Fast
                iteration, strong UX, and details that hold up in production.
              </BruText>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-rulesolid pt-6">
            <ScrollLink
              href="/projects"
              className="border border-border bg-background px-4 py-3 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40"
            >
              View projects
            </ScrollLink>
            <ScrollLink
              href="/experience"
              className="border border-border bg-accent-weak px-4 py-3 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40"
            >
              See experience
            </ScrollLink>
            <a
              href="mailto:jamie.neighbours@outlook.com"
              className="px-2 py-3 bru-link text-foreground/72 transition-colors duration-200 ease-out hover:text-accent"
            >
              Email
            </a>
          </div>

          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
