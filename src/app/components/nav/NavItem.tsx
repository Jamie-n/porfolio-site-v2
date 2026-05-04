"use client";

import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef, CSSProperties, MouseEvent } from "react";
import { scrollToHref } from "@/lib/utils";
import { cn } from "@/lib/cn";
import { BruText } from "@/app/components/primitives/BruText";

type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "children">;

interface NavItemProps extends AnchorProps {
  linkText: string;
  href: string;
  itemClassName?: string;
  itemStyle?: CSSProperties;
}

export default function NavItem({
  linkText,
  href,
  itemClassName,
  itemStyle,
  onClick,
  ...rest
}: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    e.preventDefault();
    await scrollToHref(href);
  };

  return (
    <div
      className={cn("border-b border-border", itemClassName)}
      style={itemStyle}
    >
      <a
        {...rest}
        href={href}
        onClick={handleClick}
        aria-current={isActive ? "page" : undefined}
      >
        <span className="flex items-center gap-3 py-3">
          <span
            aria-hidden="true"
            className={cn(
              "h-5 w-px bg-border transition-colors duration-200 ease-out",
              isActive && "bg-accent",
            )}
          />
          <BruText
            as="span"
            variant="displayH3"
            className={cn(
              "transition-all duration-200 ease-out",
              "hover:text-accent hover:-translate-y-[1px]",
              isActive && "text-accent",
            )}
          >
            {linkText}
          </BruText>
        </span>
      </a>
    </div>
  );
}
