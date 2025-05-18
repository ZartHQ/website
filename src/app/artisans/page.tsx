import HeroContent from "@/components/hero";
import { MarqueeText } from "@/components/marquee";
import { PageToggle } from "@/components/pageToggle";
import SkyLine from "@/components/skyLine";
import { ARTISAN_CONTENT } from "@/utils/pageContent";
import React from "react";

const ArtisanPage = () => {
  return (
    <div className="h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 pt-1 md:pt-8 relative z-10">
        <div className="flex justify-center mt-3 md:mt-14 mb-12">
          <PageToggle currentPage="artisan" />
        </div>

        <HeroContent content={ARTISAN_CONTENT} />
      </div>

      <SkyLine selectedForm="artisan"/>

      <div className="absolute bottom-0 left-0 right-0 bg-transparent">
        <MarqueeText
          text={ARTISAN_CONTENT.marqueeText}
          className="font-bold py-4"
        />
      </div>
    </div>
  );
};

export default ArtisanPage;
