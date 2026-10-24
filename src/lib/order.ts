import type { CartItem } from "./cart";
import { getProduct } from "./products";
import { SITE, WHATSAPP_NUMBER } from "./site";

export type OrderForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  date?: string | undefined;
  notes?: string | undefined;
};

export function buildOrderMessage(items: CartItem[], f: OrderForm) {
  const lines = items.map((i) => `- ${getProduct(i.slug)?.name ?? i.slug} (${i.size}) x ${i.qty}`);
  return [
    "Hello KRIL, I would like to request an order:",
    "",
    ...lines,
    "",
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    `Email: ${f.email}`,
    `Address: ${f.address}, ${f.city} - ${f.pincode}`,
    f.date ? `Preferred delivery date: ${f.date}` : "",
    f.notes ? `Notes: ${f.notes}` : "",
  ]
    .filter((l, idx, arr) => l !== "" || (arr[idx - 1] ?? "") !== "")
    .join("\n")
    .trim();
}

export const whatsappLink = (msg: string) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
export const emailLink = (msg: string) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent("Order request from KRIL website")}&body=${encodeURIComponent(msg)}`;
