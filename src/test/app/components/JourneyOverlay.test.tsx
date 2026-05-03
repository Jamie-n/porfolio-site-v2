import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import JourneyOverlay, {
  OPEN_JOURNEY_OVERLAY_EVENT,
} from "@/app/components/JourneyOverlay";

const stubFetch = () => {
  const fetchSpy = vi
    .spyOn(globalThis, "fetch")
    .mockImplementation(async (input: RequestInfo | URL) => {
      const url = typeof input === "string" ? input : input.toString();
      const body = `# ${url}\n\nstub content`;
      return new Response(body, { status: 200 });
    });
  return fetchSpy;
};

describe("JourneyOverlay", () => {
  let fetchSpy: ReturnType<typeof stubFetch>;

  beforeEach(() => {
    fetchSpy = stubFetch();
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  it("opens via the sidebar trigger and shows the tab buttons", async () => {
    const user = userEvent.setup();
    render(<JourneyOverlay skills={[]} />);

    await user.click(screen.getByRole("button", { name: /journey/i }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Journey", pressed: true }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Inspiration" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "AI workflow" }),
    ).toBeInTheDocument();
  });

  it("opens via the global event and exposes a close button", async () => {
    render(<JourneyOverlay skills={[]} />);

    window.dispatchEvent(new CustomEvent(OPEN_JOURNEY_OVERLAY_EVENT));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("opens to the requested tab when the event includes a tab detail", async () => {
    render(<JourneyOverlay skills={[]} />);

    window.dispatchEvent(
      new CustomEvent(OPEN_JOURNEY_OVERLAY_EVENT, {
        detail: { tab: "ai" },
      }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "AI workflow", pressed: true }),
      ).toBeInTheDocument(),
    );
  });

  it("shows the embedded AI workflow flowchart on the AI tab", async () => {
    render(<JourneyOverlay skills={[]} />);

    window.dispatchEvent(
      new CustomEvent(OPEN_JOURNEY_OVERLAY_EVENT, {
        detail: { tab: "ai" },
      }),
    );

    await waitFor(() =>
      expect(
        screen.getByText("Plan → Execute → Test → Refine"),
      ).toBeInTheDocument(),
    );
    expect(screen.getByText("Execute")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Plan leads to Execute, then Test, then Refine, and loops back to Plan.",
      }),
    ).toBeInTheDocument();
  });
});
