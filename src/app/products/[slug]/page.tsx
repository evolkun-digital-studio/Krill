import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductSection } from "@/components/ProductSection";
import { OG_IMAGE } from "@/lib/metadata";
import { getProduct, products, productsByService, serviceNames } from "@/lib/products";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return { title: { absolute: "Product not found | KRIL" }, description: "This product could not be found on KRIL." };
  const title = `${p.name} · ${serviceNames[p.service]} | KRIL`;
  const path = `/products/${p.slug}`;
  const image = { url: p.image.src, width: p.image.width, height: p.image.height, alt: p.name };
  return {
    title: { absolute: title },
    description: p.short,
    alternates: { canonical: path },
    openGraph: { title, description: p.short, type: "website", url: path, siteName: SITE.name, images: [image, OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description: p.short, images: [image.url] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = productsByService(product.service).filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <ProductDetail key={product.slug} product={product} />
      {related.length > 0 && (
        <ProductSection title={`More from ${serviceNames[product.service]}`} items={related} />
      )}
    </>
  );
}
