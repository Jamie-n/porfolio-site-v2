"use client";

// useSyncExternalStore reads the consent cookie SSR-safely: React uses the
// server snapshot (null) during hydration so the tree always matches, then
// switches to the live cookie value on the client — no effect, no mismatch.

import { useSyncExternalStore, useState, type ReactNode } from "react";
import { Button } from "@/app/components/primitives/Button";

const COOKIE_NAME = "analytics_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 days
const COOKIE_RE = new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`);

function readCookieConsent(): boolean | null {
  const match = document.cookie.match(COOKIE_RE);
  return match ? match[1] === "true" : null;
}

function writeCookieConsent(value: boolean) {
  document.cookie = `${COOKIE_NAME}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

// Cookies aren't a reactive external store, so the subscription is a no-op.
const noop = () => () => {};

const bannerStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 2147483647,
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "0.75rem 1.5rem",
  padding: "0.9rem 1.25rem",
  background: "color-mix(in oklab, var(--surface, #fff) 96%, transparent)",
  borderTop: "1px solid var(--border, rgba(10,10,10,.14))",
  boxShadow: "var(--shadow-1, 0 -1px 0 rgba(10,10,10,.06))",
};

const textStyle: React.CSSProperties = {
  margin: 0,
  flex: "1 1 260px",
  fontSize: "0.9375rem",
  lineHeight: 1.55,
  color: "var(--foreground, #0a0a0a)",
};

export default function CookieConsentGate({ children }: { children: ReactNode }) {
  const storedConsent = useSyncExternalStore(noop, readCookieConsent, () => null);
  // In-session choice overrides the cookie so the banner hides immediately.
  const [sessionConsent, setSessionConsent] = useState<boolean | null>(null);
  const consent = sessionConsent ?? storedConsent;

  function accept() {
    writeCookieConsent(true);
    setSessionConsent(true);
  }

  function decline() {
    writeCookieConsent(false);
    setSessionConsent(false);
  }

  return (
    <>
      {consent === true && children}
      {consent === null && (
        <div role="dialog" aria-label="Cookie consent" style={bannerStyle}>
          <p style={textStyle}>
            This site uses cookies for analytics to understand traffic and
            improve the experience.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <Button size="sm" variant="default" onClick={decline}>
              Decline
            </Button>
            <Button
              size="sm"
              variant="default"
              className="bg-foreground text-background hover:border-transparent"
              onClick={accept}
            >
              Accept
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
