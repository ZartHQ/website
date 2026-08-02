"use client";

import { useState } from "react";
import { EXAMPLE_INVOICES } from "@/utils/homeContent";

const NAIRA = "\u20A6";

export const InvoicePreview = () => {
  const [active, setActive] = useState(EXAMPLE_INVOICES[0].key);
  const invoice = EXAMPLE_INVOICES.find((i) => i.key === active) ?? EXAMPLE_INVOICES[0];

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap gap-2" role="group" aria-label="See an example job">
        {EXAMPLE_INVOICES.map((i) => {
          const on = i.key === active;
          return (
            <button
              key={i.key}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(i.key)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.05em] transition-colors ${
                on
                  ? "border-zart-green bg-zart-green text-white"
                  : "border-zart-line text-zart-body hover:border-zart-green hover:text-zart-green"
              }`}
            >
              {i.label}
            </button>
          );
        })}
      </div>

      <article
        aria-live="polite"
        className="overflow-hidden rounded-lg border border-zart-line bg-white shadow-[0_18px_40px_-30px_rgba(12,30,34,0.45)]"
      >
        <div className="h-1 bg-zart-green" />

        <div className="border-b border-zart-line px-6 pb-4 pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-zart-green">
            <span>Zart service invoice</span>
            <strong className="font-bold text-zart-ink">{invoice.ref}</strong>
          </div>
          <h3 className="mt-3 font-satoshi text-xl font-black leading-tight text-zart-ink md:text-2xl">
            {invoice.job}
          </h3>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 font-mono text-xs">
            <dt className="pt-0.5 text-[10.5px] uppercase tracking-[0.08em] text-zart-body/70">Artisan</dt>
            <dd className="font-medium text-zart-ink">Assigned before arrival</dd>
            <dt className="pt-0.5 text-[10.5px] uppercase tracking-[0.08em] text-zart-body/70">Status</dt>
            <dd className="font-bold text-zart-green">Vetted by Zart &#10003;</dd>
            <dt className="pt-0.5 text-[10.5px] uppercase tracking-[0.08em] text-zart-body/70">Area</dt>
            <dd className="font-medium text-zart-ink">{invoice.area}</dd>
          </dl>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-[1fr_80px_86px] gap-2 border-b border-zart-line pb-2.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-zart-body/70">
            <span>Description</span>
            <span className="text-right">Unit price</span>
            <span className="text-right">Line total</span>
          </div>

          {invoice.lines.map((line) => (
            <div
              key={line.description}
              className="grid grid-cols-[1fr_80px_86px] gap-2 border-b border-zart-line/50 py-2.5 font-mono text-xs"
            >
              <span className="text-zart-body">{line.description}</span>
              <span className="text-right tabular-nums text-zart-ink">{line.unitPrice}</span>
              <span className="text-right tabular-nums text-zart-ink">{line.lineTotal}</span>
            </div>
          ))}

          <div className="flex items-baseline justify-between gap-4 pt-4 font-mono">
            <span className="text-[11px] uppercase tracking-[0.16em] text-zart-body/70">Total</span>
            <span className="text-2xl font-bold tabular-nums text-zart-ink md:text-[28px]">
              {NAIRA}
              {invoice.total}
            </span>
          </div>
        </div>

        <div className="bg-zart-ink px-6 py-4 font-mono text-[11.5px] leading-relaxed text-white/75">
          <strong className="font-bold text-white">You pay Zart, not the artisan.</strong> Parts and
          workmanship listed separately &mdash; nothing added after the job.
        </div>
      </article>
    </div>
  );
};
