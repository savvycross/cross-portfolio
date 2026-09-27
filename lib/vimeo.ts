export type VimeoMeta = {
  id: string;
  thumbnail: string | null;
  /** width / height */
  aspect: number;
  duration: number | null;
};

export function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

/** Unlisted Vimeo links carry a privacy hash (vimeo.com/ID/HASH or ?h=HASH). */
function vimeoHash(url: string): string | null {
  const path = url.match(/vimeo\.com\/(?:video\/)?\d+\/([0-9a-f]+)/i);
  if (path) return path[1];
  const q = url.match(/[?&]h=([0-9a-f]+)/i);
  return q ? q[1] : null;
}

type PlayerMode = "background" | "full";

export function vimeoEmbedSrc(url: string, mode: PlayerMode) {
  const id = vimeoId(url);
  if (!id) return null;
  const params = new URLSearchParams({ dnt: "1", playsinline: "1" });
  const h = vimeoHash(url);
  if (h) params.set("h", h);
  if (mode === "background") {
    // Chromeless, muted, looping autoplay.
    params.set("background", "1");
  } else {
    params.set("autoplay", "1");
    params.set("title", "0");
    params.set("byline", "0");
    params.set("portrait", "0");
    params.set("color", "3cf08a");
  }
  return `https://player.vimeo.com/video/${id}?${params}`;
}

/**
 * Fetches thumbnail + aspect ratio from Vimeo's public oEmbed endpoint.
 * Cached for a day. Never throws — on failure the UI falls back to a typographic poster.
 */
export async function getVimeoMeta(url: string): Promise<VimeoMeta> {
  const id = vimeoId(url) ?? "";
  const fallback: VimeoMeta = { id, thumbnail: null, aspect: 16 / 9, duration: null };
  if (!id) return fallback;
  try {
    const clean = url.split("?")[0];
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(clean)}&width=1920`,
      { next: { revalidate: 86400 }, signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return fallback;
    const data = (await res.json()) as {
      thumbnail_url?: string;
      width?: number;
      height?: number;
      duration?: number;
    };
    return {
      id,
      thumbnail: data.thumbnail_url ?? null,
      aspect: data.width && data.height ? data.width / data.height : 16 / 9,
      duration: data.duration ?? null,
    };
  } catch {
    return fallback;
  }
}

export function formatDuration(s: number | null) {
  if (!s) return null;
  const m = Math.floor(s / 60);
  const r = Math.round(s % 60);
  return `${m}:${String(r).padStart(2, "0")}`;
}
