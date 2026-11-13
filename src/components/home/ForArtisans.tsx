import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const ForArtisans = () => (
  <section id="artisans" className="scroll-mt-20 py-16 md:py-20">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-zart-green px-6 py-10 text-white sm:px-10 md:flex md:items-center md:justify-between md:gap-12 md:px-14 md:py-12">
        <div
          aria-hidden
          className="absolute -right-14 -top-14 h-44 w-44 rounded-full border-[14px] border-white/10"
        />
        <div className="relative">
          <p className="font-outfit text-[11px] uppercase tracking-[0.16em] text-zart-gold">
            For artisans
          </p>
          <h2 className="mt-3 text-2xl font-bold leading-tight tracking-[-0.01em] md:text-[32px]">
            Are you an artisan?
          </h2>
          <p className="mt-2 max-w-[52ch] text-[16px] leading-relaxed text-white/80">
            Join Zart and connect with people who need your skills.
          </p>
        </div>
        <Link
          href="/artisans/form"
          className="relative mt-7 inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-zart-gold px-6 py-3 font-semibold text-zart-ink transition hover:-translate-y-0.5 hover:bg-white md:mt-0 md:w-auto"
        >
          Join Zart
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  </section>
);
