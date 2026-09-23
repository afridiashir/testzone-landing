"use client";

import { useRouter } from "next/navigation";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type CartTest } from "@/lib/cart";
import { cn } from "@/lib/utils";

/**
 * "Add to cart" and "Book now" for one test. Book now adds the test (if it
 * isn't already in the cart) and goes straight to the cart.
 */
export function AddToCartButtons({
  test,
  size = "default",
  className,
  tone = "light",
}: {
  test: CartTest;
  size?: "default" | "lg";
  className?: string;
  /** "dark" for use on the navy booking panel. */
  tone?: "light" | "dark";
}) {
  const router = useRouter();
  const { add, has, ready } = useCart();
  const inCart = ready && has(test.id);

  const bookNow = () => {
    if (!has(test.id)) add(test);
    router.push("/cart");
  };

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      <Button
        type="button"
        size={size}
        variant="outlineNavy"
        onClick={() => (inCart ? router.push("/cart") : add(test))}
        aria-label={inCart ? `${test.name} is in your cart, view cart` : `Add ${test.name} to cart`}
        className={cn(
          inCart && "border-green/60 text-green-dark",
          tone === "dark" && !inCart && "border-white/30 text-white hover:bg-white/10",
          tone === "dark" && inCart && "border-green/60 text-green hover:bg-white/10",
        )}
      >
        {inCart ? <Check /> : <ShoppingCart />}
        {inCart ? "In cart" : "Add to cart"}
      </Button>
      <Button type="button" size={size} variant="cta" onClick={bookNow}>
        Book now
      </Button>
    </div>
  );
}
