"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** Horizontal snap row with previous/next buttons, for edge-to-edge card carousels. */
export function ScrollRail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  function go(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: calm ? "auto" : "smooth" });
  }

  const btn =
    "inline-flex size-11 items-center justify-center rounded-full bg-honey-ink/10 text-honey-ink transition-colors hover:bg-honey-ink/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-honey-ink disabled:opacity-30 disabled:hover:bg-honey-ink/10";

  return (
    <>
      <ol
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pl-[max(1.25rem,calc((100vw-80rem)/2+2rem))] pr-5 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-honey-ink [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ol>
      <div className="mx-auto mt-8 flex max-w-7xl justify-end gap-2 px-5 md:px-8">
        <button type="button" aria-label="Previous" onClick={() => go(-1)} disabled={edge.start} className={btn}>
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button type="button" aria-label="Next" onClick={() => go(1)} disabled={edge.end} className={btn}>
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </>
  );
}
