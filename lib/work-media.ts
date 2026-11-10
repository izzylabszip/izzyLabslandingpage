import type { Project } from "@/lib/projects-data";

/** Real icons and screens for each build, shared with the v30 home showcase in public/studio. */
export const workMedia: Record<Project["slug"], { icon: string; screens: string[] }> = {
  glow: {
    icon: "/studio/assets/work/glow-icon.webp",
    screens: ["/studio/assets/work/glow-1.webp", "/studio/assets/work/glow-2.webp", "/studio/assets/work/glow-3.webp"],
  },
  carenearby: {
    icon: "/studio/assets/work/care-icon.webp",
    screens: [
      "/studio/assets/carenearby/services.jpeg",
      "/studio/assets/carenearby/home.jpeg",
      "/studio/assets/carenearby/caregivers.jpeg",
    ],
  },
  "lami-nepal": {
    icon: "/studio/assets/work/lami-icon.webp",
    screens: ["/studio/assets/work/lami-1.webp", "/studio/assets/work/lami-2.webp"],
  },
  "amit-blends": {
    icon: "/studio/assets/work/amit-icon.webp",
    screens: ["/studio/assets/work/amit-2.webp", "/studio/assets/work/amit-1.webp", "/studio/assets/work/amit-3.webp"],
  },
};
