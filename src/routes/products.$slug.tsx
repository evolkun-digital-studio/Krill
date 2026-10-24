import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { QtyControl } from "@/components/CartDrawer";
import { ProductSection } from "@/components/ProductSection";
import { useCart } from "@/lib/cart";
import { type Product, NO_PALM_OIL_NOTE, getProduct, productsByService, serviceNames } from "@/lib/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const title = p ? `${p.name} · ${serviceNames[p.service]} | KRIL` : "Product not found | KRIL";
    const desc = p?.short ?? "This product could not be found on KRIL.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-40 md:px-8">
      <h1 className="type-heading">Product not found</h1>
      <Link to="/" className="type-label mt-6 inline-block text-primary underline">Back to home</Link>
    </div>
  ),
});

const shopPath = { organics: "/organics", handicraft: "/handicraft", dairy: "/dairy" } as const;

function ProductPage() {
  const { product } = Route.useLoaderData();
  return <ProductBody key={product.slug} product={product} />;
}

function ProductBody({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0] ?? "Standard");
  const [qty, setQty] = useState(1);
  const related = productsByService(product.service).filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-28 md:grid-cols-2 md:gap-16 md:px-8 md:pt-32">
        <div className="group relative overflow-hidden rounded-3xl bg-muted">
          <img key={product.slug} src={product.image} alt={product.name} width={816} height={816} className="img-zoom aspect-square w-full object-cover" />
          {product.status === "sold_out" && (
            <span className="type-label absolute left-4 top-4 rounded-full bg-ivory/95 px-3 py-1">Sold Out</span>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <Link to={shopPath[product.service]} className="type-label text-muted-foreground hover:text-foreground">
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

      {related.length > 0 && (
        <ProductSection title={`More from ${serviceNames[product.service]}`} items={related} />
      )}
    </>
  );
}
