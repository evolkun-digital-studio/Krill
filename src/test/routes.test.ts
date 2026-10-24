import { describe, expect, it } from "@jest/globals";
import nextConfig from "../../next.config";
import sitemap from "@/app/sitemap";
import { generateStaticParams } from "@/app/products/[slug]/page";
import { products } from "@/lib/products";

describe("App routes", () => {
  it("pre-renders a page for every product", () => {
    expect(generateStaticParams()).toEqual(products.map((p) => ({ slug: p.slug })));
  });

  it("lists every product page in the sitemap", () => {
    const urls = sitemap().map((entry) => entry.url);
    for (const p of products)
      expect(urls.some((u) => u.endsWith(`/products/${p.slug}`))).toBe(true);
  });

  it("serves the agro page itself and lists it in the sitemap", () => {
    expect(nextConfig.redirects).toBeUndefined();
    expect(sitemap().some((entry) => entry.url.endsWith("/agro"))).toBe(true);
  });

  it("serves the fishery page itself instead of redirecting it", async () => {
    const redirects = nextConfig.redirects ? await nextConfig.redirects() : [];
    expect(redirects.some((r) => r.source === "/fishery")).toBe(false);
    expect(sitemap().some((entry) => entry.url.endsWith("/fishery"))).toBe(true);
  });
});
