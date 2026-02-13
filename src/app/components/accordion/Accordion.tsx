import {
  ComponentPropsWithoutRef,
  JSX,
  PropsWithChildren,
  useState,
  useRef,
} from "react";

interface AccordionProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"div"> {
  Header: JSX.Element;
}

export default function Accordion({
  Header,
  children,
  ...rest
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div {...rest}>
      <div
        className="my-3 py-2 flex cursor-pointer border-b-2 border-transparent hover:border-gray-100 transition-all ease-in-out"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {Header}

        <div
          className={`self-center ms-auto transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </div>
      </div>

      <div
        ref={contentRef}
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          isOpen ? "max-h-[99999px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
}
