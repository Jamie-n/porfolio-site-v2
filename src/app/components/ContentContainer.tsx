import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export default function ContentContainer({ children, ...rest }: PropsWithChildren & ComponentPropsWithoutRef<"div">) {

  return (
    <div className={" px-36 " + rest.className}>
      {children}
    </div >
  )
}
