import { SERVICES } from "@/utils/homeContent";

export const Services = () => (
  <section id="services" className="pb-16 md:pb-24">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <p className="font-outfit text-[11px] uppercase tracking-[0.14em] text-zart-body/70">Services</p>
      <h2 className="mb-3 mt-3 text-3xl font-bold leading-tight text-zart-ink md:text-[40px]">
        What we cover
      </h2>
      <p className="mb-10 max-w-[52ch] text-lg text-zart-body">
        Pricing depends on the job. You see the full breakdown before you pay.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="rounded-lg border border-zart-line bg-white px-5 pb-7 pt-6 transition-colors hover:border-zart-green hover:bg-zart-mist"
          >
            <div className="mb-2 text-[17px] font-bold text-zart-ink">{s.name}</div>
            <div className="text-[13.5px] leading-snug text-zart-body">{s.examples}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
