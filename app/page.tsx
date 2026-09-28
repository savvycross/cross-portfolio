import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { visibleProjects } from "@/data/projects";
import { formatDuration, getVimeoMeta } from "@/lib/vimeo";
import { HeroReel } from "@/components/HeroReel";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal, SplitWords } from "@/components/Reveal";
import { CopyEmail } from "@/components/CopyEmail";
import { EnquiryLink } from "@/components/Enquiry";
import { AvailabilityTicker } from "@/components/AvailabilityTicker";
import { Robot } from "@/components/Robot";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-mute">
      <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
      {children}
    </p>
  );
}

const h2 = "font-display text-[clamp(1.75rem,3.2vw,3rem)]";

export default async function Home() {
  const [reel, ...metas] = await Promise.all([
    getVimeoMeta(site.showreel),
    ...visibleProjects.map((p) => getVimeoMeta(p.video)),
  ]);
  const [featured, ...rest] = visibleProjects;

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-20 sm:pt-32" aria-labelledby="hero-title">
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
            className="font-display mt-10 max-w-[18ch] text-[clamp(2.25rem,5.4vw,5.25rem)] text-bone"
          >
            Helping brands explain what they&rsquo;re building<span className="text-volt">.</span>
          </h1>
          <div className="mt-12 flex flex-col gap-10 sm:mt-16 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-base leading-relaxed text-mute sm:text-lg">{site.positioning}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#work"
                className="rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-volt hover:text-on-volt"
              >
                View work
              </Link>
              <EnquiryLink className="rounded-full border border-line px-6 py-3 text-sm text-bone transition-colors hover:border-bone/40">
                Start a project
              </EnquiryLink>
            </div>
          </div>
        </div>
      </section>

      {/* Showreel */}
      <section id="reel" aria-label="Showreel" className="container-x mt-20 sm:mt-28">
        <HeroReel
          loopUrl={site.openingAnimation ?? site.showreel}
          reelUrl={site.showreel}
          poster={site.showreelPoster ?? reel.thumbnail}
          aspect={reel.aspect}
          duration={formatDuration(reel.duration)}
        />
      </section>

      {/* About */}
      <section id="about" className="container-x section" aria-labelledby="about-title">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div>
            <Reveal variant="ui">
              <SectionLabel>About</SectionLabel>
            </Reveal>
            <Reveal variant="media" className="mt-10 max-w-lg">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] bg-surface">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 32rem, 100vw"
                  quality={95}
                  placeholder="blur"
                  className="object-cover object-[50%_20%]"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:pt-20">
            <Reveal as="h2" variant="words" id="about-title" className={`${h2} max-w-[24ch]`}>
              <SplitWords segments={[site.about[0]]} />
            </Reveal>
            <div className="mt-12 max-w-xl space-y-6 text-lg leading-relaxed text-mute">
              {site.about.slice(1).map((p, i) => (
                <Reveal as="p" key={p} delay={150 + i * 120}>
                  {p}
                </Reveal>
              ))}
            </div>

            <Reveal variant="section" className="mt-16 border-t border-line pt-12">
              <AvailabilityTicker label={site.availabilityLabel} items={site.opportunities} />
            </Reveal>

            <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
              <Reveal variant="ui">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Tools</dt>
                <dd className="mt-2 text-bone">{site.tools.primary.join(", ")}</dd>
              </Reveal>
              <Reveal variant="ui" delay={100}>
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Workflow</dt>
                <dd className="mt-2 text-bone">{site.tools.workflow.join(", ")}</dd>
              </Reveal>
            </dl>
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section id="work" className="container-x section" aria-labelledby="work-title">
        <div className="mb-16 flex items-end justify-between gap-6 sm:mb-24">
          <div>
            <Reveal variant="ui">
              <SectionLabel>Selected work</SectionLabel>
            </Reveal>
            <Reveal as="h2" variant="words" id="work-title" className={`${h2} mt-6`}>
              <SplitWords segments={["Products, explained in motion."]} />
            </Reveal>
          </div>
          <Reveal variant="ui" delay={300} className="hidden font-mono text-sm text-mute sm:block">
            ({String(visibleProjects.length).padStart(2, "0")})
          </Reveal>
        </div>

        {featured && (
          <Reveal variant="card">
            <ProjectCard project={featured} index={0} poster={featured.poster ?? metas[0].thumbnail} featured />
          </Reveal>
        )}
        <div className="mt-24 grid gap-x-10 gap-y-20 md:grid-cols-2 lg:gap-x-16 lg:gap-y-32">
          {rest.map((p, i) => {
            // An odd project out closes the grid at full width instead of sitting alone.
            const wide = rest.length % 2 === 1 && i === rest.length - 1;
            return (
              <Reveal key={p.slug} variant="card" delay={wide ? 0 : (i % 2) * 140} className={wide ? "md:col-span-2" : ""}>
                <ProjectCard project={p} index={i + 1} poster={p.poster ?? metas[i + 1].thumbnail} featured={wide} />
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container-x section" aria-labelledby="services-title">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
          <Reveal variant="ui">
            <SectionLabel>What I do</SectionLabel>
          </Reveal>
          <Reveal as="h2" variant="words" id="services-title" className={`${h2} max-w-[22ch]`}>
            <SplitWords
              segments={[
                "I help brands make complex products and ideas ",
                { text: "easier to understand through motion.", className: "text-mute" },
              ]}
            />
          </Reveal>
        </div>

        <ul className="mt-20 border-t border-line sm:mt-28">
          {site.services.map((s) => (
            <li key={s.outcome} className="service-row group border-b border-line">
              <div className="grid gap-5 py-10 sm:py-14 lg:grid-cols-[1fr_1.6fr] lg:gap-24">
                <Reveal as="h3" variant="heading" className="font-display text-[clamp(1.375rem,2.2vw,2rem)] transition-colors duration-500 group-hover:text-volt">
                  {s.outcome}
                </Reveal>
                <div className="grid gap-5 sm:grid-cols-[1.3fr_1fr] sm:gap-12 lg:pt-1">
                  <Reveal as="p" delay={120} className="leading-relaxed text-mute">
                    {s.body}
                  </Reveal>
                  <Reveal as="ul" variant="ui" delay={220} className="service-items space-y-1 font-mono text-xs uppercase leading-6 tracking-[0.14em] text-mute">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </Reveal>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="container-x section pb-32 sm:pb-48" aria-labelledby="contact-title">
        <div className="relative">
          <Reveal variant="ui">
            <SectionLabel>Contact</SectionLabel>
          </Reveal>
          <div className="mt-10 flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal as="h2" variant="words" id="contact-title" className="font-display max-w-[18ch] text-[clamp(2.25rem,5vw,4.75rem)]">
              <SplitWords segments={["Building something? Let’s explain it", { text: ".", className: "text-volt" }]} />
            </Reveal>
            <Reveal variant="section" delay={200} className="w-24 self-end sm:w-32 lg:mr-8 lg:w-40">
              <Robot greeting="Let’s build something" />
            </Reveal>
          </div>
        </div>
        <Reveal variant="section" className="mt-20 grid gap-12 border-t border-line pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-10">
            <EnquiryLink className="inline-block break-all text-[clamp(1.25rem,2.6vw,2rem)] tracking-tight text-bone underline decoration-line decoration-1 underline-offset-[0.25em] transition-colors hover:text-volt hover:decoration-volt">
              {site.email}
            </EnquiryLink>
            <AvailabilityTicker label={site.availabilityLabel} items={site.opportunities} size="md" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <EnquiryLink className="rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-volt hover:text-on-volt">
              Start a project
            </EnquiryLink>
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
