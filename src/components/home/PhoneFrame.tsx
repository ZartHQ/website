import Image from "next/image";

type PhoneFrameProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * A minimal device frame. Screenshots are pre-cropped so the image starts at
 * the app UI, with no status bar or home indicator.
 */
export const PhoneFrame = ({
  src,
  alt,
  width = 828,
  height = 1688,
  className = "",
  priority = false
}: PhoneFrameProps) => (
  <div
    className={`relative rounded-[2.5rem] bg-zart-ink p-[7px] shadow-[0_35px_70px_-30px_rgba(12,30,34,0.55)] ring-1 ring-black/10 ${className}`}
  >
    <div className="overflow-hidden rounded-[2.1rem] bg-zart-ink">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 640px) 60vw, 320px"
        className="h-auto w-full"
      />
    </div>
    <span
      aria-hidden
      className="absolute -left-[3px] top-[22%] h-10 w-[3px] rounded-l bg-zart-ink/70"
    />
    <span
      aria-hidden
      className="absolute -right-[3px] top-[28%] h-14 w-[3px] rounded-r bg-zart-ink/70"
    />
  </div>
);
