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
      <h1 className="text-[#0C1E22] text-4xl md:text-7xl font-extrabold whitespace-pre-line mb-4">
        {content.title}
      </h1>
      <p className="text-[#323233] text-lg md:text-xl mb-4 md:mb-8 max-w-2xl mx-auto">
        {content.description}
      </p>
      <Button
        onClick={() =>
          router.push(
            `${content?.name === "patron" ? "patrons" : "artisans"}/${
              content.formLink
            }`
          )
        }
        className="text-[#F8F8F8] !bg-[#0C1E22] font-semibold"
      >
        {content.buttonText}
      </Button>
    </div>
  );
};

export default HeroContent;
