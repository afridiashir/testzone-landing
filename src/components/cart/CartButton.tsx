"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

/** Header cart icon with a live item count. */
export function CartButton() {
  const { count, ready } = useCart();
  const label =
    ready && count > 0 ? `View cart, ${count} test${count === 1 ? "" : "s"}` : "View cart";

  return (
    <Link
      href="/cart"
      aria-label={label}
      className="relative grid size-10 shrink-0 place-items-center rounded-md border border-border text-navy transition-colors hover:bg-surface"
    >
      <ShoppingCart className="size-5" />
      {ready && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-green px-1 text-[11px] font-bold leading-5 text-green-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
