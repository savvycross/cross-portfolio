import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.shortTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamic = "force-static";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a09",
          color: "#f2f0ea",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#8d8b84" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#3cf08a" }} />
          {site.name} — {site.shortTitle}
        </div>
        <div style={{ display: "flex", fontSize: 84, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>
          Helping brands explain what they’re building.
        </div>
      </div>
    ),
    size,
  );
}
