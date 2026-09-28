"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";
import { ArrowIcon } from "./icons";

// Briefs are delivered straight to Cross's inbox via Web3Forms — the visitor
// never leaves the page.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || site.form.web3formsKey;

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full border border-line bg-ink px-5 py-3.5 text-[15px] text-bone placeholder:text-mute/80 transition-colors hover:border-bone/25 focus:border-volt focus:outline-none";

function Field({ label, htmlFor, children, className = "" }: { label: string; htmlFor: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2.5 block text-sm font-medium text-bone">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({ id, name, placeholder, options }: { id: string; name: string; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      <select id={id} name={name} defaultValue="" className={`${field} cursor-pointer appearance-none rounded-full pr-12 [&:has(option[value='']:checked)]:text-mute [&>option]:bg-surface [&>option]:text-bone`}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-5 top-1/2 size-4 -translate-y-1/2 text-bone"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/** "Start a project" brief: name, email, type, budget, timeline, details. */
export function ProjectForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      if (!WEB3FORMS_KEY) throw new Error("Missing form key");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${site.enquiry.subject}${data.type ? ` — ${data.type}` : ""} (${data.name})`,
          from_name: data.name,
          email: data.email,
          replyto: data.email,
          "Project type": data.type || "—",
          "Budget range": data.budget || "—",
          Timeline: data.timeline || "—",
          message: data.details,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const sent = status === "sent";

  return (
    <div className="grid [&>*]:[grid-area:1/1]">
    <form
      onSubmit={onSubmit}
      aria-hidden={sent}
      inert={sent}
      className={`grid gap-6 transition-[opacity,filter] duration-500 sm:grid-cols-2 sm:gap-x-5 ${sent ? "pointer-events-none opacity-0 blur-sm" : ""}`}
    >
      <Field label="Name" htmlFor="f-name">
        <input id="f-name" name="name" required autoComplete="name" placeholder="Your name" className={`${field} rounded-full`} />
      </Field>
      <Field label="Email" htmlFor="f-email">
        <input
          id="f-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className={`${field} rounded-full`}
        />
      </Field>
      <Field label="Project type" htmlFor="f-type">
        <Select id="f-type" name="type" placeholder="Select a type" options={site.form.projectTypes} />
      </Field>
      <Field label="Budget range" htmlFor="f-budget">
        <Select id="f-budget" name="budget" placeholder="Select a budget" options={site.form.budgets} />
      </Field>
      <Field label="Timeline" htmlFor="f-timeline" className="sm:col-span-2">
        <Select id="f-timeline" name="timeline" placeholder="Select a timeline" options={site.form.timelines} />
      </Field>
      <Field label="Project details" htmlFor="f-details" className="sm:col-span-2">
        <textarea
          id="f-details"
          name="details"
          required
          rows={5}
          placeholder="Tell me about your product and what you're launching..."
          className={`${field} resize-y rounded-2xl leading-relaxed`}
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-volt px-6 py-4 text-[15px] font-medium text-on-volt transition-[filter,transform] hover:brightness-110 active:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" && (
            <span className="size-4 animate-spin rounded-full border-2 border-on-volt/30 border-t-on-volt" aria-hidden="true" />
          )}
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
        <p className="mt-5 text-center text-sm text-mute">
          Prefer to talk?{" "}
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-bone underline decoration-line underline-offset-4 transition-colors hover:text-volt hover:decoration-volt"
          >
            Book a call
          </a>
        </p>
        <p aria-live="polite" className="mt-3 min-h-5 text-center text-sm text-red-400">
          {status === "error" && "Your message couldn’t be sent. Please check your connection and try again."}
        </p>
      </div>
    </form>

      {/* Success state replaces the form in place, keeping the card's size. */}
      <div
        role="status"
        aria-live="polite"
        className={`flex flex-col items-center justify-center px-4 text-center transition-[opacity,translate] duration-700 ease-[var(--ease-out)] ${
          sent ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {sent && (
          <>
            <span className="success-check grid size-16 place-items-center rounded-full bg-volt text-on-volt">
              <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
              </svg>
            </span>
            <h3 className="font-display mt-7 text-[clamp(1.5rem,2.4vw,2rem)] text-bone">Message sent</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-mute">
              Thanks for reaching out. I&rsquo;ll get back to you shortly to talk through your project.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 cursor-pointer text-sm text-mute underline decoration-line underline-offset-4 transition-colors hover:text-bone"
            >
              Send another message
            </button>
          </>
        )}
      </div>
    </div>
  );
}
