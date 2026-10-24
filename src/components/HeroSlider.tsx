import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { HERO_INTERVAL_MS, heroSlides } from "@/lib/site";

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts progress bar + timer
  const [reduced, setReduced] = useState(false);
  const [visited, setVisited] = useState<Set<number>>(() => new Set([0]));
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const go = useCallback((i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
    setVisited((v) => new Set(v).add(i));
  }, []);

  useEffect(() => {
    const start = () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => go((active + 1) % heroSlides.length), HERO_INTERVAL_MS);
    };
    const onVis = () => {
      if (document.hidden) {
        if (timer.current) window.clearTimeout(timer.current);
      } else {
        setCycle((c) => c + 1);
      }
    };
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [active, cycle, go]);

  // preload the next slide's video
  useEffect(() => {
    setVisited((v) => new Set(v).add((active + 1) % heroSlides.length));
  }, [active]);

  const slide = heroSlides[active] ?? heroSlides[0]!;

  return (
    <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-overlay" aria-label="KRIL services">
      {heroSlides.map((s, i) => {
        const on = i === active;
        return (
          <div
            key={s.key}
            aria-hidden={!on}
            className={`absolute inset-0 transition-opacity duration-[800ms] ease-out ${on ? "opacity-100" : "opacity-0"}`}
          >
            {s.video && !reduced && visited.has(i) ? (
              <video
                className="h-full w-full object-cover"
                src={s.video}
                poster={s.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                key={on ? `${s.key}-${cycle}` : s.key}
                src={s.poster}
                alt={`${s.title}: ${s.line}`}
                className={`h-full w-full object-cover ${on && !reduced ? "ken-burns" : ""}`}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
              />
            )}
          </div>
        );
      })}
      <div className="hero-overlay absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-36 md:px-8 md:pb-40">
        <div key={`${slide.key}-${active}`} className="max-w-2xl text-on-dark">
          <h1 className="type-heading rise-in">{slide.title}</h1>
          <p className="type-body rise-in mt-3 text-on-dark/90" style={{ animationDelay: "120ms" }}>
            {slide.line}
          </p>
          <div className="rise-in mt-7" style={{ animationDelay: "220ms" }}>
            {slide.external ? (
              <a
                href={slide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="type-label inline-flex h-12 items-center gap-2 rounded-full bg-on-dark px-6 text-foreground transition-opacity hover:opacity-90"
              >
                {slide.cta} <ArrowUpRight className="size-4" aria-hidden />
              </a>
            ) : (
              <Link
                to={slide.href as "/organics"}
                className="type-label inline-flex h-12 items-center rounded-full bg-on-dark px-6 text-foreground transition-opacity hover:opacity-90"
              >
                {slide.cta}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-3 px-5 pb-8 md:gap-6 md:px-8">
          {heroSlides.map((s, i) => (
            <button
              key={s.key}
              onClick={() => go(i)}
              aria-current={i === active}
              className={`type-label text-left transition-opacity ${i === active ? "text-on-dark" : "text-on-dark/60 hover:text-on-dark/90"}`}
            >
              <span className="relative mb-3 block h-px w-full overflow-hidden bg-on-dark/30">
                {i === active && <span key={cycle} className="progress-fill absolute inset-0 bg-on-dark" />}
              </span>
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{s.title.replace("Kinikh ", "")}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
