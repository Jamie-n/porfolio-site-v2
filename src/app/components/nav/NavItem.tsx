import Link, { LinkProps } from "next/link";


interface CustomNavLinkProps extends LinkProps {
  linkText: string;
}

export default function NavItem({ linkText, ...rest }: CustomNavLinkProps) {
  return (
    <Link {...rest}>
      <span className="font-semibold hover:text-red-500 transition-colors ease-in-out">{linkText}</span>
    </Link >
  )
}
