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
      description="We’ll connect you with the right person, close to home, and within your budget - every time"
      formComponent={<PatronForm />}
      selectedForm="patron"
    />
  );
};

export default PatronFormPage;
