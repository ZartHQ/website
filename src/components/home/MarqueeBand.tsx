const ITEMS = [
  "100+ vetted artisans",
  "Quality you can trust",
  "Wallet friendly prices",
  "Lagos Mainland & Island"
];

const Row = () => (
  <>
    {ITEMS.map((item) => (
      <span key={item} className="inline-flex shrink-0 items-center whitespace-nowrap">
        <span className="px-6 text-[15px] font-medium uppercase tracking-[0.08em] text-zart-green">
          {item}
        </span>
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-zart-gold" />
      </span>
    ))}
  </>
);

/**
 * CSS-driven so it costs nothing in JS. Two identical rows sit side by side
 * and the track shifts by exactly half its width, so the loop is seamless.
 */
export const MarqueeBand = () => (
  <div className="overflow-hidden border-y border-zart-line bg-zart-mist py-4">
    <div className="zart-marquee flex w-max">
      <Row />
      <Row />
    </div>
  </div>
);
