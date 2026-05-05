import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/utils", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/utils")>("@/lib/utils");
  return {
    ...actual,
    scrollToHref: vi.fn(() => Promise.resolve()),
  };
});

import Sidebar from "@/app/components/nav/Sidebar";
import { scrollToHref } from "@/lib/utils";

function stubMatchMedia(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: "",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("Sidebar (mobile)", () => {
  beforeEach(() => {
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    document.body.innerHTML = "";
    stubMatchMedia(false);
  });

  it("closes mobile menu and then scrolls after a nav tap", async () => {
    const user = userEvent.setup();

    const section = document.createElement("div");
    section.id = "projects";
    document.body.appendChild(section);

    render(
      <Sidebar
        sections={[
          { title: "Projects", href: "#projects" },
          { title: "Contact", href: "#contact" },
        ]}
      />,
    );

    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    const projectsLink = screen.getByRole("link", { name: /projects/i });
    await user.click(projectsLink);

    // State updates (close) happen immediately; scroll is deferred.
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => {
      expect(scrollToHref).toHaveBeenCalledWith("#projects");
    });
  });
});
