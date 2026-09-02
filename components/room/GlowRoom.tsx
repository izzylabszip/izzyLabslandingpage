import { ScanReveal } from "@/components/ScanReveal";
import { RoomSection } from "./RoomSection";
import { PhoneFrame } from "./PhoneFrame";
import { ScanReadout } from "./ScanReadout";

/* Content mirrors glow-landing-five.vercel.app */

const OCCASIONS = [
  { name: "Wedding", tint: "#FDF0F3" },
  { name: "Reception", tint: "#FDF8E8" },
  { name: "Date Night", tint: "#F5F0FA" },
  { name: "Birthday", tint: "#F0FAF5" },
  { name: "Festival", tint: "#FDF0F3" },
  { name: "Graduation", tint: "#F0F6FA" },
  { name: "Office Event", tint: "#F5F0E8" },
  { name: "Photoshoot", tint: "#FAF0F5" },
  { name: "Everyday Glow", tint: "#FDF8E8" },
];

const STEPS = [
  {
    n: "01",
    title: "Choose Your Occasion",
    body: "Tell us what you're getting ready for — wedding, reception, date, photoshoot, or any moment that matters.",
  },
  {
    n: "02",
    title: "Glow Matches You",
    body: "Our matching system recommends the best verified artists based on your style, budget and location.",
  },
  {
    n: "03",
    title: "Compare & Book",
    body: "Review portfolios, read real client reviews, and book your artist in seconds with transparent pricing.",
  },
  {
    n: "04",
    title: "Enjoy Your Glow",
    body: "Relax. Your verified artist comes to you, at home or at the salon.",
  },
];

const LOOKS = [
  { name: "Soft Glam", from: "#F6DCE3", to: "#E4B4C2" },
  { name: "Glass Skin", from: "#DCE9F6", to: "#B4CDE4" },
  { name: "Luxury Bridal", from: "#F6E9DC", to: "#E0C79A" },
  { name: "Korean Beauty", from: "#F0DCF6", to: "#CBB4E4" },
  { name: "Festival Glow", from: "#F6E0DC", to: "#E4BAB4" },
  { name: "Natural Glow", from: "#E6F2E9", to: "#B9D8C4" },
  { name: "Golden Glam", from: "#F7EBC8", to: "#D4AF37" },
];

const TRUST = [
  { title: "Government Verified", body: "Official identity verification for every artist on the platform." },
  { title: "Background Checked", body: "Comprehensive background screening before joining Glow." },
  { title: "Portfolio Reviewed", body: "Every portfolio is curated and reviewed by our team for quality." },
  { title: "Trusted Reviews", body: "Only verified client reviews. No fake ratings, ever." },
  { title: "Professional Standards", body: "Artists must meet our quality and hygiene standards." },
  { title: "Beauty Certified", body: "Certified professionals with proven skills and training." },
];

const ARTIST_BENEFITS = [
  { title: "Get Discovered", body: "Get booked by clients looking for your exact style." },
  { title: "Manage Calendar", body: "Control your availability and schedule effortlessly." },
  { title: "Showcase Portfolio", body: "Display your best work to attract premium clients." },
  { title: "Set Your Rates", body: "Set your own rates and earn what you deserve." },
  { title: "Secure Payouts", body: "Get paid reliably with protected, timely payouts." },
  { title: "Build Reputation", body: "Collect verified reviews and grow your brand." },
];

const READOUT = [
  { key: "CAPTURE", value: "VISION CAMERA · 1080P" },
  { key: "SKIN_TONE", value: "WARM · TYPE III" },
  { key: "UNDERTONE", value: "GOLDEN" },
  { key: "FACE_SHAPE", value: "OVAL" },
  { key: "MATCH_CONFIDENCE", value: "96%" },
];

