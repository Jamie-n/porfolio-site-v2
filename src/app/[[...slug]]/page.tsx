import HomeClient from "./HomeClient";

export interface SectionItem {
  title: string;
  Component: React.ComponentType;
  href: string;
  showTitle?: boolean;
}

export default function Home() {
  return <HomeClient />;
}
