import { ScanReveal } from "@/components/ScanReveal";
import { RoomSection } from "./RoomSection";

/* Content mirrors amitblends.com. Prices, durations, hours, guide titles and
   the booking copy are the shop's own, read off the live site. */

const SERVICES = [
  {
    name: "Haircut",
    price: "$35",
    duration: "45 min",
    body: "Clippers and scissors, washed and styled. Cut to how your hair actually falls, not to a picture.",
    popular: true,
  },
  {
    name: "Skin Fade",
    price: "$40",
    duration: "50 min",
    body: "Bald at the skin, blended clean through the guards. Low, mid or high — your call in the chair.",
    popular: true,
  },
  {
    name: "Beard Trim",
    price: "$20",
    duration: "25 min",
    body: "Shaped, lined out and softened at the edges. Hot towel first, oil after.",
  },
  {
    name: "Cut & Beard",
    price: "$50",
    duration: "70 min",
    body: "The full sit-down. Haircut and beard shaped together so the lines actually meet.",
    popular: true,
  },
  { name: "Hot Towel Shave", price: "$35" },
  { name: "Kids Cut (under 12)", price: "$25" },
  { name: "Line-Up", price: "$15" },
];

const HOURS = [
  { day: "Monday", open: "10:00 AM – 6:00 PM" },
  { day: "Tuesday", open: "10:00 AM – 6:00 PM" },
  { day: "Wednesday", open: "10:00 AM – 6:00 PM" },
  { day: "Thursday", open: "10:00 AM – 7:00 PM" },
  { day: "Friday", open: "10:00 AM – 7:00 PM" },
  { day: "Saturday", open: "9:00 AM – 5:00 PM" },
  { day: "Sunday", open: "Closed", closed: true },
];

/** The booking request as built: six inputs, then a handoff to a human. */
const REQUEST = [
  { step: "01", label: "Your name", note: "Nothing else identifying, and no account to create." },
  { step: "02", label: "Your mobile number", note: "“I text back to confirm — that’s the only thing I use it for.”" },
  { step: "03", label: "What are you after?", note: "The seven services, priced in the dropdown, plus “not sure — help me pick”." },
  { step: "04", label: "Preferred day", note: "A date, not a slot. The slot is agreed in the reply." },
  { step: "05", label: "Rough time", note: "Morning, early afternoon, late afternoon, evening." },
  { step: "06", label: "Send on WhatsApp or by email", note: "Two buttons, one prefilled message, no backend queue to go stale." },
];

const GUIDES = [
  { title: "Where your beard neckline should actually sit", q: "Where should I trim my beard neckline?", href: "https://amitblends.com/blog/beard-neckline" },
  { title: "What a haircut actually costs in Sudbury", q: "How much does a haircut cost in Sudbury, Ontario?", href: "https://amitblends.com/blog/haircut-prices-sudbury" },
  { title: "How often should you actually get a haircut?", q: "How often should I get a haircut?", href: "https://amitblends.com/blog/how-often-haircut" },
  { title: "How to ask your barber for a fade (and actually get it)", q: "How do I ask for a fade?", href: "https://amitblends.com/blog/how-to-ask-for-a-fade" },
  { title: "Taper vs fade: what's actually the difference", q: "What is the difference between a taper and a fade?", href: "https://amitblends.com/blog/taper-vs-fade" },
  { title: "Walk-in or book ahead in Sudbury?", q: "Can I walk into a barbershop in Sudbury?", href: "https://amitblends.com/blog/walk-in-or-book" },
];

