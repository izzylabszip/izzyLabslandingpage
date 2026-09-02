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
  /** Short line for the studio card. */
  description: string;
  status: "live" | "beta";
  statusLabel: string;
  role: string;
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
  };
  highlights: { label: string; value: string }[];
  audiences?: { label: string; points: string[] }[];
  story: { heading: string; body: string }[];
  images: { cover?: string };
};

export const projects: Project[] = [
  {
    slug: "glow",
    index: "01",
    name: "Glow",
    tagline: "Look your best, for every moment that matters.",
    description:
      "Premium beauty marketplace for Nepal. Verified makeup artists and hairstylists on one side, clients booking for weddings and photoshoots on the other, with AI matching and a face-scan that finds the right artist.",
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
    story: [
      {
        heading: "The problem",
        body: "Beauty artists in Nepal live on Instagram DMs and word of mouth. Clients scroll hundreds of profiles and still book on a guess. Neither side had a place built for the actual transaction.",
      },
      {
        heading: "What we built",
        body: "A two-sided Expo app with an artist studio and a client marketplace, plus the marketing site. Glow Match ranks artists on occasion, budget, location and style, and the face scan turns a camera frame into a shortlist.",
      },
      {
        heading: "How we tested it",
        body: "Camera permissions, low-light capture and model timeouts were scripted as regression cases from day one. Every scan path has a manual fallback, so a failed model call never blocks a booking.",
      },
    ],
    images: {},
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
    story: [
      {
        heading: "The brief",
        body: "CareNearby came to izzylabs as a freelance engagement. Build a home-care booking product for Greater Sudbury that families trust on first use and that pays caregivers far better than the agency model.",
      },
      {
        heading: "What we built",
        body: "An Expo app and web PWA for booking, a Next.js marketing site for the Canada-wide rollout, Stripe billing, live GPS tracking, in-app messaging and the four-step verification workflow behind every profile.",
      },
      {
        heading: "How we tested it",
        body: "Booking, payment, cancellation and tracking flows are covered by regression suites. Bilingual English and French copy is checked in both languages before every release.",
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
      "Full-service matchmaking company in Kathmandu, established 2077 B.S. Nine services from compatible matching and confidential counseling through legal marriage, venue booking and wedding materials, backed by their own app.",
    status: "live",
    statusLabel: "LIVE",
    role: "Web platform and app build for a full-service matchmaking business",
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
    },
    highlights: [
      { label: "Established", value: "2077 B.S." },
      { label: "Services", value: "09" },
      { label: "Team", value: "9 specialists" },
      { label: "Based", value: "Kathmandu" },
    ],
    story: [
      {
        heading: "The business",
        body: "Lami Nepal is not a dating app. It is a registered matchmaking company with matchmakers, an astrologer, a legal advisor and counselors on staff, serving families across Nepal since 2077 B.S.",
      },
      {
        heading: "What we built",
        body: "A bilingual web platform that presents all nine services with clear pricing, a registration flow that feeds the matchmaking team, WhatsApp handoffs to real staff, and a companion app for members.",
      },
      {
        heading: "How we tested it",
        body: "Nepali and English content, registration and enquiry flows and the WhatsApp handoffs were tested across the low-end Android devices most members actually use.",
      },
    ],
    images: {},
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const projectSlugs = projects.map((p) => p.slug);
