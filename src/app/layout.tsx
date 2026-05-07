import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense, type ReactNode } from "react";
import CookieConsentGate from "@/app/components/CookieConsentGate";
import { SplashGate } from "@/app/components/SplashGate";
import GoogleAnalyticsTracker from "@/app/components/GoogleAnalyticsTracker";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Jamie Neighbours - Portfolio",
  description:
    "Jamie Neighbours - full-stack engineer. Selected projects, experience, skills, and certifications.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Jamie Neighbours - Portfolio",
    description:
      "Full-stack engineer. Selected projects, experience, skills, and certifications.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jamie Neighbours - Portfolio",
    description:
      "Full-stack engineer. Selected projects, experience, skills, and certifications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grain min-w-0`}
      >
        <Suspense fallback={null}>
          <CookieConsentGate>
            <GoogleAnalyticsTracker />
          </CookieConsentGate>
        </Suspense>
        <SplashGate>{children}</SplashGate>
      </body>
    </html>
  );
}
