export type Mood = "console" | "calm" | "editorial" | "shop";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "web" | "app-store" | "site" | "app";
  primary?: boolean;
};

/**
 * A screenshot slot.
 *
 * `src` is deliberately optional and deliberately empty for most of these. The
 * site renders a labelled "awaiting asset" frame in the gap rather than a
 * stock photo or an invented mockup, so an empty slot is visible to us and
 * honest to a visitor. `spec` is an instruction to whoever takes the shot, not
 * a caption — it says what the frame has to contain to be usable.
 */
export type AssetSlot = {
  id: string;
  spec: string;
  caption: string;
  aspect: "phone" | "wide" | "tall";
  src?: string;
  alt?: string;
};

/**
 * A pull quote.
 *
 * `text` is null until somebody real has said the words. There is no default,
 * no composite, and nothing "representative" — an invented testimonial on a
 * studio site is the one lie a prospective client can check. `source` is
 * rendered next to the quote so a reader can go and verify it.
 */
export type PullQuote = {
  text: string | null;
  author?: string;
  role?: string;
  source?: string;
  /** Shown in place of the quote while `text` is null. */
  need?: string;
};

/**
 * A metric carries its own provenance.
 *
 * `note` is where the number came from, and it is required rather than
 * optional on purpose: a number nobody can trace back to a live page or a
 * client is a number that should not be on the site. Several of these say
 * "not published" instead of a figure, which is the correct answer when the
 * figure is not ours to publish.
 */
export type Metric = { value: string; label: string; note: string };

export type CaseStudy = {
  problem: { heading: string; body: string[] };
  build: { heading: string; body: string[]; items: { title: string; body: string }[] };
  stack: { group: string; items: string[] }[];
  outcome: { heading: string; body: string[]; metrics: Metric[] };
  quote: PullQuote;
  assets: AssetSlot[];
};

