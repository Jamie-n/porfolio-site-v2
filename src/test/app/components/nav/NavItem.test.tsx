import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

vi.mock("@/utils", async () => {
  const actual = await vi.importActual<typeof import("@/utils")>("@/utils");
  return {
    ...actual,
    scrollToHref: vi.fn(() => Promise.resolve()),
  };
});

import NavItem from "@/app/components/nav/NavItem";
import { scrollToHref } from "@/utils";

describe("NavItem", () => {
  beforeEach(() => {
    vi.spyOn(window.history, "replaceState").mockImplementation(() => {});
    document.body.innerHTML = "";
  });

  it("renders as active when pathname matches href", () => {
    render(<NavItem linkText="02. About" href="/about" />);
    const label = screen.getByText("02. About");
    expect(label).toHaveClass("bru-h3");
    expect(label).toHaveClass("text-accent");
  });

  it("smooth-scrolls and updates URL without navigation", async () => {
    const user = userEvent.setup();
    const section = document.createElement("div");
    section.id = "/projects";
    document.body.appendChild(section);

    render(<NavItem linkText="03. Projects" href="/projects" />);

    const link = screen.getByRole("link");
    await user.click(link);
    expect(scrollToHref).toHaveBeenCalledWith("/projects");
  });
});
