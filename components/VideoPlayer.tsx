"use client";

import { useState } from "react";
import { vimeoEmbedSrc } from "@/lib/vimeo";
import { Poster } from "./Poster";
import { PlayIcon } from "./icons";

type Props = {
  url: string;
  title: string;
  poster: string | null;
  aspect?: number;
  duration?: string | null;
  priority?: boolean;
};

/**
 * Full Vimeo player (sound, play/pause, scrubbing, fullscreen) that only loads
 * when the visitor asks for it. Until then it's a poster and a play button.
 */
export function VideoPlayer({ url, title, poster, aspect = 16 / 9, duration, priority }: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = vimeoEmbedSrc(url, "full");

  return (
    <div className="relative w-full overflow-hidden rounded-[var(--radius)] bg-surface" style={{ aspectRatio: aspect }}>
      {loaded && src ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer"
          aria-label={`Play ${title}`}
        >
          <Poster src={poster} alt="" label={title} priority={priority} />
          <span className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/25" />
          <span className="absolute bottom-5 left-5 flex items-center gap-3 rounded-full border border-white/20 bg-black/55 py-2 pl-2 pr-4 text-sm text-white backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.03] sm:bottom-7 sm:left-7">
            <span className="grid size-8 place-items-center rounded-full bg-volt text-on-volt">
              <PlayIcon />
            </span>
            Play {duration ? <span className="font-mono text-xs text-white/70">{duration}</span> : null}
          </span>
        </button>
      )}
    </div>
  );
}
