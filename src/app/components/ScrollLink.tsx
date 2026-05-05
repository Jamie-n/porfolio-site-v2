"use client";

import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { handleScrollLinkClick } from "@/lib/utils";

export type ScrollLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  LinkProps;

export function ScrollLink({
  href,
  onClick,
  children,
  ...props
}: ScrollLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) =>
    handleScrollLinkClick(e, String(href), onClick);

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
