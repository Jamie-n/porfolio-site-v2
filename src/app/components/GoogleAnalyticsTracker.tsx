"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type TrafficSource = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  gclid: string | null;
  fbclid: string | null;
  referrer: string | null;
};

const GA_ID_RAW = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GA_ID =
  typeof GA_ID_RAW === "string" && GA_ID_RAW.trim().length > 0
    ? GA_ID_RAW.trim()
    : null;

const SESSION_KEY = "jn:traffic:initial";

function parseStoredParams(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function ensureGtag() {
  window.dataLayer ||= [];
  window.gtag ||= (...args: unknown[]) => {
    window.dataLayer?.push(args);
  };
  return window.gtag;
}

function readInitialTraffic(search: string): TrafficSource | null {
  if (!search) return null;

  const sp = new URLSearchParams(
    search.startsWith("?") ? search.slice(1) : search,
  );
  const traffic: TrafficSource = {
    utm_source: sp.get("utm_source"),
    utm_medium: sp.get("utm_medium"),
    utm_campaign: sp.get("utm_campaign"),
    utm_content: sp.get("utm_content"),
    utm_term: sp.get("utm_term"),
    gclid: sp.get("gclid"),
    fbclid: sp.get("fbclid"),
    referrer: document.referrer || null,
  };

  const hasAny =
    traffic.utm_source ||
    traffic.utm_medium ||
    traffic.utm_campaign ||
    traffic.utm_content ||
    traffic.utm_term ||
    traffic.gclid ||
    traffic.fbclid;

  return hasAny ? traffic : null;
}

function sendPageView(params?: Record<string, unknown>) {
  const gtag = ensureGtag();
  gtag("event", "page_view", {
    page_location: window.location.href,
    page_referrer: document.referrer || undefined,
    ...params,
  });
}

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    if (!GA_ID) return;

    const storedRaw = sessionStorage.getItem(SESSION_KEY);
    const storedParams = parseStoredParams(storedRaw);

    if (!storedRaw) {
      const foundInitial = readInitialTraffic(search);
      if (foundInitial) {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(foundInitial));
        ensureGtag()("event", "initial_traffic_source", foundInitial);
      }
    }

    sendPageView(storedParams ?? undefined);
  }, [pathname, search]);

  if (!GA_ID) return null;

  return (
    <>
      <Script
        id="ga4-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}
