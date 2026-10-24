import type { Metadata } from "next";
import { SITE } from "./site";

export const OG_IMAGE = { url: "/og-image.jpg", width: 1200, height: 630, alt: `${SITE.name} · ${SITE.fullName}` };

// Next replaces (not merges) openGraph/twitter objects per page, so every page repeats the shared fields.
export const pageMeta = (title: string, description: string, path: string): Metadata => ({
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: { title, description, type: "website", url: path, siteName: SITE.name, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
});
