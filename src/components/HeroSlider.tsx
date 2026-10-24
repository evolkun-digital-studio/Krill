"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { HERO_INTERVAL_MS, heroSlides } from "@/lib/site";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

// A slide counts as visited once it is active or next in line, so the next slide's video preloads.
const withNext = (set: Set<number>, i: number) => new Set(set).add(i).add((i + 1) % heroSlides.length);

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0); // restarts progress bar + timer
  const reduced = useSyncExternalStore(subscribeReducedMotion, () => window.matchMedia(REDUCED_MOTION).matches, () => false);
  const [visited, setVisited] = useState<Set<number>>(() => withNext(new Set(), 0));
  const timer = useRef<number | null>(null);

  const go = useCallback((i: number) => {
    setActive(i);
    setCycle((c) => c + 1);
    setVisited((v) => withNext(v, i));
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
                poster={s.poster.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                key={on ? `${s.key}-${cycle}` : s.key}
                src={s.poster}
                alt={`${s.title}: ${s.line}`}
                fill
                sizes="100vw"
                className={`object-cover ${on && !reduced ? "ken-burns" : ""}`}
                preload={i === 0}
              />
            )}
          </div>
        );
      })}
      <div className="hero-overlay absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-6 md:px-8  md:pb-10">
        <div key={`${slide.key}-${active}`} className="max-w-2xl text-on-dark lg:-ml-5">
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
                href={slide.href}
                className="type-label inline-flex h-12 items-center rounded-full bg-on-dark px-6 text-foreground transition-opacity hover:opacity-90"
              >
                {slide.cta}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* <div className="absolute inset-x-0 bottom-0 z-10">
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
      </div> */}
    </section>
  );
}
