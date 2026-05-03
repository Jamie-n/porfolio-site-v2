"use client";

import type { SectionItem } from "@/app/types/sectionItem";
import { formatIndex } from "@/lib/utils";
import Sidebar from "../components/nav/Sidebar";
import Section from "../components/Section";
import About from "../sections/About";
import Certifications from "../sections/Certifications";
import Experience from "../sections/Experience";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";
import { Fragment } from "react";

export default function HomeClient() {
  const sections: SectionItem[] = [
    { title: "Home", showTitle: false, Component: Hero, href: "/" },
    { title: "About", Component: About, href: "/about" },
    { title: "Skills", Component: Skills, href: "/skills" },
    { title: "Experience", Component: Experience, href: "/experience" },
    { title: "Projects", Component: Projects, href: "/projects" },
    {
      title: "Certifications",
      Component: Certifications,
      href: "/certifications",
    },
  ];

  return (
    <main className="min-w-0 overflow-x-clip pt-14 lg:pt-0">
      <Sidebar sections={sections} />
      {sections.map(({ Component, href, title, showTitle }, idx) => (
        <Fragment key={href}>
          <Section
            data={formatIndex(idx)}
            href={href}
            title={showTitle !== false ? title : undefined}
          >
            <Component />
          </Section>
          {idx < sections.length - 1 && (
            <div className="section-spacer w-full lg:ml-80 lg:w-[calc(100%-20rem)]">
              <div className="section-spacer__crosshair" aria-hidden="true" />
              <div className="section-spacer__swatches" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="section-spacer__meta" aria-hidden="true">
                <span>LOC: UK / REMOTE</span>
                <span>BUILD: 2026</span>
                <span>STATE: LIVE</span>
              </div>
            </div>
          )}
        </Fragment>
      ))}
    </main>
  );
}
