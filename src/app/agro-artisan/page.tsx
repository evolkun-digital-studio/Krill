import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import fields from "@/assets/hero-organics.jpg";
import hands from "@/assets/intro-hands.jpg";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta(
  "Agro Artisan · Farm Skills Made by Hand | KRIL",
  "KRIL's Agro Artisan programme supports rural growers and makers in Uttarakhand and the Northeast who turn what they grow into honey, oils, jaggery, spices and crafts.",
  "/agro-artisan",
);

const pillars = [
  { title: "From the field to the jar", text: "Growers process their own harvest at home, so more of the value stays with the family that grew it." },
  { title: "Old methods, kept alive", text: "Wooden presses, bilona churning and slow boiling are kept going instead of replaced by machines." },
  { title: "Training and fair prices", text: "We help with hygiene, packing and pricing, and pay producers fairly for every batch." },
];

const crafts = [
  { who: "Beekeepers", what: "Raw honey", to: "/organics" },
  { who: "Oil pressers", what: "Cold-pressed oils", to: "/organics" },
  { who: "Cane farmers", what: "Jaggery", to: "/organics" },
  { who: "Ringal and wool artisans", what: "Handicraft", to: "/handicraft" },
  { who: "Dairy farmers", what: "Ghee and village dairy", to: "/dairy" },
] as const;

const rowCls =
  "group flex items-center justify-between gap-6 border-b border-border py-6 transition-colors hover:text-primary md:py-8";

export default function AgroArtisan() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-36 md:px-8 md:pt-44">
        <Reveal>
          <h1 className="type-display max-w-4xl">Agro Artisan: where farming meets craft.</h1>
          <p className="type-body mt-8 max-w-xl text-muted-foreground">
            Agro artisans are farmers who also make things. They grow, harvest and then turn their produce into honey, oil, jaggery and handmade goods, all in the village.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:aspect-[21/9]">
          <Image src={fields} alt="Fields and farm produce in a hill village" fill preload sizes="100vw" className="ken-burns object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-3xl">
          <h2 className="type-heading">What we support</h2>
          <p className="type-body mt-5 text-muted-foreground">
            Selling raw crops earns very little. Turning them into finished goods earns much more. Our Agro Artisan work helps families take that step with the skills they already have.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-3 md:grid-cols-5 md:gap-4">
          {pillars.map((p, i) => (
            <Reveal
              key={p.title}
              className={
                i === 0
                  ? "rounded-3xl bg-primary p-8 text-primary-foreground md:col-span-3 md:row-span-2 md:flex md:flex-col md:justify-end md:p-12"
                  : "rounded-3xl bg-secondary p-8 md:col-span-2 md:p-10"
              }
            >
              <h3 className={i === 0 ? "text-2xl font-semibold leading-tight tracking-tight md:text-4xl" : "text-xl font-semibold leading-tight tracking-tight md:text-2xl"}>{p.title}</h3>
              <p className={`type-body mt-3 max-w-sm ${i === 0 ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-card py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="max-w-3xl">
            <h2 className="type-heading">Our agro artisans</h2>
            <p className="type-body mt-5 text-muted-foreground">
              Pick a craft to see what they make.
            </p>
          </Reveal>
          <ul className="mt-10 border-t border-border md:mt-14">
            {crafts.map((c) => (
              <li key={c.who}>
                <Link href={c.to} className={rowCls}>
                  <span className="text-xl font-semibold tracking-tight md:text-3xl">{c.who}</span>
                  <span className="type-label inline-flex shrink-0 items-center gap-1 text-muted-foreground">
                    {c.what} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-3 md:px-8 md:py-5">
        <div className="grid overflow-hidden rounded-3xl bg-honey-night text-on-dark md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[28rem]">
            <Image src={hands} alt="Hands holding fresh produce from the field" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <Reveal className="flex flex-col justify-center p-8 md:p-14">
            <p className="text-2xl font-semibold leading-snug tracking-tight md:text-4xl">
              Are you a grower or maker who wants to work with us?
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="type-label inline-flex h-12 items-center rounded-full bg-on-dark px-6 text-foreground hover:opacity-90">
                Get in touch
              </Link>
              <Link href="/products" className="type-label inline-flex h-12 items-center rounded-full border border-on-dark/40 px-6 hover:bg-on-dark/10">
                Browse products
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="h-16 md:h-24" aria-hidden />
    </>
  );
}
