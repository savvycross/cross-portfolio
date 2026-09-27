"use client";

import { useEffect, useState, type RefObject } from "react";

function useMedia(query: string, initial = false) {
  const [match, setMatch] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
export const useCanHover = () => useMedia("(hover: hover) and (pointer: fine)");

/** True while at least `threshold` of the element is visible. */
export function useInView(ref: RefObject<Element | null>, threshold = 0, rootMargin = "0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold, rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold, rootMargin]);
  return inView;
}
