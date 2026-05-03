import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Flowchart from "@/app/components/Flowchart";

describe("Flowchart", () => {
  it("renders steps, default step indices, and summary row", () => {
    render(
      <Flowchart
        title="My flow"
        ariaLabel="A simple two-step flow."
        steps={[
          { id: "one", label: "First" },
          { id: "two", label: "Second" },
        ]}
        summaryRow={{
          eyebrow: "Outcome",
          title: "Done",
          meta: "Ship it.",
        }}
        columnLayout={2}
      />,
    );

    expect(screen.getByText("My flow")).toBeInTheDocument();
    expect(screen.getByText("Flow")).toBeInTheDocument();
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("Step 01")).toBeInTheDocument();
    expect(screen.getByText("Step 02")).toBeInTheDocument();
    expect(screen.getByText("Outcome")).toBeInTheDocument();
    expect(screen.getByText("Done")).toBeInTheDocument();
    expect(screen.getByText("Ship it.")).toBeInTheDocument();

    const diagram = screen.getByRole("img", {
      name: "A simple two-step flow.",
    });
    expect(diagram).toBeInTheDocument();
  });

  it("still renders summary eyebrow and title when meta is omitted", () => {
    render(
      <Flowchart
        title="T"
        steps={[{ id: "a", label: "Only" }]}
        summaryRow={{ eyebrow: "E", title: "Row" }}
      />,
    );
    expect(screen.getByText("E")).toBeInTheDocument();
    expect(screen.getByText("Row")).toBeInTheDocument();
  });

  it("omits summary row when summaryRow is null", () => {
    render(
      <Flowchart
        title="T"
        steps={[{ id: "a", label: "Only" }]}
        summaryRow={null}
      />,
    );
    expect(screen.queryByText("Loop")).not.toBeInTheDocument();
  });

  it("does not use role img when ariaLabel is omitted", () => {
    render(
      <Flowchart
        title="T"
        steps={[{ id: "a", label: "Only" }]}
        summaryRow={null}
      />,
    );
    expect(screen.queryByRole("img")).toBeNull();
  });

  it("uses custom header eyebrow, connector, and step index formatter", () => {
    render(
      <Flowchart
        title="Diagram"
        headerEyebrow="Phases"
        stepConnector="»"
        formatStepIndex={(n) => `#${n}`}
        steps={[
          { id: "x", label: "Alpha" },
          { id: "y", label: "Beta" },
        ]}
        summaryRow={null}
      />,
    );

    expect(screen.getByText("Phases")).toBeInTheDocument();
    expect(screen.getByText("#1")).toBeInTheDocument();
    expect(screen.getByText("#2")).toBeInTheDocument();
    const connectors = screen.getAllByText("»");
    expect(connectors.length).toBe(2);
  });
});
