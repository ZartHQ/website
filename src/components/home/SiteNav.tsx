import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "#how", label: "How it works" },
  { href: "#services", label: "Services" },
  { href: "#guarantee", label: "Guarantee" },
  { href: "/artisans", label: "For artisans" }
];

export const SiteNav = () => (
  <nav className="sticky top-0 z-40 border-b border-zart-line bg-white/90 backdrop-blur">
    <div className="mx-auto flex h-[68px] max-w-6xl items-center gap-8 px-4 md:px-8">
      <Link href="/" aria-label="Zart home">
        <Image src="/zart-logo.svg" alt="Zart" width={84} height={35} priority />
      </Link>
      <div className="ml-auto hidden gap-7 text-[15px] font-medium md:flex">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="text-zart-body transition-colors hover:text-zart-ink">
            {l.label}
          </Link>
        ))}
      </div>
      <Link
        href="/patrons/form"
        className="ml-auto rounded-lg bg-zart-ink px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-zart-green md:ml-0"
      >
        Book an artisan
      </Link>
    </div>
  </nav>
);
