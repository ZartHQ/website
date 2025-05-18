"use client";
import ArtisanForm from "@/components/artisanForm";
import FormContainer from "@/components/FormContainer";
import React from "react";

const ArtisanFormPage = () => {
  return (
    <FormContainer
      title={
        <>
          Looking for customers? <br />
          We go run am
        </>
      }
      description="Sign up as an artisan and get matched with real people who need what you do best."
      formComponent={<ArtisanForm />}
      selectedForm="artisan"
    />
  );
};

export default ArtisanFormPage;
