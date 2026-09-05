import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { findVariant, priceOf, products, type Product, type Variant } from "./products";

export type CartLine = { slug: string; qty: number; variantId?: string };

export type CartItem = {
  key: string;
  product: Product;
  qty: number;
  variant?: Variant | undefined;
  unitPrice: number;
};

type CartContextValue = {
  lines: CartLine[];
  items: CartItem[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  add: (slug: string, qty?: number, variantId?: string) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "PitStore-cart";

const lineKey = (slug: string, variantId?: string) => `${slug}::${variantId ?? ""}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => {
        const product = products.find((p) => p.slug === l.slug);
        if (!product) return null;
        const variant = findVariant(product, l.variantId);
        return {
          key: lineKey(l.slug, l.variantId),
          product,
          qty: l.qty,
          variant,
          unitPrice: priceOf(product, l.variantId),
        } satisfies CartItem;
      })
      .filter(Boolean) as CartItem[];

    const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    const shipping = subtotal === 0 || subtotal > 40 ? 0 : 1.99;

    return {
      lines,
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      add: (slug, qty = 1, variantId) =>
        setLines((prev) => {
          const existing = prev.find((l) => lineKey(l.slug, l.variantId) === lineKey(slug, variantId));
          if (existing) {
            return prev.map((l) =>
              lineKey(l.slug, l.variantId) === lineKey(slug, variantId)
                ? { ...l, qty: l.qty + qty }
                : l,
            );
          }
          return [...prev, { slug, qty, ...(variantId ? { variantId } : {}) }];
        }),
      setQty: (key, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => lineKey(l.slug, l.variantId) !== key)
            : prev.map((l) => (lineKey(l.slug, l.variantId) === key ? { ...l, qty } : l)),
        ),
      remove: (key) => setLines((prev) => prev.filter((l) => lineKey(l.slug, l.variantId) !== key)),
      clear: () => setLines([]),
      open,
      setOpen,
    };
  }, [lines, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
