"use client";
import PatronForm from "@/components/patronForm";
import React from "react";
import FormContainer from "@/components/FormContainer";

const PatronFormPage = () => {
  return (
    <FormContainer
      title={
        <>
          Need an Artisan? 
        </>
      }
      description="Fill out this form, and we’ll contact you on WhatsApp in a few minutes to confirm details."
      formComponent={<PatronForm />}
      selectedForm="patron"
    />
  );
};

export default PatronFormPage;
