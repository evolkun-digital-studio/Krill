import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
import heroFishery from "@/assets/hero-fishery.jpg";
import fishLive from "@/assets/p-fish-live.jpg";
import fishNet from "@/assets/p-fish-net.jpg";
import pondsAbove from "@/assets/vertical-fishery.jpg";
import { LiveFishOrder } from "@/components/LiveFishOrder";
import { Reveal } from "@/components/Reveal";
import { ScrollText } from "@/components/ScrollText";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pageMeta } from "@/lib/metadata";
import { whatsappLink } from "@/lib/order";
import { SITE } from "@/lib/site";

export const metadata = pageMeta(
  "Kinikh Fishery · Live Freshwater Fish | KRIL",
  "Live freshwater fish from clean rural ponds, netted by hand when you order and delivered alive, never frozen.",
  "/fishery",
);

const tiles = [
  { title: "Clean ponds", text: "Wide freshwater ponds in open countryside.", image: pondsAbove, alt: "Fish ponds seen from above at sunrise, divided by narrow earth banks", position: "object-center", className: "lg:row-span-2 min-h-[28rem]" },
  { title: "Netted by hand", text: "Fish farmers net fish only when an order comes in.", image: fishNet, alt: "Two fish farmers pulling a net in a freshwater pond", position: "object-center", className: "min-h-[22rem]" },
  { title: "Always alive", text: "Fish stay alive in clean water until they reach you.", image: fishLive, alt: "A live freshwater fish swimming in clear pond water", position: "object-[60%_50%]", className: "min-h-[22rem]" },
] as const;

const next = [
  { title: "Send your request", text: "Say how much, by when and where. Rough answers are fine." },
  { title: "We confirm", text: "We reply with what is ready, the price and whether we can deliver to you." },
  { title: "Netted and sent alive", text: "The fish is netted after you agree, then travels in clean water." },
];

const faqs = [
  { q: "Do you sell frozen fish?", a: "No. Our fish is sold alive, never frozen." },
  { q: "Why is there no price on this page?", a: "Fish is netted to order, so our team confirms the price and availability with you when you get in touch." },
  { q: "Which fish can I get?", a: "It depends on what the ponds have ready. Tell us what you are looking for and we will confirm what is available." },
  { q: "What should I include when I order?", a: "Tell us how much fish you want, how soon you need it and your delivery location." },
  { q: "Can you deliver to my area?", a: "We confirm this when you contact us. Send your location and we will tell you what is possible." },
];

const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const btnPrimary = `type-label inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-primary-foreground transition-opacity hover:opacity-90 ${focus}`;
const btnLink = `type-label inline-flex h-12 items-center justify-center gap-2 rounded-full px-4 text-primary transition-colors hover:bg-primary/5 ${focus}`;
const btnLight = "type-label inline-flex h-12 items-center justify-center gap-2 rounded-full bg-on-dark px-6 text-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark";
const btnGhost = "type-label inline-flex h-12 items-center justify-center gap-2 rounded-full border border-on-dark/50 px-6 text-on-dark transition-colors hover:bg-on-dark/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-on-dark";

