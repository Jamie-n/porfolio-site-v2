import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DarkModeToggle from "./DarkModeToggle";

describe("DarkModeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
  });

  it("uses saved preference from localStorage", async () => {
    localStorage.setItem("dark-mode", "true");
    render(<DarkModeToggle />);
    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(true),
    );
    await waitFor(() => expect(screen.getByRole("checkbox")).toBeChecked());
  });

  it("falls back to prefers-color-scheme when no saved preference", async () => {
    const mm = vi.spyOn(window, "matchMedia").mockImplementation(
      (query: string) =>
        ({
          matches: true,
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
        }) satisfies MediaQueryList,
    );

    render(<DarkModeToggle />);
    await waitFor(() => expect(screen.getByRole("checkbox")).toBeChecked());
    await waitFor(() =>
      expect(document.documentElement.classList.contains("dark")).toBe(true),
    );
    mm.mockRestore();
  });

  it("toggles class and persists to localStorage", async () => {
    const user = userEvent.setup();
    render(<DarkModeToggle />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("dark-mode")).toBe("true");

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("dark-mode")).toBe("false");
  });
});
