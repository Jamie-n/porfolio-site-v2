import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";


interface CustomNavLinkProps extends LinkProps {
  linkText: string;
}

export default function NavItem({ linkText, ...rest }: CustomNavLinkProps) {

  const pathname = usePathname()

  const isActive = pathname == rest.href;

  console.log(pathname, rest.href, isActive);

  return (
    <div className="border-b">
      <Link {...rest} replace>
        <span className={"font-bold hover:text-red-500 transition-colors ease-in-out text-2xl " + (isActive ? " text-red-500" : "")}>{linkText}</span>
      </Link >
    </div>
  )
}
