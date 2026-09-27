import Image from "next/image";

type Props = {
  src: string | null;
  alt: string;
  label: string;
  priority?: boolean;
  sizes?: string;
};

/** Video poster. When no thumbnail is available it falls back to a quiet typographic frame. */
export function Poster({ src, alt, label, priority, sizes = "100vw" }: Props) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 grid place-items-center bg-surface" role="img" aria-label={alt}>
      <span className="font-display text-[clamp(1.5rem,5vw,4rem)] tracking-tight text-mute/60">{label}</span>
    </div>
  );
}
