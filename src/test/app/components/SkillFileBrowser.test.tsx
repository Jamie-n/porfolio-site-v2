import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SkillFileBrowser from "@/app/components/SkillFileBrowser";

describe("SkillFileBrowser", () => {
  beforeEach(() => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async (input: RequestInfo | URL) => {
        const url = typeof input === "string" ? input : input.toString();
        const body = `# Doc for ${url}\n\nbody`;
        return new Response(body, { status: 200 });
      },
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("loads the first item by default and switches on click", async () => {
    const items = [
      { id: "a", title: "Skill A", path: "/content/skills/a.md" },
      { id: "b", title: "Skill B", path: "/content/skills/b.md" },
    ];

    render(<SkillFileBrowser items={items} />);

    expect(screen.getByRole("button", { name: /Skill A/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Skill B/ })).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          name: /Doc for \/content\/skills\/a\.md/,
        }),
      ).toBeInTheDocument(),
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Skill B/ }));

    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          name: /Doc for \/content\/skills\/b\.md/,
        }),
      ).toBeInTheDocument(),
    );
  });

  it("renders an empty state when given no items", () => {
    render(<SkillFileBrowser items={[]} />);
    expect(
      screen.getByText(/no skill docs were provided/i),
    ).toBeInTheDocument();
  });
});
