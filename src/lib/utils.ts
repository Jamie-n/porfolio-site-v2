import type { MouseEvent } from "react";

export function slugify(str: string) {
  return str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function scrollToElement(
  el: HTMLElement,
  threshold = 0.5,
): Promise<void> {
  return new Promise((resolve) => {
    let frames = 0;
    const maxFrames = 240;

    const checkVisibility = () => {
      if (!el.isConnected || frames++ > maxFrames) {
        resolve();
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const isVisible =
        rect.top + rect.height * threshold <= vh &&
        rect.bottom - rect.height * threshold >= 0;

      if (isVisible) {
        resolve();
      } else {
        requestAnimationFrame(checkVisibility);
      }
    };

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(checkVisibility);
  });
}

export async function scrollToHref(
  href: string,
  options?: {
    threshold?: number;
    getTarget?: (href: string) => HTMLElement | null;
  },
): Promise<void> {
  const id = href.startsWith("#") ? href.slice(1) : href;
  const target = options?.getTarget?.(href) ?? document.getElementById(id);
  if (!target) return;

  await scrollToElement(target, options?.threshold);
  const next = new URL(href, window.location.href);
  if (next.href !== window.location.href) {
    window.history.replaceState(null, "", next.href);
  }
}

export function handleScrollLinkClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void,
) {
  onClick?.(e);
  if (e.defaultPrevented) return;
  e.preventDefault();
  void scrollToHref(href);
}

export function formatIndex(index: number): string {
  return (index + 1).toString().padStart(2, "0");
}

export function formatTwoDigits(n: number): string {
  return String(n).padStart(2, "0");
}