export function GlowRoom() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-room font-product text-ink">
        <div aria-hidden className="bg-dots-rose pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 78% 10%, rgba(217,122,145,0.18), transparent 70%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ScanReveal duration={0.4}>
              <p className="label text-accent">Premium beauty marketplace</p>
            </ScanReveal>
            <ScanReveal delay={0.12} duration={0.8}>
              <h2 className="mt-6 text-[2.9rem] font-bold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                Look Your Best.
                <br />
                For <span className="serif text-accent">Every Moment</span>
                <br />
                That Matters.
              </h2>
            </ScanReveal>
            <ScanReveal delay={0.3}>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-ink-muted">
                Your personal beauty concierge. Find verified makeup artists, hairstylists and
                beauty professionals for weddings, receptions, photoshoots and life&apos;s biggest
                celebrations.
              </p>
            </ScanReveal>
            <ScanReveal delay={0.42}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://glow-app-omega.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 rounded-full bg-accent px-6 py-4 text-white transition-[filter] hover:brightness-110"
                >
                  Find my glow <span aria-hidden>→</span>
                </a>
                <a
                  href="https://glow-landing-five.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-4 text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  Become an artist <span aria-hidden>↗</span>
                </a>
              </div>
            </ScanReveal>
          </div>

          <div className="lg:col-span-5">
            <ScanReveal delay={0.35}>
              <PhoneFrame label="Glow Match // client app">
                <div className="px-4 pb-6 pt-4">
                  <p className="label text-accent">Your beauty moment</p>
                  <p className="mt-2 text-lg font-bold leading-tight">Bridal, Kathmandu</p>
                  <div className="mt-4 space-y-2.5">
                    {[
                      { n: "Aayusha K.", s: "98", t: "Bridal · Soft Glam" },
                      { n: "Sneha R.", s: "94", t: "Hair · Updo" },
                      { n: "Pooja M.", s: "91", t: "Mehendi" },
                    ].map((a) => (
                      <div
                        key={a.n}
                        className="flex items-center gap-3 rounded-xl border border-ink/8 bg-[#FDF0F3] p-2.5"
                      >
                        <span className="h-9 w-9 shrink-0 rounded-full bg-accent/25" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] font-semibold">{a.n}</span>
                          <span className="block truncate text-[10px] text-ink-muted">{a.t}</span>
                        </span>
                        <span className="shrink-0 rounded-full bg-accent px-2 py-1 font-mono text-[9px] font-bold text-white">
                          {a.s}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-xl bg-ink p-3 text-center">
                    <span className="label text-white">Book now</span>
                  </div>
                </div>
              </PhoneFrame>
            </ScanReveal>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <RoomSection
        eyebrow="Occasions"
        title={
          <>
            What are you <span className="serif text-accent">getting ready</span> for?
          </>
        }
        center
        className="bg-band"
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {OCCASIONS.map((o, i) => (
            <ScanReveal key={o.name} delay={(i % 3) * 0.08} amount={0.3}>
              <div
                className="flex h-32 flex-col justify-end rounded-2xl border border-ink/8 p-5 transition-transform duration-300 hover:-translate-y-1 md:h-40"
                style={{ background: o.tint }}
              >
                <span className="text-base font-semibold tracking-tight">{o.name}</span>
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* How it works */}
      <RoomSection
        eyebrow="How it works"
        title={
          <>
            From booking to <span className="serif text-accent">beautiful</span> in minutes
          </>
        }
        center
      >
        <div className="mx-auto max-w-3xl">
          {STEPS.map((s, i) => (
            <ScanReveal key={s.n} delay={i * 0.1}>
              <div className="flex gap-6 border-b border-line py-8 last:border-0">
                <span className="serif shrink-0 text-3xl text-accent md:text-4xl">{s.n}</span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight md:text-2xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{s.body}</p>
                </div>
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* Glow Match + face scan */}
      <RoomSection
        eyebrow="Glow Match · AI face scan"
        title={
          <>
            We find your <span className="serif text-accent">perfect</span> artist
          </>
        }
        lead="No more scrolling through hundreds of profiles. A camera frame goes through on-device analysis and a Gemini pass, and comes back as a shortlist of artists whose work actually fits."
        className="bg-band"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <ScanReveal>
            <ScanReadout lines={READOUT} tone="room" />
          </ScanReveal>
          <ScanReveal delay={0.15}>
            <div className="card p-7 md:p-9">
              <p className="label text-accent">Why it exists</p>
              <p className="mt-5 text-xl leading-relaxed md:text-2xl">
                Clients do not know the vocabulary. They know the face in the mirror and the event
                in the calendar. The scan turns the first into the second, so booking stops being a
                guess.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6">
                <div>
                  <dt className="label text-ink-muted">Pipeline</dt>
                  <dd className="mt-2 font-semibold">Camera → On-device → Gemini</dd>
                </div>
                <div>
                  <dt className="label text-ink-muted">Fallback</dt>
                  <dd className="mt-2 font-semibold">Manual browse, always</dd>
                </div>
              </dl>
            </div>
          </ScanReveal>
        </div>
      </RoomSection>

      {/* Trending looks */}
      <RoomSection
        eyebrow="Trending looks"
        title={
          <>
            Get <span className="serif text-accent">inspired</span> for your moment
          </>
        }
        center
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {LOOKS.map((l, i) => (
            <ScanReveal key={l.name} delay={(i % 4) * 0.07} amount={0.3}>
              <div
                className="flex h-36 items-end rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                style={{ background: `linear-gradient(140deg, ${l.from}, ${l.to})` }}
              >
                <span className="text-sm font-semibold tracking-tight text-[#1D1D1F]">
                  {l.name}
                </span>
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* Trust */}
      <RoomSection
        eyebrow="Glow trust"
        title={
          <>
            Trust is not a feature.
            <br />
            It&apos;s our <span className="serif text-accent">foundation</span>.
          </>
        }
        center
        className="bg-band"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST.map((t, i) => (
            <ScanReveal key={t.title} delay={(i % 3) * 0.08} className="h-full" innerClassName="h-full">
              <div className="card h-full p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <span aria-hidden className="text-sm">
                    ✓
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{t.body}</p>
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* For artists — dark band, as on the real site */}
      <div className="room-dark">
        <RoomSection
          eyebrow="For beauty artists"
          title={
            <>
              Grow Your Beauty Business <span className="serif text-accent">with Glow</span>
            </>
          }
          lead="Join Nepal's premium beauty marketplace. Reach clients who value your artistry, manage bookings seamlessly, and grow your career on your own terms."
        >
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {ARTIST_BENEFITS.map((b, i) => (
              <ScanReveal key={b.title} delay={(i % 3) * 0.08} className="h-full" innerClassName="h-full">
                <div className="h-full bg-room p-6">
                  <h3 className="text-base font-bold tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{b.body}</p>
                </div>
              </ScanReveal>
            ))}
          </div>
        </RoomSection>
      </div>
    </>
  );
}
