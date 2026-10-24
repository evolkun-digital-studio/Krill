import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { OG_IMAGE } from "@/lib/metadata";
import { SITE, SITE_URL } from "@/lib/site";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KRIL · Kinikh Rural Indigenous Livelihood",
  description: "Honey, cold-pressed oils, handicrafts and village dairy from rural and indigenous producers.",
  applicationName: SITE.name,
  authors: [{ name: "KINIKH Group" }],
  openGraph: { siteName: SITE.name, type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      {/* Browser extensions often stamp attributes onto <body> before React hydrates. */}
      <body suppressHydrationWarning>
        <CartProvider>
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
