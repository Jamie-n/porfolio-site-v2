import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AiLoopFlowchart from "@/app/components/AiLoopFlowchart";

describe("AiLoopFlowchart", () => {
  it("renders the preset workflow with default title", () => {
    render(<AiLoopFlowchart />);

    expect(screen.getByText("AI workflow loop")).toBeInTheDocument();
    expect(screen.getByText("Plan")).toBeInTheDocument();
    expect(screen.getByText("Execute")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Refine")).toBeInTheDocument();
    expect(screen.getByText("Refine → Plan")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Plan leads to Execute, then Test, then Refine, and loops back to Plan.",
      }),
    ).toBeInTheDocument();
  });

  it("allows overriding the figure title", () => {
    render(<AiLoopFlowchart title="Custom loop title" />);
    expect(screen.getByText("Custom loop title")).toBeInTheDocument();
    expect(screen.queryByText("AI workflow loop")).not.toBeInTheDocument();
  });
});
