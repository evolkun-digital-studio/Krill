"use client";

import { useEffect, useRef } from "react";

/**
 * A statement that fills in word by word as it scrolls into view.
 * The lead sentence ends fully lit; the follow-on sentence stays slightly softer.
 * Everything is fully readable without JavaScript or with reduced motion.
 */
export function ScrollText({ lead, rest, className = "" }: { lead: string; rest: string; className?: string }) {
  const box = useRef<HTMLParagraphElement>(null);
  const words = [...lead.split(" ").map((w) => ({ w, max: 1 })), ...rest.split(" ").map((w) => ({ w, max: 0.6 }))];

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const spans = Array.from(el.querySelectorAll<HTMLElement>("[data-w]"));
    let frame = 0;

    const paint = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.45)));
      const n = spans.length;
      spans.forEach((s, i) => {
        const max = Number(s.dataset["max"]);
        const lit = Math.min(1, Math.max(0, p * (n + 6) - i));
        s.style.opacity = String(0.22 + (max - 0.22) * lit);
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={box} className={className}>
      {words.map((x, i) => (
        <span key={i} data-w data-max={x.max} className="transition-opacity duration-150">
          {x.w}{" "}
        </span>
      ))}
    </p>
  );
}
