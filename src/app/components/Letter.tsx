import { PropsWithChildren } from "react";

export default function Letter({ children }: PropsWithChildren) {

  return (
    <p className="text-7xl font-bold">
      {children}
    </p>
  )
}
