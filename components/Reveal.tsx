"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Motion tiers — each has its own distance, duration and easing (see globals.css):
 *   section  large blocks: slow, long travel, slight scale
 *   heading  titles: a touch faster, blur-to-sharp
 *   words    titles split with <SplitWords>: masked, word-by-word stagger
 *   text     supporting copy: short travel
 *   card     project cards: medium travel, sequenced by `delay`
 *   media    images/videos: mask opens + gentle zoom-out
 *   ui       small labels and buttons: quick and subtle
 */
export type RevealVariant = "section" | "heading" | "words" | "text" | "card" | "media" | "ui";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  variant?: RevealVariant;
  /** ms */
  delay?: number;
  id?: string;
};

// One shared observer for every reveal on the page.
let observer: IntersectionObserver | null = null;
function observe(el: Element) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.shown = "";
        observer!.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  observer.observe(el);
  return () => observer?.unobserve(el);
}

/** Reveals content once as it scrolls into view. Fully visible without JS or with reduced motion. */
export function Reveal({ children, as: Tag = "div", className = "", variant = "text", delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) return observe(ref.current);
  }, []);
  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant}
      className={className}
      style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}

type Segment = { text: string; className?: string };

/** Splits a heading into words that rise out of a mask one after another. Use inside <Reveal variant="words">. */
export function SplitWords({ segments }: { segments: (string | Segment)[] }) {
  let i = 0;
  return (
    <>
      {segments.map((seg, s) => {
        const { text, className } = typeof seg === "string" ? { text: seg, className: undefined } : seg;
        return (
          <span key={s} className={className}>
            {text.split(/(\s+)/).map((word, w) =>
              /^\s+$/.test(word) ? (
                word
              ) : word ? (
                <span key={w} className="word">
                  <span style={{ "--i": i++ } as CSSProperties}>{word}</span>
                </span>
              ) : null,
            )}
          </span>
        );
      })}
    </>
  );
}
