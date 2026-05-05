"use client";

import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useScrollLinkClickHandler } from "@/lib/scrollLinks";

type ScrollLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & LinkProps;

export function ScrollLink({
  href,
  onClick,
  children,
  ...props
}: ScrollLinkProps) {
  const handleClick = useScrollLinkClickHandler(String(href), onClick);

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
