import Image from "next/image";
import { ScanReveal } from "@/components/ScanReveal";
import { RoomSection } from "./RoomSection";

/* Content mirrors laminepal.com.np */

const SERVICES = [
  {
    np: "अनुकूल मिलन",
    en: "Compatible Matching",
    body: "Verified profiles, personal guidance and family coordination to find a suitable life partner.",
    price: "रु 25,000",
  },
  {
    np: "गोप्य परामर्श",
    en: "Confidential Counseling",
    body: "Speak privately with our specialists and get the right guidance.",
    price: "रु 5,000",
  },
  {
    np: "प्रोफाइल र मिडिया सहयोग",
    en: "Profile & Media Support",
    body: "We help build your profile properly and provide professional photography and videography.",
  },
  {
    np: "कानुनी विवाह",
    en: "Legal Marriage",
    body: "Management and support for the complete legally recognized marriage process.",
  },
  {
    np: "सम्बन्ध विच्छेद सेवा",
    en: "Divorce Process",
    body: "Full support and counsel required for a lawful, peaceful separation.",
  },
  {
    np: "वैवाहिक परामर्शदाता",
    en: "Marriage Counselor",
    body: "Expert advice from experienced counselors for resolving marital problems and repairing relationships.",
  },
  {
    np: "पार्टी प्यालेस बुकिङ",
    en: "Party Palace / Banquet",
    body: "From grand halls to intimate gatherings, arrangement of banquet and party palaces of every capacity.",
  },
  {
    np: "विवाहका लागि पूजा सामाग्री",
    en: "Pooja Materials",
    body: "All materials needed for weddings and auspicious ceremonies, available in one place.",
  },
  {
    np: "विवाह डेकोरेशन सामग्री",
    en: "Wedding Decorations",
    body: "Every decoration material needed for the bride and groom, available on rent.",
  },
];

const TEAM = [
  { name: "Laxman Timsina", role: "Managing Director" },
  { name: "Tulasi Bhardwaj Niraula", role: "Astrologer & Vastu Specialist" },
  { name: "Bimal Adhikari", role: "Legal Advisor" },
  { name: "Bishal Acharya", role: "IT Technician" },
  { name: "Bhawana Adhikari", role: "Match Maker" },
  { name: "Sumitra Khanal", role: "Match Maker" },
  { name: "Binita Adhikari", role: "Match Maker" },
  { name: "Prasamsha Parajuli", role: "Database Management" },
  { name: "Prekshya Pokhrel", role: "Match Maker" },
];

const CHANNELS = [
  { label: "WhatsApp", value: "9851072715", href: "https://wa.me/9779851072715" },
  { label: "WhatsApp", value: "9813875934", href: "https://wa.me/9779813875934" },
  { label: "Office", value: "01-5923898", href: "tel:015923898" },
  { label: "Instagram", value: "@laminepal", href: "https://www.instagram.com/laminepal" },
  { label: "Facebook", value: "lamiNpl", href: "https://www.facebook.com/lamiNpl" },
  { label: "TikTok", value: "@laminepal8", href: "https://www.tiktok.com/@laminepal8" },
];

