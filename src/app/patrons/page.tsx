import HeroContent from "@/components/hero";
import { MarqueeText } from "@/components/marquee";
import { PageToggle } from "@/components/pageToggle";
import SkyLine from "@/components/skyLine";
import { ARTISAN_CONTENT, PATRON_CONTENT } from "@/utils/pageContent";
import React from "react";

const PatronPage = () => {
  return (
    <div className="h-[80vh]  md:h-screen">
      <div className="max-w-4xl mx-auto px-4 pt-1 md:pt-8 relative z-10">
        <div className="flex justify-center mt-3 md:mt-14 mb-12">
          <PageToggle currentPage="patron" />
        </div>

        <HeroContent content={PATRON_CONTENT} />
      </div>

      <SkyLine selectedForm="patron" />

      <div className="absolute bottom-0 left-0 right-0 bg-transparent">
        <MarqueeText
          text={PATRON_CONTENT.marqueeText}
          className="font-bold py-2 h-[48px]"
        />
      </div>
    </div>
  );
};

export default PatronPage;
