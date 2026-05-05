import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

vi.mock("@/lib/utils", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/utils")>("@/lib/utils");
  return {
    ...actual,
    scrollToHref: vi.fn(() => Promise.resolve()),
  };
});

import NavItem from "@/app/components/nav/NavItem";
import { scrollToHref } from "@/lib/utils";

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

    render(<NavItem linkText="03. Projects" href="/projects" />);

    const link = screen.getByRole("link");
    await user.click(link);
    await waitFor(() => {
      expect(scrollToHref).toHaveBeenCalledWith("/projects");
    });
  });
});
