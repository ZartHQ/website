import { SERVICE_CARDS, POPULAR_JOBS } from "@/utils/homeContent";

export const Services = () => (
  <section id="services" className="pb-16 md:pb-24">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <p className="font-outfit text-[11px] uppercase tracking-[0.14em] text-zart-body/70">
        Services
      </p>
      <h2 className="mb-3 mt-3 text-3xl font-bold leading-tight text-zart-ink md:text-[40px]">
        What do you need done?
      </h2>
      <p className="mb-10 max-w-[52ch] text-lg text-zart-body">
        Vetted carpenters, electricians, cleaners and plumbers for the jobs
        around your home. You see the full price before you pay.
      </p>

      {/* Colourful service cards, straight from the app */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {SERVICE_CARDS.map((s) => (
          <a
            key={s.name}
            href="#book"
            aria-label={s.name}
            className="group block overflow-hidden rounded-[20px] ring-1 ring-zart-line transition duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ boxShadow: "0 1px 0 rgba(12,30,34,0.04)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.img}
              alt={s.name}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </a>
        ))}
      </div>

      {/* Popular jobs chips, echoing the app */}
      <div className="mt-12">
        <h3 className="mb-5 text-lg font-bold text-zart-ink">Popular jobs</h3>
        <div className="flex flex-wrap gap-2.5">
          {POPULAR_JOBS.map((j) => (
            <a
              key={j.label}
              href="#book"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5"
              style={{
                backgroundColor: `${j.accent}14`,
                borderColor: `${j.accent}3D`,
                color: j.accent
              }}
            >
              <span aria-hidden className="text-base">
                {j.emoji}
              </span>
              {j.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
);
