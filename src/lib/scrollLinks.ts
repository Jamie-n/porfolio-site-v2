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
  void scrollToHref(href);
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
