import { useCallback, type MouseEvent } from "react";
import { scrollToHref } from "@/lib/utils";

export function handleScrollLinkClick(
  e: MouseEvent<HTMLAnchorElement>,
  href: string,
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void,
) {
  onClick?.(e);
  if (e.defaultPrevented) return;
  e.preventDefault();
  // Defer scrolling until after any UI state updates triggered by `onClick`
  // (e.g. closing a mobile drawer that temporarily locks document scroll).
  window.setTimeout(() => {
    void scrollToHref(href);
  }, 0);
}

export function useScrollLinkClickHandler(
  href: string,
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void,
) {
  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>) =>
      handleScrollLinkClick(e, href, onClick),
    [href, onClick],
  );
}
