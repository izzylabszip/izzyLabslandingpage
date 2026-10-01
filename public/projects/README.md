# Project assets

Screenshot slots live on each project in `lib/projects-data.ts`, under
`caseStudy.assets`. A slot looks like this:

```ts
{
  id: "amit-home",
  spec: "Wide capture of amitblends.com above the fold — the dark hero ...",
  caption: "Shopfront, above the fold",
  aspect: "wide",
}
```

Until `src` is set, `/work/[slug]` renders a dashed "AWAITING ASSET" frame in
that position with the `spec` text inside it. That is deliberate: an empty slot
is a task, and a task nobody can see does not get done. The frame is also the
honest alternative to a stock photo — every image on a case study should be the
product it claims to be.

## Filling a slot

Drop the file in `public/projects/<slug>/`, then add `src` and `alt`:

```ts
{
  id: "amit-home",
  spec: "...",                       // keep it — it documents what the shot is
  caption: "Shopfront, above the fold",
  aspect: "wide",
  src: "/projects/amit-blends/home.png",
  alt: "The Amit Blends homepage, dark hero with the price list below",
}
```

`aspect` decides the frame, so match the capture to it:

| aspect  | ratio  | suggested export      | used for                     |
|---------|--------|-----------------------|------------------------------|
| `phone` | 9:19.5 | 1170 × 2532           | app screens                  |
| `wide`  | 16:10  | 1600 × 1000           | websites, landing pages      |
| `tall`  | 3:4    | 1200 × 1600           | long forms, portrait capture |

## Before you export

Read the `spec` on the slot first — several of them say whose face or data may
not appear. The short version:

- No real client, member, family or patient data in any screenshot. Seed a demo
  account instead.
- The five live CareNearby PSW profiles need written consent before their photos
  appear here, and a family or caregiver quote needs PHIPA-compliant consent in
  writing on top of that.
- Amit's gallery photography is his. Ask before reusing it, and credit it.
- Lami Nepal member profiles are never a screenshot subject.
