import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jamie Neighbours - Portfolio",
  description:
    "Portfolio of Jamie Neighbours — full‑stack software engineer. Selected work, experience, skills, and certifications.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Jamie Neighbours - Portfolio",
    description:
      "Full‑stack software engineer. Selected work, experience, skills, and certifications.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Jamie Neighbours - Portfolio",
    description:
      "Full‑stack software engineer. Selected work, experience, skills, and certifications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
