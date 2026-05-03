import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CaseStudyCard from "@/app/components/CaseStudyCard";

const baseProps = {
  title: "Project name",
  chips: ["TypeScript", "React"] as const,
  summary: <p>Short summary of the work.</p>,
  bullets: ["First outcome", "Second outcome"] as const,
};

describe("CaseStudyCard", () => {
  it("renders title, chips, summary, and bullet list", () => {
    render(<CaseStudyCard {...baseProps} />);

    expect(
      screen.getByRole("heading", { name: "Project name" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Case study")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Short summary of the work.")).toBeInTheDocument();
    expect(screen.getByText("First outcome")).toBeInTheDocument();
    expect(screen.getByText("Second outcome")).toBeInTheDocument();
  });

  it("renders optional meta, footer, and appendix", () => {
    render(
      <CaseStudyCard
        {...baseProps}
        eyebrow="Featured"
        meta="2024 · Lead"
        footer={<button type="button">Read more</button>}
        appendix={{
          label: "Appendix",
          children: <p>Extra notes</p>,
        }}
      />,
    );

    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByText("2024 · Lead")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Read more" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Appendix")).toBeInTheDocument();
    expect(screen.getByText("Extra notes")).toBeInTheDocument();
  });

  it("does not render meta or footer when omitted", () => {
    render(<CaseStudyCard {...baseProps} />);
    expect(screen.queryByText("2024 · Lead")).not.toBeInTheDocument();
  });
});
