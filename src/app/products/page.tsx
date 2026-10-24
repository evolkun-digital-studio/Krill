import { ProductSection } from "@/components/ProductSection";
import { pageMeta } from "@/lib/metadata";
import { products } from "@/lib/products";

export const metadata = pageMeta(
  "All products · KRIL",
  "Browse KRIL honey, cold-pressed oils, handmade crafts and village dairy products. Prices are confirmed on request.",
  "/products",
);

export default function AllProducts() {
  return (
    <div className="pt-20">
      <ProductSection title="All products" intro="From our village producers, made in small batches." items={products} />
    </div>
  );
}
