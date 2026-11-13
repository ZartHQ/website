/**
 * Launch-page copy and links.
 *
 * TODO(launch): replace the placeholder store URLs with the live listings.
 * TODO(launch): replace the placeholder social URLs with Zart's real profiles.
 */
export const APP_STORE_URL = "#";
export const PLAY_STORE_URL = "#";

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#" },
  { label: "X (Twitter)", href: "#" },
  { label: "TikTok", href: "#" }
];

export const TRUST_POINTS = [
  "Artisans checked for ID, skills and conduct",
  "You pay Zart — we pay the artisan when the job's done",
  "An itemised invoice for every job"
];

export type Service = {
  name: string;
  img: string;
  accent: string;
  body: string;
};

export const SERVICES: Service[] = [
  {
    name: "Carpenter",
    img: "/services/carpenter.webp",
    accent: "#FA4812",
    body: "Doors, wardrobes, furniture repair and fittings."
  },
  {
    name: "Electrician",
    img: "/services/electrician.webp",
    accent: "#115746",
    body: "Wiring, sockets, faults and installations."
  },
  {
    name: "Cleaner",
    img: "/services/cleaner.webp",
    accent: "#0A499C",
    body: "Deep cleans, move-in and move-out cleaning."
  },
  {
    name: "Plumber",
    img: "/services/plumber.webp",
    accent: "#7D76B2",
    body: "Leaks, taps, pipes and bathroom fittings."
  }
];

export const POPULAR_JOBS = [
  "Leak repair",
  "Faulty wiring",
  "Furniture repair",
  "Deep cleaning",
  "Clogged drain",
  "Install socket",
  "Fix a door",
  "Move-out cleaning"
];

export const STEPS = [
  {
    title: "Create your account",
    body: "Download the app and set the address where you need the work done."
  },
  {
    title: "Tell us what needs doing",
    body: "Pick a service or send a custom request. Add the details, a photo if it helps, and a time that suits you."
  },
  {
    title: "Track it to done",
    body: "Follow your request from pending to assigned to completed. Zart Support is a chat away if you need anything."
  }
];
