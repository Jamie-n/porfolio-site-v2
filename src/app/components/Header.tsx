import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

interface HeaderProps
  extends PropsWithChildren,
    Omit<ComponentPropsWithoutRef<"h2">, "children"> {
  variant: "title" | "subheading";
}

export default function Header({ variant, children, ...rest }: HeaderProps) {
  const className = rest.className ?? "";

  if (variant === "title") {
    return (
      <h1 {...rest} className={`${className} font-bold text-7xl`.trim()}>
        {children}
      </h1>
    );
  }

  return (
    <h2 {...rest} className={`${className} font-bold text-5xl my-10`.trim()}>
      {children}
    </h2>
  );
}
