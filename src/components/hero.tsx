"use client";
import React from "react";
import { Button } from "./button";
import { ContentConfig } from "@/utils/type";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface HeroProps {
  content: ContentConfig;
}

const HeroContent = ({ content }: HeroProps) => {
  const router = useRouter();
  return (
    <div className="text-center mb-8">
      <h1 className="text-[#0C1E22] text-[40px] md:text-7xl font-extrabold whitespace-pre-line mb-4 leading-none">
        {content.title}
      </h1>
      <p className="text-[#78787A] text-[16px] md:text-xl mb-8 max-w-72 md:max-w-xl mx-auto leading-none">
        {content.description}
      </p>

      <div className="mt-16">
        <Button
          onClick={() =>
            router.push(
              `${content?.name === "patron" ? "patrons" : "artisans"}/${
                content.formLink
              }`
            )
          }
          className="text-[#F8F8F8] bg-[#0C1E22] font-semibold"
        >
          {content.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default HeroContent;
