"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";

/* Scroll distance (in viewport heights) given to each card takeover. */
const SEGMENT_VH = 0.8;

/**
 * Pins the card stage (clipped to the card size) and lets each card slide up over the previous one,
 * strictly one at a time: the scroll range is split into non-overlapping segments, one per incoming card.
 */
export function StackCards({ children }: { children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const items = Children.toArray(children);
  const count = items.length;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const outer = outerRef.current;
      const stage = stageRef.current;
      if (!outer || !stage) return;
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
      const total = outer.offsetHeight - stage.offsetHeight;
      const scrolled = Math.min(Math.max(stickyTop - outer.getBoundingClientRect().top, 0), total);
      const overall = total > 0 ? (scrolled / total) * (count - 1) : 0;
      cardRefs.current.forEach((card, i) => {
        if (!card || i === 0) return;
        const p = Math.min(Math.max(overall - (i - 1), 0), 1);
        card.style.transform = `translate3d(0, ${(1 - p) * 100}%, 0)`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  return (
    <div ref={outerRef}>
      <div ref={stageRef} className="sticky top-20 overflow-hidden rounded-3xl md:top-24">
        <ol className="grid w-full">
          {items.map((child, i) => (
            <li
              key={i}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              style={{ zIndex: i + 1, transform: i ? "translate3d(0, 100%, 0)" : undefined }}
              className="overflow-hidden rounded-3xl bg-card [grid-area:1/1] will-change-transform"
            >
              {child}
            </li>
          ))}
        </ol>
      </div>
      <div aria-hidden style={{ height: `${(count - 1) * SEGMENT_VH * 100}svh` }} />
    </div>
  );
}
