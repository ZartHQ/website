"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#services", label: "What you can get done" },
  { href: "/artisans/form", label: "For artisans" }
];

const SCROLL_THRESHOLD = 16;

export const SiteNav = () => {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setFloating(window.scrollY > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div className="h-[68px] print:hidden" aria-hidden />

      <div
        className={`fixed inset-x-0 top-0 z-40 border-b transition-[padding,background-color,border-color] duration-300 ease-out motion-reduce:transition-none print:hidden ${
          floating
            ? "border-transparent bg-transparent px-3 pt-3 md:px-6"
            : "border-zart-line bg-white px-0 pt-0"
        }`}
      >
        <nav
          aria-label="Main"
          className={`mx-auto w-full max-w-6xl transition-[height,border-radius,background-color,border-color,box-shadow] duration-300 ease-out motion-reduce:transition-none ${
            floating
              ? "h-[60px] rounded-full border border-zart-line/80 bg-white/90 shadow-[0_12px_32px_rgba(12,30,34,0.12)] backdrop-blur-md"
              : "h-[68px] rounded-none border border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex h-full max-w-6xl items-center gap-8 px-4 md:px-8">
            <Link
              href="/"
              aria-label="Zart home"
              className="inline-flex min-h-[44px] shrink-0 items-center"
            >
              <Image
                src="/zart-logo.svg"
                alt="Zart"
                width={84}
                height={35}
                priority
              />
            </Link>

            <div className="ml-auto hidden gap-7 text-[15px] font-medium lg:flex">
              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zart-body transition-colors hover:text-zart-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              href="/#download"
              className={`ml-auto inline-flex min-h-[44px] items-center bg-zart-green px-4 text-[15px] font-semibold text-white transition-[background-color,border-radius] hover:bg-zart-green-dark sm:px-5 lg:ml-0 ${
                floating ? "rounded-full" : "rounded-lg"
              }`}
            >
              <span className="sm:hidden">Get the app</span>
              <span className="hidden sm:inline">Download the app</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
