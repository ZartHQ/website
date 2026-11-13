import Image from "next/image";
import { POPULAR_JOBS, SERVICES } from "@/utils/launchContent";

export const Services = () => (
  <section id="services" className="scroll-mt-20 py-16 md:py-28">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <p className="font-outfit text-[11px] uppercase tracking-[0.16em] text-zart-body/70">
        What you can get done
      </p>
      <h2 className="mt-4 max-w-[20ch] text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-zart-ink sm:text-4xl md:text-[44px]">
        The jobs around your home, handled.
      </h2>
      <p className="mt-4 max-w-[54ch] text-lg leading-relaxed text-zart-body">
        Choose the kind of artisan you need, tell us what&apos;s going on, and
        Zart takes it from there.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 md:mt-12 md:grid-cols-4 md:gap-x-6">
        {SERVICES.map((service) => (
          <div key={service.name} className="border-t border-zart-line pt-5">
            <Image
              src={service.img}
              alt=""
              width={288}
              height={288}
              className="h-20 w-20 rounded-[14%] object-cover shadow-[0_12px_26px_-16px_rgba(12,30,34,0.45)] ring-1 ring-black/5 md:h-24 md:w-24"
            />
            <h3 className="mt-4 text-lg font-bold text-zart-ink">
              {service.name}
            </h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-zart-body">
              {service.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 border-t border-zart-line pt-6 md:flex-row md:items-center md:justify-between">
        <h3 className="font-outfit text-[11px] uppercase tracking-[0.16em] text-zart-body/70">
          Popular jobs
        </h3>
        <ul className="flex flex-wrap gap-2 md:justify-end">
          {POPULAR_JOBS.map((job, index) => (
            <li
              key={job}
              className="zart-capsule rounded-full border border-zart-line bg-zart-mist px-3.5 py-1.5 text-[13px] text-zart-body shadow-[0_4px_12px_-8px_rgba(12,30,34,0.35)] transition-colors hover:border-zart-green/30 hover:bg-white"
              style={{
                animationDuration: `${5 + (index % 4) * 0.45}s`,
                animationDelay:
                  index === 0 ? "0s" : `-${(index * 0.55).toFixed(2)}s`
              }}
            >
              {job}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-[15px] leading-relaxed text-zart-body">
        <span className="font-semibold text-zart-ink">Something else?</span>{" "}
        Send a custom request from the app and tell Zart what you need.
      </p>
    </div>
  </section>
);
