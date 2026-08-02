import { STEPS } from "@/utils/homeContent";

export const HowItWorks = () => (
  <section id="how" className="py-16 md:py-24">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zart-body/70">How it works</p>
      <h2 className="mb-3 mt-3 max-w-[22ch] font-poppins text-3xl font-bold leading-tight text-zart-ink md:text-[40px]">
        Four steps, and your money stays with Zart
      </h2>
      <p className="mb-10 max-w-[52ch] text-lg text-zart-body">
        No cash handed to a stranger. No haggling at your gate.
      </p>

      <div className="border-t border-zart-line">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="grid grid-cols-[44px_1fr] items-baseline gap-x-4 gap-y-3 border-b border-zart-line py-6 md:grid-cols-[64px_1fr_1.15fr] md:gap-x-10"
          >
            <span className="rounded border border-zart-line py-1 text-center font-mono text-[11px] tracking-[0.1em] text-zart-green">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-poppins text-xl font-bold text-zart-ink">{step.title}</h3>
            <p className="col-start-2 text-[15.5px] text-zart-body md:col-start-3">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
