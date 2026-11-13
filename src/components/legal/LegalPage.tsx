import Link from "next/link";
import { Fragment } from "react";
import { ArrowLeft, ArrowUp, ChevronDown } from "lucide-react";
import type {
  LegalBlock,
  LegalDoc,
  LegalListItem,
  LegalSection
} from "@/content/legal/types";
import {
  LEGAL_LAST_UPDATED,
  LEGAL_LAST_UPDATED_ISO,
  LEGAL_PAGES
} from "@/utils/legal";

const LINK =
  "font-medium text-zart-green underline decoration-zart-green/30 underline-offset-2 transition-colors hover:decoration-zart-green";

const INLINE_PATTERN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;

const InlineText = ({ text }: { text: string }) => (
  <>
    {text.split(INLINE_PATTERN).map((part, index) => {
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        const external = href.startsWith("http");
        return (
          <a
            key={index}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={LINK}
          >
            {label}
          </a>
        );
      }

      const bold = part.match(/^\*\*([^*]+)\*\*$/);
      if (bold) {
        return (
          <strong key={index} className="font-semibold text-zart-ink">
            {bold[1]}
          </strong>
        );
      }

      return <Fragment key={index}>{part}</Fragment>;
    })}
  </>
);

const ListItems = ({ items }: { items: LegalListItem[] }) => (
  <>
    {items.map((item, index) => (
      <li key={index}>
        <InlineText text={item.text} />
      </li>
    ))}
  </>
);

const Block = ({ block }: { block: LegalBlock }) => {
  switch (block.kind) {
    case "p":
      return (
        <p className="text-[15.5px] leading-7 text-zart-body">
          <InlineText text={block.text} />
        </p>
      );

    case "clause":
      return (
        <p className="text-[15.5px] leading-7 text-zart-body">
          <span className="mr-2 font-outfit text-[13px] font-medium text-zart-green">
            {block.label}
          </span>{" "}
          <InlineText text={block.text} />
        </p>
      );

    case "h3":
      return (
        <h3 className="text-[16px] font-semibold leading-6 text-zart-ink">
          {block.text}
        </h3>
      );

    case "list": {
      if (block.style === "labelled") {
        return (
          <ul className="space-y-3">
            {block.items.map((item, index) => (
              <li
                key={index}
                className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-x-1.5 text-[15.5px] leading-7 text-zart-body sm:grid-cols-[4rem_minmax(0,1fr)]"
              >
                <span className="font-outfit text-[13px] font-medium leading-7 text-zart-green">
                  {item.label}
                </span>
                <span>
                  <InlineText text={item.text} />
                </span>
              </li>
            ))}
          </ul>
        );
      }

      const listClass =
        block.style === "alpha"
          ? "list-[lower-alpha]"
          : block.style === "decimal"
            ? "list-decimal"
            : "list-disc";

      const ListTag = block.style === "bullet" ? "ul" : "ol";

      return (
        <ListTag
          className={`${listClass} space-y-2.5 pl-5 text-[15.5px] leading-7 text-zart-body marker:font-medium marker:text-zart-green`}
        >
          <ListItems items={block.items} />
        </ListTag>
      );
    }

    case "definitions":
      return (
        <dl className="space-y-4">
          {block.items.map((item, index) => (
            <div key={index}>
              <dt className="text-[15.5px] font-semibold leading-6 text-zart-ink">
                <InlineText text={item.label ?? ""} />
              </dt>
              <dd className="mt-1 text-[15.5px] leading-7 text-zart-body">
                <InlineText text={item.text} />
              </dd>
            </div>
          ))}
        </dl>
      );

    default:
      return null;
  }
};

const tocLabel = (section: LegalSection) =>
  section.number ? `${section.number}. ${section.title}` : section.title;

