export function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove any non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
  return str;
}

export function scrollToElement(
  el: HTMLElement,
  threshold = 0.5,
): Promise<void> {
  return new Promise((resolve) => {
    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const isVisible =
        rect.top + rect.height * threshold <= vh &&
        rect.bottom - rect.height * threshold >= 0;

      if (isVisible) {
        resolve();
      } else {
        requestAnimationFrame(checkVisibility);
      }
    };

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(checkVisibility);
  });
}

export async function scrollToHref(
  href: string,
  options?: {
    threshold?: number;
    getTarget?: (href: string) => HTMLElement | null;
  },
): Promise<void> {
  const target = options?.getTarget?.(href) ?? document.getElementById(href);
  if (!target) return;

  await scrollToElement(target, options?.threshold);
  window.history.replaceState(null, "", href);
}

export function formatIndex(index: number): string {
  return (index + 1).toString().padStart(2, "0");
}
