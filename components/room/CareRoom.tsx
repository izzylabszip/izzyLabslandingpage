import Image from "next/image";
import { ScanReveal } from "@/components/ScanReveal";
import { RoomSection } from "./RoomSection";
import { PhoneFrame } from "./PhoneFrame";

/* Content mirrors ca.carenearby.app */

const STATS = [
  { value: "$25", label: "Flat hourly rate", sub: "No surge, ever" },
  { value: "3", label: "Hour minimum", sub: "Per booking" },
  { value: "15", label: "km service radius", sub: "Greater Sudbury" },
  { value: "EN / FR", label: "Bilingual support", sub: "App and caregivers" },
];

const CHECKS = [
  "Vulnerable Sector Police Check",
  "OCSWSSW Credential Verified",
  "Government ID Confirmed",
  "Two Reference Calls",
];

const STEPS = [
  {
    n: "01",
    title: "Tell us what's needed",
    body: "Pick the type of care, date and duration. Personal care, mobility, post-op, dementia or companionship — the app maps it to the right caregiver.",
  },
  {
    n: "02",
    title: "Browse & select your PSW",
    body: "Real profiles with photos, reviews and credentials in plain view. You choose exactly who comes to your door.",
  },
  {
    n: "03",
    title: "Confirm & track live",
    body: "Pay in-app, get live arrival updates and photo notes, rate the visit, and re-book the same PSW with one tap.",
  },
];

const PLATFORM = [
  {
    title: "Every caregiver vetted before day one",
    body: "Police record check, government ID, PSW credentials and two reference calls. Clearance renewed annually.",
  },
  {
    title: "Flat $25/hr. Always.",
    body: "What you see is what you pay. No surge, no weekend, evening or stat-holiday surcharges.",
  },
  {
    title: "Track your PSW door-to-door",
    body: "Real-time GPS, ETA updates and arrival notifications, so the family knows when care is on the way.",
  },
  {
    title: "Bilingual EN / FR",
    body: "Filter caregivers by language, with full app support in both English and French.",
  },
  {
    title: "Stripe secure pay",
    body: "Card on file, in-app receipts, no cash and no awkward conversations.",
  },
  {
    title: "In-app messaging",
    body: "Chat directly with your PSW, with photo notes after every visit.",
  },
];

const AREAS = [
  "Sudbury Downtown",
  "New Sudbury",
  "Hanmer",
  "Valley East",
  "Capreol",
  "Lively",
  "Coniston",
  "Copper Cliff",
  "Garson",
  "Val Caron",
  "Chelmsford",
  "The Donovan",
];

const CAREGIVERS = [
  { name: "Sandesh B.", file: "sandesh-bhetwal", tag: "Personal care · Mobility" },
  { name: "Biwash T.", file: "biswash-shahi-thakuri", tag: "Post-op · Companionship" },
  { name: "Aman K.", file: "aman-konda", tag: "Dementia care" },
  { name: "Hari T.", file: "hari-timalsena", tag: "Personal care" },
  { name: "Rajan K.", file: "rajan-kc", tag: "Mobility · Overnight" },
];

const TRUST = [
  { title: "Police record check", body: "Vulnerable Sector Screening, renewed annually, mandatory before any first booking." },
  { title: "Government ID", body: "Government photo ID verified before any caregiver is approved." },
  { title: "PSW credentials", body: "Confirmed against OCSWSSW and recognized PSW credential programs." },
  { title: "References & review", body: "Two professional references called personally, plus family ratings after every visit." },
];

