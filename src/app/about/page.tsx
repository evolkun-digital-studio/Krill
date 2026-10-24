import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import portrait from "@/assets/portrait-community.jpg";
import hands from "@/assets/intro-hands.jpg";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/metadata";
import { FISHERY_URL, SITE } from "@/lib/site";

export const metadata = pageMeta(
  "About KRIL · Kinikh Rural Indigenous Livelihood",
  "KRIL works with rural and indigenous producers in Uttarakhand and the Northeast to bring their honey, oils, crafts and dairy to your home.",
  "/about",
);

const principles = [
  { title: "We pay fairly", text: "Producers are paid fairly for their time, so the work can support a family." },
  { title: "We keep batches small", text: "Nothing is rushed or stocked in a warehouse. It is made when it is ready." },
  { title: "We deliver to your door", text: "Your order comes straight from the village, with no long chain in between." },
];

const producers = [
  { who: "Beekeepers and oil pressers", where: "Kinikh Organics", to: "/organics" },
  { who: "Weavers and woodcarvers", where: "Kinikh Handicraft", to: "/handicraft" },
  { who: "Dairy farmers", where: "Kinikh Dairy", to: "/dairy" },
  { who: "Fish farmers", where: "Kinikh Fishery", to: FISHERY_URL, external: true },
] as const;

const rowCls =
  "group flex items-center justify-between gap-6 border-b border-border py-6 transition-colors hover:text-primary md:py-8";

export default function About() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-36 md:px-8 md:pt-44">
        <Reveal>
          <h1 className="type-display max-w-4xl">Livelihoods that stay in the village.</h1>
          <p className="type-body mt-8 max-w-xl text-muted-foreground">
            {SITE.fullName} is a {SITE.parent}. We help families in the hills and the Northeast earn a fair living from the skills they already have.
          </p>
        </Reveal>
      </section>

      <section className="px-3 md:px-5">
        <div className="relative mx-auto aspect-[4/3] max-w-[96rem] overflow-hidden rounded-3xl md:aspect-[21/9]">
          <Image src={portrait} alt="Members of a rural community together in their village" fill preload sizes="100vw" className="ken-burns object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <Reveal className="max-w-3xl">
          <h2 className="type-heading">Why KRIL started</h2>
          <p className="type-body mt-5 text-muted-foreground">
            KRIL began with a simple wish: that families in the hills and the Northeast could earn a fair living from what they already do well. Beekeeping, pressing oil, weaving, carving and caring for cattle are skills these communities have held for generations.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-3 md:grid-cols-5 md:gap-4">
          {principles.map((p, i) => (
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
            <h2 className="type-heading">Who makes what you order</h2>
            <p className="type-body mt-5 text-muted-foreground">
              We work with producers across Uttarakhand and the Northeast. Pick a craft to see who is behind it.
            </p>
          </Reveal>
          <ul className="mt-10 border-t border-border md:mt-14">
            {producers.map((p) => (
              <li key={p.who}>
                {"external" in p ? (
                  <a href={p.to} target="_blank" rel="noopener noreferrer" className={rowCls}>
                    <span className="text-xl font-semibold tracking-tight md:text-3xl">{p.who}</span>
                    <span className="type-label inline-flex shrink-0 items-center gap-1 text-muted-foreground">
                      {p.where} <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                  </a>
                ) : (
                  <Link href={p.to} className={rowCls}>
                    <span className="text-xl font-semibold tracking-tight md:text-3xl">{p.who}</span>
                    <span className="type-label inline-flex shrink-0 items-center gap-1 text-muted-foreground">
                      {p.where} <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-3 py-3 md:px-5 md:py-5">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-honey-night text-on-dark md:grid-cols-2">
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[28rem]">
            <Image src={hands} alt="Hands holding fresh produce from the field" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <Reveal className="flex flex-col justify-center p-8 md:p-14">
            <p className="text-2xl font-semibold leading-snug tracking-tight md:text-4xl">
              When you order from KRIL, you are buying from a person, not a factory.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/products" className="type-label inline-flex h-12 items-center rounded-full bg-on-dark px-6 text-foreground hover:opacity-90">
                Browse products
              </Link>
              <Link href="/contact" className="type-label inline-flex h-12 items-center rounded-full border border-on-dark/40 px-6 hover:bg-on-dark/10">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <div className="h-16 md:h-24" aria-hidden />
    </>
  );
}
