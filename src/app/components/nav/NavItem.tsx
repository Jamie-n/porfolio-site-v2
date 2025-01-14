import Link, { LinkProps } from "next/link";


interface CustomNavLinkProps extends LinkProps {
  linkText: string;
}

export default function NavItem({ linkText, ...rest }: CustomNavLinkProps) {
  return (
    <div className="border-b">
      <Link {...rest}>
        <span className="font-bold hover:text-red-500 transition-colors ease-in-out text-2xl">{linkText}</span>
      </Link >
    </div>
  )
}
