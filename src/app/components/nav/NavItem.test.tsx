import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

vi.mock("../../../utils", async () => {
  const actual =
    await vi.importActual<typeof import("../../../utils")>("../../../utils");
  return {
    ...actual,
    scrollToElement: vi.fn(() => Promise.resolve()),
  };
});

import NavItem from "./NavItem";
import { scrollToElement } from "../../../utils";

describe("NavItem", () => {
  beforeEach(() => {
    vi.spyOn(window.history, "replaceState").mockImplementation(() => {});
    document.body.innerHTML = "";
  });

  it("renders as active when pathname matches href", () => {
    render(<NavItem linkText="02. About" href="/about" />);
    expect(screen.getByText("02. About")).toHaveClass("text-red-500");
  });

  it("smooth-scrolls and updates URL without navigation", async () => {
    const user = userEvent.setup();
    const section = document.createElement("div");
    section.id = "/projects";
    document.body.appendChild(section);

    render(<NavItem linkText="03. Projects" href="/projects" />);

    const link = screen.getByRole("link");
    await user.click(link);
    expect(scrollToElement).toHaveBeenCalledWith(section);
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "/projects",
    );
  });
});
