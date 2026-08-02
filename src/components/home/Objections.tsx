import { OBJECTIONS } from "@/utils/homeContent";

export const Objections = () => (
  <section className="bg-zart-ink py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
        Everybody has a story
      </p>
      <h2 className="mb-12 mt-3 max-w-[20ch] font-poppins text-3xl font-bold leading-tight text-white md:text-[40px]">
        Three things go wrong. We built around all three.
      </h2>

      <div className="grid gap-px bg-white/15 md:grid-cols-3">
        {OBJECTIONS.map((o) => (
          <div key={o.quote} className="bg-zart-ink px-6 pb-8 pt-7">
            <blockquote className="mb-5 font-poppins text-lg font-medium leading-snug text-white">
              &ldquo;{o.quote}&rdquo;
            </blockquote>
            <div className="flex items-start gap-3">
              <span className="shrink-0 pt-0.5 font-mono text-sm font-bold text-zart-green">&rarr;</span>
              <p className="text-[14.5px] leading-relaxed text-white/70">{o.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
