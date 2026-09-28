"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { useCanHover, useInView, useReducedMotion } from "@/lib/hooks";
import { Poster } from "./Poster";
import { VimeoLoop } from "./VimeoLoop";
import { Reveal } from "./Reveal";
import { ArrowIcon } from "./icons";

type Props = {
  project: Project;
  index: number;
  poster: string | null;
  featured?: boolean;
};

/**
 * Desktop: hovering plays the preview, eases the frame in, slides the title
 * and reveals role/tools on the frame. Touch: the preview plays while the card
 * sits in the middle of the screen, and all details are always visible.
 */
export function ProjectCard({ project, index, poster, featured }: Props) {
  const media = useRef<HTMLDivElement>(null);
  const canHover = useCanHover();
  const reduced = useReducedMotion();
  const centered = useInView(media, 0, "-35% 0px -35% 0px");
  const [hovered, setHovered] = useState(false);
  const nda = project.visibility === "nda";
  const active = !nda && !reduced && (canHover ? hovered : centered);
  const meta = [project.role, project.tools?.join(", ")].filter(Boolean).join(" — ");

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      <Reveal variant="media">
        <div
          ref={media}
          data-cursor={nda ? undefined : "View project"}
          className={`relative overflow-hidden rounded-[var(--radius)] bg-surface group-focus-visible:ring-2 group-focus-visible:ring-volt ${
            featured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[16/10]"
          }`}
        >
          <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[var(--ease-out)] group-hover:scale-[1.03]">
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

          {/* Details that surface on hover (desktop only). */}
          {canHover && meta && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-5 pt-14 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <p className="translate-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/85 transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-y-0">
                {meta}
              </p>
            </div>
          )}
        </div>
      </Reveal>

      <Reveal variant="text" delay={120} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-mute">{String(index + 1).padStart(2, "0")}</span>
            <h3
              className={`font-display flex items-center gap-2 tracking-tight text-bone transition-[color,translate] duration-500 ease-[var(--ease-out)] group-hover:translate-x-1 group-hover:text-volt ${
                featured ? "text-3xl sm:text-4xl" : "text-2xl"
              }`}
            >
              {project.title}
              <span className="-translate-x-2 opacity-0 transition-[opacity,translate] duration-500 ease-[var(--ease-out)] group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowIcon className="size-4" />
              </span>
            </h3>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">{project.summary}</p>
        </div>
        <div className="flex shrink-0 gap-3 font-mono text-[11px] uppercase leading-5 tracking-[0.16em] text-mute sm:block sm:text-right">
          <div>{project.categories.join(" · ")}</div>
          <div className="text-bone/70">{project.concept ? "Concept" : project.year ?? ""}</div>
        </div>
      </Reveal>
    </Link>
  );
}
