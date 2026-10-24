import Image from "next/image";
import Link from "next/link";
import { ClipboardList, MessageCircle, Truck } from "lucide-react";
import portrait from "@/assets/portrait-community.jpg";
import oilPress from "@/assets/p-oil-press.jpg";
import beeJar from "@/assets/p-bee-jar.jpg";
import loom from "@/assets/p-craft-loom.jpg";
import wood from "@/assets/p-craft-wood.jpg";
import bilona from "@/assets/p-dairy-bilona.jpg";
import milk from "@/assets/p-dairy-milk.jpg";
import { FisherySection } from "@/components/FisherySection";
import { HeroSlider } from "@/components/HeroSlider";
import { ShopByService } from "@/components/ShopByService";
import { ProductSection } from "@/components/ProductSection";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/metadata";
import { featuredProducts } from "@/lib/products";
import { SITE } from "@/lib/site";

export const metadata = pageMeta("KRIL · Kinikh Rural Indigenous Livelihood", SITE.description, "/");

const bands = [
  { title: "Kinikh Organics", text: "Hill honey taken gently from the hive, and oil pressed slowly in a wooden kolhu.", to: "/organics", images: [beeJar, oilPress], alts: ["Honey poured into glass jars", "Wooden kolhu pressing mustard seeds"] },
  { title: "Kinikh Handicraft", text: "Looms in the Northeast and carving tools in Uttarakhand, used by the same families for generations.", to: "/handicraft", images: [loom, wood], alts: ["Woman weaving on a traditional loom", "Hands carving a wooden bowl"] },
  { title: "Kinikh Dairy", text: "Milk from village cows, churned by hand into butter and ghee.", to: "/dairy", images: [milk, bilona], alts: ["Farmer milking a cow into a steel bucket", "Woman churning curd with a bilona"] },
] as const;

export default function Home() {
  return (
    <>
      <HeroSlider />

      <ShopByService />

      <section className="bg-card">
        <ProductSection title="Featured products" intro="A few favourites from across our services." items={featuredProducts} />
      </section>

      <section className="mx-auto max-w-7xl space-y-24 px-5 py-20 md:px-8 md:py-28">
        {bands.map((b, idx) => (
          <Reveal key={b.to} className={`grid items-center gap-8 md:grid-cols-2 md:gap-14`}>
            <div className={idx % 2 ? "md:order-2" : ""}>
              <h2 className="type-heading">{b.title}</h2>
              <p className="type-body mt-4 max-w-md text-muted-foreground">{b.text}</p>
              <Link href={b.to} className="type-label mt-6 inline-flex h-11 items-center rounded-full border border-primary px-5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                See how it is made
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {b.images.map((img, i) => (
                <div key={img.src} className={`group overflow-hidden rounded-2xl ${i === 1 ? "mt-10" : ""}`}>
                  <Image src={img} alt={b.alts[i] ?? ""} sizes="(min-width: 1280px) 300px, (min-width: 768px) 25vw, 50vw" className="img-zoom aspect-[3/4] w-full object-cover" />
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </section>

      <FisherySection />

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-2xl">
          <h2 className="type-heading">Why we take orders on request</h2>
          <p className="type-body mt-4 text-muted-foreground">
            Our products are made in small batches by families, not stocked in a warehouse. So instead of a checkout, you send us a request and our team confirms the price, what is ready, and when it can reach you.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: ClipboardList, title: "Add to your list", text: "Pick the products and sizes you would like." },
            { icon: MessageCircle, title: "Send a request", text: "Share your details. The request opens on WhatsApp." },
            { icon: Truck, title: "We confirm and deliver", text: "We call you back with price, availability and delivery." },
          ].map((s) => (
            <Reveal key={s.title} className="rounded-2xl bg-card p-8">
              <s.icon className="size-6 text-primary" />
              <h3 className="type-sub mt-5">{s.title}</h3>
              <p className="type-body mt-2 text-muted-foreground">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-3 md:px-5">
        <div className="mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-3xl bg-secondary md:grid-cols-2">
          <div className="group h-full overflow-hidden">
            <Image src={portrait} alt="Rural producers from a KRIL partner village" sizes="(min-width: 768px) 50vw, 100vw" className="img-zoom h-full min-h-72 w-full object-cover" />
          </div>
          <Reveal className="px-6 pb-12 md:px-4 md:py-16 md:pr-14">
            <h2 className="type-heading">About KRIL</h2>
            <p className="type-body mt-4 text-muted-foreground">
              KRIL, Kinikh Rural Indigenous Livelihood, works with beekeepers, oil pressers, weavers, craftspeople and dairy farmers in Uttarakhand and the Northeast. We pay fairly, keep batches small and bring their work straight to your home.
            </p>
            <Link href="/about" className="type-label mt-6 inline-flex h-11 items-center rounded-full bg-primary px-5 text-primary-foreground hover:opacity-90">
              Read our story
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="type-heading">Talk to us</h2>
            <p className="type-body mt-3 text-muted-foreground">
              Call {SITE.phone} or write to {SITE.email}.
            </p>
          </div>
          <Link href="/contact" className="type-label inline-flex h-12 items-center rounded-full bg-primary px-6 text-primary-foreground hover:opacity-90">
            Contact us
          </Link>
        </Reveal>
      </section>
    </>
  );
}
