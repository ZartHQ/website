import React from "react";
import { ArtisanSVG, PatronSVG } from "./svgs";

const SkyLine = ({
  selectedForm = "patron"
}: {
  selectedForm?: "patron" | "artisan";
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-transparent w-full max-h-[55vh]">
    {
      selectedForm === "patron" ? <PatronSVG/> : <ArtisanSVG/>
    }
    </div>
  );
};

export default SkyLine;
