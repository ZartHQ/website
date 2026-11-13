import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { REFUND } from "@/content/legal/refund";
import { buildLegalMetadata } from "@/utils/legalMetadata";

export const metadata: Metadata = buildLegalMetadata("refund");

export default function RefundPage() {
  return <LegalPage doc={REFUND} />;
}
