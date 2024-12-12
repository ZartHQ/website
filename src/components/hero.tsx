import React from 'react'
import { Button } from './button';
import { ContentConfig } from '@/utils/type';

interface HeroProps {
    content: ContentConfig;
  }

const HeroContent = ({ content }: HeroProps) => {

    return (
        <div className="text-center mb-8">
          <h1 className="text-[#115746] text-4xl md:text-7xl font-extrabold whitespace-pre-line mb-4">
            {content.title}
          </h1>
          <p className="text-[#323233] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {content.description}
          </p>
          <Button>{content.buttonText}</Button>
        </div>
      );
  
}

export default HeroContent