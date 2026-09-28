"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/hooks";

const HOLD_MS = 2800; // time each phrase stays readable
const STEP_MS = HOLD_MS + 700; // plus the exit/enter overlap

type Props = {
  label: string;
  items: string[];
  className?: string;
  size?: "lg" | "md";
};

/**
 * "AVAILABLE TO TAKE ON" stays put; the phrase below rolls vertically:
 * the next one drops in from above as the current one slides out below.
 * Pauses off-screen and in background tabs. Static list with reduced motion.
 */
export function AvailabilityTicker({ label, items, className = "", size = "lg" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const [{ index, prev }, setState] = useState<{ index: number; prev: number | null }>({ index: 0, prev: null });

  useEffect(() => {
    if (reduced || !inView) return;
    const tick = () => {
      if (document.hidden) return;
      setState(({ index: i }) => ({ index: (i + 1) % items.length, prev: i }));
    };
    const id = setInterval(tick, STEP_MS);
    return () => clearInterval(id);
  }, [reduced, inView, items.length]);

  const sentence = `${label.charAt(0)}${label.slice(1).toLowerCase()}: ${items.join(", ")}.`;
  const text = size === "lg" ? "text-[clamp(1.5rem,2.6vw,2.25rem)]" : "text-[clamp(1.25rem,2vw,1.625rem)]";

  return (
    <div ref={ref} className={className}>
      <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-gold">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inset-0 animate-ping rounded-full bg-volt/50 motion-reduce:hidden" />
          <span className="relative size-2 rounded-full bg-volt" />
        </span>
        {label}
      </p>
      <p className="sr-only">{sentence}</p>
      {reduced ? (
        <p className={`font-display mt-4 text-bone ${text}`} aria-hidden="true">
          {items.join(" · ")}
        </p>
      ) : (
        <p className={`ticker font-display mt-4 text-bone ${text}`} aria-hidden="true">
          {items.map((item, i) => (
            <span key={item} data-state={i === index ? "in" : i === prev ? "out" : undefined}>
              {item}
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
