import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import FirstVisitSplash from "@/app/components/FirstVisitSplash";
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
        {/* Solid cover until the client splash mounts; removed in `FirstVisitSplash`. */}
        <div
          id="jn-splash-stub"
          aria-hidden
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2147483646,
            background: "var(--background, #fff)",
          }}
        />
        {children}
        <FirstVisitSplash />
      </body>
    </html>
  );
}
