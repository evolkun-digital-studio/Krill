import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = { slug: string; size: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const KEY = "kril-cart-v1";
const Ctx = createContext<CartCtx | null>(null);

export function cartReducerAdd(items: CartItem[], slug: string, size: string, qty: number) {
  const found = items.find((i) => i.slug === slug && i.size === size);
  if (found) return items.map((i) => (i === found ? { ...i, qty: i.qty + qty } : i));
  return [...items, { slug, size, qty }];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.filter((i) => i && typeof i.slug === "string"));
      }
    } catch {
      /* ignore broken storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items, loaded]);

  const add = useCallback((slug: string, size: string, qty = 1) => {
    setItems((prev) => cartReducerAdd(prev, slug, size, qty));
    setOpen(true);
  }, []);
  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.slug === slug && i.size === size))
        : prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)),
    );
  }, []);
  const remove = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.reduce((n, i) => n + i.qty, 0), open, setOpen, add, setQty, remove, clear }),
    [items, open, add, setQty, remove, clear],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
