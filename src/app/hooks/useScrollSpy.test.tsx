import { render } from "@testing-library/react";
import { useRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useScrollSpy from "./useScrollSpy";

vi.mock("next/navigation", () => ({
  useRouter: () => ({}),
}));

class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }
  observe = vi.fn();
  disconnect = vi.fn();
  // helper for tests
  trigger(entry: Partial<IntersectionObserverEntry>) {
    this.callback(
      [entry as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

describe("useScrollSpy", () => {
  let observer: MockIntersectionObserver | null = null;

  beforeEach(() => {
    observer = null;
    vi.spyOn(window.history, "replaceState").mockImplementation(() => {});

    globalThis.IntersectionObserver = class IntersectionObserver {
      private impl: MockIntersectionObserver;
      constructor(cb: IntersectionObserverCallback) {
        observer = new MockIntersectionObserver(cb);
        this.impl = observer;
      }
      observe(...args: Parameters<MockIntersectionObserver["observe"]>) {
        return this.impl.observe(...args);
      }
      disconnect(...args: Parameters<MockIntersectionObserver["disconnect"]>) {
        return this.impl.disconnect(...args);
      }
    } as unknown as typeof IntersectionObserver;
  });

  it("observes the element and updates URL when intersecting", () => {
    function Test() {
      const ref = useRef<HTMLDivElement | null>(null);
      useScrollSpy(ref, "/about");
      return <div ref={ref} />;
    }

    render(<Test />);
    expect(observer?.observe).toHaveBeenCalled();

    observer?.trigger({ isIntersecting: true });
    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      "",
      "/about",
    );
  });
});
