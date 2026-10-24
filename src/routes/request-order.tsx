import { Link, createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { pageMeta } from "@/components/ServiceShop";
import { useCart } from "@/lib/cart";
import { buildOrderMessage, emailLink, whatsappLink, type OrderForm } from "@/lib/order";
import { getProduct } from "@/lib/products";

export const Route = createFileRoute("/request-order")({
  head: () => pageMeta("Request to Order | KRIL", "Send KRIL a request for the items in your cart. Our team will confirm price, availability and delivery."),
  component: RequestOrder,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{8,15}$/, "Please enter a valid phone number"),
  email: z.string().trim().email("Please enter a valid email").max(255),
  address: z.string().trim().min(5, "Please enter your full address").max(500),
  city: z.string().trim().min(2, "Please enter your city").max(100),
  pincode: z.string().trim().regex(/^\d{6}$/, "Pincode should be 6 digits"),
  date: z.string().optional(),
  notes: z.string().max(1000).optional(),
});

const empty: OrderForm = { name: "", phone: "", email: "", address: "", city: "", pincode: "", date: "", notes: "" };

function RequestOrder() {
  const { items, clear } = useCart();
  const [form, setForm] = useState<OrderForm>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
  const [sent, setSent] = useState<string | null>(null);

  const set = (k: keyof OrderForm) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: typeof errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof OrderForm] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    const msg = buildOrderMessage(items, r.data);
    window.open(whatsappLink(msg), "_blank", "noopener");
    setSent(msg);
    clear();
  };

  if (sent) {
    return (
      <section className="mx-auto max-w-2xl px-5 pb-24 pt-40 text-center md:px-8">
        <CheckCircle2 className="mx-auto size-12 text-primary" />
        <h1 className="type-heading mt-6">Request sent</h1>
        <p className="type-body mt-4 text-muted-foreground">
          Thank you. Our team will contact you within 24 hours to confirm price and availability.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href={whatsappLink(sent)} target="_blank" rel="noopener noreferrer" className="type-label inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-primary-foreground">
            <MessageCircle className="size-4" /> Open WhatsApp again
          </a>
          <a href={emailLink(sent)} className="type-label inline-flex h-12 items-center gap-2 rounded-full border border-primary px-6 text-primary">
            <Mail className="size-4" /> Send by email instead
          </a>
        </div>
        <Link to="/" className="type-label mt-8 inline-block text-muted-foreground underline">Back to home</Link>
      </section>
    );
  }

  const field = (k: keyof OrderForm, label: string, props: Record<string, unknown> = {}) => (
    <label className="block">
      <span className="type-label">{label}</span>
      <input
        value={form[k] ?? ""}
        onChange={set(k)}
        className="type-body mt-2 h-12 w-full rounded-xl border border-input bg-card px-4 outline-none focus:border-primary"
        {...props}
      />
      {errors[k] && <span className="type-label mt-1 block text-destructive">{errors[k]}</span>}
    </label>
  );

  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 pt-32 md:px-8 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <h1 className="type-heading">Request to order</h1>
        <p className="type-body mt-4 text-muted-foreground">
          Our products are made in small batches. Send us your request and we will confirm price, availability and delivery.
        </p>
        <div className="mt-8 rounded-2xl bg-card p-6">
          <h2 className="type-sub">Your items</h2>
          {items.length === 0 ? (
            <p className="type-body mt-4 text-muted-foreground">
              Your cart is empty. <Link to="/organics" className="text-primary underline">Browse products</Link>
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {items.map((i) => {
                const p = getProduct(i.slug);
                return p ? (
                  <li key={`${i.slug}-${i.size}`} className="flex items-center gap-4 py-3">
                    <img src={p.image} alt={p.name} className="size-14 rounded-lg object-cover" loading="lazy" />
                    <div className="flex-1">
                      <p className="type-body font-semibold leading-snug">{p.name}</p>
                      <p className="type-label text-muted-foreground">{i.size} · Qty {i.qty}</p>
                    </div>
                  </li>
                ) : null;
              })}
            </ul>
          )}
          <p className="type-label mt-4 text-muted-foreground">Price will be confirmed by our team.</p>
        </div>
      </div>

      <form onSubmit={submit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {field("name", "Full name", { autoComplete: "name" })}
          {field("phone", "Phone", { type: "tel", autoComplete: "tel" })}
        </div>
        {field("email", "Email", { type: "email", autoComplete: "email" })}
        <label className="block">
          <span className="type-label">Full address</span>
          <textarea value={form.address} onChange={set("address")} rows={3} className="type-body mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
          {errors.address && <span className="type-label mt-1 block text-destructive">{errors.address}</span>}
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          {field("city", "City", { autoComplete: "address-level2" })}
          {field("pincode", "Pincode", { inputMode: "numeric", autoComplete: "postal-code" })}
        </div>
        {field("date", "Preferred delivery date (optional)", { type: "date" })}
        <label className="block">
          <span className="type-label">Notes</span>
          <textarea value={form.notes} onChange={set("notes")} rows={3} className="type-body mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:border-primary" />
        </label>
        <button
          type="submit"
          disabled={items.length === 0}
          className="type-label inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          <MessageCircle className="size-4" /> Send request on WhatsApp
        </button>
        <p className="type-label text-center text-muted-foreground">You can also send it by email after submitting.</p>
      </form>
    </section>
  );
}