export function CareRoom() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-room font-product text-ink">
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ScanReveal duration={0.4}>
              <p className="label text-accent">Verified home care · Greater Sudbury, ON</p>
            </ScanReveal>
            <ScanReveal delay={0.12} duration={0.8}>
              <h2 className="mt-6 text-[2.6rem] font-bold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                Find &amp; book verified PSWs near you in{" "}
                <span className="serif text-accent">Greater Sudbury</span> — you choose, we verify.
              </h2>
            </ScanReveal>
            <ScanReveal delay={0.3}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">
                Browse real profiles of police-checked, PSW-certified caregivers and pick exactly
                who cares for your family. Same-day booking in minutes, not weeks. Flat $25/hr, no
                surge.
              </p>
            </ScanReveal>
            <ScanReveal delay={0.42}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://carenearby.app"
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-white transition-[filter] hover:brightness-110"
                >
                  Book a caregiver <span aria-hidden>→</span>
                </a>
                <a
                  href="https://apps.apple.com/ca/app/carenearby/id6779246235"
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-4 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  App Store <span aria-hidden>↗</span>
                </a>
              </div>
            </ScanReveal>
          </div>

          <div className="lg:col-span-5">
            <ScanReveal delay={0.35}>
              <PhoneFrame label="CareNearby // booking">
                <div className="px-4 pb-6 pt-4">
                  <p className="label text-accent">Need a PSW today?</p>
                  <p className="mt-2 text-lg font-bold leading-tight">5 verified nearby</p>
                  <div className="mt-4 space-y-2.5">
                    {CAREGIVERS.slice(0, 3).map((c) => (
                      <div
                        key={c.file}
                        className="flex items-center gap-3 rounded-xl border border-ink/8 bg-[#E8F5EE] p-2.5"
                      >
                        <Image
                          src={`/projects/carenearby/${c.file}.jpg`}
                          alt=""
                          width={36}
                          height={36}
                          className="h-9 w-9 shrink-0 rounded-full object-cover"
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] font-semibold">{c.name}</span>
                          <span className="block truncate text-[10px] text-ink-muted">{c.tag}</span>
                        </span>
                        <span className="shrink-0 font-mono text-[10px] font-bold text-accent">
                          $25
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-accent p-3 text-center">
                    <span className="label text-white">Book &amp; track</span>
                  </div>
                </div>
              </PhoneFrame>
            </ScanReveal>
          </div>
        </div>

        {/* Stat row */}
        <div className="relative mx-auto max-w-6xl px-5 pb-16 md:px-8">
          <ScanReveal>
            <dl className="grid gap-x-8 gap-y-8 border-y border-line py-8 sm:grid-cols-2 lg:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-bold tracking-tight md:text-4xl">{s.value}</dt>
                  <dd className="mt-2 text-sm font-semibold">{s.label}</dd>
                  <dd className="label mt-1.5 text-ink-muted">{s.sub}</dd>
                </div>
              ))}
            </dl>
          </ScanReveal>
        </div>
      </section>

      {/* Verification strip */}
      <section className="bg-band py-8 font-product text-ink">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <p className="label mb-5 text-ink-muted">Every caregiver, checked the same way</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {CHECKS.map((c) => (
              <li key={c} className="label flex items-center gap-2.5 text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Steps */}
      <RoomSection
        eyebrow="Section 01 — Process"
        title={
          <>
            Three steps. <span className="serif text-accent">No phone tag.</span>
          </>
        }
        lead="Most requests are confirmed the same day."
      >
        <div className="grid gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <ScanReveal key={s.n} delay={i * 0.1}>
              <p className="serif text-4xl text-accent">{s.n}</p>
              <h3 className="mt-5 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-muted">{s.body}</p>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* Platform */}
      <RoomSection
        eyebrow="Section 02 — Platform"
        title={
          <>
            Everything families need.
            <br />
            <span className="serif text-accent">Nothing they don&apos;t.</span>
          </>
        }
        className="bg-band"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PLATFORM.map((p, i) => (
            <ScanReveal key={p.title} delay={(i % 3) * 0.08} className="h-full" innerClassName="h-full">
              <div className="card h-full p-6">
                <h3 className="text-lg font-bold leading-snug tracking-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.body}</p>
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* Coverage */}
      <RoomSection
        eyebrow="Section 03 — Coverage"
        title={
          <>
            Serving all of <span className="serif text-accent">Greater Sudbury.</span>
          </>
        }
        lead="Verified PSWs available within a 15 km radius."
      >
        <ScanReveal>
          <ul className="flex flex-wrap gap-2.5">
            {AREAS.map((a) => (
              <li
                key={a}
                className="rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium"
              >
                {a}
              </li>
            ))}
          </ul>
        </ScanReveal>
      </RoomSection>

      {/* Caregivers */}
      <RoomSection
        eyebrow="Section 04 — Caregivers"
        title={
          <>
            Real people. Verified. <span className="serif text-accent">Local.</span>
          </>
        }
        lead="Five verified PSWs across Greater Sudbury, each with credentials in plain view."
        className="bg-band"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CAREGIVERS.map((c, i) => (
            <ScanReveal key={c.file} delay={(i % 5) * 0.07} className="h-full" innerClassName="h-full">
              <div className="card h-full p-5 text-center">
                <Image
                  src={`/projects/carenearby/${c.file}.jpg`}
                  alt={`${c.name}, verified Personal Support Worker`}
                  width={96}
                  height={96}
                  className="mx-auto h-20 w-20 rounded-full object-cover"
                />
                <p className="mt-4 font-semibold">{c.name}</p>
                <p className="mt-1.5 text-xs text-ink-muted">{c.tag}</p>
                <p className="label mt-4 text-accent">$25/hr</p>
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* Trust — dark band */}
      <div className="room-dark">
        <RoomSection
          eyebrow="Section 05 — Trust & safety"
          title={
            <>
              Vetted like a hospital.
              <br />
              <span className="serif text-accent">Booked like an app.</span>
            </>
          }
          lead="Every caregiver clears four independent checks before they appear in search."
        >
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {TRUST.map((t, i) => (
              <ScanReveal key={t.title} delay={i * 0.08} className="h-full" innerClassName="h-full">
                <div className="h-full bg-room p-6">
                  <h3 className="text-base font-bold tracking-tight">{t.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{t.body}</p>
                </div>
              </ScanReveal>
            ))}
          </div>
        </RoomSection>
      </div>

      {/* For PSWs — deep green band */}
      <div className="room-green">
        <RoomSection
          eyebrow="Section 06 — For personal support workers"
          title={
            <>
              Set your hours. <span className="serif text-accent">Earn what you&apos;re worth.</span>
            </>
          }
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xl leading-relaxed text-ink-muted">
                Northern Ontario PSWs deserve better than $14/hr through an agency that takes most
                of the cheque. CareNearby pays among the highest local rates, weekly, and caregivers
                choose every booking they accept.
              </p>
            </div>
            <div className="lg:col-span-5">
              <ScanReveal>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                  {[
                    { v: "$20–24", l: "Kept per hour" },
                    { v: "Weekly", l: "Payouts" },
                    { v: "0", l: "Agency markup" },
                    { v: "24/7", l: "Choose your shifts" },
                  ].map((x) => (
                    <div key={x.l} className="bg-room p-5">
                      <dt className="text-2xl font-bold tracking-tight">{x.v}</dt>
                      <dd className="label mt-2 text-ink-muted">{x.l}</dd>
                    </div>
                  ))}
                </dl>
              </ScanReveal>
            </div>
          </div>
        </RoomSection>
      </div>
    </>
  );
}
