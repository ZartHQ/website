"use client";
import ArtisanForm from "@/components/artisanForm";
import Image from "next/image";
import FormSkyLine from "@/components/formSkyLine";
import PatronForm from "@/components/patronForm";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
    title?: React.ReactNode;
    description?: string;
    formComponent?: React.ReactNode;
    selectedForm?: "patron" | "artisan";

}
const FormContainer = ({title, description, formComponent, selectedForm}: Props) => {
    const router = useRouter()
  return (
    <div className="min-h-screen bg-white relative flex flex-col md:flex-row items-start justify-between w-full px-4 md:px-24 py-5 md:py-7">
      <div className="">
        <button
          className="flex items-center text-[#000C19]"
          onClick={() => router.back()}>
          <img src="/arrow-left.svg" />
          <span className="ml-3">Go back</span>
        </button>
        <div className="mt-10 bg-white rounded-2xl ">
          <Image
            src="/zart-logo.svg"
            alt="Patron"
            width={100}
            height={100}
            className="mb-4"
          />
          <h1 className="text-3xl font-extrabold text-[#0C1E22]">
            {title}
          </h1>
          <p className="text-[#323233] text-base md:text-xl mt-6 md:max-w-[520px] mb-6">
           {description}
          </p>
        </div>
      </div>
      <div className="w-full md:w-[600px] h-full md:min-h-[770px] bg-white shadow-2xl rounded-xl py-8 px-4 md:px-7 z-10">
        {formComponent}
      </div>
      <div className="absolute bottom-0 w-full">
        <FormSkyLine selectedForm={selectedForm} />
      </div>
    </div>
  );
};

export default FormContainer;
