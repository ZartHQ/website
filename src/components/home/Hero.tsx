import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { StoreBadges } from "./StoreBadges";
import { TRUST_POINTS } from "@/utils/launchContent";

export const Hero = () => (
  <header className="bg-white">
    <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
      <div className="zart-rise">
        <p className="font-outfit text-[11px] uppercase tracking-[0.16em] text-zart-body/70">
          The Zart app
        </p>
        <h1 className="mt-4 text-[40px] font-bold leading-[0.98] tracking-[-0.03em] text-zart-ink min-[360px]:text-[46px] sm:text-6xl lg:text-[76px]">
          Skilled hands.
          <br />
          <span className="text-zart-green">One tap away.</span>
        </h1>
        <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-zart-body md:text-xl">
          Zart connects you with verified carpenters, electricians, cleaners and
          plumbers — from the first request to the finished job.
        </p>

        <div id="download" className="mt-9 scroll-mt-28">
          <p className="mb-3 font-outfit text-[11px] uppercase tracking-[0.16em] text-zart-body/70">
            Download the app
          </p>
          <StoreBadges badgeClassName="h-[52px] max-[340px]:h-11" />
        </div>

        <Link
          href="#how"
          className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-semibold text-zart-ink transition-colors hover:text-zart-green"
        >
          <span className="border-b border-zart-ink/20 pb-1">
            See how it works
          </span>
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none">
        <div
          aria-hidden
          className="absolute inset-x-3 bottom-0 top-14 rounded-[2.6rem] bg-zart-green sm:inset-x-8 lg:inset-x-2"
        />
        <div
          aria-hidden
          className="absolute right-2 top-2 hidden h-24 w-24 rounded-full border-[10px] border-zart-gold sm:block lg:right-0"
        />

        <PhoneFrame
          src="/app/home.webp"
          alt="The Zart app home screen showing the four services you can request"
          priority
          className="relative mx-auto w-[250px] sm:w-[276px] lg:w-[310px] lg:translate-y-3"
        />

        <div className="absolute -bottom-5 left-0 hidden items-center gap-3 rounded-xl border border-zart-line bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(12,30,34,0.35)] sm:flex lg:-left-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zart-green/10 text-zart-green">
            <ShieldCheck className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-[13px] font-bold leading-tight text-zart-ink">
              Verified artisans
            </p>
            <p className="text-[11.5px] leading-tight text-zart-body/70">
              ID, skills and conduct checked
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="border-y border-zart-line">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <ul className="grid divide-y divide-zart-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {TRUST_POINTS.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 py-4 text-[13.5px] leading-snug text-zart-body md:px-6 md:py-5 md:first:pl-0 md:last:pr-0"
            >
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-zart-green"
                strokeWidth={2.5}
                aria-hidden
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </header>
);
