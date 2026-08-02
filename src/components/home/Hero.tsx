import Link from "next/link";
import { InvoicePreview } from "./InvoicePreview";

const TRUST = ["Vetted artisans", "Itemised invoice", "Pay after the work"];

export const Hero = () => (
  <header className="py-12 md:py-20">
    <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zart-body/70">
          Lagos Mainland &amp; Island
        </p>
        <h1 className="my-4 font-satoshi text-4xl font-black leading-[1.03] text-zart-ink md:text-6xl">
          We know a guy.
          <br />
          <span className="text-zart-green">And he gives receipts.</span>
        </h1>
        <p className="max-w-[46ch] text-lg text-zart-body">
          Tell us what needs fixing. We send an artisan we&rsquo;ve vetted, and you get every part
          and every hour written down before you pay a naira.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#book"
            className="rounded-lg bg-zart-ink px-7 py-3.5 font-semibold text-white transition hover:bg-zart-green"
          >
            Book an artisan
          </Link>
          <Link
            href="#how"
            className="rounded-lg border border-zart-line px-7 py-3.5 font-semibold text-zart-ink transition hover:border-zart-ink"
          >
            See how it works
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.06em] text-zart-body/80">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="font-bold text-zart-green">&#10003;</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      <InvoicePreview />
    </div>
  </header>
);
