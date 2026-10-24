import { describe, expect, it } from "vitest";
import { NO_PALM_OIL_NOTE, products } from "@/lib/products";
import { cartReducerAdd } from "@/lib/cart";
import { HERO_INTERVAL_MS, heroSlides } from "@/lib/site";
import { buildOrderMessage } from "@/lib/order";

describe("KRIL store rules", () => {
  it("every product has no price and is sold out", () => {
    expect(products.every((p) => p.price === null && p.status === "sold_out")).toBe(true);
  });
  it("every organic product mentions no palm oil", () => {
    const organics = products.filter((p) => p.service === "organics");
    expect(organics).toHaveLength(8);
    expect(organics.every((p) => p.description.includes(NO_PALM_OIL_NOTE))).toBe(true);
  });
  it("no fishery products are sold on KRIL", () => {
    expect(products.some((p) => (p.service as string) === "fishery")).toBe(false);
  });
  it("hero rotates every 4 seconds through four services in order", () => {
    expect(HERO_INTERVAL_MS).toBe(4000);
    expect(heroSlides.map((s) => s.key)).toEqual(["organics", "handicraft", "dairy", "fishery"]);
  });
  it("adding the same item twice increases quantity", () => {
    const a = cartReducerAdd([], "khoa", "250 g", 1);
    const b = cartReducerAdd(a, "khoa", "250 g", 2);
    expect(b).toEqual([{ slug: "khoa", size: "250 g", qty: 3 }]);
  });
  it("order message lists items and customer details", () => {
    const msg = buildOrderMessage([{ slug: "khoa", size: "250 g", qty: 2 }], {
      name: "Asha", phone: "9999999999", email: "a@b.in", address: "Main road", city: "Almora", pincode: "263601",
    });
    expect(msg).toContain("Khoa (250 g) x 2");
    expect(msg).toContain("Almora - 263601");
  });
});
