"use client";
import PatronForm from "@/components/patronForm";
import React from "react";
import FormContainer from "@/components/FormContainer";

const PatronFormPage = () => {
  return (
    <FormContainer
      title={
        <>
          Need an Artisan? <br />
          We know a guy
        </>
      }
      description="Need a verified artisan? Fill out this form, and we’ll contact you on WhatsApp to confirm details. We might also ask for photos or a quick video of the job."
      formComponent={<PatronForm />}
      selectedForm="patron"
    />
  );
};

export default PatronFormPage;
