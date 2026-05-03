import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BruText } from "@/app/components/primitives/BruText";

describe("BruText", () => {
  it.each([
    ["label", "bru-label"],
    ["labelCompact", "bru-label-compact"],
    ["accTitle", "bru-acc-title"],
    ["accSubtitle", "bru-acc-subtitle"],
    ["accMeta", "bru-acc-meta"],
    ["accMetaMuted", "bru-acc-meta"],
    ["prose", "bru-prose"],
    ["proseMuted", "bru-prose-muted"],
    ["body", "bru-body"],
    ["bodyMuted", "bru-body-muted"],
    ["displayH1", "bru-h1"],
    ["displayH2", "bru-h2"],
    ["displayH3", "bru-h3"],
  ] as const)(
    "applies classes for variant %s",
    (variant, expectedSubstring) => {
      const { container } = render(
        <BruText variant={variant}>Content</BruText>,
      );
      const el = container.firstChild as HTMLElement;
      expect(el.className).toContain(expectedSubstring);
      expect(screen.getByText("Content")).toBeInTheDocument();
    },
  );

  it("merges className with variant classes", () => {
    const { container } = render(
      <BruText variant="label" className="extra-class">
        Eyebrow
      </BruText>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bru-label");
    expect(el.className).toContain("extra-class");
  });

  it("renders a custom element via as", () => {
    render(
      <BruText as="span" variant="accTitle" data-testid="t">
        Title
      </BruText>,
    );
    const el = screen.getByTestId("t");
    expect(el.tagName).toBe("SPAN");
    expect(el).toHaveClass("bru-acc-title");
  });

  it("applies bodyMuted foreground token", () => {
    const { container } = render(<BruText variant="bodyMuted">Tip</BruText>);
    expect((container.firstChild as HTMLElement).className).toContain(
      "text-foreground/72",
    );
  });
});
