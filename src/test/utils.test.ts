import { describe, expect, it, vi } from "vitest";
import { formatIndex, scrollToElement, slugify } from "@/utils";

describe("slugify", () => {
  it("trims, lowercases, removes symbols, and hyphenates", () => {
    expect(slugify("  Hello, World!  ")).toBe("hello-world");
  });

  it("collapses consecutive hyphens", () => {
    expect(slugify("Hello --- World")).toBe("hello-world");
  });
});

describe("formatIndex", () => {
  it("pads index+1 to 2 digits", () => {
    expect(formatIndex(0)).toBe("01");
    expect(formatIndex(8)).toBe("09");
    expect(formatIndex(9)).toBe("10");
  });
});

describe("scrollToElement", () => {
  it("resolves once element becomes visible by threshold", async () => {
    const el = document.createElement("div");

    const scrollIntoView = vi.fn();
    Object.defineProperty(el, "scrollIntoView", {
      value: scrollIntoView,
      writable: true,
    });

    let calls = 0;
    el.getBoundingClientRect = () => {
      calls += 1;
      if (calls < 2) {
        // not visible
        return { top: 1000, bottom: 1100, height: 100 } as DOMRect;
      }
      // visible in a 800px viewport
      return { top: 10, bottom: 110, height: 100 } as DOMRect;
    };

    const raf = vi
      .spyOn(window, "requestAnimationFrame")
      .mockImplementation((cb: FrameRequestCallback) => {
        cb(0);
        return 1;
      });

    vi.stubGlobal("innerHeight", 800);

    await expect(scrollToElement(el)).resolves.toBeUndefined();
    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });

    raf.mockRestore();
  });
});
