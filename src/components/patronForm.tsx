import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";
import { showToast } from "@/utils/toast";

const areasData = {
  "Lagos Mainland": [
    "Agege",
    "Ajeromi-Ifelodun",
    "Alimosho",
    "Amuwo-Odofin",
    "Apapa",
    "Ifako-Ijaiye",
    "Ikeja",
    "Kosofe",
    "Mushin",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere"
  ],
  "Lagos Island": [
    "Eti-Osa",
    "Lagos Island",
    "Ikoyi",
    "Victoria Island",
    "Lekki",
    "Ajah",
    "Epe"
  ]
};

export type ArtisanType =
  | "Carpenter"
  | "Electrician"
  | "Plumber"
  | "Cleaner"
  | "Other";

export type Location = "Lagos mainland" | "Lagos Island";

export interface ArtisanRequestForm {
  firstName: string;
  lastName: string;
  location: string;
  phoneNumber: string;
  email: string;
  artisanTypes: ArtisanType[];
  otherArtisanType?: string;
  badExperience?: string;
  earlyAccess: "Yes, absolutely" | "Maybe later" | "Not interested" | "";
}

const artisanTypes: ArtisanType[] = [
  "Carpenter",
  "Electrician",
  "Plumber",
  "Cleaner",
  "Other"
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  location: Yup.string().required("Please select a location"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  artisanTypes: Yup.array()
    .min(1, "Please select at least one artisan type")
    .required("Please select an artisan type"),
  otherArtisanType: Yup.string().when("artisanTypes", {
    is: (types: string[]) => types?.includes("Other"),
    then: (schema) => schema.required("Please specify the artisan type")
  }),
  earlyAccess: Yup.string().required("Please select an option")
});

const initialValues: ArtisanRequestForm = {
  firstName: "",
  lastName: "",
  location: "",
  phoneNumber: "",
  email: "",
  artisanTypes: [],
  badExperience: "",
  earlyAccess: ""
};

const PatronForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [areas, setAreas] = useState<string[]>([]);

  // const handleSubmit = (values: any) => {
  //   console.log(values);
  // };

  // const handleSubmit = async (
  //   values: any,
  //   {
  //     setSubmitting,
  //     resetForm
  //   }: {
  //     setSubmitting: (isSubmitting: boolean) => void;
  //     resetForm: () => void;
  //   }
  // ) => {
  //   setIsLoading(true);
  //   // Post the form data to the API
  //   try {
  //     const response = await request(
  //       "POST",
  //       `/forms/patron`,
  //       {
  //         firstName: values.firstName,
  //         lastName: values.lastName,
  //         location: values.location,
  //         artisanTypes: values.artisanTypes,
  //         otherArtisanType: values.otherArtisanType,
  //         email: values.email,
  //         phone: values.phoneNumber,
  //         badExperience: values.badExperience,
  //         earlyAccessPreference: values.earlyAccess
  //       },
  //       true,
  //       true,
  //       "Your details have been submitted successfully. We'll notify you when ZART launches!"
  //     );
  //     setIsLoading(false);
  //     resetForm();
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("Error submitting form:", error);
  //   }
  // };

  const handleSubmit = async (
    values: any,
    {
      setSubmitting,
      resetForm
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    setIsLoading(true);
    try {
      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        location: values.location,
        email: values.email || "",
        phone: values.phoneNumber || "",
        artisanType: values.artisanTypes || [],
        otherArtisanType: values.otherArtisanType || "",
        badExperienceDetails: values.badExperience || "",
        earlyAccess: values.earlyAccess,
        area: values.area
      };
  
      const response = await fetch("https://formspree.io/f/mjkrzeon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) throw new Error("Form submission failed");
  
      const result = await response.json();
      console.log("Form submitted successfully:", result);
      showToast("Your details have been submitted successfully. We'll notify you when ZART launches!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast("There was an error submitting your form. Please try again later.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white w-full h-full flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, isValid, dirty, setFieldValue }) => {
          // Update areas when location changes
          useEffect(() => {
            if (values.location) {
              setAreas(
                areasData[values.location as keyof typeof areasData] || []
              );
            } else {
              setAreas([]);
            }
          }, [values.location]);

          return (
            <Form className="space-y-6 bg-white font-sans w-full">
              {/* Full Name */}
              <div className="flex flex-col  md:flex-row items-center justify-between gap-6">
                <div className="w-full">
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    First name <span className="text-[#B42318]">*</span>
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="First name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Last name <span className="text-[#B42318]">*</span>
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Last name"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Location
                </label>
                <div className="flex space-x-4">
                  {["Lagos Mainland", "Lagos Island"].map((locationOption) => (
                    <label
                      key={locationOption}
                      className="inline-flex items-center">
                      <Field
                        type="radio"
                        name="location"
                        value={locationOption}
                        checked={values.location === locationOption}
                        className="form-radio"
                      />
                      <span className="ml-2 text-[#515152] text-base">{locationOption}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Area Dropdown - Only shows when location is selected */}
              {values.location && (
                <div>
                  <label className="block text-gray-800 text-lg font-medium mb-2">
                    Area
                  </label>
                  <Field
                    as="select"
                    name="area"
                    className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select an area</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="area"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>
              )}

              {/* Phone Number */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Phone number (WhatsApp preferred) <span className="text-[#B42318]">*</span>
                </label>
                <Field
                  type="tel"
                  name="phoneNumber"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Email address <span className="text-[#B42318]">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Artisan Types */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  What kind of artisan do you usually need help with?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {artisanTypes.map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <Field
                        type="checkbox"
                        name="artisanTypes"
                        value={type}
                        className="form-checkbox"
                      />
                      <span className="ml-2 text-[#515152] text-base">{type}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="artisanTypes"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Other Artisan Type */}
              {values.artisanTypes?.includes("Other") && (
                <div>
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Others (specify)
                  </label>
                  <Field
                    type="text"
                    name="otherArtisanType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify artisan type"
                  />
                  <ErrorMessage
                    name="otherArtisanType"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>
              )}

              {/* Bad Experience */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Have you ever had a bad experience with an artisan?
                </label>
                <Field
                  as="textarea"
                  name="badExperience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Feel free to share — we're solving this!"
                />
              </div>

              {/* Early Access */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Would you like early access when ZART launches? <span className="text-[#B42318]">*</span>
                </label>
                <div className="flex space-x-4">
                  {["Yes, absolutely", "Maybe later", "Not interested"].map(
                    (access) => (
                      <label key={access} className="inline-flex items-center">
                        <Field
                          type="radio"
                          name="earlyAccess"
                          value={access}
                          className="form-radio"
                        />
                        <span className="ml-1 text-[#515152] text-base">{access}</span>
                      </label>
                    )
                  )}
                </div>
                <ErrorMessage
                  name="earlyAccess"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!(isValid && dirty) || isLoading}
                className="w-full bg-[#FFC600] text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                {isLoading ? "Submitting..." : "Join the waitlist"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PatronForm;
