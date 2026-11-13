import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StoreBadges } from "./StoreBadges";
import { LEGAL_PAGES } from "@/utils/legal";
import { SOCIAL_LINKS } from "@/utils/launchContent";

const EXPLORE = [
  { label: "How it works", href: "/#how" },
  { label: "What you can get done", href: "/#services" },
  { label: "Book an artisan", href: "/patrons/form" },
  { label: "For artisans", href: "/artisans/form" }
];

const HEADING =
  "mb-3 font-outfit text-[10.5px] uppercase tracking-[0.14em] text-white/50";
const ITEM =
  "flex min-h-[44px] items-center py-1.5 text-[15px] hover:text-white lg:min-h-0";

export const SiteFooter = () => (
  <footer className="bg-zart-ink pb-10 pt-14 text-white/60 md:pt-16 print:hidden">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid gap-12 md:grid-cols-[1.4fr_0.9fr_1fr_1.1fr] md:gap-8">
        <div className="max-w-[34ch]">
          <Image
            src="/zart-logo.svg"
            alt="Zart"
            width={84}
            height={35}
            className="brightness-0 invert"
          />
          <p className="mt-4 text-sm leading-relaxed">
            Skilled artisans for the jobs around your home — now in the Zart
            app.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="inline-flex min-h-[44px] items-center gap-1 text-sm transition-colors hover:text-white"
                >
                  {social.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={HEADING}>Explore</h4>
          {EXPLORE.map((link) => (
            <Link key={link.href} href={link.href} className={ITEM}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className={HEADING}>Legal</h4>
          {LEGAL_PAGES.map((link) => (
            <Link key={link.href} href={link.href} className={ITEM}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h4 className={HEADING}>Get the app</h4>
          <StoreBadges className="mt-1" badgeClassName="h-11 lg:h-10" />
        </div>
      </div>

      <div className="mt-12 flex flex-wrap justify-between gap-2 border-t border-white/10 pt-5 font-outfit text-[11px]">
        <span>&copy; {new Date().getFullYear()} Zart</span>
        <span>zarthq.com</span>
      </div>
    </div>
  </footer>
);
