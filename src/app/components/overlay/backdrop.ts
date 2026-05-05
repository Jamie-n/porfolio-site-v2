import { cn } from "@/lib/cn";

export const BACKDROP_BASE_CLASSNAME =
  "bg-background/55 backdrop-blur-[1px] transition-opacity ease-out";

/**
 * Shared backdrop class recipe for all full-screen overlays.
 * - When closed, callers should also disable pointer events if the element remains mounted.
 */
export function backdropClassName({
  entered,
  positioning = "absolute",
  inset = true,
}: {
  entered: boolean;
  positioning?: "absolute" | "fixed";
  inset?: boolean;
}) {
  return cn(
    positioning,
    inset && "inset-0",
    BACKDROP_BASE_CLASSNAME,
    entered ? "opacity-100" : "opacity-0",
  );
}
