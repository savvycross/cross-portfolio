"use client";

import { useEffect, useState, type ReactNode } from "react";
import { enquiryHref, site } from "@/data/site";

const FALLBACK_EVENT = "enquiry:fallback";

const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(
  site.enquiry.subject,
)}&body=${encodeURIComponent(site.enquiry.body)}`;

/**
 * "Start a project" link: opens the visitor's email app with the message
 * already written. If nothing takes focus away from the page shortly after
 * (no email app configured), a small helper offers Gmail or copying the address.
 */
export function EnquiryLink({ className, children }: { className?: string; children: ReactNode }) {
  function onClick() {
    let left = false;
    const mark = () => (left = true);
    window.addEventListener("blur", mark, { once: true });
    document.addEventListener("visibilitychange", mark, { once: true });
    window.addEventListener("pagehide", mark, { once: true });
    setTimeout(() => {
      window.removeEventListener("blur", mark);
      document.removeEventListener("visibilitychange", mark);
      window.removeEventListener("pagehide", mark);
      if (!left && document.hasFocus()) window.dispatchEvent(new Event(FALLBACK_EVENT));
    }, 1500);
  }
  return (
    <a href={enquiryHref} onClick={onClick} className={className}>
      {children}
    </a>
  );
}

/** Mounted once in the layout; appears only when the email app didn't open. */
export function EnquiryFallback() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const show = () => {
      setCopied(false);
      setOpen(true);
    };
    window.addEventListener(FALLBACK_EVENT, show);
    return () => window.removeEventListener(FALLBACK_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setOpen(false), 12000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${site.email}\n\n${site.enquiry.body}`);
      setCopied(true);
    } catch {}
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed inset-x-4 bottom-24 z-[65] mx-auto max-w-md rounded-2xl border border-line bg-surface p-5 shadow-2xl shadow-black/30 transition-[opacity,translate] duration-500 ease-[var(--ease-out)] sm:bottom-8 ${
        open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      inert={!open}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-bone">No email app opened?</p>
          <p className="mt-1 text-sm leading-relaxed text-mute">Send it from Gmail, or copy the address and message.</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="-mr-1 -mt-1 grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-mute hover:text-bone"
        >
          ✕
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={gmailHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="rounded-full bg-bone px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-volt hover:text-on-volt"
        >
          Open in Gmail
        </a>
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer rounded-full border border-line px-4 py-2.5 text-sm text-bone transition-colors hover:border-bone/40"
        >
          {copied ? "Copied" : "Copy email & message"}
        </button>
      </div>
    </div>
  );
}
