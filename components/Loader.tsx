"use client";

import { useEffect } from "react";

const MIN_MS = 1300; // long enough to read, short enough not to wait
const MAX_MS = 2000; // never hold the visitor longer than this
const EXIT_MS = 800;

/** Brand loading screen: "cross — motion designer". Click or any key skips it. */
export function Loader() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("loading")) return;

    let done = false;
    const start = performance.now();
    const finish = () => {
      if (done) return;
      done = true;
      root.classList.add("loaded");
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}
      setTimeout(() => root.classList.remove("loading", "loaded"), EXIT_MS);
    };

    // Wait for fonts (so text doesn't jump) but respect the min/max window.
    const cap = setTimeout(finish, MAX_MS);
    document.fonts?.ready.then(() => {
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      setTimeout(finish, wait);
    });

    window.addEventListener("pointerdown", finish, { once: true });
    window.addEventListener("keydown", finish, { once: true });
    return () => {
      clearTimeout(cap);
      window.removeEventListener("pointerdown", finish);
      window.removeEventListener("keydown", finish);
    };
  }, []);

  return (
    <div className="loader" aria-hidden="true">
      <p className="loader-line">
        <span className="font-medium">cross</span>
        <span className="dash" />
        <span>motion designer</span>
      </p>
      <span className="loader-bar" />
    </div>
  );
}
