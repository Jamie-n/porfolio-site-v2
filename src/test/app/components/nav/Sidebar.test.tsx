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

describe("Sidebar (mobile)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("closes mobile menu and then scrolls after a nav tap", async () => {
    const user = userEvent.setup();

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
