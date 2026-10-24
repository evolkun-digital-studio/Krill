import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";

export function QtyControl({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border">
      <button aria-label="Decrease quantity" onClick={() => onChange(value - 1)} className="inline-flex size-9 items-center justify-center">
        <Minus className="size-4" />
      </button>
      <span className="type-label w-6 text-center">{value}</span>
      <button aria-label="Increase quantity" onClick={() => onChange(value + 1)} className="inline-flex size-9 items-center justify-center">
        <Plus className="size-4" />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <div className={`fixed inset-0 z-[60] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-overlay/40 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Your cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-soft transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="type-sub">Your request list</h2>
          <button aria-label="Close cart" onClick={() => setOpen(false)} className="inline-flex size-10 items-center justify-center rounded-full hover:bg-foreground/5">
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <p className="type-body py-10 text-center text-muted-foreground">Your cart is empty.</p>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => {
                const prod = getProduct(i.slug);
                if (!prod) return null;
                return (
                  <li key={`${i.slug}-${i.size}`} className="flex gap-4 py-4">
                    <img src={prod.image} alt={prod.name} className="size-20 rounded-xl object-cover" loading="lazy" />
                    <div className="flex-1 space-y-2">
                      <p className="type-body font-semibold leading-snug">{prod.name}</p>
                      <p className="type-label text-muted-foreground">{i.size}</p>
                      <div className="flex items-center justify-between">
                        <QtyControl value={i.qty} onChange={(n) => setQty(i.slug, i.size, n)} />
                        <button aria-label={`Remove ${prod.name}`} onClick={() => remove(i.slug, i.size)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="space-y-4 border-t border-border px-6 py-5">
          <p className="type-label text-muted-foreground">Price will be confirmed by our team.</p>
          {items.length > 0 ? (
            <Link
              to="/request-order"
              onClick={() => setOpen(false)}
              className="type-label flex h-12 w-full items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
            >
              Request to Order
            </Link>
          ) : (
            <button disabled className="type-label flex h-12 w-full items-center justify-center rounded-full bg-muted text-muted-foreground">
              Request to Order
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
