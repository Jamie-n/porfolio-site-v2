import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export default function Accordion({ children, ...rest }: PropsWithChildren & ComponentPropsWithoutRef<"div">) {
  return (
    <div className="my-3 py-2 flex cursor-pointer border-b-2 border-transparent hover:border-gray-100 transition-all ease-in-out " {...rest}>
      {children}
      <div className="self-center ms-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
        </svg>
      </div>
    </div>
  )
}
