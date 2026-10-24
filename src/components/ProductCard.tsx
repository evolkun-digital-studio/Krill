"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { Button } from "./ui/button";
import { Reveal } from "./Reveal";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  function addProduct() {
    add(product.slug, product.sizes[0] ?? "Standard");
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  }
  return (
    <article className="product-card group">
      <Link href={`/products/${product.slug}`} className="product-image">
        <Image src={product.image} alt={product.name} sizes="(min-width: 1280px) 300px, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      </Link>
      <div className="product-card-content">
        <Link href={`/products/${product.slug}`} className="min-w-0" title={product.name}>
          <h3 className="type-sub truncate">{product.name}</h3>
        </Link>
        <p className="product-description line-clamp-2">{product.short}</p>
        <div className="product-price">
          <span className="type-label min-w-0">Price on request</span>
          {product.status === "sold_out" && <span className="product-badge">Sold Out</span>}
        </div>
        <div className="mt-auto pt-4">
          <Button variant="product" onClick={addProduct} aria-live="polite" className="h-11 w-full">
            {added ? "Requested ✓" : "Request to buy"}
          </Button>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <Reveal key={p.slug} className="min-w-0 h-full">
          <ProductCard product={p} />
        </Reveal>
      ))}
    </div>
  );
}
