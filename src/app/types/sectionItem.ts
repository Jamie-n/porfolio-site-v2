import type { ComponentType } from "react";

export interface SectionItem {
  title: string;
  Component: ComponentType;
  href: string;
  showTitle?: boolean;
}
