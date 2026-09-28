import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, visibleProjects, type MediaItem } from "@/data/projects";
import { formatDuration, getVimeoMeta } from "@/lib/vimeo";
import { VideoPlayer } from "@/components/VideoPlayer";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { ArrowIcon } from "@/components/icons";
import { enquiryHref, site } from "@/data/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const meta = project.visibility === "public" ? await getVimeoMeta(project.video) : null;
  const image = project.poster ?? meta?.thumbnail ?? undefined;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      ...(image ? { images: [{ url: image }] } : {}),
    },
  };
}

function Media({ item, title }: { item: MediaItem; title: string }) {
  return (
    <figure>
      {item.type === "video" ? (
        <VideoPlayer url={item.src} title={item.alt || title} poster={null} />
      ) : (
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] bg-surface">
          <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      )}
      {item.caption && <figcaption className="mt-3 text-sm text-mute">{item.caption}</figcaption>}
    </figure>
  );
}

function MediaSection({ label, items, title }: { label: string; items: MediaItem[]; title: string }) {
  return (
    <section className="container-x pt-28 sm:pt-40" aria-label={label}>
      <Reveal>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-gold">{label}</h2>
      </Reveal>
      <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
        {items.map((item) => (
          <Reveal key={item.src}>
            <Media item={item} title={title} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nda = project.visibility === "nda";
  const meta = await getVimeoMeta(project.video);
  const index = visibleProjects.indexOf(project);
  const related = [1, 2]
    .map((n) => visibleProjects[(index + n) % visibleProjects.length])
    .filter((p) => p.slug !== project.slug);
  const relatedMetas = await Promise.all(related.map((p) => getVimeoMeta(p.video)));

  const facts = [
    { label: "Client", value: project.concept ? "Concept project" : project.client },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year?.toString() },
    { label: "Tools", value: project.tools?.join(", ") },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <article>
      <header className="container-x pt-16 sm:pt-24">
        <div className="intro">
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-mute transition-colors hover:text-bone">
            <span aria-hidden="true">←</span> All work
          </Link>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-mute">
            {project.categories.join(" · ")}
            {project.concept && <span className="ml-3 text-gold">Concept</span>}
          </p>
          <h1 className="font-display mt-6 text-[clamp(2.5rem,6vw,5.5rem)]">{project.title}</h1>
        </div>
      </header>

      <section className="container-x mt-14 sm:mt-20" aria-label="Project video">
        {nda ? (
          <div className="grid aspect-video place-items-center rounded-[var(--radius)] border border-line bg-surface p-8 text-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Under NDA</p>
              <p className="mt-3 text-mute">
                This work isn&rsquo;t public yet.{" "}
                <a href={enquiryHref} className="text-bone underline underline-offset-4">
                  Ask to see it
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <VideoPlayer
            url={project.video}
            title={project.title}
            poster={project.poster ?? meta.thumbnail}
            aspect={meta.aspect}
            duration={formatDuration(meta.duration)}
            priority
          />
        )}
      </section>

      <section className="container-x pt-24 sm:pt-36" aria-label="Overview">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <Reveal as="dl" className="grid grid-cols-2 gap-x-6 gap-y-8 self-start lg:grid-cols-1">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold">{f.label}</dt>
                <dd className="mt-2 text-bone">{f.value}</dd>
              </div>
            ))}
          </Reveal>
          <div>
            <Reveal>
              <p className="font-display max-w-[28ch] text-[clamp(1.5rem,2.6vw,2.375rem)] !leading-[1.15]">{project.summary}</p>
            </Reveal>
            {project.highlights && project.highlights.length > 0 && (
              <Reveal as="ul" className="mt-12 border-t border-line">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-4 border-b border-line py-5 text-lg text-bone">
                    <span className="size-1.5 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {!nda && project.process && project.process.length > 0 && (
        <MediaSection label="Process" items={project.process} title={project.title} />
      )}
      {!nda && project.gallery && project.gallery.length > 0 && (
        <MediaSection label="Frames" items={project.gallery} title={project.title} />
      )}

      <section className="container-x py-32 sm:py-48" aria-labelledby="related-title">
        <Reveal className="mb-16 flex items-end justify-between gap-6">
          <h2 id="related-title" className="font-display text-[clamp(1.75rem,3.2vw,3rem)]">
            More work
          </h2>
          <Link href="/#work" className="flex items-center gap-2 text-sm text-mute transition-colors hover:text-bone">
            All projects <ArrowIcon />
          </Link>
        </Reveal>
        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16">
          {related.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProjectCard
                project={p}
                index={visibleProjects.indexOf(p)}
                poster={p.poster ?? relatedMetas[i].thumbnail}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </article>
  );
}
