import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY } from "@/content/legal/privacy";
import { buildLegalMetadata } from "@/utils/legalMetadata";

export const metadata: Metadata = buildLegalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} />;
}
