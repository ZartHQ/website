import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS } from "@/content/legal/terms";
import { buildLegalMetadata } from "@/utils/legalMetadata";

export const metadata: Metadata = buildLegalMetadata("terms");

export default function TermsPage() {
  return <LegalPage doc={TERMS} />;
}
