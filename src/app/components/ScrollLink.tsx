"use client";

import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { scrollToHref } from "@/lib/utils";

export type ScrollLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  LinkProps;

export function ScrollLink({
  href,
  onClick,
  children,
  ...props
}: ScrollLinkProps) {
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    await scrollToHref(String(href));
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
