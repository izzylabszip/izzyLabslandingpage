# Project assets

Drop real screenshots here, then point to them from `lib/projects-data.ts`
(`images.cover` and `images.gallery`). Until a path is set, the site renders an
in-theme "AWAITING ASSET" frame in that slot.

Suggested files and sizes (PNG or JPG, 2x for retina):

| Product     | cover                         | gallery                              |
|-------------|-------------------------------|--------------------------------------|
| glow        | cover.png  (phone, 1170x2532) | screen-1..3.png (phone, 1170x2532)   |
| carenearby  | cover.png  (wide, 1600x1000)  | screen-1..2.png (wide, 1600x1000)    |
| lami-nepal  | cover.png  (tall, 1200x1600)  | screen-1..3.png (tall, 1200x1600)    |

Example:

```ts
images: {
  cover: "/projects/glow/cover.png",
  gallery: [
    { src: "/projects/glow/screen-1.png", alt: "Glow artist portfolio" },
  ],
},
```
