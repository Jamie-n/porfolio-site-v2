import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export default function Section({ children, data = "01", ...rest }: { data?: string } & PropsWithChildren & ComponentPropsWithoutRef<"div">) {

  return (
    <div {...rest} className={"relative ml-80 bg-text min-h-screen my-10 " + rest.className} data-text={data}>
      {children}
    </div>
  )
}
