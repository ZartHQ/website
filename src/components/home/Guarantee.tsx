import { REFUND_URL } from "@/utils/patronFormShared";

export const Guarantee = () => (
  <section id="guarantee" className="pb-16 md:pb-24">
    <div className="mx-auto max-w-6xl px-4 md:px-8">
      <div className="grid items-center gap-6 rounded-xl border border-zart-line border-l-4 border-l-zart-green bg-zart-mist p-6 md:grid-cols-[1fr_auto] md:gap-10 md:p-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zart-body/70">
            Our guarantee
          </p>
          <h2 className="mb-3 mt-3 font-poppins text-3xl font-bold leading-tight text-zart-ink md:text-4xl">
            If the work isn&rsquo;t right, tell us
          </h2>
          <p className="max-w-[52ch] text-[16.5px] text-zart-body">
            Every job Zart sends out is covered by our service guarantee. If something we fixed
            fails, or the work wasn&rsquo;t done properly, contact us and we&rsquo;ll put it right.
            Read our full{" "}
            <a
              href={REFUND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-zart-green underline"
            >
              refund and cancellation policy
            </a>
            .
          </p>
        </div>
        <a
          href="#book"
          className="whitespace-nowrap rounded-lg border border-zart-ink px-7 py-3.5 text-center font-semibold text-zart-ink transition hover:bg-zart-ink hover:text-white"
        >
          Book an artisan
        </a>
      </div>
    </div>
  </section>
);
