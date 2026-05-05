export function lockDocumentScroll(): () => void {
  const body = document.body;
  const html = document.documentElement;

  const previousBodyOverflow = body.style.overflow;
  const previousBodyPaddingRight = body.style.paddingRight;
  const previousBodyPosition = body.style.position;
  const previousBodyTop = body.style.top;
  const previousBodyWidth = body.style.width;
  const previousHtmlOverflow = html.style.overflow;
  const previousHtmlOverscroll = html.style.overscrollBehavior;
  const previousHtmlScrollBehavior = html.style.scrollBehavior;

  const scrollY = window.scrollY;
  const scrollbarWidth = window.innerWidth - html.clientWidth;

  html.style.overflow = "hidden";
  html.style.overscrollBehavior = "none";

  // Freeze page scroll position (prevents background content from moving).
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";
  body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    body.style.paddingRight = `${scrollbarWidth}px`;
  }

  return () => {
    html.style.overflow = previousHtmlOverflow;
    html.style.overscrollBehavior = previousHtmlOverscroll;

    body.style.position = previousBodyPosition;
    body.style.top = previousBodyTop;
    body.style.width = previousBodyWidth;
    body.style.overflow = previousBodyOverflow;
    body.style.paddingRight = previousBodyPaddingRight;

    // Avoid animated "re-scroll" due to global `scroll-behavior: smooth`.
    html.style.scrollBehavior = "auto";
    window.scrollTo(0, scrollY);
    html.style.scrollBehavior = previousHtmlScrollBehavior;
  };
}
