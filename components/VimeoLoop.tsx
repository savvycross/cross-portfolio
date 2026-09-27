"use client";

import { useEffect, useRef, useState } from "react";
import { vimeoEmbedSrc } from "@/lib/vimeo";

type Props = {
  url: string;
  /** Whether the loop should be playing right now. */
  active: boolean;
  title: string;
};

/**
 * Chromeless, muted, looping Vimeo layer that sits on top of a poster.
 * - The iframe is only mounted the first time `active` becomes true (lazy).
 * - It fades in only once Vimeo reports that playback actually started,
 *   so a blocked autoplay leaves the poster visible instead of a broken player.
 * - After that it is paused/resumed via postMessage instead of reloading.
 */
export function VimeoLoop({ url, active, title }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const src = vimeoEmbedSrc(url, "background");

  useEffect(() => {
    if (active) setMounted(true);
  }, [active]);

  useEffect(() => {
    if (!mounted) return;
    const onMessage = (e: MessageEvent) => {
      if (!e.origin.includes("vimeo.com") || e.source !== frame.current?.contentWindow) return;
      let data: { event?: string };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === "ready") {
        setReady(true);
        post("addEventListener", "playing");
        post("addEventListener", "pause");
      }
      if (data.event === "playing") setPlaying(true);
      if (data.event === "pause") setPlaying(false);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [mounted]);

  useEffect(() => {
    if (ready) post(active ? "play" : "pause");
  }, [active, ready]);

  function post(method: string, value?: string) {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ method, value }), "https://player.vimeo.com");
  }

  if (!mounted || !src) return null;

  return (
    <iframe
      ref={frame}
      src={src}
      title={title}
      tabIndex={-1}
      aria-hidden="true"
      allow="autoplay; fullscreen; picture-in-picture"
      className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-700"
      style={{ opacity: playing && active ? 1 : 0 }}
    />
  );
}
