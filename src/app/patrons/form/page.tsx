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
      description="Request a verified artisan by filling this form, and we'll contact you on WhatsApp to confirm availability and details, same-day booking isn't guaranteed, and we may need photos or video of the job."
      formComponent={<PatronForm />}
      selectedForm="patron"
    />
  );
};

export default PatronFormPage;
