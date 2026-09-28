"use client";

import { useEffect, useRef } from "react";

/**
 * A small label that trails the (still visible) cursor over anything with
 * `data-cursor="Label"`. Desktop pointers only; the rAF loop only runs while it moves.
 */
export function CursorLabel() {
  const el = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const node = el.current!;
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let shown = false;

    const loop = () => {
      const k = smooth ? 0.2 : 1;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      node.style.transform = `translate3d(${pos.x + 18}px, ${pos.y + 18}px, 0)`;
      raf = Math.abs(target.x - pos.x) + Math.abs(target.y - pos.y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const hit = (e.target as Element | null)?.closest?.("[data-cursor]");
      const label = hit?.getAttribute("data-cursor");
      if (label) {
        if (text.current && text.current.textContent !== label) text.current.textContent = label;
        if (!shown) {
          // Jump to the pointer on entry so it doesn't fly in from afar.
          pos.x = target.x;
          pos.y = target.y;
          node.dataset.on = "";
          shown = true;
        }
      } else if (shown) {
        delete node.dataset.on;
        shown = false;
      }
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => {
      delete node.dataset.on;
      shown = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={el} className="cursor-label" aria-hidden="true">
      <span className="flex items-center gap-2 rounded-full bg-bone px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink shadow-lg shadow-black/20">
        <span className="size-1.5 rounded-full bg-volt" />
        <span ref={text}>View project</span>
      </span>
    </div>
  );
}
