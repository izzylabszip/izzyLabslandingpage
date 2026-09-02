"use client";

import { useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; delivered: boolean }
  | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = contactSchema.safeParse(raw);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus({ state: "error", message: "Validation failed. Check the flagged fields." });
      return;
    }

    setErrors({});
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json: { ok?: boolean; delivered?: boolean; error?: string } = await res
        .json()
        .catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? `Transmission failed (${res.status})`);
      setStatus({ state: "sent", delivered: json.delivered !== false });
      form.reset();
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Transmission failed",
      });
    }
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="panel relative p-6 md:p-8">
      <div className="corner-ticks pointer-events-none absolute inset-2 opacity-60" />

      <div className="label mb-8 flex items-center justify-between text-muted">
        <span>Initiate contact</span>
        <span className="flex items-center gap-2">
          <span className="motion-ambient h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
          Channel open
        </span>
      </div>

      <div className="space-y-7">
        <Field id="name" label="NAME_" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            className="field"
            required
          />
        </Field>

        <Field id="email" label="EMAIL_" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="field"
            required
          />
        </Field>

        <Field id="brief" label="PROJECT_BRIEF_" error={errors.brief}>
          <textarea
            id="brief"
            name="brief"
            rows={5}
            placeholder="What are you building, who is it for, and when does it need to ship?"
            className="field resize-y"
            required
          />
        </Field>

        {/* honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={sending}
          className="label inline-flex items-center justify-center gap-2 rounded-panel bg-accent px-5 py-3.5 text-bg transition-[filter,transform] hover:brightness-110 active:translate-y-px disabled:cursor-wait disabled:opacity-70"
        >
          {sending ? "Transmitting" : "Transmit"} <span aria-hidden>→</span>
        </button>
        <StatusLine status={status} />
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={cn("label block", error ? "text-beta" : "text-accent")}>
        {label}
      </label>
      {children}
      {error ? <p className="label mt-2 text-beta normal-case tracking-normal">{error}</p> : null}
    </div>
  );
}

function StatusLine({ status }: { status: Status }) {
  let text = "awaiting input";
  let tone = "text-muted";
  if (status.state === "sending") {
    text = "TRANSMITTING";
    tone = "text-accent-bright";
  } else if (status.state === "sent") {
    text = status.delivered
      ? "TRANSMISSION RECEIVED // reply within 48h"
      : "RECEIVED // dev mode, not delivered";
    tone = "text-live";
  } else if (status.state === "error") {
    text = `TRANSMISSION FAILED // ${status.message}`;
    tone = "text-beta";
  }

  return (
    <p role="status" className={cn("font-mono text-xs tracking-wide", tone)}>
      <span aria-hidden className="mr-2 text-muted">
        &gt;
      </span>
      {text}
      {status.state === "sending" ? (
        <span aria-hidden className="ml-0.5 inline-block w-2 animate-blink">
          _
        </span>
      ) : null}
    </p>
  );
}
