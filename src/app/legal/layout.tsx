import type { ReactNode } from "react";
import { SiteNav } from "@/components/home/SiteNav";
import { SiteFooter } from "@/components/home/SiteFooter";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
