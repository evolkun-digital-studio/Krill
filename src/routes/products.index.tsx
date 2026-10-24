import { createFileRoute } from "@tanstack/react-router";
import { ProductSection } from "@/components/ProductSection";
import { pageMeta } from "@/components/ServiceShop";
import { products } from "@/lib/products";

export const Route = createFileRoute("/products/")({
  head: () => pageMeta("All products · KRIL", "Browse KRIL honey, cold-pressed oils, handmade crafts and village dairy products. Prices are confirmed on request."),
  component: AllProducts,
});

function AllProducts() {
  return <main className="pt-20"><ProductSection title="All products" intro="From our village producers, made in small batches." items={products} /></main>;
}