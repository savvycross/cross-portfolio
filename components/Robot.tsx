"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Shown in a small speech bubble while waving. */
  greeting?: string;
  className?: string;
};

/**
 * A small original companion — a screen-faced robot in the site's palette.
 * - idles: gentle float, blinks, antenna pulse
 * - eyes follow the cursor (desktop)
 * - waves when its section scrolls into view, now and then while visible,
 *   and when clicked
 * Everything pauses off-screen; reduced motion gets a still robot.
 * Decorative only: hidden from assistive tech and never blocks content.
 */
export function Robot({ greeting = "Hey there!", className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
    let greeted = false;
    let waveTimer = 0;
    let idleTimer = 0;
    let raf = 0;

    const wave = () => {
      if (reduced) return;
      el.removeAttribute("data-waving");
      void el.offsetWidth; // restart the animation
      el.setAttribute("data-waving", "");
      clearTimeout(waveTimer);
      waveTimer = window.setTimeout(() => el.removeAttribute("data-waving"), 2200);
    };

    const scheduleIdleWave = () => {
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        wave();
        scheduleIdleWave();
      }, 11000 + Math.random() * 7000);
    };

    const onPointer = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.35;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 300) * 4; // up to 4px of eye travel
        el.style.setProperty("--lx", `${((dx / d) * k).toFixed(2)}px`);
        el.style.setProperty("--ly", `${((dy / d) * k).toFixed(2)}px`);
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-active", "");
          if (finePointer && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });
          if (!greeted && entry.intersectionRatio > 0.5) {
            greeted = true;
            window.setTimeout(wave, 500);
          }
          if (!reduced) scheduleIdleWave();
        } else {
          el.removeAttribute("data-active");
          window.removeEventListener("pointermove", onPointer);
          clearTimeout(idleTimer);
        }
      },
      { threshold: [0, 0.5] },
    );
    io.observe(el);
    el.addEventListener("click", wave);

    return () => {
      io.disconnect();
      el.removeEventListener("click", wave);
      window.removeEventListener("pointermove", onPointer);
      clearTimeout(waveTimer);
      clearTimeout(idleTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={root} className={`robot relative select-none ${className}`} aria-hidden="true">
      <span className="bubble absolute -top-2 right-[70%] whitespace-nowrap rounded-full rounded-br-sm border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
        {greeting}
      </span>
      <svg viewBox="0 0 120 160" className="h-auto w-full cursor-pointer">
        <ellipse className="shadow" cx="60" cy="150" rx="30" ry="4" fill="currentColor" opacity="0.18" />
        <g className="bob">
          {/* antenna */}
          <line x1="60" y1="24" x2="60" y2="11" stroke="var(--line)" strokeWidth="3" strokeLinecap="round" />
          <circle className="antenna-tip" cx="60" cy="8" r="4.5" fill="var(--gold)" />
          {/* head */}
          <rect x="18" y="24" width="84" height="62" rx="20" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
          <rect x="28" y="34" width="64" height="42" rx="12" fill="#0a0a09" />
          {/* face */}
          <g className="look">
            <g className="eyes">
              <rect x="44" y="47" width="9" height="13" rx="4.5" fill="var(--volt)" />
              <rect x="67" y="47" width="9" height="13" rx="4.5" fill="var(--volt)" />
            </g>
            <path className="smile" d="M53 66 q7 5 14 0" fill="none" stroke="var(--volt)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* ears */}
          <rect x="12" y="46" width="6" height="18" rx="3" fill="var(--line)" />
          <rect x="102" y="46" width="6" height="18" rx="3" fill="var(--line)" />
          {/* neck + body */}
          <rect x="52" y="86" width="16" height="8" rx="3" fill="var(--line)" />
          <rect x="32" y="93" width="56" height="42" rx="16" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
          <circle cx="60" cy="112" r="6" fill="none" stroke="var(--gold)" strokeWidth="2" />
          <circle cx="60" cy="112" r="2" fill="var(--volt)" />
          {/* left arm (resting) */}
          <rect x="22" y="98" width="10" height="28" rx="5" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
          {/* right arm (waves) — pivots at the shoulder */}
          <g className="arm">
            <rect x="88" y="98" width="10" height="28" rx="5" fill="var(--surface)" stroke="var(--line)" strokeWidth="2" />
            <circle cx="93" cy="128" r="5" fill="var(--gold)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
