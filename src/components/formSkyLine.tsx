import React from "react";
import { PatronSVG, ArtisanSVG } from "./svgs";

const FormSkyLine = ({
  selectedForm = "patron"
}: {
  selectedForm?: "patron" | "artisan";
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-transparent w-full max-h-[55vh] opacity-40">
    {
      selectedForm === "patron" ? <PatronSVG/> : <ArtisanSVG/>
    }
    </div>
  );
};


export default FormSkyLine