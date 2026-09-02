export type Mood = "console" | "calm" | "editorial";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "web" | "app-store" | "site" | "app";
  primary?: boolean;
};

export type Project = {
  slug: "glow" | "carenearby" | "lami-nepal";
  index: string;
  name: string;
  tagline: string;
  description: string;
  status: "live" | "beta";
  statusLabel: string;
  role: string;
  links: ProjectLink[];
  stack: string[];
  meta: { label: string; value: string }[];
  theme: {
    accent: string;
    accentBright: string;
    accentDim: string;
    accentSoft: string;
    mood: Mood;
  };
  highlights: { label: string; value: string }[];
  /** Glow: two-sided marketplace split. */
  audiences?: { label: string; points: string[] }[];
  /** Lami Nepal: service catalog. */
  services?: { title: string; blurb: string }[];
  /** CareNearby: feature list. */
  features?: { title: string; blurb: string }[];
  /** Glow: simulated scan readout lines. */
  readouts?: { key: string; value: string }[];
  story: { heading: string; body: string }[];
  images: {
    cover?: string;
    gallery?: { src: string; alt: string }[];
  };
};

export const projects: Project[] = [
  {
    slug: "glow",
    index: "01",
    name: "Glow",
    tagline: "Beauty booking with an AI eye.",
    description:
      "Two-sided beauty booking platform. Artists post their looks and portfolio, clients browse and book, backed by an AI face-scan that helps clients find the right match.",
    status: "live",
    statusLabel: "LIVE · TESTFLIGHT",
    role: "Product, engineering and QA, end to end",
    links: [
      {
        label: "glow-app-omega.vercel.app",
        href: "https://glow-app-omega.vercel.app",
        kind: "web",
        primary: true,
      },
    ],
    stack: ["Expo / React Native", "Vision Camera", "Gemini AI", "On-device ML"],
    meta: [
      { label: "Stack", value: "Expo / React Native · Vision Camera · Gemini AI" },
      { label: "Status", value: "Live (TestFlight)" },
      { label: "Two-sided", value: "Artist + Client" },
    ],
    theme: {
      accent: "#B76E79",
      accentBright: "#E2A9B2",
      accentDim: "#7A4650",
      accentSoft: "rgba(183,110,121,0.14)",
      mood: "console",
    },
    highlights: [
      { label: "Services", value: "Makeup · Hair · Nails · Mehendi" },
      { label: "Scan pipeline", value: "Camera → On-device → Gemini" },
      { label: "Booking", value: "At home · In salon" },
      { label: "Sides", value: "Artist + Client" },
    ],
    audiences: [
      {
        label: "For Artists",
        points: [
          "Post looks and build a living portfolio",
          "Get discovered by clients nearby",
          "Manage bookings, availability and reviews",
        ],
      },
      {
        label: "For Clients",
        points: [
          "Browse verified artists near you",
          "AI face-scan suggests the right match",
          "Book at home or in the salon",
        ],
      },
    ],
    readouts: [
      { key: "CAPTURE", value: "VISION CAMERA · 1080P" },
      { key: "SKIN_TONE", value: "WARM · TYPE III" },
      { key: "UNDERTONE", value: "GOLDEN" },
      { key: "FACE_SHAPE", value: "OVAL" },
      { key: "MATCH_CONFIDENCE", value: "96%" },
    ],
    story: [
      {
        heading: "The problem",
        body: "Beauticians and artists live on word of mouth and Instagram DMs. Clients scroll for hours and still book on a guess. Neither side had a place built for the actual transaction.",
      },
      {
        heading: "What we built",
        body: "A two-sided Expo app with an artist studio on one side and a client marketplace on the other. The face-scan runs a Vision Camera capture through on-device analysis and a Gemini pass, then turns the result into artist recommendations.",
      },
      {
        heading: "How it was tested",
        body: "Camera permissions, low-light capture and model timeouts were scripted as regression cases from day one. Every scan path has a manual fallback, so a failed model call never blocks a booking.",
      },
    ],
    images: {},
  },
  {
    slug: "carenearby",
    index: "02",
    name: "CareNearby",
    tagline: "Trusted care, booked in minutes.",
    description:
      "Books trusted Personal Support Workers and caregivers for the people and families who need care. Live in Greater Sudbury, Ontario, with a Canada-wide instance in progress.",
    status: "live",
    statusLabel: "LIVE",
    role: "Freelance client engagement: product build and QA",
    links: [
      { label: "carenearby.app", href: "https://carenearby.app", kind: "web", primary: true },
      { label: "ca.carenearby.app", href: "https://ca.carenearby.app", kind: "site" },
      {
        label: "App Store",
        href: "https://apps.apple.com/ca/app/carenearby/id6779246235",
        kind: "app-store",
      },
    ],
    stack: ["Expo / React Native", "Next.js", "Stripe"],
    meta: [
      { label: "Stack", value: "Expo / React Native · Next.js · Stripe" },
      { label: "Status", value: "Live" },
      { label: "Region", value: "Sudbury, ON · Canada" },
      { label: "Engagement", value: "Freelance client" },
    ],
    theme: {
      accent: "#057A55",
      accentBright: "#22B37E",
      accentDim: "#0B4D38",
      accentSoft: "rgba(5,122,85,0.16)",
      mood: "calm",
    },
    highlights: [
      { label: "Rate", value: "$25/hr flat" },
      { label: "Verified", value: "Police-checked" },
      { label: "Languages", value: "EN / FR" },
      { label: "Booking", value: "Same-day" },
    ],
    features: [
      {
        title: "You choose, they verify",
        blurb: "Families pick a specific caregiver from real profiles instead of being assigned one by an agency.",
      },
      {
        title: "Verified PSWs and RPNs",
        blurb: "Police checks and credential review before a caregiver ever appears in search.",
      },
      {
        title: "Transparent pricing",
        blurb: "A flat hourly rate with no surge fees, and caregivers keep most of it.",
      },
      {
        title: "Built for the visit",
        blurb: "Stripe payments, real-time GPS tracking and in-app messaging from booking to check-out.",
      },
    ],
    story: [
      {
        heading: "The brief",
        body: "CareNearby came to izzylabs as a freelance engagement: a home-care booking product for Greater Sudbury that had to earn trust from families and pay caregivers fairly.",
      },
      {
        heading: "What we built",
        body: "An Expo app and web PWA for booking, a Next.js marketing site for the Canada-wide rollout, Stripe billing and the verification workflow behind every profile.",
      },
      {
        heading: "How it was tested",
        body: "Booking, payment and cancellation flows were covered by regression suites, with bilingual copy checked in both languages before every release.",
      },
    ],
    images: {},
  },
  {
    slug: "lami-nepal",
    index: "03",
    name: "Lami Nepal",
    tagline: "Find the light to your life.",
    description:
      "Full-service matchmaking company in Kathmandu: compatible matching, confidential counseling, profile and media support, legal marriage and divorce process support, marriage counseling, venue booking and wedding materials, backed by their own app.",
    status: "live",
    statusLabel: "LIVE",
    role: "Web platform and app build for a full-service matchmaking business",
    links: [
      { label: "laminepal.com.np", href: "https://laminepal.com.np", kind: "site", primary: true },
      { label: "Get the app", href: "https://laminepal.com.np/app", kind: "app" },
    ],
    stack: ["Web platform", "Mobile app"],
    meta: [
      { label: "Stack", value: "Web platform · Mobile app" },
      { label: "Status", value: "Live" },
      { label: "Est.", value: "2077 B.S. · Kathmandu" },
    ],
    theme: {
      accent: "#C0272D",
      accentBright: "#E8636A",
      accentDim: "#6E1A1E",
      accentSoft: "rgba(192,39,45,0.14)",
      mood: "editorial",
    },
    highlights: [
      { label: "Established", value: "2077 B.S." },
      { label: "Services", value: "09" },
      { label: "Team", value: "Matchmakers · Astrologer · Legal" },
      { label: "Based", value: "Kathmandu" },
    ],
    services: [
      { title: "Compatible Matching", blurb: "Verified profiles, personal guidance and family coordination to find the right partner." },
      { title: "Confidential Counseling", blurb: "Private sessions with specialists for clear, discreet guidance." },
      { title: "Profile & Media Support", blurb: "Profile writing with professional photography and videography." },
      { title: "Legal Marriage Assistance", blurb: "End-to-end management of legally recognized marriage procedures." },
      { title: "Divorce Process Support", blurb: "Full support and counsel for a lawful, peaceful separation." },
      { title: "Marriage Counseling", blurb: "Experienced counselors for resolving marital issues and rebuilding relationships." },
      { title: "Venue & Banquet Booking", blurb: "From grand halls to intimate gatherings, banquet and party palace arrangements." },
      { title: "Puja & Wedding Materials", blurb: "Everything needed for weddings and auspicious ceremonies, in one place." },
      { title: "Decoration Rentals", blurb: "Bride and groom decoration materials available on rent." },
    ],
    story: [
      {
        heading: "The business",
        body: "Lami Nepal is not a dating app. It is a matchmaking company with matchmakers, an astrologer, a legal advisor and counselors on staff, serving families across Nepal since 2077 B.S.",
      },
      {
        heading: "What we built",
        body: "A bilingual web platform that presents the full service catalog with clear pricing, a registration flow that feeds the matchmaking team, and a companion app for members.",
      },
      {
        heading: "How it was tested",
        body: "Nepali and English content, registration and enquiry flows and WhatsApp handoffs were tested across the low-end Android devices most members actually use.",
      },
    ],
    images: {},
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

export const projectSlugs = projects.map((p) => p.slug);
