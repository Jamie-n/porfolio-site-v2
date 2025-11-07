import { ComponentProps } from "react";

export default function CustomAnchor({
  children,
  ...rest
}: Omit<ComponentProps<"a">, "className">) {
  return (
    <a {...rest} className="underline hover:text-red-500 transition-colors">
      {children}
    </a>
  );
}
