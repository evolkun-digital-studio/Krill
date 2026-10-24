import { ArrowUpRight } from "lucide-react";
import heroFishery from "@/assets/hero-fishery.jpg";
import { FISHERY_URL } from "@/lib/site";
import { Reveal } from "./Reveal";

export function FisherySection() {
  return (
    <section id="fishery" className="relative overflow-hidden">
      <img src={heroFishery} alt="Freshwater fish ponds at sunrise in the countryside" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0" aria-hidden />
      <div className="relative mx-auto flex min-h-[80svh] max-w-7xl items-end px-5 py-20 md:px-8">
        <Reveal className="max-w-xl text-on-dark">
          <h2 className="type-heading">Kinikh Fishery</h2>
          <p className="type-body mt-4 text-on-dark/90">
            Live, freshwater fish raised in clean rural ponds. We sell fish alive, never frozen.
          </p>
          <a
            href={FISHERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="type-label mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-on-dark px-6 text-foreground hover:opacity-90"
          >
            Visit Kinikh Fishery <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
