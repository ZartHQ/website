"use client";
import ArtisanForm from "@/components/artisanForm";
import FormSkyLine from "@/components/formSkyLine";
import React from "react";

const ArtisanFormPage = () => {
  return (
    <div className="min-h-screen w-full bg-white relative">
      <div className=" my-[2rem] md:my-[5rem] pl-[2rem] md:px-[5rem]">
        <button
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          onClick={() => window.history.back()}
        >
          <img src="/arrow-left.svg" />
          Go back
        </button>
      </div>
      <div className="w-full md:px-[4rem] mx-auto flex flex-col md:flex-row justify-between">
        <div className="md:w-4/12 bg-white rounded-2xl p-6 md:p-8">
          <h1 className="text-[32px] font-extrabold text-[#115746]">
            Looking for customers?
          </h1>
          <h1 className="text-[32px] font-extrabold text-[#115746] mb-4">
            We go run am
          </h1>
          <p className="text-[#323233] text-base md:text-xl mb-8">
            Sign up as an artisan and get matched with real people who need what you do best.
          </p>
        </div>
        <div className="w-full md:w-[600px] h-full md:min-h-[770px] bg-white shadow-2xl rounded-xl py-8 px-4 z-10">
          <ArtisanForm />
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <FormSkyLine selectedForm="artisan"/>
      </div>
    </div>
  );
};

export default ArtisanFormPage;
