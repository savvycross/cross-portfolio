"use client";

import { useEffect, useRef, useState } from "react";
import { vimeoEmbedSrc } from "@/lib/vimeo";
import { useInView, useReducedMotion } from "@/lib/hooks";
import { Poster } from "./Poster";
import { VimeoLoop } from "./VimeoLoop";
import { PlayIcon } from "./icons";

type Props = {
  loopUrl: string;
  reelUrl: string;
  poster: string | null;
  aspect: number;
  duration: string | null;
};

/**
 * The showreel frame: loops muted in place, and swaps to the full player
 * (with sound and controls) when the visitor hits play.
 */
export function HeroReel({ loopUrl, reelUrl, poster, aspect, duration }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [full, setFull] = useState(false);
  const fullSrc = vimeoEmbedSrc(reelUrl, "full");

  // Frame widens slightly as it scrolls toward the centre of the viewport.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
      el.style.setProperty("--reel-p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div ref={ref} className="reel-frame relative mx-auto overflow-hidden bg-surface" style={{ aspectRatio: aspect }}>
      {full && fullSrc ? (
        <iframe
          src={fullSrc}
          title="Cross Makele — Showreel"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Poster src={poster} alt="Still from the Cross Makele showreel" label="Showreel" priority />
          <VimeoLoop url={loopUrl} active={inView && !reduced} title="Showreel preview" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/60 to-transparent p-4 pt-16 sm:p-7">
            <button
              type="button"
              onClick={() => setFull(true)}
              className="group flex cursor-pointer items-center gap-3 rounded-full border border-white/20 bg-black/55 py-2 pl-2 pr-5 text-sm text-white backdrop-blur-md transition-colors hover:border-white/50"
            >
              <span className="grid size-9 place-items-center rounded-full bg-volt text-on-volt transition-transform duration-500 group-hover:scale-110">
                <PlayIcon />
              </span>
              Play reel with sound
            </button>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-white/70 sm:block">
              Showreel{duration ? ` — ${duration}` : ""}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
