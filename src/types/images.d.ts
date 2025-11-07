// src/types/images.d.ts
declare module "*.png" {
  import type { StaticImageData } from "next/image";
  const value: StaticImageData;
  export default value;
}

declare module "*.jpg" {
  import type { StaticImageData } from "next/image";
  const value: StaticImageData;
  export default value;
}

declare module "*.jpeg" {
  import type { StaticImageData } from "next/image";
  const value: StaticImageData;
  export default value;
}

declare module "*.svg" {
  import * as React from "react";
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}
