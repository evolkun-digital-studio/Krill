import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { Button } from "./ui/button";
import { ProductGrid } from "./ProductCard";
import { Reveal } from "./Reveal";

export function ProductSection({ title, intro, items }: { title: string; intro?: ReactNode; items: Product[] }) {
  return (
    <section className="product-section">
      <div className="product-container">
        <Reveal className="mb-10">
          <h2 className="type-heading">{title}</h2>
          {intro && <p className="type-body mt-4 max-w-2xl text-muted-foreground">{intro}</p>}
        </Reveal>
        <ProductGrid items={items} />
        <div className="mt-12 flex justify-center">
          <Button asChild variant="link" className="type-label h-auto p-0">
            <Link to="/products">View all products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}