"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { EnquiryLink } from "./Enquiry";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Full-width header that stays pinned to the top. It's solid, so page content
 * scrolls underneath it and never shows through or sits above it.
 */
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
    <header className="sticky top-0 z-50 border-b border-line bg-ink">
      <nav aria-label="Main" className="container-x flex h-[var(--header)] items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight text-bone">
          <span className="size-2 rounded-full bg-volt" aria-hidden="true" />
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

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <EnquiryLink className="hidden rounded-full bg-bone px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-volt hover:text-on-volt md:block">
            Start a project
          </EnquiryLink>
          <button
            type="button"
            className="relative grid size-10 cursor-pointer place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
            <span className={`absolute h-px w-4 bg-bone transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[calc(var(--header)+1px)] z-40 flex flex-col justify-between bg-ink px-[var(--gutter)] pb-10 pt-12 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <ul className="space-y-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOpen(false)} className="font-display text-4xl text-bone">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-5">
          <EnquiryLink className="block w-full rounded-full bg-bone px-6 py-4 text-center text-sm font-medium text-ink">
            Start a project
          </EnquiryLink>
          <ul className="flex flex-wrap gap-5 text-sm text-mute">
            {site.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
