import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/metadata";
import { SITE, WHATSAPP_NUMBER } from "@/lib/site";

export const metadata = pageMeta("Contact KRIL", "Call, WhatsApp or email KRIL for orders and questions about our rural products.", "/contact");

const tile = "group relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 md:p-10";

const include = [
  "The products you would like",
  "The size and how many",
  "Your name and delivery location",
];

export default function Contact() {
  const tel = `tel:${SITE.phone.replace(/\s/g, "")}`;
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-36 md:px-8 md:pt-44">
        <Reveal>
          <h1 className="type-display max-w-4xl">Talk to the people behind the products.</h1>
          <p className="type-body mt-8 max-w-xl text-muted-foreground">
            Ask about an order, a bulk request or any of our producers. A real person on our team will reply.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl gap-3 px-5 md:grid-cols-2 md:gap-4 md:px-8">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${tile} min-h-72 bg-primary text-primary-foreground md:row-span-2 md:min-h-[28rem]`}
        >
          <MessageCircle className="size-9" aria-hidden />
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">Message us on WhatsApp</h2>
            <p className="type-body mt-4 inline-flex items-center gap-2 text-primary-foreground/80">
              Send a note or a photo and we will reply there
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </p>
          </div>
        </a>

        <a href={tel} className={`${tile} min-h-56 bg-secondary`}>
          <Phone className="size-7 text-primary" aria-hidden />
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Call us</h2>
            <p className="mt-1 text-xl text-muted-foreground md:text-2xl">{SITE.phone}</p>
          </div>
        </a>

        <a href={`mailto:${SITE.email}`} className={`${tile} min-h-56 bg-honey-night text-on-dark`}>
          <Mail className="size-7" aria-hidden />
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight">Write to us</h2>
            <p className="mt-1 break-all text-xl text-on-dark/70 md:text-2xl">{SITE.email}</p>
          </div>
        </a>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-10 rounded-3xl bg-card p-8 md:grid-cols-2 md:gap-16 md:p-16">
          <Reveal>
            <h2 className="type-heading">Ready to order?</h2>
            <p className="type-body mt-4 max-w-md text-muted-foreground">
              Our products are made in small batches, so we take requests instead of payments online. Send us what you need and we will confirm the price, what is ready and when it can reach you.
            </p>
            <Link href="/request-order" className="type-label mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 text-primary-foreground hover:opacity-90">
              Request to order
            </Link>
          </Reveal>
          <Reveal>
            <h3 className="type-sub">What to include in your message</h3>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {include.map((t) => (
                <li key={t} className="type-body py-4">{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
