import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Accordion from "./Accordion";

describe("Accordion", () => {
  it("toggles content visibility on click", async () => {
    const user = userEvent.setup();

    render(
      <Accordion Header={<div>Header</div>}>
        <div>Body</div>
      </Accordion>,
    );

    expect(screen.getByText("Body").parentElement?.parentElement).toHaveClass(
      "max-h-0",
    );

    await user.click(screen.getByText("Header"));
    expect(screen.getByText("Body").parentElement?.parentElement).toHaveClass(
      "opacity-100",
    );

    await user.click(screen.getByText("Header"));
    expect(screen.getByText("Body").parentElement?.parentElement).toHaveClass(
      "opacity-0",
    );
  });
});
