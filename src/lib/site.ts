import heroOrganics from "@/assets/hero-organics.jpg";
import heroHandicraft from "@/assets/hero-handicraft.jpg";
import heroDairy from "@/assets/hero-dairy.jpg";
import heroFishery from "@/assets/hero-fishery.jpg";
import type { StaticImageData } from "next/image";

export const SITE = {
  name: "KRIL",
  fullName: "Kinikh Rural Indigenous Livelihood",
  parent: "A KINIKH Group Enterprise",
  description:
    "KRIL brings you honey, cold-pressed oils, handicrafts and village dairy from rural and indigenous producers of Uttarakhand and the Northeast.",
  phone: "+91 70888 075375",
  email: "rural@kinikh.com",
};

/** Public origin of this site, used for canonical URLs, Open Graph images and the sitemap. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/** WhatsApp number in international format, digits only. */
export const WHATSAPP_NUMBER = "9170888075375";

/** Kinikh Fishery has its own website. Change this when the subdomain is live. */
export const FISHERY_URL = "https://fishery.kinikh.com";

export type ServiceKey = "organics" | "handicraft" | "dairy" | "fishery";

export type HeroSlide = {
  key: ServiceKey;
  title: string;
  line: string;
  cta: string;
  href: string;
  external?: boolean;
  poster: StaticImageData;
  /** Leave empty until a video is added; the poster then slowly zooms. */
  video?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    key: "organics",
    title: "Kinikh Organics",
    line: "Pure honey and cold-pressed oils, with no palm oil.",
    cta: "Shop Organics",
    href: "/organics",
    poster: heroOrganics,
    video: "/videos/organics.mp4",
  },
  {
    key: "handicraft",
    title: "Kinikh Handicraft",
    line: "Handmade by artisans of the hills and the Northeast.",
    cta: "Shop Handicraft",
    href: "/handicraft",
    poster: heroHandicraft,
    video: "/videos/handicraft.mp4",
  },
  {
    key: "dairy",
    title: "Kinikh Dairy",
    line: "Fresh village dairy, made the traditional way.",
    cta: "Shop Dairy",
    href: "/dairy",
    poster: heroDairy,
    video: "/videos/dairy.mp4",
  },
  {
    key: "fishery",
    title: "Kinikh Fishery",
    line: "Live freshwater fish from clean rural ponds.",
    cta: "Visit Kinikh Fishery",
    href: FISHERY_URL,
    external: true,
    poster: heroFishery,
    video: "/videos/fishery.mp4",
  },
];

export const HERO_INTERVAL_MS = 4000;
