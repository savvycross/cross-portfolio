import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { visibleProjects } from "@/data/projects";
import { formatDuration, getVimeoMeta } from "@/lib/vimeo";
import { HeroReel } from "@/components/HeroReel";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { ArrowIcon } from "@/components/icons";

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
      <span className="text-gold">{index}</span>
      <span className="h-px w-8 bg-line" aria-hidden="true" />
      {children}
    </p>
  );
}

export default async function Home() {
  const [reel, ...metas] = await Promise.all([
    getVimeoMeta(site.showreel),
    ...visibleProjects.map((p) => getVimeoMeta(p.video)),
  ]);
  const [featured, ...rest] = visibleProjects;
  const clients = visibleProjects.filter((p) => p.client && !p.concept && p.visibility === "public");

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-36 sm:pt-44" aria-labelledby="hero-title">
        <div className="intro">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mute">
            <span className="text-bone">{site.name}</span>
            <span className="h-px w-6 bg-line" aria-hidden="true" />
            <span>{site.shortTitle}</span>
            <span className="flex items-center gap-2">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inset-0 animate-ping rounded-full bg-volt/60 motion-reduce:hidden" />
                <span className="relative size-2 rounded-full bg-volt" />
              </span>
              Available for work
            </span>
          </p>
          <h1
            id="hero-title"
            className="font-display mt-8 max-w-[14ch] text-[clamp(2.75rem,8.4vw,8.5rem)] text-bone"
          >
            Helping brands explain what they&rsquo;re building<span className="text-volt">.</span>
          </h1>
          <div className="mt-10 flex flex-col gap-8 sm:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-mute sm:text-lg">{site.positioning}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#work"
                className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-volt"
              >
                View work
              </Link>
              <a
                href={`mailto:${site.email}`}
                className="rounded-full border border-line px-6 py-3 text-sm text-bone transition-colors hover:border-bone/40"
              >
                Start a project
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section id="reel" aria-label="Showreel" className="container-x mt-14 sm:mt-20">
        <HeroReel
          loopUrl={site.openingAnimation ?? site.showreel}
          reelUrl={site.showreel}
          poster={site.showreelPoster ?? reel.thumbnail}
          aspect={reel.aspect}
          duration={formatDuration(reel.duration)}
        />
      </section>

      {/* Selected work */}
      <section id="work" className="container-x pt-32 sm:pt-44" aria-labelledby="work-title">
        <Reveal className="mb-12 flex items-end justify-between gap-6 sm:mb-16">
          <div>
            <SectionLabel index="01">Selected work</SectionLabel>
            <h2 id="work-title" className="font-display mt-6 text-[clamp(2.25rem,5vw,4.5rem)]">
              Products, explained in motion.
            </h2>
          </div>
          <span className="hidden font-mono text-sm text-mute sm:block">({String(visibleProjects.length).padStart(2, "0")})</span>
        </Reveal>

        {featured && (
          <Reveal>
            <ProjectCard project={featured} index={0} poster={featured.poster ?? metas[0].thumbnail} featured />
          </Reveal>
        )}
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-10 lg:gap-y-24">
          {rest.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 2) * 90}
              // An odd project out closes the grid at full width instead of sitting alone.
              className={rest.length % 2 === 1 && i === rest.length - 1 ? "md:col-span-2" : ""}
            >
              <ProjectCard
                project={p}
                index={i + 1}
                poster={p.poster ?? metas[i + 1].thumbnail}
                featured={rest.length % 2 === 1 && i === rest.length - 1}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container-x pt-32 sm:pt-44" aria-labelledby="services-title">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionLabel index="02">What I do</SectionLabel>
          <h2 id="services-title" className="font-display text-[clamp(2rem,4.2vw,3.75rem)]">
            I help brands make complex products and ideas{" "}
            <span className="text-mute">easier to understand through motion.</span>
          </h2>
        </Reveal>

        <ul className="mt-16 border-t border-line sm:mt-24">
          {site.services.map((s, i) => (
            <li key={s.outcome} className="service-row group border-b border-line">
              <Reveal className="grid gap-4 py-8 sm:py-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-[clamp(1.75rem,3.4vw,3rem)] transition-colors duration-500 group-hover:text-volt">
                    {s.outcome}
                  </h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr] sm:gap-10 lg:pt-2">
                  <p className="leading-relaxed text-mute">{s.body}</p>
                  <ul className="service-items space-y-1 font-mono text-xs uppercase leading-6 tracking-[0.14em] text-mute">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* About */}
      <section id="about" className="container-x pt-32 sm:pt-44" aria-labelledby="about-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <SectionLabel index="03">About</SectionLabel>
            <div className="relative mt-8 aspect-[4/5] max-w-md overflow-hidden rounded-[var(--radius)] bg-surface">
              <Image
                src={site.portrait.src}
                alt={site.portrait.alt}
                fill
                sizes="(min-width: 1024px) 28rem, 100vw"
                className="object-cover object-[50%_20%] grayscale-[35%] transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
          </Reveal>

          <div className="lg:pt-14">
            <Reveal>
              <h2 id="about-title" className="font-display text-[clamp(2rem,4.2vw,3.75rem)]">
                {site.about[0]}
              </h2>
            </Reveal>
            <Reveal className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-mute">
              {site.about.slice(1).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal as="dl" className="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Based in</dt>
                <dd className="mt-2 text-bone">{site.location}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Availability</dt>
                <dd className="mt-2 text-bone">{site.availability}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Tools</dt>
                <dd className="mt-2 text-bone">{site.tools.primary.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Workflow</dt>
                <dd className="mt-2 text-bone">{site.tools.workflow.join(", ")}</dd>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Clients */}
      {clients.length > 0 && (
        <section id="clients" className="container-x pt-32 sm:pt-44" aria-labelledby="clients-title">
          <Reveal className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <SectionLabel index="04">Clients</SectionLabel>
            <h2 id="clients-title" className="font-display text-[clamp(2rem,4.2vw,3.75rem)]">
              Brands in the work.
            </h2>
          </Reveal>
          <ul className="mt-16 border-t border-line sm:mt-20">
            {clients.map((p) => (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/work/${p.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-4 py-5 sm:grid-cols-[1fr_1.4fr_auto] sm:py-6 lg:grid-cols-[1fr_1fr_0.4fr_auto] lg:gap-16"
                >
                  <span className="font-display text-2xl transition-colors group-hover:text-volt sm:text-3xl">{p.client}</span>
                  <span className="hidden font-mono text-xs uppercase tracking-[0.16em] text-mute sm:block">
                    {p.categories.join(" · ")}
                  </span>
                  <span className="hidden font-mono text-xs text-mute lg:block">{p.year ?? ""}</span>
                  <span className="text-mute transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-volt">
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="container-x py-32 sm:py-44" aria-labelledby="contact-title">
        <Reveal>
          <SectionLabel index="05">Contact</SectionLabel>
          <h2 id="contact-title" className="font-display mt-8 max-w-[16ch] text-[clamp(2.75rem,8vw,8rem)]">
            Building something? Let&rsquo;s explain it<span className="text-volt">.</span>
          </h2>
        </Reveal>
        <Reveal className="mt-14 flex flex-col gap-10 border-t border-line pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <a
              href={`mailto:${site.email}`}
              className="break-all text-[clamp(1.25rem,3.2vw,2.5rem)] tracking-tight text-bone underline decoration-line decoration-1 underline-offset-[0.25em] transition-colors hover:text-volt hover:decoration-volt"
            >
              {site.email}
            </a>
            <p className="mt-4 text-mute">{site.availability}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyEmail email={site.email} />
            {site.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line px-5 py-3 text-sm text-bone transition-colors hover:border-bone/40"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
