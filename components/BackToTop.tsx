"use client";

import { useEffect, useState } from "react";

/** Floating button that appears after scrolling down and takes you back to the top. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid size-12 cursor-pointer place-items-center rounded-full border border-line bg-ink/85 text-bone shadow-lg shadow-black/20 backdrop-blur-md transition-[opacity,translate,border-color] duration-300 hover:border-volt hover:text-volt sm:bottom-8 sm:right-8 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
