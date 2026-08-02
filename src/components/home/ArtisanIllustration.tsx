import Image from "next/image";

/**
 * Closes the For Artisans band.
 *
 * Loaded as a file rather than the inline ArtisanSVG component from
 * svgs.tsx: inlining it put ~370 kB into the homepage's JS bundle, where
 * this costs about 19 kB gzipped and lazy-loads below the fold.
 */
export const ArtisanIllustration = () => (
  <div aria-hidden="true" className="mt-10 overflow-hidden rounded-lg">
    <Image
      src="/artisan-clip.svg"
      alt=""
      width={1440}
      height={559}
      unoptimized
      loading="lazy"
      className="h-auto w-full"
    />
  </div>
);
