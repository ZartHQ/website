import { MarqueeTextProps } from "@/utils/type";
import * as motion from "motion/react-client";
import Image from "next/image";

export const MarqueeText = ({ text, className = "" }: MarqueeTextProps) => {
  const splitText = text.split("  ");
  const repeatedContent = Array(4)
    .fill(splitText)
    .flat()
    .map((block, index) => (
      <span
        key={index}
        className="inline-flex items-center whitespace-nowrap"
      >
        <span>{block}</span>
        <span
          className="inline-block w-[12px] h-[12px] bg-[#D4D4D6] rounded-full mx-3"
          aria-hidden="true"
        />
        <Image
          src="/zart-logo.svg"
          alt="logo"
          width={70}
          height={70}
        />
        <span
          className="inline-block w-[12px] h-[12px] bg-[#D4D4D6] rounded-full mx-3"
          aria-hidden="true"
        />
      </span>
    ));
  return (
    <div className="overflow-hidden bg-white whitespace-nowrap">
      <motion.div
        className={`inline-block text-[#115746] text-[20px] ${className}`}
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {repeatedContent}
      </motion.div>
    </div>
  );
};