export default function Fishery() {
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-[clamp(3rem,5vw,4rem)] pt-32 text-center md:px-8 md:pt-40">
        <h1 className="rise-in mx-auto max-w-4xl text-[clamp(2.75rem,3.5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-balance">
          Live fish, straight from the pond.
        </h1>
        <p className="type-body rise-in mx-auto mt-6 max-w-xl text-[clamp(1.0625rem,1rem+0.4vw,1.375rem)] leading-snug text-muted-foreground" style={{ animationDelay: "100ms" }}>
          Freshwater fish raised in clean rural ponds and sold alive, never frozen.
        </p>
        {/* <div className="rise-in mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3" style={{ animationDelay: "200ms" }}>
          <a href="#order" className={btnPrimary}>
            <MessageCircle className="size-4" aria-hidden /> Order live fish
          </a>
          <a href={tel} className={btnLink}>
            <Phone className="size-4" aria-hidden /> Call {SITE.phone}
          </a>
        </div> */}
      </section>

      <section className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="photo-settle relative h-[clamp(16rem,42vw,30rem)] overflow-hidden rounded-[2rem] bg-pond-night">
          <Image src={heroFishery} alt="Freshwater fish ponds at sunrise with a farmer casting a net" fill preload sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover object-[28%_50%] sm:object-center" />
        </div>
      </section>

      <section className="service-shop mt-[clamp(4rem,9vw,8rem)]" data-service="fishery">
        <div className="service-shop-inner mx-auto max-w-7xl px-5 py-[clamp(5rem,11vw,9rem)] md:px-8">
          <ScrollText
            className="mx-auto max-w-4xl text-balance text-center text-[clamp(1.875rem,2vw,2rem)] font-semibold leading-[1.1] tracking-[-0.03em]"
            lead="We sell fish alive, never frozen."
            rest="Each one is netted by hand only after you order, then kept in clean water until it reaches you."
          />

          <Reveal className="mx-auto mt-[clamp(5rem,10vw,8rem)] max-w-2xl text-center">
            <h2 className="type-heading">From pond to your door</h2>
            <p className="type-body mt-4 text-muted-foreground">Wide freshwater ponds in open countryside, looked after by rural fish farmers.</p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:grid-rows-2 lg:gap-6">
            {tiles.map((t) => (
              <Reveal key={t.title} className={`group relative overflow-hidden rounded-[2rem] bg-pond-night ${t.className}`}>
                <Image src={t.image} alt={t.alt} fill sizes="(min-width: 1024px) 600px, 100vw" className={`img-zoom object-cover ${t.position}`} />
                <div aria-hidden className="absolute inset-0" style={{ background: "var(--service-local-shade)" }} />
                <div className="absolute inset-x-0 bottom-0 p-6 text-on-dark md:p-8">
                  <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{t.title}</h3>
                  <p className="type-body mt-2 max-w-sm text-on-dark/85">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="scroll-mt-20 py-[clamp(5rem,11vw,9rem)]">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance">Ask for live fish</h2>
            <p className="type-body mt-4 text-muted-foreground">
              There is no checkout. Fish is netted fresh, so tell us what you need and our team confirms availability, price and delivery.
            </p>
          </Reveal>

          <ol className="mx-auto mt-14 grid max-w-4xl gap-10 text-center md:grid-cols-3 md:gap-8">
            {next.map((n, i) => (
              <li key={n.title}>
                <span aria-hidden className="text-4xl font-semibold tracking-tight text-primary">{i + 1}</span>
                <h3 className="type-sub mt-3">{n.title}</h3>
                <p className="type-body mt-2 text-muted-foreground">{n.text}</p>
              </li>
            ))}
          </ol>

          <Reveal className="mx-auto mt-14 max-w-3xl md:mt-20">
            <LiveFishOrder />
            <p className="type-label mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-muted-foreground">
              <a href={tel} className="inline-flex items-center gap-2 hover:text-foreground">
                <Phone className="size-4" aria-hidden /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-foreground">
                <Mail className="size-4" aria-hidden /> {SITE.email}
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-card py-[clamp(5rem,11vw,9rem)]">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal className="text-center">
            <h2 className="type-heading">Good to know</h2>
            <p className="type-body mt-4 text-muted-foreground">Quick answers before you get in touch.</p>
          </Reveal>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="type-sub py-5 hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="type-body max-w-xl pb-5 text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="relative overflow-hidden bg-overlay">
        <Image src={fishLive} alt="" aria-hidden fill sizes="100vw" className="object-cover object-[60%_50%]" />
        <div className="hero-overlay absolute inset-0" aria-hidden />
        <div className="relative mx-auto flex min-h-[70svh] max-w-7xl flex-col items-center justify-center px-5 py-24 text-center text-on-dark md:px-8">
          <h2 className="max-w-2xl text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance">Tell us how much you need.</h2>
          <p className="type-body mt-4 max-w-md text-on-dark/85">We will confirm the fish, the price and the delivery.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink("Hello KRIL, I would like to order live fish.")} target="_blank" rel="noopener noreferrer" className={btnLight}>
              <MessageCircle className="size-4" aria-hidden /> Message on WhatsApp
            </a>
            <a href={tel} className={btnGhost}>
              <Phone className="size-4" aria-hidden /> Call {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
