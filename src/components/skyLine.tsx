'use client';
import React, { useState, useEffect } from "react";
import { ArtisanSVG, PatronSVG, MobilePatronSVG, MobileArtisanSVG } from "./svgs";

const SkyLine = ({
  selectedForm = "patron"
}: {
  selectedForm?: "patron" | "artisan";
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Common breakpoint for mobile
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="bg-transparent w-full">
      {selectedForm === "patron" 
        ? (isMobile ? <MobilePatronSVG /> : <PatronSVG />)
        : (isMobile ? <MobileArtisanSVG/> :<ArtisanSVG />)
      }
    </div>
  );
};

export default SkyLine;