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
    for (const p of products) expect(urls.some((u) => u.endsWith(`/products/${p.slug}`))).toBe(true);
  });

  it("keeps the old fishery and agro links working with permanent redirects", async () => {
    const redirects = await nextConfig.redirects!();
    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ source: "/fishery", destination: "/#fishery", statusCode: 301 }),
        expect.objectContaining({ source: "/agro", destination: "/handicraft", statusCode: 301 }),
      ]),
    );
  });
});
