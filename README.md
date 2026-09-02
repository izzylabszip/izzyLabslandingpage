# izzylabs

Studio site and portfolio for izzylabs (Kathmandu): the engine behind Glow, CareNearby and Lami Nepal.
Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion.

## Run

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
npm run lint
npm run build && npm start
```

## The two layers

**Layer 1 — the studio shell.** Dark, teal, bio-scan. Nav, footer, home page and the corridor
strips at the top and bottom of every case study. This never changes.

**Layer 2 — product rooms.** Each case study renders in its product's *real* design language,
read off the live site: surface colour, accent, type and section structure. Walking from Glow to
CareNearby should feel like walking into a different room, not toggling a CSS variable.

| Room | Surface | Accent | Character |
|---|---|---|---|
| Glow | Cream `#FBF7F0` | Rose `#D97A91`, gold | Editorial marketplace, italic serif display type, pastel occasion tiles, dark "For Artists" band |
| CareNearby | Bone `#F4F1EA` | Green `#057A55` | Calm and evidence-led, numbered sections, real caregiver photos, dark trust band, deep-green PSW band |
| Lami Nepal | White | Red `#DC2626`, orange | Bilingual Nepali/English service catalog, red-orange gradient hero, warm wedding palette |

Room colours live in `app/globals.css` under `[data-room="..."]`, which redefines the surface
tokens (`--room-bg`, `--room-ink`, `--room-line`, `--accent`). Utilities like `bg-room`,
`text-ink` and `text-accent` resolve to whichever room wraps them, so `.room-dark` and
`.room-green` can flip a band inside a light room without new components.

## Routes

| Route | What |
|---|---|
| `/` | Studio: hero, manifesto, specimen cards, capability modules, contact |
| `/work/glow` · `/work/carenearby` · `/work/lami-nepal` | Product rooms |
| `POST /api/contact` | Contact handler (zod + honeypot + rate limit + Resend) |

## Where things live

- `lib/projects-data.ts` — shared project metadata, real brand swatches, links, build notes.
- `lib/site.ts` — studio constants: stats, capability modules, location.
- `components/room/` — the three room layouts plus the corridor (`RoomIntro`, `StudioOutro`).
- `components/ScanReveal.tsx` — signature reveal. Runs once per element, fades under `prefers-reduced-motion`.
- `components/room/ScanReadout.tsx` — the face-scan telemetry panel in the Glow room.
- `lib/mail.ts` — mail transport. Swap this one file to move the form to a Railway backend.

## Assets

Real assets already in `public/projects/`: the Lami Nepal hero photograph and logo, and five
CareNearby caregiver portraits, all from the live sites. Glow and CareNearby app screens are drawn
as CSS device mockups in `components/room/PhoneFrame.tsx`, so no screenshot files are required.
Drop real screenshots in `public/projects/<slug>/` if you want to swap them in.

## Environment

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional. Shown in footer and contact section when set |
| `RESEND_API_KEY` | Resend API key. Without it the form logs in dev and fails in production |
| `CONTACT_TO_EMAIL` | Inbox that receives briefs |
| `CONTACT_FROM_EMAIL` | Verified Resend sender. Defaults to `onboarding@resend.dev` |

## Deploy

Deployed on Vercel. The site is not a static export: `/api/contact` needs a server runtime.
