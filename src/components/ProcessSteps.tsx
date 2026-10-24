import { Reveal } from "./Reveal";

export type Step = { title: string; text: string; image: string; alt: string };

const cols: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export function ProcessSteps({
  heading,
  intro,
  steps,
  highlight,
}: {
  heading: string;
  intro: string;
  steps: Step[];
  highlight?: string;
}) {
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
                  <img src={s.image} alt={s.alt} loading="lazy" width={1024} height={768} className="img-zoom aspect-[4/3] w-full object-cover" />
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
