import type { Metadata } from "next";
import { LEGAL_PAGES, type LegalPageSlug } from "./legal";

export const buildLegalMetadata = (slug: LegalPageSlug): Metadata => {
  const page =
    LEGAL_PAGES.find((legalPage) => legalPage.slug === slug) ?? LEGAL_PAGES[0];
  const title = `${page.title} – Zart`;

  return {
    title,
    description: page.description,
    alternates: {
      canonical: page.href
    },
    openGraph: {
      title,
      description: page.description,
      url: page.href,
      type: "website"
    }
  };
};
