import { ComponentPropsWithoutRef, PropsWithChildren } from "react"

interface HeaderProps extends PropsWithChildren, ComponentPropsWithoutRef<"p"> {
  variant: "title" | "subheading"
}


export default function Header({ variant, children, ...rest }: HeaderProps) {

  const baseStyle: ComponentPropsWithoutRef<"p"> = rest;

  switch (variant) {
    case "title":
      baseStyle.className = baseStyle.className + " font-bold text-7xl"
      break;
    case "subheading":
      baseStyle.className = baseStyle.className + " font-bold text-5xl my-10"
      break;
  }

  return (
    <p {...baseStyle}>
      {children}
    </p>
  )
}
