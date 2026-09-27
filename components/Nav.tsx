"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-[var(--max)] items-center justify-between rounded-full border border-bone/10 bg-ink/65 py-2 pl-5 pr-2 backdrop-blur-md"
        >
          <Link href="/" className="flex items-center gap-2 text-sm font-medium tracking-tight text-bone">
            <span className="size-1.5 rounded-full bg-volt" aria-hidden="true" />
            {site.name}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-full px-4 py-2 text-sm text-mute transition-colors hover:text-bone">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${site.email}`}
            className="hidden rounded-full bg-bone px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-volt md:block"
          >
            Start a project
          </a>

          <button
            type="button"
            className="relative grid size-9 cursor-pointer place-items-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-28 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="space-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-5xl tracking-tight text-bone">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2 text-sm text-mute">
          <a href={`mailto:${site.email}`} className="block text-bone">
            {site.email}
          </a>
          <p>{site.location}</p>
        </div>
      </div>
    </>
  );
}
