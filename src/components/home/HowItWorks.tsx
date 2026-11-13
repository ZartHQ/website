import { MessageCircle } from "lucide-react";
import { PhoneFrame } from "./PhoneFrame";
import { STEPS } from "@/utils/launchContent";

export const HowItWorks = () => (
  <section
    id="how"
    className="scroll-mt-20 border-y border-zart-line bg-zart-mist py-16 md:py-28"
  >
    <div className="mx-auto grid max-w-6xl gap-10 px-4 md:px-8 lg:grid-cols-[0.94fr_1.06fr] lg:items-center lg:gap-x-14 lg:gap-y-0">
      <div className="lg:col-start-1 lg:row-start-1">
        <p className="font-outfit text-[11px] uppercase tracking-[0.16em] text-zart-body/70">
          How it works
        </p>
        <h2 className="mt-4 max-w-[18ch] text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-zart-ink sm:text-4xl md:text-[44px]">
          From request to done, in one place.
        </h2>
        <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-zart-body">
          No chasing phone numbers or repeating the story. The whole job lives
          in the app.
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[460px] py-2 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
        <div
          aria-hidden
          className="absolute right-6 top-0 h-32 w-32 rounded-full bg-zart-gold/20"
        />
        <div className="absolute right-0 top-8 hidden w-[43%] rotate-[6deg] sm:block">
          <PhoneFrame
            src="/app/activity.webp"
            alt="The Zart app activity screen showing pending and completed requests"
          />
        </div>
        <PhoneFrame
          src="/app/request.webp"
          alt="The Zart app request screen for adding job details, a location and a time"
          className="relative z-10 mx-auto w-[236px] sm:mx-0 sm:w-[58%]"
        />

        <div className="absolute -bottom-2 right-0 z-20 hidden max-w-[240px] items-start gap-3 rounded-xl border border-zart-line bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(12,30,34,0.35)] sm:flex lg:-right-2">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zart-green/10 text-zart-green">
            <MessageCircle className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-[13px] font-bold leading-tight text-zart-ink">
              Zart Support
            </p>
            <p className="text-[11.5px] leading-snug text-zart-body/70">
              Usually replies within a few hours
            </p>
          </div>
        </div>
      </div>

      <ol className="border-t border-zart-line lg:col-start-1 lg:row-start-2 lg:mt-10">
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="grid grid-cols-[36px_1fr] gap-4 border-b border-zart-line py-5"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zart-green/25 bg-white font-outfit text-[11px] font-semibold tracking-[0.08em] text-zart-green">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-lg font-bold text-zart-ink">{step.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-zart-body">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