export type Project = {
  slug: "glow" | "carenearby" | "lami-nepal" | "amit-blends";
  index: string;
  name: string;
  tagline: string;
  /** Short line for the studio card. */
  description: string;
  status: "live" | "beta";
  statusLabel: string;
  role: string;
  /**
   * The <title> line, which is not the same job as `role`.
   *
   * `role` describes the engagement in full and reads fine on the page. In a
   * search result it blows past the ~60 characters Google renders and the
   * useful half gets truncated away. This is the short, stack-bearing version
   * that survives the cut.
   */
  searchTitle: string;
  /**
   * The <meta name="description"> line, which is a different job again.
   *
   * `description` is written to be read on the page and runs long. Google
   * renders about 160 characters and drops the rest, so these were losing
   * their last sentence — on Amit Blends, more than half the text. Optional:
   * a project whose `description` already fits does not need one.
   */
  metaDescription?: string;
  links: ProjectLink[];
  meta: { label: string; value: string }[];
  theme: {
    /** Real brand colors, shown as swatches on the studio card. */
    swatches: { hex: string; name: string }[];
    /** Surface the room actually renders on. */
    surface: string;
    accent: string;
    mood: Mood;
    /** One line on how the room differs, shown on the card. */
    note: string;
    /** Preview panes are painted in the product's own surface, which is dark
        for Amit Blends and light for the rest. The card needs to know. */
    previewInk?: string;
  };
  highlights: { label: string; value: string }[];
  audiences?: { label: string; points: string[] }[];
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "glow",
    index: "01",
    name: "Glow",
    tagline: "Look your best, for every moment that matters.",
    description:
      "Premium beauty marketplace for Nepal. Verified makeup artists and hairstylists on one side, clients booking for weddings and photoshoots on the other, with AI matching and a face scan that finds the right artist.",
    status: "live",
    statusLabel: "LIVE · TESTFLIGHT",
    role: "Product, engineering and QA, end to end",
    searchTitle: "Expo + Gemini beauty marketplace",
    metaDescription:
      "Premium beauty marketplace for Nepal. Verified makeup artists and hairstylists, wedding and photoshoot bookings, AI matching and a face-scan finder.",
    links: [
      {
        label: "glow-app-omega.vercel.app",
        href: "https://glow-app-omega.vercel.app",
        kind: "web",
        primary: true,
      },
      {
        label: "glow-landing-five.vercel.app",
        href: "https://glow-landing-five.vercel.app",
        kind: "site",
      },
    ],
    meta: [
      { label: "Stack", value: "Expo / React Native · Vision Camera · Gemini AI" },
      { label: "Status", value: "Live (TestFlight)" },
      { label: "Two-sided", value: "Artist + Client" },
    ],
    theme: {
      swatches: [
        { hex: "#FBF7F0", name: "Cream" },
        { hex: "#D97A91", name: "Rose" },
        { hex: "#D4AF37", name: "Gold" },
        { hex: "#1D1D1F", name: "Ink" },
      ],
      surface: "Warm cream, rose and gold",
      accent: "#D97A91",
      mood: "console",
      note: "Editorial beauty marketplace with italic serif display type",
    },
    highlights: [
      { label: "Occasions", value: "9 covered" },
      { label: "Verification", value: "6 checks per artist" },
      { label: "Matching", value: "Glow Match + face scan" },
      { label: "Sides", value: "Artist + Client" },
    ],
    audiences: [
      {
        label: "For Clients",
        points: [
          "Browse verified artists near you",
          "Glow Match and face scan find your fit",
          "Book at home or in the salon",
        ],
      },
      {
        label: "For Artists",
        points: [
          "Reach clients who value your artistry",
          "Manage calendar, rates and payouts",
          "Build a portfolio that gets you booked",
        ],
      },
    ],
    caseStudy: {
      problem: {
        heading: "Two sides of a market that could not find each other",
        body: [
          "Beauty artists in Nepal run their businesses inside Instagram DMs. There is no calendar, no published price, no verified identity and no record that a booking ever happened. An artist loses a slot to a client who stops replying; a client sends a deposit to an account with no recourse behind it.",
          "On the other side, someone planning a wedding scrolls several hundred profiles and books on a guess. The information that would make the decision — does this artist do bridal, are they free on the date, do they travel to the venue, what does it cost — is spread across captions, story highlights and a DM thread.",
          "The product had to serve both sides properly. A marketplace that only works for clients has no artists on it in month three.",
        ],
      },
      build: {
        heading: "What izzylabs built",
        body: [
          "One Expo binary containing two products: a client marketplace and an artist studio. Plus the Next.js marketing site that feeds it.",
        ],
        items: [
          {
            title: "Glow Match, which is not a model call",
            body: "Ranking over occasion, budget, location, availability and style. Every one of those inputs is structured data the app already holds, so the match is a scored query rather than an LLM prompt — cheaper, instant, and explainable to an artist who asks why they did not appear in a shortlist. A model here would have been a slower, less accurate database.",
          },
          {
            title: "The face scan, which is",
            body: "Vision Camera captures the frame, on-device checks run first — face present, lighting, framing — and only a frame that passes goes to a Gemini pass for tone and feature reading. Running the cheap deterministic checks before the paid non-deterministic one is what keeps the cost and the latency sane.",
          },
          {
            title: "The artist studio",
            body: "Calendar, rates, service menu, portfolio and payout view. This is the half of a two-sided marketplace that never gets demoed and decides whether the marketplace has any supply.",
          },
          {
            title: "Verification, six checks deep",
            body: "Artists are checked before they are listed. The client-facing promise is only worth what the workflow behind it enforces, so the checks are a state machine an artist moves through, not a flag an admin ticks.",
          },
          {
            title: "A manual path behind every automated one",
            body: "Camera permission denied, low light, model timeout and provider outage were written as regression cases before the scan shipped. Every scan path falls back to browsing by occasion, so a failed model call costs a convenience, never a booking.",
          },
        ],
      },
      stack: [
        { group: "Mobile", items: ["Expo", "React Native", "React Native Vision Camera", "TypeScript"] },
        { group: "AI", items: ["Gemini", "On-device pre-checks", "Timeout + fallback handling"] },
        { group: "Web", items: ["Next.js", "Vercel"] },
        { group: "QA", items: ["Scripted regression cases", "Permission-state matrix", "Low-light capture tests"] },
      ],
      outcome: {
        heading: "Where it got to",
        body: [
          "Live on TestFlight with both sides of the marketplace working, and the landing site in production.",
          "The numbers on Glow's own landing page — client counts, artist counts, a star rating — are the product's marketing claims and are not repeated here as izzylabs results. Install, booking and retention figures belong to Glow and are not ours to publish.",
        ],
        metrics: [
          { value: "TestFlight", label: "Release channel", note: "Verified: build distributed on TestFlight." },
          { value: "09", label: "Occasions covered", note: "Counted on the live product: wedding, reception, date night, birthday, festival, graduation, office event, photoshoot, everyday." },
          { value: "06", label: "Checks per artist", note: "From the verification workflow as built." },
          { value: "Not published", label: "Installs and bookings", note: "[NEEDS: Glow to confirm which figures izzylabs may publish, if any.]" },
        ],
      },
      quote: {
        text: null,
        need:
          "[NEEDS REAL QUOTE] — from a verified artist on the platform or from Glow's product owner, on what the studio build changed for them. Ask by DM through the artist studio; get it in writing before it goes on this page.",
      },
      assets: [
        {
          id: "glow-match",
          spec: "Glow Match result screen with a real shortlist. Blur or replace client-identifiable names before export.",
          caption: "Glow Match shortlist",
          aspect: "phone",
        },
        {
          id: "glow-scan",
          spec: "Face scan in progress — capture frame with the on-device guidance overlay visible. Use a team member's face, not a client's.",
          caption: "Face scan capture",
          aspect: "phone",
        },
        {
          id: "glow-studio",
          spec: "Artist studio calendar with a week of bookings. Placeholder artist account is fine and preferable.",
          caption: "Artist studio calendar",
          aspect: "phone",
        },
      ],
    },
  },
  {
    slug: "carenearby",
    index: "02",
    name: "CareNearby",
    tagline: "You choose, we verify.",
    description:
      "Home care booking for Greater Sudbury, Ontario. Families browse real profiles of police-checked Personal Support Workers and pick exactly who comes, at a flat $25 an hour with no agency markup.",
    status: "live",
    statusLabel: "LIVE",
    role: "Freelance client engagement: product build and QA",
    searchTitle: "Ontario home care booking app",
    metaDescription:
      "Home care booking for Greater Sudbury, Ontario. Families browse police-checked Personal Support Workers and pick who comes, flat $25/hr, no agency markup.",
    links: [
      { label: "carenearby.app", href: "https://carenearby.app", kind: "web", primary: true },
      { label: "ca.carenearby.app", href: "https://ca.carenearby.app", kind: "site" },
      {
        label: "App Store",
        href: "https://apps.apple.com/ca/app/carenearby/id6779246235",
        kind: "app-store",
      },
    ],
    meta: [
      { label: "Stack", value: "Expo / React Native · Next.js · Stripe" },
      { label: "Status", value: "Live" },
      { label: "Region", value: "Greater Sudbury, ON" },
      { label: "Engagement", value: "Freelance client" },
    ],
    theme: {
      swatches: [
        { hex: "#F4F1EA", name: "Bone" },
        { hex: "#057A55", name: "Green" },
        { hex: "#034E36", name: "Deep" },
        { hex: "#0A0A0A", name: "Ink" },
      ],
      surface: "Warm bone with trust green",
      accent: "#057A55",
      mood: "calm",
      note: "Calm, evidence-led healthcare layout with numbered sections",
    },
    highlights: [
      { label: "Rate", value: "$25/hr flat" },
      { label: "Minimum", value: "3 hours" },
      { label: "Radius", value: "15 km" },
      { label: "Languages", value: "EN / FR" },
    ],
    caseStudy: {
      problem: {
        heading: "The family pays an agency rate and does not get to choose who comes",
        body: [
          "Private agency home care in Ontario runs about $28–35 an hour, and most agencies will not quote a number until after a consultation call. The family does not pick the worker, often does not know their name until they are at the door, and a different person may arrive next week. The Personal Support Worker doing the actual care sees a fraction of that rate.",
          "Booking runs on phone tag. A request goes in, a coordinator calls back, availability is checked against a roster the family cannot see, and the wait is measured in weeks at the point where somebody has just been discharged and needs help on Thursday.",
          "CareNearby came to izzylabs as a freelance engagement with a specific thesis: remove the coordinator from the middle, show the family the actual people, and pass the difference to the worker. That only works if the verification is real, because the coordinator was the trust mechanism being removed.",
        ],
      },
      build: {
        heading: "What izzylabs built",
        body: [
          "An Expo app and web PWA for booking, a Next.js marketing site for the Canada-wide rollout, and the verification workflow the whole proposition rests on.",
        ],
        items: [
          {
            title: "Four-step verification, renewed rather than filed",
            body: "Vulnerable-sector police check, government photo ID, PSW credential confirmation against OCSWSSW, and two professional reference calls. Clearance renews annually and re-runs after any incident report, so the badge on a profile means something a year later.",
          },
          {
            title: "Profiles families actually choose from",
            body: "Photo, credentials, specialties and reviews in plain view, filterable by care type — personal care, mobility, post-op, dementia, companionship — and by language. The family picks the person; the app does not assign one.",
          },
          {
            title: "Flat-rate billing through Stripe",
            body: "$25/hr with no surge, no weekend, evening or stat-holiday surcharge, card on file, in-app receipts, no deposit, and free cancellation up to two hours out. Pricing that simple is a billing implementation decision as much as a commercial one — there is no surcharge code path to get wrong.",
          },
          {
            title: "Live arrival tracking",
            body: "Real-time GPS, ETA and arrival notifications, with photo notes after the visit. For a family member who is not in the house, knowing care is twelve minutes away is the feature.",
          },
          {
            title: "Bilingual to the edges",
            body: "Full English and French across app and site, with language as a caregiver filter rather than a UI toggle nobody uses. Both languages are checked before every release, because a half-translated error state is where this breaks.",
          },
          {
            title: "Regression suites on the money paths",
            body: "Booking, payment, cancellation and tracking are covered by regression suites that run on every deploy. This is a product that takes a card and sends a person to a vulnerable adult's home; the cost of a silent failure is not a bug report.",
          },
        ],
      },
      stack: [
        { group: "Mobile", items: ["Expo", "React Native", "Web PWA", "TypeScript"] },
        { group: "Web", items: ["Next.js", "12 neighbourhood landing pages"] },
        { group: "Payments", items: ["Stripe", "Card on file", "In-app receipts"] },
        { group: "Platform", items: ["Live GPS tracking", "In-app messaging", "EN / FR i18n"] },
        { group: "QA", items: ["Booking regression suite", "Payment + cancellation suite", "Bilingual release check"] },
      ],
      outcome: {
        heading: "Where it got to",
        body: [
          "Live on the App Store and on the web, booking in Greater Sudbury, with five verified PSW profiles on the platform and twelve neighbourhood pages covering the service area.",
          "The rate comparison is the client's own published figure, not a market study by us.",
        ],
        metrics: [
          { value: "$25/hr", label: "Flat rate to the family", note: "Published on ca.carenearby.app. No surge, evening, weekend or stat surcharge." },
          { value: "$28–35/hr", label: "Ontario private agency range", note: "The range CareNearby cites on its own pricing page (ca.carenearby.app/pricing), from published Ontario PSW rates. Agencies mostly will not quote it before a consultation." },
          { value: "05", label: "Verified PSWs live", note: "Real profiles on the platform with credentials and specialties." },
          { value: "12", label: "Neighbourhood pages", note: "Counted on ca.carenearby.app: Downtown, New Sudbury, Hanmer, Valley East, Capreol, Lively, Coniston, Copper Cliff, Garson, Val Caron, Chelmsford, The Donovan." },
          { value: "15 km", label: "Service radius", note: "From downtown Sudbury, published on the live site." },
          { value: "EN / FR", label: "Shipped languages", note: "Full bilingual coverage across app and site." },
        ],
      },
      quote: {
        text: null,
        need:
          "[NEEDS REAL QUOTE] — from CareNearby's founder on the build, or from a PSW on the platform. A caregiver or family quote needs written PHIPA-compliant consent before it appears here; a founder quote about the engineering engagement does not.",
      },
      assets: [
        {
          id: "care-profiles",
          spec: "Caregiver browse screen showing verified profiles. Use the five live PSWs only with their written consent, otherwise seed a demo account.",
          caption: "Verified caregiver profiles",
          aspect: "phone",
        },
        {
          id: "care-tracking",
          spec: "Live arrival tracking with ETA visible. Demo booking, demo address — never a real client's street.",
          caption: "Live arrival tracking",
          aspect: "phone",
        },
        {
          id: "care-site",
          spec: "Wide capture of a neighbourhood landing page on ca.carenearby.app, showing the pricing comparison block.",
          caption: "Neighbourhood landing page",
          aspect: "wide",
        },
      ],
    },
  },
  {
    slug: "lami-nepal",
    index: "03",
    name: "Lami Nepal",
    tagline: "Find the light to your life.",
    description:
      "Full-service matchmaking company in Kathmandu, established 2077 B.S. Nine services from compatible matching and confidential counseling through legal marriage, venue booking and wedding materials, backed by their own app.",
    status: "live",
    statusLabel: "LIVE",
    role: "Web platform and app build for a full-service matchmaking business",
    searchTitle: "Bilingual matchmaking, Kathmandu",
    metaDescription:
      "Full-service matchmaking in Kathmandu, established 2077 B.S. Nine services from compatible matching through legal marriage and venue booking.",
    links: [
      { label: "laminepal.com.np", href: "https://laminepal.com.np", kind: "site", primary: true },
      { label: "Get the app", href: "https://laminepal.com.np/app", kind: "app" },
    ],
    meta: [
      { label: "Stack", value: "Web platform · Mobile app" },
      { label: "Status", value: "Live" },
      { label: "Est.", value: "2077 B.S. · Kathmandu" },
    ],
    theme: {
      swatches: [
        { hex: "#DC2626", name: "Red" },
        { hex: "#F97316", name: "Orange" },
        { hex: "#D4A24C", name: "Gold" },
        { hex: "#F3F4F6", name: "Paper" },
      ],
      surface: "White paper with red and orange",
      accent: "#DC2626",
      mood: "editorial",
      note: "Bilingual service catalog in a warm wedding palette",
      previewInk: "#1F2937",
    },
    highlights: [
      { label: "Established", value: "2077 B.S." },
      { label: "Services", value: "09" },
      { label: "Team", value: "9 specialists" },
      { label: "Based", value: "Kathmandu" },
    ],
    caseStudy: {
      problem: {
        heading: "A real company with nine services and no way to see any of them",
        body: [
          "Lami Nepal is not a dating app and did not want to become one. It is a company registered under Nepali law in 2077 B.S., with matchmakers, an astrologer and vastu specialist, a legal advisor, counselors and database staff on the payroll, serving families across Nepal.",
          "The business ran on phone calls. A family could not find out what was offered, what it cost, or who they would be speaking to without ringing the office during working hours — and the services on offer run from compatible matching and confidential counseling all the way through legal marriage, divorce process, banquet booking, pooja materials and decoration rental.",
          "The constraints that shaped the build: the audience reads Nepali first, the majority are on low-end Android handsets, and the business closes on conversations rather than checkouts. Any design that ended in a payment button would have been wrong.",
        ],
      },
      build: {
        heading: "What izzylabs built",
        body: [
          "A bilingual web platform and a companion member app that route people to staff instead of replacing them.",
        ],
        items: [
          {
            title: "Nine services, published with prices where prices exist",
            body: "Each service carries its Nepali name, its English name, a plain description and a price where the business quotes one — रु 25,000 for compatible matching, रु 5,000 for confidential counseling. The ones that are quoted per case say nothing rather than a fake 'from' figure.",
          },
          {
            title: "Devanagari-first, not Devanagari-added",
            body: "Nepali copy is the primary content with English alongside, typeset in a Devanagari face that renders correctly rather than falling back to a Latin font and breaking conjuncts. This is a rendering decision, and getting it wrong is the fastest way to look foreign to your own market.",
          },
          {
            title: "A registration flow that ends at a matchmaker",
            body: "The form feeds the matchmaking team's queue. It is a handoff, not a funnel — the enquiry arrives with a human name attached to it at the other end.",
          },
          {
            title: "WhatsApp handoff on every surface",
            body: "Six contact channels, two of them staffed WhatsApp numbers, plus office phone and the social accounts the business actually answers. Every dead end on the site is a route to a person.",
          },
          {
            title: "Tested on the handsets the members own",
            body: "Registration, enquiry and WhatsApp handoff paths were tested in both languages on low-end Android, which is where this audience is and where a heavy page turns into a bounce.",
          },
        ],
      },
      stack: [
        { group: "Web", items: ["Web platform", "Bilingual NE / EN content model"] },
        { group: "Mobile", items: ["Companion member app"] },
        { group: "Integrations", items: ["WhatsApp handoff", "Office telephony", "Social channels"] },
        { group: "QA", items: ["Low-end Android device testing", "Both-language content checks", "Enquiry path regression"] },
      ],
      outcome: {
        heading: "Where it got to",
        body: [
          "Live at laminepal.com.np with the full service catalogue, the team, the registration flow and the app, in both languages.",
          "Enquiry volume and conversion sit inside the client's business and are not ours to publish.",
        ],
        metrics: [
          { value: "09", label: "Services published", note: "Counted on laminepal.com.np, each with Nepali and English copy." },
          { value: "09", label: "Named staff", note: "Managing director, astrologer and vastu specialist, legal advisor, IT technician, four matchmakers, database management." },
          { value: "06", label: "Contact channels", note: "Two WhatsApp numbers, office line, Instagram, Facebook, TikTok — all live on the site." },
          { value: "2077 B.S.", label: "Company established", note: "Registered under the laws of Nepal; the date the business publishes." },
          { value: "Not published", label: "Enquiries and matches", note: "[NEEDS: Lami Nepal to confirm whether any volume figure may be published.]" },
        ],
      },
      quote: {
        text: null,
        need:
          "[NEEDS REAL QUOTE] — from Laxman Timsina, Managing Director. Ask in Nepali; publish the Nepali with an English translation underneath rather than only the translation.",
      },
      assets: [
        {
          id: "lami-services",
          spec: "Wide capture of the service catalogue showing Nepali and English side by side with a price visible.",
          caption: "Bilingual service catalogue",
          aspect: "wide",
        },
        {
          id: "lami-app",
          spec: "Member app home screen. Use a seeded account — never a real member's profile.",
          caption: "Companion member app",
          aspect: "phone",
        },
      ],
    },
  },
  {
    slug: "amit-blends",
    index: "04",
    name: "Amit Blends",
    tagline: "Every blend, dialled in.",
    description:
      "Barbershop site and booking request flow for a single-chair barber on Riverside Drive, Greater Sudbury. Astro static build, published prices and durations, structured data for the local pack, and a booking form that hands off to WhatsApp instead of pretending to hold a calendar.",
    status: "live",
    statusLabel: "LIVE",
    role: "Freelance client engagement: site build, local SEO and content structure",
    searchTitle: "Barbershop site + booking, Sudbury",
    metaDescription:
      "Barbershop site and booking flow for a single-chair barber in Greater Sudbury. Astro static build, published prices, and local-pack structured data.",
    links: [
      { label: "amitblends.com", href: "https://amitblends.com", kind: "site", primary: true },
      { label: "Book the chair", href: "https://amitblends.com/book", kind: "web" },
    ],
    meta: [
      { label: "Stack", value: "Astro · Static output · WhatsApp handoff" },
      { label: "Status", value: "Live" },
      { label: "Region", value: "Greater Sudbury, ON" },
      { label: "Engagement", value: "Freelance client" },
    ],
    theme: {
      swatches: [
        { hex: "#0D0B09", name: "Ink" },
        { hex: "#E2662C", name: "Flame" },
        { hex: "#B3814F", name: "Wood" },
        { hex: "#F7F2EA", name: "Cream" },
      ],
      surface: "Dark ink with flame orange and wood",
      accent: "#E2662C",
      mood: "shop",
      note: "Dark shopfront in condensed display type, built for the local pack",
      previewInk: "#F7F2EA",
    },
    highlights: [
      { label: "Services", value: "7 priced" },
      { label: "Indexed pages", value: "22" },
      { label: "Guides", value: "7 posts" },
      { label: "Booking", value: "WhatsApp handoff" },
    ],
    caseStudy: {
      problem: {
        heading: "One barber, one chair, and a business that lived in DMs",
        body: [
          "Amit Blends is one operator at The Refinery on Riverside Drive in Greater Sudbury. Everything ran through Instagram: no published prices, no published hours, and no way to ask for a slot except a DM that gets read between cuts.",
          "The competition for 'barber near me' in Sudbury is not other websites, it is Google's local pack. A shop without structured data, without consistent hours and without a page per service is not eligible for the thing that actually sends walk-in customers.",
          "There was also a trap to avoid. The obvious build is a booking system with a live calendar and online payment. For a single chair with one person in it, that calendar is wrong within an hour of the first unexpected walk-in, and a customer who paid for a slot that no longer exists is a worse outcome than no booking system at all.",
        ],
      },
      build: {
        heading: "What izzylabs built",
        body: [
          "A 21-page Astro site with static output, built around the two things a local service business is actually judged on: what it costs, and whether you can get a slot.",
        ],
        items: [
          {
            title: "A booking request, not a booking",
            body: "Name, mobile, service, preferred day, rough time band and a notes field, which sends on WhatsApp or by email. The form says outright: 'Send a request and I'll text you back to confirm. It isn't booked until you hear from me.' It is slower than a calendar and it is never wrong, which for one chair is the correct trade.",
          },
          {
            title: "Seven services, each with a price, a duration and its own page",
            body: "Haircut $35 / 45 min, Skin Fade $40 / 50 min, Beard Trim $20 / 25 min, Cut & Beard $50 / 70 min, Hot Towel Shave $35, Kids Cut $25, Line-Up $15. Published, not quoted on request — 'how much does a haircut cost in Sudbury' is a real search and the shop now answers it.",
          },
          {
            title: "Structured data as the main deliverable",
            body: "A Person and LocalBusiness JSON-LD graph with an Offer per service, priceCurrency CAD and areaServed Greater Sudbury. For a single-location service business this is the highest-leverage on-page work there is, and it was the gap.",
          },
          {
            title: "Seven direct-answer guides",
            body: "Beard neckline placement, what a haircut costs in Sudbury, how often to get a cut, how to ask for a fade, taper versus fade, walk-in or book ahead, and tipping a barber in Canada. Each one is a question people type, answered in the first paragraph rather than after four hundred words of preamble.",
          },
          {
            title: "Hours published with their own caveat",
            body: "The hours table carries an on-page note that the times have not been double-checked and asks the visitor to ring first. Publishing an uncertain fact as certain is how a business ends up with a locked door and a one-star review, so the uncertainty is on the page until Amit confirms it.",
          },
          {
            title: "Real photography only",
            body: "The gallery is the shop's own work — 'Real cuts from my chair. No stock photos, no filters.' A barbershop selling on stock imagery is selling somebody else's haircut.",
          },
        ],
      },
      stack: [
        { group: "Site", items: ["Astro", "Static output", "No client framework runtime"] },
        { group: "Structured data", items: ["Person + LocalBusiness @graph", "Offer per service", "areaServed: Greater Sudbury"] },
        { group: "Booking", items: ["Request form", "WhatsApp deep link", "mailto fallback"] },
        { group: "Content", items: ["7 service pages", "6 guide posts", "FAQ", "Gallery"] },
      ],
      outcome: {
        heading: "Where it got to",
        body: [
          "Live, static, and structured — 22 URLs in the sitemap covering every service, every guide and the booking page, with the local-business markup a single-location shop needs to be eligible for the pack.",
          "Ranking and booking figures need a claimed Google Business Profile and Search Console, neither of which exists yet. Those are on the manual list, not in this column.",
        ],
        metrics: [
          { value: "22", label: "URLs in the sitemap", note: "Counted on amitblends.com/sitemap-0.xml: home, about, blog index, 7 guides, book, contact, FAQ, gallery, services index, 7 service pages." },
          { value: "07", label: "Services priced publicly", note: "Each with price and, where it applies, duration, on its own page and in the JSON-LD Offer list." },
          { value: "07", label: "Direct-answer guides", note: "Published under /blog on the live site. Four more are written and held back to release over the following weeks." },
          { value: "CAD", label: "Offer currency in markup", note: "Verified in the live Person/LocalBusiness JSON-LD graph." },
          { value: "Not yet", label: "Local pack ranking", note: "[NEEDS: Google Business Profile claimed and verified, and Search Console connected, before any ranking figure exists.]" },
        ],
      },
      quote: {
        text: "Behind every haircut is a story of hard work, sacrifice, long days, and a dream I refuse to give up on.",
        author: "Amit",
        role: "Owner, Amit Blends",
        source:
          "From the About section of amitblends.com — Amit's own words about the shop, published by him. It is not a testimonial about izzylabs.",
        need: "[NEEDS REAL QUOTE] — ask Amit directly what the site changed for the business.",
      },
      assets: [
        {
          id: "amit-home",
          spec: "Wide capture of amitblends.com above the fold — the dark hero with 'Every blend, dialled in.' and the price strip below it.",
          caption: "Shopfront, above the fold",
          aspect: "wide",
        },
        {
          id: "amit-book",
          spec: "The booking request form on /book with the 'it isn't booked until you hear from me' line visible. Fill it with dummy details.",
          caption: "Booking request, WhatsApp handoff",
          aspect: "tall",
        },
        {
          id: "amit-cut",
          spec: "One gallery shot of finished work, with Amit's permission to reuse it here. His photography, credited.",
          caption: "From the chair",
          aspect: "wide",
        },
      ],
    },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
