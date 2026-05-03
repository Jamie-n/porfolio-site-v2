import Image, { type ImageProps } from "next/image";
import type { StaticImageData } from "next/image";
import React from "react";

type BrutalScreenshotProps = {
  src: StaticImageData | string;
  alt: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  imageProps?: Omit<ImageProps, "src" | "alt" | "fill">;
};

export default function BrutalScreenshot({
  src,
  alt,
  label,
  sizes,
  priority,
  className,
  imageClassName,
  imageProps,
}: BrutalScreenshotProps) {
  const caption = label ?? alt;

  return (
    <figure className={["relative z-10 isolate", className].join(" ")}>
      <div
        className={[
          "relative",
          "border-2 border-black bg-white",
          "shadow-[10px_10px_0_0_#000]",
          "overflow-hidden",
        ].join(" ")}
      >
        <figcaption className="flex items-center justify-between gap-3 border-b-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--foreground)]">
          <span className="truncate">{caption}</span>
          <span className="flex shrink-0 items-center gap-1.5">
            <span className="inline-block h-[8px] w-[8px] border border-black bg-[color:var(--accent)]" />
            <span className="inline-block h-[8px] w-[8px] border border-black bg-white" />
          </span>
        </figcaption>

        <Image
          src={src}
          alt={alt}
          sizes={sizes}
          priority={priority}
          className={[
            "h-auto w-full select-none bg-white",
            imageClassName,
          ].join(" ")}
          {...imageProps}
        />
      </div>
    </figure>
  );
}
