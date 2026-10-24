import Image from "next/image";
import Link from "next/link";
import agroImage from "@/assets/vertical-agro.jpg";
import { Reveal } from "@/components/Reveal";
import { ScrollText } from "@/components/ScrollText";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Kinikh Agro & Artisans · Produce and Indigenous Craft | KRIL",
  "Agricultural produce, handloom, bamboo, cane and wooden craft sourced through KRIL's rural producer and artisan network.",
  "/agro",
);

const portfolios = [
  {
    title: "From rural growers",
    items: [
      { name: "Grains", text: "Regional grains sourced through structured procurement.", for: "Bulk, wholesale" },
      { name: "Pulses", text: "Everyday and specialty pulses for retail and institutional buyers.", for: "Bulk, wholesale" },
      { name: "Spices", text: "Whole and ground spices from established growing regions.", for: "Retail, export" },
      { name: "Seeds", text: "Culinary and functional seeds, packed for retail and bulk supply.", for: "Retail, bulk" },
      { name: "Seasonal produce", text: "Produce coordinated with harvest cycles.", for: "Wholesale" },
    ],
  },
  {
    title: "From artisans",
    items: [
      { name: "Handloom textiles", text: "Woven fabrics that carry region, memory and skill.", for: "Retail, export" },
      { name: "Baskets and fibre craft", text: "Utility and decorative baskets made from natural fibres.", for: "Retail, hospitality" },
      { name: "Bamboo and cane", text: "Products for utility, décor and packaging.", for: "Retail, business" },
      { name: "Jute products", text: "Packaging, utility and lifestyle products made from jute.", for: "Business, export" },
      { name: "Wooden products and boxes", text: "Rural woodwork, from décor to sliding, hinged and engraved gift boxes.", for: "Retail, custom, bulk" },
    ],
  },
];

const packaging = [
  { title: "Brief and concept", text: "We learn your brand, product, format and story." },
  { title: "Dimensions and materials", text: "We choose wood, bamboo, cane, jute or fibre for the purpose." },
  { title: "Compartment planning", text: "Inserts and compartments are designed around the product." },
  { title: "Engraving and finishing", text: "Brand marks, engraving, staining and protective finish." },
  { title: "Sampling", text: "You approve a prototype before bulk production." },
  { title: "Bulk production", text: "Artisan workshops produce the approved design." },
  { title: "Quality and presentation", text: "Final checks and presentation-ready packing." },
  { title: "Delivery", text: "To your brand, shop, export or hospitality partner." },
];

const audiences = [
  "Interior designers",
  "Hospitality companies",
  "Lifestyle brands",
  "Fashion brands",
  "Corporate gifting",
  "Export houses",
  "Food and beverage brands",
  "Jewellery businesses",
  "Retailers",
  "D2C brands",
];

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const btnPrimary = `type-label inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-primary-foreground transition-opacity hover:opacity-90 ${focus}`;
const btnLink = `type-label inline-flex h-12 items-center justify-center rounded-full px-4 text-primary transition-colors hover:bg-primary/5 ${focus}`;
const bigHeading = "text-[clamp(2rem,2.6vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance";

export default function AgroPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-[clamp(3rem,7vw,6rem)] pt-32 text-center md:px-8 md:pt-40">
        <h1 className="rise-in mx-auto max-w-4xl text-[clamp(2.75rem,3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
           Shaped by human hands.
        </h1>
        <p className="type-body rise-in mx-auto mt-6 max-w-xl text-[clamp(1.0625rem,0.4vw,1.rem)] leading-snug text-muted-foreground" style={{ animationDelay: "100ms" }}>
          Produce, handloom and natural-material craft from rural growers and artisans, with the origin and the skill kept intact.
        </p>
        <div className="rise-in mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3" style={{ animationDelay: "200ms" }}>
          <a href="#sourcing" className={btnPrimary}>See what we source</a>
          <Link href="/contact" className={btnLink}>Work with our network</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="photo-settle relative h-[clamp(22rem,60vw,46rem)] overflow-hidden rounded-[2rem] bg-overlay">
          <Image src={agroImage} alt="An artisan's hands weaving indigo and terracotta threads on a traditional handloom" fill preload sizes="(min-width: 980px) 916px, 50vw" className="object-cover object-[50%_62%]" />
        </div>
      </section>

      {/* <section className="mt-[clamp(4rem,9vw,8rem)]">
        <div className="mx-auto max-w-7xl px-5 py-[clamp(5rem,11vw,9rem)] md:px-8">
          <ScrollText
            className="mx-auto max-w-4xl text-balance text-center text-[clamp(1.875rem,2vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
            lead="Produce. Material. Craft. Identity."
            rest="A handloom is a slower kind of machine, one that carries hands, afternoons and skills passed down between generations."
          />
        </div>
      </section> */}

      <section id="sourcing" className="scroll-mt-20 py-[clamp(5rem,11vw,9rem)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className={bigHeading}>From the field, the loom and the workshop</h2>
            <p className="type-body mt-4 text-muted-foreground">
              Two connected portfolios: produce sourced from rural growers, and craft shaped by artisans working with natural materials.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-14 md:mt-20 lg:grid-cols-2 lg:gap-20">
            {portfolios.map((p) => (
              <Reveal key={p.title}>
                <h3 className="type-sub">{p.title}</h3>
                <ul className="mt-4 border-t border-border">
                  {p.items.map((it) => (
                    <li key={it.name} className="grid gap-x-6 gap-y-1 border-b border-border py-5 sm:grid-cols-[1fr_auto]">
                      <div>
                        <p className="type-sub">{it.name}</p>
                        <p className="type-body mt-1 text-muted-foreground">{it.text}</p>
                      </div>
                      {/* <p className="type-label text-muted-foreground sm:pt-0.5 sm:text-right">{it.for}</p> */}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(5rem,11vw,9rem)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className={bigHeading}>Packaging that becomes part of the product</h2>
            <p className="type-body mt-4 text-muted-foreground">
              Wooden and natural-material packaging made with artisan workshops, so the container carries as much intent as what it holds.
            </p>
          </Reveal>
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4 lg:gap-5">
            {packaging.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-border bg-card p-6 md:p-7">
                <span aria-hidden className="text-4xl font-semibold tracking-tight text-primary">{i + 1}</span>
                <h3 className="type-sub mt-3">{s.title}</h3>
                <p className="type-body mt-2 text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-5 py-[clamp(5rem,11vw,9rem)] text-center md:px-8">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className={bigHeading}>Develop a product with our network</h2>
            <p className="type-body mt-4 text-muted-foreground">
              For brands, hospitality companies and gifting partners who value origin, material and human skill in what they present.
            </p>
          </Reveal>
          <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2">
            {audiences.map((a) => (
              <li key={a} className="type-label rounded-full border border-border bg-card px-4 py-2">{a}</li>
            ))}
          </ul>
          <Link href="/contact" className={`${btnPrimary} mt-10`}>Talk to our team</Link>
        </div>
      </section>
    </>
  );
}
