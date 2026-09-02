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

## Routes

| Route | What |
|---|---|
| `/` | Studio shell: hero, manifesto, specimen cards, modules, contact |
| `/work/glow` | Glow room (console mood, rose-gold) |
| `/work/carenearby` | CareNearby room (calm mood, trust-green) |
| `/work/lami-nepal` | Lami Nepal room (editorial mood, red/gold/cream) |
| `POST /api/contact` | Contact form handler (zod + honeypot + rate limit + Resend) |

## Where things live

- `lib/projects-data.ts` — all product copy, links, stack, highlights and per-project `theme` tokens. Edit here, not in components.
- `lib/site.ts` — studio constants: stats, modules, location.
- `app/globals.css` — design tokens. Studio palette on `:root`, product palettes under `[data-product="..."]`. Tailwind utilities like `text-accent` resolve to whichever palette wraps them.
- `components/ScanReveal.tsx` — signature reveal (scan line + clip). Runs once per element, fades under `prefers-reduced-motion`.
- `components/ScanImage.tsx` — screenshot frame with the hover/tap scan pass. Renders an "AWAITING ASSET" frame until a `src` is set.
- `components/product/*` — the three room layouts plus shared header, story, nav.
- `lib/mail.ts` — mail transport. Swap this file to move the form to a Railway backend later.

## Adding screenshots

Drop files into `public/projects/<slug>/` and set `images.cover` / `images.gallery` in `lib/projects-data.ts`.
See `public/projects/README.md` for sizes.

## Environment

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and robots |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional. Shown in footer and contact section when set |
| `RESEND_API_KEY` | Resend API key. Without it the form logs in dev and fails in production |
| `CONTACT_TO_EMAIL` | Inbox that receives briefs |
| `CONTACT_FROM_EMAIL` | Verified Resend sender. Defaults to `onboarding@resend.dev` |

## Deploy

Any Node host works (Vercel, Railway, Netlify). Set the env vars above, build with `npm run build`, and point the domain's DNS at the host.
The site is not a static export: `/api/contact` needs a server runtime.
