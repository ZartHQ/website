import Link from "next/link";

const BENEFITS = [
  "Jobs matched to your trade and your side of Lagos",
  "We agree the price with the customer, not you",
  "Paid on completion, every job \u2014 we keep 10%",
  "Free to join, no subscription"
];

export const ForArtisans = () => (
  <section id="artisans" className="pb-16 md:pb-24">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid items-center gap-8 rounded-xl bg-zart-green p-8 text-white md:grid-cols-[1.1fr_0.9fr] md:gap-14 md:p-14">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
            For artisans
          </p>
          <h2 className="mb-4 mt-3 font-satoshi text-3xl font-black leading-tight md:text-4xl">
            Looking for customers? We go run am.
          </h2>
          <p className="max-w-[44ch] text-[16.5px] text-white/85">
            Zart brings you jobs near you and handles the customer, the pricing and the invoice, so
            you can get on with the work.
          </p>
          <Link
            href="/artisans/form"
            className="mt-6 inline-block rounded-lg bg-white px-7 py-3.5 font-semibold text-zart-green transition hover:bg-zart-mist"
          >
            Sign up as an artisan
          </Link>
        </div>
        <ul className="grid gap-3">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[15.5px]">
              <span className="font-bold">&#10003;</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);
