import Image from "next/image";
import Link from "next/link";
import { LEGAL_LINKS, SERVICES } from "@/utils/homeContent";

export const SiteFooter = () => (
  <footer className="bg-zart-ink pb-10 pt-14 text-white/60">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div>
          <Image
            src="/zart-logo.svg"
            alt="Zart"
            width={84}
            height={35}
            className="brightness-0 invert"
          />
          <p className="mt-3 max-w-[28ch] text-sm">
            Vetted artisans across Lagos, with an invoice you can actually read.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-16">
          <div>
            <h4 className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">
              Services
            </h4>
            {SERVICES.map((s) => (
              <Link key={s.name} href="/#services" className="block py-1 text-[14.5px] hover:text-white">
                {s.name}
              </Link>
            ))}
          </div>

          <div>
            <h4 className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">
              Company
            </h4>
            <Link href="/#how" className="block py-1 text-[14.5px] hover:text-white">How it works</Link>
            <Link href="/#guarantee" className="block py-1 text-[14.5px] hover:text-white">Our guarantee</Link>
            <Link href="/artisans" className="block py-1 text-[14.5px] hover:text-white">For artisans</Link>
            <Link href="/#book" className="block py-1 text-[14.5px] hover:text-white">Book an artisan</Link>
          </div>

          <div>
            <h4 className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40">
              Legal
            </h4>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="block py-1 text-[14.5px] hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 font-mono text-[11px]">
        <span>&copy; {new Date().getFullYear()} Zart</span>
        <span>zarthq.com</span>
      </div>
    </div>
  </footer>
);
