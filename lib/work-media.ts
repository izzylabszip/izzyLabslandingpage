import type { Project } from "@/lib/projects-data";

/** Real icons and screens for each build, shared with the v30 home showcase in public/studio. */
export type GalleryShot = { src: string; caption: string };

export const workMedia: Record<Project["slug"], { icon: string; screens: string[]; gallery: GalleryShot[] }> = {
  glow: {
    icon: "/studio/assets/work/glow-icon.webp",
    screens: ["/studio/assets/work/glow-1.webp", "/studio/assets/work/glow-2.webp", "/studio/assets/work/glow-3.webp"],
    gallery: [
      { src: "/studio/assets/work/glow-2.webp", caption: "gloww.dev, the hero" },
      { src: "/studio/assets/work/glow-1.webp", caption: "Start with the look" },
      { src: "/studio/assets/work/glow-3.webp", caption: "The free skin scan" },
    ],
  },
  carenearby: {
    icon: "/studio/assets/work/care-icon.webp",
    screens: [
      "/studio/assets/carenearby/services.jpeg",
      "/studio/assets/carenearby/home.jpeg",
      "/studio/assets/carenearby/caregivers.jpeg",
    ],
    gallery: [
      { src: "/studio/assets/carenearby/home.jpeg", caption: "Home, on demand or scheduled" },
      { src: "/studio/assets/carenearby/services.jpeg", caption: "Seven care categories" },
      { src: "/studio/assets/carenearby/schedule.jpeg", caption: "Pick a date and time" },
      { src: "/studio/assets/carenearby/caregivers.jpeg", caption: "Verified caregiver profiles" },
      { src: "/studio/assets/carenearby/french.jpeg", caption: "The same app, in French" },
    ],
  },
  "lami-nepal": {
    icon: "/studio/assets/work/lami-icon.webp",
    screens: ["/studio/assets/work/lami-1.webp", "/studio/assets/work/lami-2.webp"],
    gallery: [
      { src: "/studio/assets/work/lami-1.webp", caption: "Find the light to your life" },
      { src: "/studio/assets/work/lami-2.webp", caption: "Services, priced in Nepali" },
      { src: "/studio/assets/work/lami-3.webp", caption: "Wedding services, one house" },
    ],
  },
  "amit-blends": {
    icon: "/studio/assets/work/amit-icon.webp",
    screens: ["/studio/assets/work/amit-2.webp", "/studio/assets/work/amit-1.webp", "/studio/assets/work/amit-3.webp"],
    gallery: [
      { src: "/studio/assets/work/amit-1.webp", caption: "Shopfront, above the fold" },
      { src: "/studio/assets/work/amit-2.webp", caption: "Recent work, from the chair" },
      { src: "/studio/assets/work/amit-4.webp", caption: "More cuts, more proof" },
      { src: "/studio/assets/work/amit-3.webp", caption: "Booking request, WhatsApp handoff" },
    ],
  },
};
