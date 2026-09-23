"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatRate } from "@/lib/format";

/**
 * Floating "View cart" bar shown while browsing tests with something in the
 * cart. Hidden on the cart and booking pages, where it would point at itself.
 */
export function CartBar() {
  const pathname = usePathname();
  const { count, subtotal, unpricedCount, ready } = useCart();

  const onTestPages = pathname === "/tests" || pathname.startsWith("/tests/");
  if (!ready || count === 0 || !onTestPages) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <Link
        href="/cart"
        className="pointer-events-auto flex w-full max-w-xl items-center justify-between gap-4 rounded-xl bg-navy px-5 py-3.5 text-navy-foreground shadow-float transition hover:bg-navy-soft"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10">
            <ShoppingCart className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold">
              {count} test{count === 1 ? "" : "s"} in cart
            </span>
            <span className="block truncate text-xs text-navy-foreground/70">
              {formatRate(subtotal)}
              {unpricedCount > 0 ? ` + ${unpricedCount} priced on request` : ""}
            </span>
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-green px-4 py-2 text-sm font-semibold text-green-foreground">
          View cart <ArrowRight className="size-4" />
        </span>
      </Link>
    </div>
  );
}