const TocLinks = ({ sections }: { sections: LegalSection[] }) => (
  <>
    {sections.map((section) => (
      <li key={section.id}>
        <a
          href={`#${section.id}`}
          className="block border-l-2 border-transparent py-1 pl-3 text-[13.5px] leading-snug text-zart-body/80 transition-colors hover:border-zart-green hover:text-zart-ink"
        >
          {tocLabel(section)}
        </a>
      </li>
    ))}
  </>
);

export const LegalPage = ({ doc }: { doc: LegalDoc }) => {
  const otherPages = LEGAL_PAGES.filter((page) => page.slug !== doc.slug);

  return (
    <div id="top">
      <header className="border-b border-zart-line bg-zart-mist print:bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-12 md:px-8 md:pb-14 md:pt-16">
          <div className="max-w-[68ch]">
            <p className="font-outfit text-[11px] font-medium uppercase tracking-[0.16em] text-zart-green">
              Legal
            </p>
            <h1 className="mt-3 text-[30px] font-semibold leading-[1.1] tracking-tight text-zart-ink sm:text-[38px] md:text-[44px]">
              {doc.title}
            </h1>
            <p className="mt-4 text-sm text-zart-body">
              Last updated{" "}
              <time dateTime={LEGAL_LAST_UPDATED_ISO}>
                {LEGAL_LAST_UPDATED}
              </time>
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-14">
        <div className="lg:grid lg:grid-cols-[minmax(0,68ch)_15rem] lg:gap-12 xl:gap-20">
          <article className="min-w-0 max-w-[68ch] print:max-w-none">
            <details className="mb-10 rounded-xl border border-zart-line bg-zart-mist lg:hidden print:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-zart-ink [&::-webkit-details-marker]:hidden">
                On this page
                <ChevronDown className="h-4 w-4 text-zart-body/60" aria-hidden />
              </summary>
              <nav
                aria-label="On this page"
                className="border-t border-zart-line px-4 py-3"
              >
                <ul className="space-y-1">
                  <TocLinks sections={doc.sections} />
                </ul>
              </nav>
            </details>

            {doc.intro && doc.intro.length > 0 ? (
              <div className="mb-10 space-y-4 text-[15.5px] leading-7 text-zart-body">
                {doc.intro.map((paragraph, index) => (
                  <p key={index}>
                    <InlineText text={paragraph} />
                  </p>
                ))}
              </div>
            ) : null}

            <div className="space-y-10 md:space-y-12">
              {doc.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 border-t border-zart-line pt-8 first:border-t-0 first:pt-0"
                >
                  <h2 className="flex gap-2.5 text-[21px] font-semibold leading-snug tracking-tight text-zart-ink md:text-[23px]">
                    {section.number ? (
                      <span className="font-outfit text-zart-green">
                        {section.number}.
                      </span>
                    ) : null}
                    <span>{section.title}</span>
                  </h2>
                  <div className="mt-4 space-y-5">
                    {section.blocks.map((block, index) => (
                      <Block key={index} block={block} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <footer className="mt-14 border-t border-zart-line pt-6 print:hidden">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-zart-green hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Back to home
                </Link>
                <a
                  href="#top"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm text-zart-body hover:text-zart-ink"
                >
                  Back to top
                  <ArrowUp className="h-4 w-4" aria-hidden />
                </a>
              </div>

              <nav aria-label="Other legal pages" className="mt-8">
                <h2 className="font-outfit text-[10.5px] uppercase tracking-[0.14em] text-zart-body/70">
                  Other policies
                </h2>
                <ul className="mt-2 flex flex-wrap gap-x-6">
                  {otherPages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        href={page.href}
                        className="inline-flex min-h-[44px] items-center text-sm text-zart-green hover:underline"
                      >
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </footer>
          </article>

          <aside className="hidden lg:block print:hidden">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-6 pr-1">
              <p className="font-outfit text-[10.5px] uppercase tracking-[0.14em] text-zart-body/70">
                On this page
              </p>
              <nav aria-label="On this page" className="mt-2">
                <ul className="space-y-1">
                  <TocLinks sections={doc.sections} />
                </ul>
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
