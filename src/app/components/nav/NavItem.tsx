import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import { scrollToElement } from "../../../utils";

interface NavItemProps extends ComponentProps<"a"> {
  linkText: string;
}

export default function NavItem({ linkText, href, ...rest }: NavItemProps) {

  const pathname = usePathname()
  const isActive = pathname == href;

  const handleClick = async (e: React.MouseEvent) => {
    if (!href) {
      return;
    }

    e.preventDefault();
    const el = document.getElementById(href);

    if (!el) {
      return;
    }

    await scrollToElement(el);

    window.history.replaceState(null, "", href);
  };

  return (
    <div className="border-b">
      <a {...rest} href={href} onClick={handleClick}>
        <span className={"font-bold hover:text-red-500 transition-colors ease-in-out text-2xl " + (isActive ? " text-red-500" : "")}>{linkText}</span>
      </a >
    </div>
  )
}
