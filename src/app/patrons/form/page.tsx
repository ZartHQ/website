"use client";
import ArtisanForm from "@/components/artisanForm";
import FormSkyLine from "@/components/formSkyLine";
import PatronForm from "@/components/patronForm";
import React from "react";

const PatronFormPage = () => {
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
            Need an Artisan?
          </h1>
          <h1 className="text-[32px] font-extrabold text-[#115746] mb-4">
            We know a guy
          </h1>
          <p className="text-[#323233] text-base md:text-xl mb-8">
            Request an artisan and get connected with one in your area that
            matches your exact need and budget.
          </p>
        </div>
        <div className="w-full md:w-[600px] h-full md:min-h-[770px] bg-white shadow-2xl rounded-xl py-8 px-4 md:px-7 z-10">
          <PatronForm />
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
         <FormSkyLine selectedForm="patron"/>
      </div>
    </div>
  );
};

export default PatronFormPage;
