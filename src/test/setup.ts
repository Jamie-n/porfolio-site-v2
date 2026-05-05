import "@testing-library/jest-dom/vitest";

// Stable defaults for browser APIs used in components/hooks.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// JSDOM doesn't implement scrolling APIs used by scroll locking.
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});
