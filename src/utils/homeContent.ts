export type InvoiceLine = {
  description: string;
  unitPrice: string;
  lineTotal: string;
};

export type ExampleInvoice = {
  key: string;
  label: string;
  ref: string;
  job: string;
  area: string;
  lines: InvoiceLine[];
  total: string;
};

/**
 * Plumbing uses real figures from invoice ZRT-0111.
 * TODO: swap the other four for real jobs before launch.
 */
export const EXAMPLE_INVOICES: ExampleInvoice[] = [
  {
    key: "plumbing",
    label: "Plumbing",
    ref: "ZRT-0111",
    job: "Repair of water pipe and taps",
    area: "Lagos Mainland",
    lines: [
      { description: "Water filter (1 unit)", unitPrice: "10,000", lineTotal: "10,000" },
      { description: "Taps (2 units)", unitPrice: "6,500", lineTotal: "13,000" },
      { description: "Seat cover (1 unit)", unitPrice: "6,500", lineTotal: "6,500" },
      { description: "Workmanship", unitPrice: "10,000", lineTotal: "10,000" }
    ],
    total: "39,500"
  },
  {
    key: "electrical",
    label: "Electrical",
    ref: "ZRT-0124",
    job: "Socket circuit fault — rewire and replace",
    area: "Lagos Island",
    lines: [
      { description: "Breaker (1 unit)", unitPrice: "9,000", lineTotal: "9,000" },
      { description: "Cable (10 m)", unitPrice: "1,200", lineTotal: "12,000" },
      { description: "Sockets (3 units)", unitPrice: "2,500", lineTotal: "7,500" },
      { description: "Workmanship", unitPrice: "15,000", lineTotal: "15,000" }
    ],
    total: "43,500"
  },
  {
    key: "carpentry",
    label: "Carpentry",
    ref: "ZRT-0131",
    job: "Wardrobe door refit and hinge replacement",
    area: "Lagos Mainland",
    lines: [
      { description: "Hinges (4 units)", unitPrice: "1,800", lineTotal: "7,200" },
      { description: "Handle (1 unit)", unitPrice: "3,500", lineTotal: "3,500" },
      { description: "Wood filler and fittings", unitPrice: "2,000", lineTotal: "2,000" },
      { description: "Workmanship", unitPrice: "9,000", lineTotal: "9,000" }
    ],
    total: "21,700"
  },
  {
    key: "painting",
    label: "Painting",
    ref: "ZRT-0138",
    job: "Two bedrooms repainted, walls and ceiling",
    area: "Lagos Mainland",
    lines: [
      { description: "Emulsion (4 buckets)", unitPrice: "12,000", lineTotal: "48,000" },
      { description: "Primer (1 bucket)", unitPrice: "9,000", lineTotal: "9,000" },
      { description: "Brushes, rollers, tape", unitPrice: "6,500", lineTotal: "6,500" },
      { description: "Workmanship", unitPrice: "35,000", lineTotal: "35,000" }
    ],
    total: "98,500"
  },
  {
    key: "cleaning",
    label: "Cleaning",
    ref: "ZRT-0145",
    job: "Deep clean, three-bedroom flat",
    area: "Lagos Island",
    lines: [
      { description: "Cleaning materials", unitPrice: "8,000", lineTotal: "8,000" },
      { description: "Workmanship (2 cleaners)", unitPrice: "15,000", lineTotal: "30,000" }
    ],
    total: "38,000"
  }
];

export const SERVICES = [
  { name: "Plumbing", examples: "Leaks, taps, pipes, tanks, bathroom fittings" },
  { name: "Electrical", examples: "Wiring, sockets, faults, fittings, installations" },
  { name: "Carpentry", examples: "Doors, wardrobes, furniture repair, fittings" },
  { name: "Painting", examples: "Rooms, whole flats, touch-ups and finishing" },
  { name: "Cleaning", examples: "Deep cleans, post-construction, move-in and out" }
];

/** The four headline services, shown as the app's colourful illustrated cards. */
export const SERVICE_CARDS = [
  { name: "Carpenter", img: "/services/carpenter.svg", accent: "#FA4812" },
  { name: "Electrician", img: "/services/electrician.svg", accent: "#115746" },
  { name: "Cleaner", img: "/services/cleaner.svg", accent: "#1E5A8E" },
  { name: "Plumber", img: "/services/plumber.svg", accent: "#7D76B2" }
];

/** Common one-tap jobs, echoing the app's "Popular jobs" chips. */
export const POPULAR_JOBS = [
  { label: "Leak repair", emoji: "💧", accent: "#7D76B2" },
  { label: "Faulty wiring", emoji: "⚡", accent: "#115746" },
  { label: "Furniture repair", emoji: "🪑", accent: "#FA4812" },
  { label: "Deep cleaning", emoji: "🧽", accent: "#1E5A8E" },
  { label: "Clogged drain", emoji: "🪠", accent: "#7D76B2" },
  { label: "Install socket", emoji: "🔌", accent: "#115746" },
  { label: "Fix a door", emoji: "🚪", accent: "#FA4812" },
  { label: "Fumigation", emoji: "🦟", accent: "#1E5A8E" },
  { label: "Water heater", emoji: "🚿", accent: "#7D76B2" },
  { label: "Ceiling fan", emoji: "🌀", accent: "#115746" },
  { label: "Wardrobe install", emoji: "🗄️", accent: "#FA4812" },
  { label: "Move-out cleaning", emoji: "📦", accent: "#1E5A8E" }
];

export const OBJECTIONS = [
  {
    quote: "I paid him half upfront and never saw him again.",
    answer:
      "You never hand money to an artisan. You pay Zart, and we only release it to them once the job is done. If something goes wrong, you're dealing with a company, not a phone number."
  },
  {
    quote: "He said he was coming, then nobody showed up all day.",
    answer:
      "We confirm the date with you on WhatsApp and hold the artisan to it. If he can't make it, we tell you and send someone else."
  },
  {
    quote: "A stranger is in my house and I don't know his real name.",
    answer:
      "Every artisan on Zart is vetted before we send them anywhere, and you know who's coming before they get to your gate."
  }
];

export const STEPS = [
  {
    title: "Tell us what happened",
    body: "Fill the form with what's wrong, where you are, and when suits you. Add a photo if it helps. Takes about a minute."
  },
  {
    title: "We confirm on WhatsApp",
    body: "Someone from Zart messages you within minutes to check the details and agree a time."
  },
  {
    title: "You get an itemised invoice",
    body: "Every part and the workmanship, written down. You pay Zart, never the artisan directly, and we tell you who's coming before they arrive."
  },
  {
    title: "The artisan does the job",
    body: "We release the money to them once the work is finished and you're happy with it."
  }
];

import { PRIVACY_URL, REFUND_URL, TERMS_URL } from "./patronFormShared";

export const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: TERMS_URL },
  { label: "Privacy Policy", href: PRIVACY_URL },
  { label: "Refund & Cancellation Policy", href: REFUND_URL }
];
