import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { PageHeader } from "./PageHeader";
import { ProductSection } from "./ProductSection";
import { productsByService, type ShopService } from "@/lib/products";

export function ServiceShop({
  service,
  title,
  text,
  image,
  alt,
  shopHeading,
  shopText,
  children,
}: {
  service: ShopService;
  title: string;
  text: string;
  image: StaticImageData;
  alt: string;
  shopHeading: string;
  shopText: string;
  children?: ReactNode;
}) {
  return (
    <>
      <PageHeader title={title} text={text} image={image} alt={alt} />
      <ProductSection title={shopHeading} intro={shopText} items={productsByService(service)} />
      {children}
    </>
  );
}
