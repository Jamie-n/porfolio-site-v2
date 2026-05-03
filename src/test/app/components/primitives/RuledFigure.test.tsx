import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RuledFigure } from "@/app/components/primitives/RuledFigure";

describe("RuledFigure", () => {
  it("renders a figure with header band and body", () => {
    render(
      <RuledFigure headerEyebrow="Eyebrow" headerTitle="Title text">
        <p>Body content</p>
      </RuledFigure>,
    );

    const figure = screen.getByRole("figure");
    expect(figure).toBeInTheDocument();
    expect(figure).toHaveClass("border-rulesolid");
    expect(screen.getByText("Eyebrow")).toBeInTheDocument();
    expect(screen.getByText("Title text")).toBeInTheDocument();
    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("merges className onto the figure", () => {
    render(
      <RuledFigure className="custom-figure" headerEyebrow="A" headerTitle="B">
        C
      </RuledFigure>,
    );
    expect(screen.getByRole("figure")).toHaveClass("custom-figure");
  });
});
