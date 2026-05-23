import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";
import PhoneInput from "react-phone-number-input";
import { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import Link from "next/link";
import storageUtil from "@/utils/browser-storage";
import { CheckCircle } from "lucide-react";

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

export interface ArtisanFormData {
  firstName: string;
  lastName: string;
  location: string;
  phoneNumber: string;
  email: string;
  service: string;
  otherService: string;
  badExperience: string;
  earlyAccess: string;
  area: string;
  howDidYouHear: string;
  otherHowDidYouHear: string;
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
  earlyAccess: Yup.string().required("Please select an option"),
  howDidYouHear: Yup.string().required("Please select how you heard about us"),
  otherHowDidYouHear: Yup.string().when("howDidYouHear", {
    is: "Other (please specify)",
    then: (schema) => schema.required("Please specify how you heard about us")
  })
});

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

// Get initial values from localStorage or return defaults
const getInitialValues = (): ArtisanFormData => {
  return {
    firstName: "",
    lastName: "",
    location: "",
    phoneNumber: "",
    email: "",
    service: "",
    otherService: "",
    badExperience: "",
    earlyAccess: "",
    area: "",
    howDidYouHear: "",
    otherHowDidYouHear: ""
  };
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
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (
    values: any,
    {
      resetForm
    }: {
      resetForm: () => void;
    }
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xeenberl", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          service: values.service,
          location: values.location,
          area: values.area || "",
          email: values.email,
          phone: values.phoneNumber,
          earlyAccess: values.earlyAccess,
          howDidYouHear: values.howDidYouHear,
          otherHowDidYouHear: values.otherHowDidYouHear || ""
        })
      });

      if (response.ok) {
        setIsLoading(false);
        storageUtil.delete("artisanFormData");
        resetForm();
        setSubmitSuccess(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white w-full h-full flex justify-center items-center p-6">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-20 h-20 text-[#0C1E22]" />
          </div>
          <h1 className="text-3xl font-bold text-[#0C1E22] mb-3">Welcome to ZART!</h1>
          <p className="text-[#515152] text-base mb-2">Your profile has been submitted successfully.</p>
          <p className="text-[#515152] text-base mb-6">We're excited to have you join our community of trusted artisans! Our team will review your details and you'll hear from us soon via email and WhatsApp. Get ready to start receiving booking requests!</p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="w-full bg-[#FFC600] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200">
            Submit Another Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full flex justify-center items-center">
      <style>{phoneInputStyles}</style>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={false}>
        {({ values, errors, touched, isValid, dirty, setFieldValue }) => {
          // Load saved form data from localStorage after mount (to avoid hydration mismatch)
          useEffect(() => {
            if (!hasLoadedFromStorage) {
              const savedValues = storageUtil.getObject<ArtisanFormData>("artisanFormData");
              console.log("Loading from storage:", savedValues);
              if (savedValues) {
                Object.keys(savedValues).forEach((key) => {
                  setFieldValue(key, (savedValues as any)[key]);
                });
              }
              setHasLoadedFromStorage(true);
            }
          }, [setFieldValue]);

          // Log button state for debugging
          useEffect(() => {
            console.log("Button state:", { isValid, dirty, hasLoadedFromStorage, buttonEnabled: isValid && (dirty || hasLoadedFromStorage) });
          }, [isValid, dirty, hasLoadedFromStorage]);

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

              {/* How Did You Hear About Us */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  How did you hear about us? <span className="text-[#B42318]">*</span>
                </label>
                <Field
                  as="select"
                  name="howDidYouHear"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Threads">Threads</option>
                  <option value="X (Twitter)">X (Twitter)</option>
                  <option value="Google/Search">Google/Search</option>
                  <option value="Friend or Referral">Friend or Referral</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Other (please specify)">Other (please specify)</option>
                </Field>
                <ErrorMessage
                  name="howDidYouHear"
                  component="div"
                  className="text-[#B42318] mt-1 text-sm"
                />
              </div>

              {/* Other How Did You Hear */}
              {values.howDidYouHear === "Other (please specify)" && (
                <div>
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Please specify
                  </label>
                  <Field
                    type="text"
                    name="otherHowDidYouHear"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="How did you hear about us?"
                  />
                  <ErrorMessage
                    name="otherHowDidYouHear"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>
              )}

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
                disabled={!(isValid && (dirty || hasLoadedFromStorage)) || isLoading}
                isLoading={isLoading}
                loadingText="Submitting..."
                className="w-full bg-[#FFC600]  py-3 rounded-lg font-medium transition-colors duration-200  disabled:bg-gray-100 disabled:text-gray-400">
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ArtisanForm;