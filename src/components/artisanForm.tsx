import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";

// Areas data for the dropdown based on location selection
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

// Service types offered
const serviceTypes = [
  "Carpenter",
  "Electrician",
  "Plumber",
  "Cleaner",
  "Others"
];

export type ContactMethod = "email" | "phone";

export interface ServiceProviderForm {
  name: string;
  service: string;
  contactMethods: ContactMethod[];
  email?: string;
  phoneNumber?: string;
  localGovernment: string;
  area: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  location: Yup.string().required("Location is required"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .test("is-valid-phone", "Please enter a valid Nigerian phone number", function(value) {
      if (!value) return false;
      return isPossiblePhoneNumber(value) && isValidPhoneNumber(value);
    }),
  email: Yup.string().email("Invalid email format").nullable(),
  service: Yup.string().required("Please specify the service you offer"),
  earlyAccess: Yup.string().required("Please select an option")
});

// Initial form values
const initialValues = {
  firstName: "",
  lastName: "",
  location: "",
  phoneNumber: "",
  email: "",
  service: "",
  otherService: "",
  badExperience: "",
  earlyAccess: "",
  area: ""
};

// Custom CSS to override and match existing styles
const phoneInputStyles = `
  .PhoneInput {
    width: 100%;
  }
  .PhoneInputInput {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    // border: 1px solid #E5E7EB;
    border-radius: 8px;
    outline: none;
    transition: all 0.2s;
    font-size: 16px;
  }
  .PhoneInputInput:focus {
    border-color: #3B82F6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
  .PhoneInputCountry {
    margin-right: 8px;
    margin-left: 10px;
  }
`;

const ArtisanForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);

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
    // Post the form data to the API
    try {
      const response = await request(
        "POST",
        `/forms/artisan`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          serviceLocalGov: values.location,
          email: values.email,
          phone: values.phoneNumber,
          emailOrPhone: true,
          serviceType: values.service,
          serviceArea: values.area
        },
        true,
        true,
        "Your details have been submitted successfully. We'll notify you when ZART launches!"
      );
      setIsLoading(false);
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-white w-full h-full flex justify-center items-center">
      <style>{phoneInputStyles}</style>
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
            <Form className="space-y-6 bg-white font-sans w-full py-6 ">
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
                  Location <span className="text-[#B42318]">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="location"
                      value="Lagos Mainland"
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-[#515152] text-base">Lagos Mainland</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="location"
                      value="Lagos Island"
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-[#515152] text-base">Lagos Island</span>
                  </label>
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
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Area <span className="text-[#B42318]">*</span>
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

              {/* Phone Number - Updated with React Phone Number Input */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Phone number (WhatsApp preferred)<span className="text-[#B42318]">*</span>
                </label>
                <div className="phone-input-container">
                  <PhoneInput
                    international={false}
                    defaultCountry="NG"
                    countries={["NG"]} // Only allow Nigerian numbers
                    flags={flags}
                    value={values.phoneNumber}
                    onChange={(value) => setFieldValue("phoneNumber", value || "")}
                    className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Email address <span className="text-[#B42318]">*</span>
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full h-12 px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* What service do you offer? */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  What service do you offer? <span className="text-[#B42318]">*</span>
                </label>
                <Field
                  type="text"
                  name="service"
                  className="w-full h-12 px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Carpentry, Plumbing, etc."
                />
                <ErrorMessage
                  name="service"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Early Access */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Would you like early access when ZART launches?<span className="text-[#B42318]">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="earlyAccess"
                      value="Yes, absolutely"
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-[#515152]">Yes, absolutely</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="earlyAccess"
                      value="Maybe later"
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-[#515152]">Maybe later</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Field
                      type="radio"
                      name="earlyAccess"
                      value="Not interested"
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="text-[#515152]">Not interested</span>
                  </label>
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
                isLoading={isLoading}
                loadingText="Submitting..."
                className="w-full bg-[#FFC600]  py-3 rounded-lg font-medium transition-colors duration-200  disabled:bg-gray-100 disabled:text-gray-400">
                {isLoading ? "Submitting..." : "Join the waitlist"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ArtisanForm;