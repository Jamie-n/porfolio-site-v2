import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Markdown from "@/app/components/Markdown";

describe("Markdown", () => {
  it("renders basic markdown elements", () => {
    render(<Markdown>{"# Hello\n\nA paragraph with `code`."}</Markdown>);
    expect(
      screen.getByRole("heading", { name: "Hello", level: 2 }),
    ).toBeInTheDocument();
    expect(screen.getByText("code")).toBeInTheDocument();
  });

  it("renders external links with safe target/rel", () => {
    render(<Markdown>{"[link](https://example.com)"}</Markdown>);
    const link = screen.getByRole("link", { name: "link" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("does not render raw script tags from markdown input", () => {
    const malicious = `Hello\n\n<script>window.__pwned = true;</script>`;
    const { container } = render(<Markdown>{malicious}</Markdown>);
    expect(container.querySelector("script")).toBeNull();
    expect(
      (window as unknown as { __pwned?: boolean }).__pwned,
    ).toBeUndefined();
  });

  it("does not render images from markdown input", () => {
    render(<Markdown>{"![alt](/some.png)"}</Markdown>);
    expect(screen.queryByRole("img")).toBeNull();
  });
});
