import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Checkout } from "./checkout";

export const metadata: Metadata = {
  title: "Checkout — Test Zone Diagnostic Centre",
  description: "Review your health cart and book your lab tests.",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <section className="min-h-[70vh] bg-surface py-8 md:py-10">
      <div className="container mx-auto max-w-6xl px-4">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-1.5 text-sm text-slate-500"
        >
          <Link href="/" className="hover:text-[#1a2b56]">
            Home
          </Link>
          <ChevronRight className="size-3.5 text-slate-300" />
          <Link href="/tests" className="hover:text-[#1a2b56]">
            Book Lab Tests
          </Link>
          <ChevronRight className="size-3.5 text-slate-300" />
          <span className="text-[#1a2b56]" aria-current="page">
            Checkout
          </span>
        </nav>

        <Checkout />
      </div>
    </section>
  );
}
