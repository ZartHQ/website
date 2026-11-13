import Image from "next/image";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/utils/launchContent";

const linkClass =
  "inline-block rounded-lg transition duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zart-green focus-visible:ring-offset-2";

export const StoreBadges = ({
  className = "",
  badgeClassName = "h-[52px]"
}: {
  className?: string;
  badgeClassName?: string;
}) => (
  <div className={`flex flex-wrap items-center gap-3 ${className}`}>
    <a
      href={APP_STORE_URL}
      aria-label="Download Zart on the App Store"
      className={linkClass}
    >
      <Image
        src="/badges/app-store.svg"
        alt="Download on the App Store"
        width={120}
        height={40}
        unoptimized
        className={`${badgeClassName} w-auto`}
      />
    </a>
    <a
      href={PLAY_STORE_URL}
      aria-label="Get Zart on Google Play"
      className={linkClass}
    >
      <Image
        src="/badges/google-play.png"
        alt="Get it on Google Play"
        width={646}
        height={250}
        className={`${badgeClassName} w-auto`}
      />
    </a>
  </div>
);
