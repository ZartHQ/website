import Image from "next/image";
import Link from "next/link";
import { LEGAL_LINKS, SERVICES } from "@/utils/homeContent";

const COMPANY = [
  { label: "How it works", href: "/#how" },
  { label: "Our guarantee", href: "/#guarantee" },
  { label: "For artisans", href: "/artisans" },
  { label: "Book an artisan", href: "/#book" }
];

const HEADING =
  "mb-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/40";
const ITEM = "block py-1.5 text-[15px] hover:text-white";

export const SiteFooter = () => (
  <footer className="bg-zart-ink pb-10 pt-12 text-white/60 md:pt-14">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid gap-10 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <div>
          <Image
            src="/zart-logo.svg"
            alt="Zart"
            width={84}
            height={35}
            className="brightness-0 invert"
          />
          <p className="mt-3 max-w-[30ch] text-sm leading-relaxed">
            Vetted artisans across Lagos, with an invoice you can actually read.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          <div>
            <h4 className={HEADING}>Services</h4>
            {SERVICES.map((s) => (
              <Link key={s.name} href="/#services" className={ITEM}>
                {s.name}
              </Link>
            ))}
          </div>

          <div>
            <h4 className={HEADING}>Company</h4>
            {COMPANY.map((c) => (
              <Link key={c.href} href={c.href} className={ITEM}>
                {c.label}
              </Link>
            ))}
          </div>

          <div className="col-span-2 sm:col-span-1">
            <h4 className={HEADING}>Legal</h4>
            {LEGAL_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={ITEM}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-5 font-mono text-[11px]">
        <span>&copy; {new Date().getFullYear()} Zart</span>
        <span>zarthq.com</span>
      </div>
    </div>
  </footer>
);
