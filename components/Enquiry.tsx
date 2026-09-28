"use client";

import { useEffect, useState, type ReactNode } from "react";
import { enquiryHref, site } from "@/data/site";

const FALLBACK_EVENT = "enquiry:fallback";

type Mail = { subject: string; body: string };

function gmailHref({ subject, body }: Mail) {
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export function mailtoHref({ subject, body }: Mail) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Call right after opening a mailto: link. If nothing takes focus away from the
 * page shortly after (no email app configured), a helper offers Gmail or copying.
 */
export function watchForMailFallback(mail: Mail = site.enquiry) {
  let left = false;
  const mark = () => (left = true);
  window.addEventListener("blur", mark, { once: true });
  document.addEventListener("visibilitychange", mark, { once: true });
  window.addEventListener("pagehide", mark, { once: true });
  setTimeout(() => {
    window.removeEventListener("blur", mark);
    document.removeEventListener("visibilitychange", mark);
    window.removeEventListener("pagehide", mark);
    if (!left && document.hasFocus()) window.dispatchEvent(new CustomEvent<Mail>(FALLBACK_EVENT, { detail: mail }));
  }, 1500);
}

/** Plain email link with the enquiry pre-filled, plus the no-email-app fallback. */
export function EnquiryLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a href={enquiryHref} onClick={() => watchForMailFallback()} className={className}>
      {children}
    </a>
  );
}

/** Mounted once in the layout; appears only when the email app didn't open. */
export function EnquiryFallback() {
  const [mail, setMail] = useState<Mail | null>(null);
  const [copied, setCopied] = useState(false);
  const open = mail !== null;

  useEffect(() => {
    const show = (e: Event) => {
      setCopied(false);
      setMail((e as CustomEvent<Mail>).detail ?? site.enquiry);
    };
    window.addEventListener(FALLBACK_EVENT, show);
    return () => window.removeEventListener(FALLBACK_EVENT, show);
  }, []);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setMail(null), 15000);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMail(null);
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function copy() {
    if (!mail) return;
    try {
      await navigator.clipboard.writeText(`To: ${site.email}\nSubject: ${mail.subject}\n\n${mail.body}`);
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
          <p className="mt-1 text-sm leading-relaxed text-mute">Send it from Gmail, or copy the message and email it yourself.</p>
        </div>
        <button
          type="button"
          onClick={() => setMail(null)}
          aria-label="Close"
          className="-mr-1 -mt-1 grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-mute hover:text-bone"
        >
          ✕
        </button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={gmailHref(mail ?? site.enquiry)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMail(null)}
          className="rounded-full bg-bone px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-volt hover:text-on-volt"
        >
          Open in Gmail
        </a>
        <button
          type="button"
          onClick={copy}
          className="cursor-pointer rounded-full border border-line px-4 py-2.5 text-sm text-bone transition-colors hover:border-bone/40"
        >
          {copied ? "Copied" : "Copy message"}
        </button>
      </div>
    </div>
  );
}
