"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { useCanHover, useInView, useReducedMotion } from "@/lib/hooks";
import { Poster } from "./Poster";
import { VimeoLoop } from "./VimeoLoop";

type Props = {
  project: Project;
  index: number;
  poster: string | null;
  featured?: boolean;
};

export function ProjectCard({ project, index, poster, featured }: Props) {
  const media = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const reduced = useReducedMotion();
  // On touch screens, play when the card sits in the middle band of the viewport.
  const centered = useInView(media, 0, "-35% 0px -35% 0px");
  const [hovered, setHovered] = useState(false);
  const nda = project.visibility === "nda";
  const active = !nda && !reduced && (canHover ? hovered : centered);

  function onMove(e: React.MouseEvent) {
    const r = e.currentTarget.getBoundingClientRect();
    media.current?.style.setProperty("--cx", `${e.clientX - r.left}px`);
    media.current?.style.setProperty("--cy", `${e.clientY - r.top}px`);
  }

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <div
        ref={media}
        onMouseMove={canHover ? onMove : undefined}
        className={`relative overflow-hidden rounded-[var(--radius)] bg-surface ring-volt/0 transition-[box-shadow] duration-500 group-focus-visible:ring-2 group-focus-visible:ring-volt ${
          featured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[16/10]"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[var(--ease)] group-hover:scale-[1.025]">
          <Poster
            src={nda ? null : poster}
            alt=""
            label={project.title}
            sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          />
          <VimeoLoop url={project.preview ?? project.video} active={active} title={`${project.title} preview`} />
        </div>
        {nda && (
          <span className="absolute left-4 top-4 rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-mute">
            Under NDA
          </span>
        )}
        {canHover && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 rounded-full bg-bone px-4 py-2 text-xs font-medium text-ink opacity-0 transition-[opacity,scale] duration-300 group-hover:opacity-100"
            style={{ translate: "calc(var(--cx, 50%) - 50%) calc(var(--cy, 50%) - 50%)" }}
          >
            View project
          </span>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</span>
            <h3 className={`font-display tracking-tight text-bone transition-colors group-hover:text-volt ${featured ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
              {project.title}
            </h3>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">{project.summary}</p>
        </div>
        <div className="flex shrink-0 gap-3 font-mono text-[11px] sm:block sm:text-right uppercase leading-5 tracking-[0.16em] text-mute">
          <div>{project.categories.join(" · ")}</div>
          <div className="text-bone/70">{project.concept ? "Concept" : project.year ?? ""}</div>
        </div>
      </div>
    </Link>
  );
}
