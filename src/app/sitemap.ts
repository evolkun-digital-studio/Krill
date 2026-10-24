import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

const pages = ["/", "/organics", "/handicraft", "/dairy", "/products", "/agro-artisan", "/about", "/contact", "/request-order"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` })),
    ...products.map((p) => ({ url: `${SITE_URL}/products/${p.slug}` })),
  ];
}
