"use client";

import { formatIndex } from "@/utils";
import Sidebar from "../components/nav/Sidebar";
import Section from "../components/Section";
import About from "../sections/About";
import Certifications from "../sections/Certifications";
import Experience from "../sections/Experience";
import Hero from "../sections/Hero";
import Projects from "../sections/Projects";
import Skills from "../sections/Skills";

export interface SectionItem {
  title: string;
  Component: React.ComponentType;
  href: string;
  showTitle?: boolean;
}

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
    <main className="no-scrollbar">
      <Sidebar sections={sections} />
      {sections.map(({ Component, href, title, showTitle }, idx) => (
        <Section
          key={href}
          data={formatIndex(idx)}
          href={href}
          title={showTitle !== false ? title : undefined}
        >
          <Component />
        </Section>
      ))}
    </main>
  );
}
