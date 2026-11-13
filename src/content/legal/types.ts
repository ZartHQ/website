export type LegalListItem = {
  /** Explicit clause label, e.g. "7.1.1." — rendered instead of a list marker. */
  label?: string;
  text: string;
};

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "clause"; label: string; text: string }
  | { kind: "h3"; text: string }
  | {
      kind: "list";
      style: "decimal" | "alpha" | "bullet" | "labelled";
      items: LegalListItem[];
    }
  | { kind: "definitions"; items: LegalListItem[] };

export type LegalSection = {
  /** Anchor id used by the table of contents. */
  id: string;
  /** Clause number shown before the heading, e.g. "4". */
  number?: string;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  slug: "terms" | "privacy" | "refund";
  title: string;
  intro?: string[];
  sections: LegalSection[];
};
