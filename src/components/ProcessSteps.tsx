import Image, { type StaticImageData } from "next/image";
import { Reveal } from "./Reveal";
import { ScrollRail } from "./ScrollRail";

export type Step = { title: string; text: string; image: StaticImageData; alt: string };

/**
 * One component, five treatments, so each craft section reads as its own world:
 * rail (dark carousel), stack (sticky cards), bento (mosaic), journey (arches), timeline (default).
 */
export type StepsVariant = "timeline" | "rail" | "stack" | "bento" | "journey";

type Props = { heading: string; intro: string; steps: Step[]; highlight?: string; variant?: StepsVariant };

const cols: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export function ProcessSteps({ variant = "timeline", ...props }: Props) {
  switch (variant) {
    case "rail":
      return <Rail {...props} />;
    case "stack":
      return <Stack {...props} />;
    case "bento":
      return <Bento {...props} />;
    case "journey":
      return <Journey {...props} />;
    default:
      return <Timeline {...props} />;
  }
}

/* Bee farming: a honey-coloured field with tall photo cards you swipe through. */
function Rail({ heading, intro, steps }: Props) {
  return (
    <section className="overflow-hidden bg-background py-20 text-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="type-display">{heading}</h2>
          <p className="type-body mt-6 max-w-xl text-muted-foreground">{intro}</p>
        </Reveal>
      </div>
      <div className="mt-12 md:mt-16">
        <ScrollRail label={heading}>
          {steps.map((s) => (
            <li key={s.title} className="group relative aspect-[3/4] w-[78vw] max-w-[340px] shrink-0 snap-start overflow-hidden rounded-3xl bg-overlay sm:w-[340px]">
              <Image src={s.image} alt={s.alt} fill sizes="340px" className="img-zoom object-cover" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-overlay/90 via-overlay/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-xl font-semibold text-on-dark leading-tight tracking-tight">{s.title}</h3>
                <p className="type-body mt-2 text-on-dark/80">{s.text}</p>
              </div>
            </li>
          ))}
        </ScrollRail>
      </div>
    </section>
  );
}

/* Cold-press oil: wide cards that pile on top of each other as you scroll, like pressed layers. */
function Stack({ heading, intro, steps, highlight }: Props) {
  return (
    <section className="bg-oil-wash py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl px-2 text-center">
          <h2 className="type-display">{heading}</h2>
          <p className="type-body mx-auto mt-6 max-w-xl text-muted-foreground">{intro}</p>
        </Reveal>
        <ol className="mt-14 space-y-4 md:mt-20 md:space-y-6">
          {steps.map((s, i) => (
            <li
              key={s.title}
              style={{ ["--stack-top" as string]: `${96 + i * 18}px` }}
              className="overflow-hidden rounded-3xl bg-card shadow-soft md:sticky md:top-[var(--stack-top)]"
            >
              <div className={`grid md:min-h-[24rem] md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="type-label text-muted-foreground">Step {i + 1} of {steps.length}</p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">{s.title}</h3>
                  <p className="type-body mt-4 max-w-sm text-muted-foreground">{s.text}</p>
                </div>
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <Image src={s.image} alt={s.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
              </div>
            </li>
          ))}
        </ol>
        {highlight && (
          <Reveal className="mx-auto mt-16 max-w-3xl px-2 text-center">
            <p className="text-xl font-semibold leading-snug tracking-tight text-primary md:text-3xl">{highlight}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* Made by hand: not a sequence, so a mosaic of different-sized tiles, like pieces on a workbench. */
const bentoSpans = [
  "md:col-span-6 lg:col-span-5 lg:row-span-2",
  "md:col-span-3 lg:col-span-4",
  "md:col-span-3 lg:col-span-3 lg:row-span-2",
  "md:col-span-6 lg:col-span-4",
];

function Bento({ heading, intro, steps }: Props) {
  return (
    <section className="bg-craft py-20 text-on-dark md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="type-display">{heading}</h2>
          <p className="type-body mx-auto mt-6 max-w-xl text-on-dark/70">{intro}</p>
        </Reveal>
        <ul className="mt-12 grid gap-3 md:mt-16 md:auto-rows-[16rem] md:grid-cols-6 md:gap-4 lg:grid-cols-12">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`group relative min-h-72 overflow-hidden rounded-[1.75rem] bg-overlay ${bentoSpans[i] ?? "md:col-span-3 lg:col-span-4"}`}
            >
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 42vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
                className="img-zoom object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-overlay/85 via-overlay/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <h3 className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">{s.title}</h3>
                <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-on-dark/85">{s.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* From pasture to pot: arched photos (doorways, pots) rising and falling like a walk across the field. */
function Journey({ heading, intro, steps }: Props) {
  return (
    <section className="overflow-hidden bg-dairy-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="type-display">{heading}</h2>
          <p className="type-body mx-auto mt-6 max-w-xl text-muted-foreground">{intro}</p>
        </Reveal>
        <ol className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-20 lg:grid-cols-5 lg:gap-x-6 lg:pb-16">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`text-center lg:odd:translate-y-0 lg:even:translate-y-14 ${
                steps.length % 2 && i === steps.length - 1 ? "max-lg:col-span-2 max-lg:mx-auto max-lg:w-1/2" : ""
              }`}
            >
              <div className="group overflow-hidden rounded-t-full rounded-b-3xl bg-secondary">
                <Image src={s.image} alt={s.alt} sizes="(min-width: 1024px) 20vw, 50vw" className="img-zoom aspect-[3/4] w-full object-cover" />
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-tight tracking-tight">{s.title}</h3>
              <p className="type-body mt-2 text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* The original quiet timeline, still used where a process needs no special treatment. */
function Timeline({ heading, intro, steps, highlight }: Props) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <Reveal className="max-w-2xl">
        <h2 className="type-heading">{heading}</h2>
        <p className="type-body mt-4 text-muted-foreground">{intro}</p>
      </Reveal>

      <div className="relative mt-14">
        <div
          aria-hidden
          className="absolute bottom-0 left-[11px] top-0 w-px bg-border md:bottom-auto md:left-0 md:right-0 md:top-[11px] md:h-px md:w-auto"
        />
        <ol className={`grid gap-12 md:gap-6 ${cols[steps.length] ?? "md:grid-cols-4"}`}>
          {steps.map((s) => (
            <li key={s.title} className="relative pl-10 md:pl-0 md:pt-10">
              <span aria-hidden className="absolute left-0 top-0 size-[23px] rounded-full border border-primary bg-ivory">
                <span className="absolute inset-[6px] rounded-full bg-primary" />
              </span>
              <Reveal>
                <div className="group overflow-hidden rounded-2xl">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    sizes="(min-width: 1280px) 300px, (min-width: 768px) 25vw, 100vw"
                    className="img-zoom aspect-[4/3] w-full object-cover"
                  />
                </div>
                <h3 className="type-sub mt-5">{s.title}</h3>
                <p className="type-body mt-2 text-muted-foreground">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {highlight && (
        <Reveal className="mt-14 rounded-2xl bg-secondary px-6 py-8 md:px-10">
          <p className="type-sub text-primary">{highlight}</p>
        </Reveal>
      )}
    </section>
  );
}