export function LamiRoom() {
  return (
    <>
      {/* Hero — the real red/orange gradient with the couple photograph */}
      <section className="relative overflow-hidden font-product text-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #B91C1C, #F97316)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 pt-16 md:grid-cols-2 md:px-8 md:pt-20">
          <div className="pb-14 md:pb-24">
            <ScanReveal duration={0.4}>
              <p className="label text-white/80">Est. 2077 B.S. · Kathmandu, Nepal</p>
            </ScanReveal>
            <ScanReveal delay={0.12} duration={0.8}>
              <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] md:text-6xl">
                Find the light to your life
              </h2>
            </ScanReveal>
            <ScanReveal delay={0.3}>
              <p className="np mt-6 max-w-md text-white/90">
                लमी नेपालमा, हामी तपाईंलाई व्यावसायिक मिलन, मिडिया सहयोग, र गोप्य परामर्शहरू मार्फत
                उपयुक्त साथीहरूसँग जोड्न मद्दत गर्दछौं।
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                A registered matchmaking company connecting people through professional matching,
                media support and confidential counseling.
              </p>
            </ScanReveal>
            <ScanReveal delay={0.42}>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="https://laminepal.com.np"
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 rounded-full bg-white px-6 py-4 text-[#B91C1C] transition-transform hover:-translate-y-0.5"
                >
                  Register now <span aria-hidden>→</span>
                </a>
                <a
                  href="https://laminepal.com.np/app"
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-4 text-white transition-colors hover:bg-white/10"
                >
                  Get the app <span aria-hidden>↗</span>
                </a>
              </div>
            </ScanReveal>
          </div>

          <div className="relative flex items-end justify-center self-end">
            <ScanReveal delay={0.25}>
              <Image
                src="/projects/lami-nepal/hero.png"
                alt="A Nepali couple in traditional wedding dress"
                width={612}
                height={408}
                priority
                className="h-auto w-full max-w-[420px] object-contain drop-shadow-2xl"
              />
            </ScanReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <RoomSection
        eyebrow={<span className="np">हाम्रो सेवाहरू · Our services</span>}
        title="Nine services, one house"
        lead="Everything a family needs between the first introduction and the wedding day, handled by staff rather than an algorithm."
        className="bg-band"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ScanReveal key={s.en} delay={(i % 3) * 0.08} className="h-full" innerClassName="h-full">
              <div className="card flex h-full flex-col p-6">
                <h3 className="np text-lg font-bold leading-snug tracking-tight text-accent">{s.np}</h3>
                <p className="mt-1.5 text-sm font-semibold text-ink">{s.en}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{s.body}</p>
                {s.price ? (
                  <p className="np mt-5 border-t border-line pt-4 text-sm font-bold text-accent">
                    {s.price}
                  </p>
                ) : null}
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* About */}
      <RoomSection eyebrow={<span className="np">हाम्रो बारेमा · About</span>}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ScanReveal>
              <p className="text-2xl font-bold leading-[1.3] tracking-tight md:text-3xl">
                Lami Nepal Pvt. Ltd. works as a bridge between marriageable young people across
                Nepal, at the meeting point of traditional values and modern technology.
              </p>
            </ScanReveal>
            <ScanReveal delay={0.12}>
              <p className="mt-6 leading-relaxed text-ink-muted">
                The company understands each client&apos;s needs and priorities, then helps
                establish a suitable relationship through detailed profiles, counseling services and
                a privacy-first matching process. Social value and ethics are the first priority,
                with the goal of building healthy, lasting marriages in Nepali society.
              </p>
            </ScanReveal>
            <ScanReveal delay={0.2}>
              <p className="mt-5 leading-relaxed text-ink-muted">
                The company was officially established under the laws of Nepal in 2077 B.S., and
                operates from Kathmandu Sunday to Friday, 10:00 AM to 5:00 PM.
              </p>
            </ScanReveal>
          </div>
          <div className="lg:col-span-5">
            <ScanReveal delay={0.15}>
              <div
                className="rounded-2xl p-8 text-white"
                style={{ background: "linear-gradient(140deg, #B91C1C, #F97316)" }}
              >
                <Image
                  src="/projects/lami-nepal/logo.png"
                  alt="Lami Nepal logo"
                  width={570}
                  height={340}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
                <dl className="mt-8 space-y-4">
                  {[
                    { k: "Established", v: "2077 B.S." },
                    { k: "Location", v: "Kathmandu, Nepal" },
                    { k: "Hours", v: "Sun – Fri · 10:00–17:00" },
                    { k: "Team", v: "9 specialists" },
                  ].map((x) => (
                    <div key={x.k} className="flex items-baseline justify-between gap-4 border-b border-white/20 pb-3">
                      <dt className="label text-white/70">{x.k}</dt>
                      <dd className="font-semibold">{x.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScanReveal>
          </div>
        </div>
      </RoomSection>

      {/* Team */}
      <RoomSection
        eyebrow="Our team"
        title="Real people behind every match"
        lead="Matchmakers, an astrologer and vastu specialist, a legal advisor and database staff. The platform routes to them, it does not replace them."
        className="bg-band"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((t, i) => (
            <ScanReveal key={t.name} delay={(i % 3) * 0.07} className="h-full" innerClassName="h-full">
              <div className="card flex h-full items-center gap-4 p-5">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
                  style={{ background: "linear-gradient(140deg, #DC2626, #F97316)" }}
                >
                  {t.name.charAt(0)}
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">{t.name}</span>
                  <span className="block truncate text-sm text-ink-muted">{t.role}</span>
                </span>
              </div>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>

      {/* Channels */}
      <RoomSection
        eyebrow="Contact channels"
        title="Built to hand off to humans"
        lead="Every enquiry routes to a real matchmaker on WhatsApp, phone or social, because this business closes on conversations rather than checkouts."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CHANNELS.map((c, i) => (
            <ScanReveal key={c.href} delay={(i % 3) * 0.07}>
              <a
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className="card flex items-center justify-between gap-4 p-5 transition-transform hover:-translate-y-1"
              >
                <span>
                  <span className="label block text-ink-muted">{c.label}</span>
                  <span className="mt-2 block font-semibold text-ink">{c.value}</span>
                </span>
                <span aria-hidden className="text-accent">
                  ↗
                </span>
              </a>
            </ScanReveal>
          ))}
        </div>
      </RoomSection>
    </>
  );
}
