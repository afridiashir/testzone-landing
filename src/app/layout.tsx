import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartBar } from "@/components/cart/CartBar";
import { CartProvider } from "@/lib/cart";

// Self-hosted by Next at build time — no render-blocking request to Google.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Test Zone Diagnostic Centre — Precision in Health",
    template: "%s",
  },
  description:
    "ISO 15189:2022 accredited pathology and diagnostic laboratory with free home sampling across 100+ cities.",
  authors: [{ name: "Test Zone Diagnostic Centre" }],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png", sizes: "64x64" },
    ],
    apple: "/favicon.png",
  },
  openGraph: { type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartBar />
        </CartProvider>
      </body>
    </html>
  );
}
