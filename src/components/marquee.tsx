import { MarqueeTextProps } from '@/utils/type';
import * as motion from "motion/react-client"

export const MarqueeText = ({ text, className = '' }: MarqueeTextProps) => {
    const splitText = text.split('  ')
    const repeatedContent = Array(4)
    .fill(splitText)
    .flat()
    .map((block, index) => (
      <span key={index} className="inline-flex items-center mx-2 whitespace-nowrap">
        <span>{block}</span>
        <span
          className="inline-block w-[12px] h-[12px] bg-[#D4D4D6] rounded-full mx-2"
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
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >

{repeatedContent}

      </motion.div>
    </div>
  );
};
