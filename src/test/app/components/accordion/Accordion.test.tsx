import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Accordion from "@/app/components/accordion/Accordion";

describe("Accordion", () => {
  it("toggles content visibility on click", async () => {
    const user = userEvent.setup();

    render(
      <Accordion header={<div>Header</div>}>
        <div>Body</div>
      </Accordion>,
    );

    const collapsible = screen.getByTestId("accordion-collapsible");
    expect(collapsible).toHaveClass("max-h-0", "opacity-0");

    await user.click(screen.getByText("Header"));
    expect(collapsible).toHaveClass("opacity-100");

    await user.click(screen.getByText("Header"));
    expect(collapsible).toHaveClass("opacity-0");
  });
});