export function AmitRoom() {
  return (
    <>
      {/* Hero — the shop's dark ink with the flame accent */}
      <section className="relative overflow-hidden bg-room font-product text-ink">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 15% 0%, rgba(226, 102, 44, 0.22), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <ScanReveal duration={0.4}>
            <p className="label text-accent">320 Riverside Dr · Greater Sudbury, ON</p>
          </ScanReveal>
          <ScanReveal delay={0.12} duration={0.8}>
            <h2 className="condensed mt-7 text-6xl uppercase md:text-[7.5rem]">
              Every blend,
              <br />
              dialled in.
            </h2>
          </ScanReveal>
          <ScanReveal delay={0.28}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">
              Skin fades, tapers, beard work and line-ups at The Refinery on Riverside Drive,
              Sudbury. Book the chair in under a minute.
            </p>
          </ScanReveal>
          <ScanReveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://amitblends.com/book"
                target="_blank"
                rel="noreferrer"
                className="label inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-[#1a0d05] transition-transform hover:-translate-y-0.5"
              >
                Book now <span aria-hidden>→</span>
              </a>
              <a
                href="tel:+14376625345"
                className="label inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Call +1 (437) 662-5345
              </a>
            </div>
          </ScanReveal>
          <ScanReveal delay={0.5}>
            <p className="mt-8 text-sm text-ink-muted">
              Walk-ins depend on the chair being free. Booking ahead is the only way to be sure.
            </p>
          </ScanReveal>
        </div>
      </section>

      {/* Prices */}
      <RoomSection
        eyebrow="The list"
        title="Cuts & prices"
        lead="Every service published with what it costs and how long it takes. A price that only exists in a DM is a price nobody can search for."
        className="bg-band"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {SERVICES.slice(0, 4).map((s, i) => (
            <ScanReveal key={s.name} delay={(i % 2) * 0.08} className="h-full" innerClassName="h-full">
              <div className="card flex h-full flex-col p-6 md:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="condensed text-3xl uppercase text-ink">{s.name}</h3>
                  <span className="condensed text-3xl text-accent">{s.price}</span>
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-ink-muted">{s.body}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  <span className="label text-ink-muted">{s.duration}</span>
                  {s.popular ? (
                    <span className="label rounded-full border border-accent/40 px-2.5 py-1 text-accent">
                      Most booked
                    </span>
                  ) : null}
                </div>
              </div>
            </ScanReveal>
          ))}
        </div>

        <ScanReveal delay={0.16} className="mt-4">
          <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-3">
            {SERVICES.slice(4).map((s) => (
              <li key={s.name} className="flex items-baseline justify-between gap-4 bg-surface p-6">
                <span className="condensed text-2xl uppercase text-ink">{s.name}</span>
                <span className="condensed text-2xl text-accent">{s.price}</span>
              </li>
            ))}
          </ul>
        </ScanReveal>
      </RoomSection>

      {/* Booking */}
      <RoomSection
        eyebrow="Booking"
        title="A request, not a calendar"
        lead="One chair, one barber, and a phone that gets answered between cuts. A live calendar would be wrong within an hour of the first walk-in, so the form asks for a request and Amit confirms it himself."
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ol className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line">
              {REQUEST.map((r) => (
                <li key={r.step} className="bg-surface p-6">
                  <div className="flex items-baseline gap-4">
                    <span className="label shrink-0 text-accent">{r.step}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-ink">{r.label}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{r.note}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-5">
            <ScanReveal delay={0.12}>
              <div className="card p-7">
                <p className="label text-accent">The promise on the form</p>
                <p className="condensed mt-6 text-3xl uppercase leading-[0.95] text-ink">
                  &ldquo;It isn&rsquo;t booked until you hear from me.&rdquo;
                </p>
                <p className="mt-6 leading-relaxed text-ink-muted">
                  Said in the shop&rsquo;s own words, on the booking page. Software that promises a
                  slot it cannot hold costs a customer who turns up to a locked door. Software that
                  is honest about being a request costs a text message.
                </p>
                <dl className="mt-8 space-y-3 border-t border-line pt-6">
                  {[
                    { k: "Reply target", v: "Within the hour, when open" },
                    { k: "Channels", v: "WhatsApp · Email · Phone" },
                    { k: "Deposit", v: "None taken" },
                  ].map((x) => (
                    <div key={x.k} className="flex items-baseline justify-between gap-4">
                      <dt className="label text-ink-muted">{x.k}</dt>
                      <dd className="text-right text-sm font-semibold text-ink">{x.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScanReveal>
          </div>
        </div>
      </RoomSection>

      {/* Guides */}
      <RoomSection
        eyebrow="Before you book"
        title="Six questions, answered in the first line"
        lead="The guides exist because people type these as searches. Each one answers the question before it explains itself, which is the only format that survives being read on a phone outside the shop."
        className="bg-band"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {GUIDES.map((g, i) => (
            <ScanReveal key={g.href} delay={(i % 2) * 0.07} className="h-full" innerClassName="h-full">
              <a
                href={g.href}
                target="_blank"
                rel="noreferrer"
                className="card flex h-full flex-col justify-between gap-5 p-6 transition-transform hover:-translate-y-1"
              >
                <span>
                  <span className="block font-semibold leading-snug text-ink">{g.title}</span>
                  <span className="mt-2 block text-sm text-ink-muted">{g.q}</span>
                </span>
                <span aria-hidden className="label text-accent">
                  Read ↗
                </span>
              </a>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* Hours */}
      <RoomSection eyebrow="When we're in" title="Opening hours">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <dl className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line">
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex items-baseline justify-between gap-6 bg-surface px-6 py-4"
                >
                  <dt className="font-semibold text-ink">{h.day}</dt>
                  <dd className={h.closed ? "text-sm text-ink-muted" : "text-sm text-ink"}>
                    {h.open}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-5">
            <ScanReveal delay={0.12}>
              <div className="card border-l-2 border-l-accent p-7">
                <p className="label text-accent">Published with its own caveat</p>
                <p className="mt-5 leading-relaxed text-ink-muted">
                  The live site says these hours &ldquo;haven&rsquo;t been double-checked yet&rdquo;
                  and asks you to ring before you set off. That sentence stays on the page until
                  Amit confirms the week — an uncertain fact published as certain is how a customer
                  ends up at a locked door, and how a Google Business Profile ends up fighting its
                  own website.
                </p>
              </div>
            </ScanReveal>
          </div>
        </div>
      </RoomSection>
    </>
  );
}
