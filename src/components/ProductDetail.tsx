"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { QtyControl } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart";
import { type Product, NO_PALM_OIL_NOTE, serviceNames } from "@/lib/products";

const shopPath = { organics: "/organics", handicraft: "/handicraft", dairy: "/dairy" } as const;

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "Standard");
  const [qty, setQty] = useState(1);

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-28 md:grid-cols-2 md:gap-16 md:px-8 md:pt-32">
      <div className="group relative overflow-hidden rounded-3xl bg-muted">
        <Image
          key={product.slug}
          src={product.image}
          alt={product.name}
          preload
          sizes="(min-width: 1280px) 600px, (min-width: 768px) 50vw, 100vw"
          className="img-zoom aspect-square w-full object-cover"
        />
        {product.status === "sold_out" && (
          <span className="type-label absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1">Sold Out</span>
        )}
      </div>
      <div className="flex flex-col justify-center">
        <Link href={shopPath[product.service]} className="type-label text-muted-foreground hover:text-foreground">
          {serviceNames[product.service]}
        </Link>
        <h1 className="type-heading mt-3">{product.name}</h1>
        <p className="type-label mt-3 text-primary">Price on request</p>
        <p className="type-body mt-6 text-muted-foreground">{product.description}</p>
        {product.service === "organics" && (
          <p className="type-body mt-4 rounded-2xl bg-secondary px-5 py-4 text-secondary-foreground">{NO_PALM_OIL_NOTE}</p>
        )}

        <div className="mt-8">
          <p className="type-label mb-3">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={s === size}
                className={`type-label h-10 rounded-full border px-4 transition-colors ${
                  s === size ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <QtyControl value={qty} onChange={(n) => setQty(Math.max(1, n))} />
          <button
            onClick={() => add(product.slug, size, qty)}
            className="type-label h-12 flex-1 rounded-full bg-primary px-8 text-primary-foreground transition-opacity hover:opacity-90 sm:flex-none"
          >
            Add to Cart
          </button>
        </div>
        <p className="type-label mt-4 text-muted-foreground">Made in small batches. Our team will confirm price and availability.</p>
      </div>
    </section>
  );
}
