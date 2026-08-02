import Image from "next/image";

/**
 * Sits flush against the bottom of the For Artisans card so the two read as
 * one block rather than a picture floating below a panel.
 *
 * Loaded as a file, not the inline SVG component in svgs.tsx: inlining put
 * ~370 kB of path data into the homepage bundle.
 */
export const ArtisanIllustration = () => (
  <Image
    src="/artisans-illustration.svg"
    alt=""
    aria-hidden="true"
    width={1440}
    height={560}
    unoptimized
    loading="lazy"
    className="mt-6 block h-auto w-full select-none md:mt-0"
  />
);
