"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * The health cart. It lives in the browser (localStorage) so it needs no
 * account and survives a refresh. Prices here are for display only: the
 * booking action re-reads every rate from the database, so a stale or edited
 * cart can never set the price a booking is recorded at.
 */

export type CartItem = {
  id: number;
  slug: string;
  name: string;
  category: string;
  rate: number | null;
  quantity: number;
};

export type CartTest = Omit<CartItem, "quantity">;

type CartContextValue = {
  items: CartItem[];
  /** False until the saved cart has been read, so counts don't flash as 0. */
  ready: boolean;
  /** Total quantity across all lines. */
  count: number;
  /** Sum of priced lines. Tests with no published price are left out. */
  subtotal: number;
  /** Number of lines with no published price. */
  unpricedCount: number;
  add: (test: CartTest) => void;
  remove: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
};

const STORAGE_KEY = "tzdc-cart-v1";
export const MAX_QUANTITY = 10;

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "number" &&
        typeof item.name === "string" &&
        typeof item.quantity === "number",
    );
  } catch {
    // Private mode or blocked storage: start with an empty cart.
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable; the cart still works for this page view.
  }
}

const clampQuantity = (n: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(n)));

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readStorage());
    setReady(true);

    // Keep several open tabs in step.
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(readStorage());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Wraps every change so state and storage can't drift apart.
  const update = useCallback((fn: (prev: CartItem[]) => CartItem[]) => {
    setItems((prev) => {
      const next = fn(prev);
      writeStorage(next);
      return next;
    });
  }, []);

  const add = useCallback(
    (test: CartTest) =>
      update((prev) => {
        const existing = prev.find((item) => item.id === test.id);
        if (existing) {
          return prev.map((item) =>
            item.id === test.id ? { ...item, quantity: clampQuantity(item.quantity + 1) } : item,
          );
        }
        return [...prev, { ...test, quantity: 1 }];
      }),
    [update],
  );

  const remove = useCallback(
    (id: number) => update((prev) => prev.filter((item) => item.id !== id)),
    [update],
  );

  const setQuantity = useCallback(
    (id: number, quantity: number) =>
      update((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: clampQuantity(quantity) } : item,
        ),
      ),
    [update],
  );

  const clear = useCallback(() => update(() => []), [update]);

  const value = useMemo<CartContextValue>(() => {
    let count = 0;
    let subtotal = 0;
    let unpricedCount = 0;
    for (const item of items) {
      count += item.quantity;
      if (item.rate === null) unpricedCount++;
      else subtotal += item.rate * item.quantity;
    }
    return {
      items,
      ready,
      count,
      subtotal,
      unpricedCount,
      add,
      remove,
      setQuantity,
      clear,
      has: (id) => items.some((item) => item.id === id),
    };
  }, [items, ready, add, remove, setQuantity, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
