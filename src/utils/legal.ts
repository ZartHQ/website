export const LEGAL_LAST_UPDATED = "13 November 2026";
export const LEGAL_LAST_UPDATED_ISO = "2026-11-13";

export const LEGAL_PAGES = [
  {
    slug: "terms",
    href: "/legal/terms",
    label: "Terms of Use",
    title: "Terms of Use",
    description:
      "The terms that govern use of the Zart app and website by customers and service providers."
  },
  {
    slug: "privacy",
    href: "/legal/privacy",
    label: "Privacy Policy",
    title: "Privacy Policy",
    description:
      "How Zart Technologies Limited collects, uses, shares and protects personal data when you use the Zart app and website."
  },
  {
    slug: "refund",
    href: "/legal/refund",
    label: "Refund & Cancellation Policy",
    title: "Refund & Cancellation Policy",
    description:
      "When and how Zart issues refunds and handles cancellations for services booked through the Zart app."
  }
] as const;

export type LegalPageSlug = (typeof LEGAL_PAGES)[number]["slug"];
