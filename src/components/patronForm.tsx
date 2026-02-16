import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";
import { showToast } from "@/utils/toast";
const nigerianPhoneRegex = /^(\+?234|0)[7-9][0-1]\d{8}$/;

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

export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";

export interface ArtisanRequestForm {
  firstName: string;
  lastName: string;
  gender: Gender | "";
  location: string;
  phoneNumber: string;
  email?: string;
  artisanTypes: ArtisanType[];
  otherArtisanType?: string;
  area?: string;
  issueDetail?: string;
  preferredDate?: string;
  agreeToTerms: boolean;
  earlyAccess: "Yes, absolutely" | "Maybe later" | "Not interested" | "";
}

const artisanTypes: ArtisanType[] = [
  "Carpenter",
  "Electrician",
  "Plumber",
  "Cleaner",
  "Other"
];

const genderOptions: Gender[] = [
  "Male",
  "Female",
  "Other",
  "Prefer not to say"
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Please select your gender"),
  location: Yup.string().required("Please select a location"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      nigerianPhoneRegex,
      "Please enter a valid Nigerian phone number"
    ),
  email: Yup.string().email("Invalid email").optional(),
  artisanTypes: Yup.array()
    .min(1, "Please select at least one artisan type")
    .required("Please select an artisan type"),
  otherArtisanType: Yup.string().when("artisanTypes", {
    is: (types: string[]) => types?.includes("Other"),
    then: (schema) => schema.required("Please specify the artisan type")
  }),
  preferredDate: Yup.string()
    .optional()
    .test('is-future-date', 'Please select a date from tomorrow onwards', function(value) {
      if (!value) return true; // Optional field
      const selectedDate = new Date(value);
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      return selectedDate >= tomorrow;
    }),
  agreeToTerms: Yup.boolean().oneOf([true], "You must agree to the Terms & Conditions and Privacy Policy"),
  earlyAccess: Yup.string().required("Please select an option")
});

const initialValues: ArtisanRequestForm = {
  firstName: "",
  lastName: "",
  gender: "",
  location: "",
  phoneNumber: "",
  email: "",
  artisanTypes: [],
  issueDetail: "",
  preferredDate: "",
  otherArtisanType: "",
  area: "",
  agreeToTerms: false,
  earlyAccess: ""
};

const PatronForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [areas, setAreas] = useState<string[]>([]);

  const handleSubmit = async (
    values: any,
    {
      setSubmitting,
      resetForm,
      setFieldValue
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
      setFieldValue: (field: string, value: any) => void;
    }
  ) => {
    setIsLoading(true);
    try {
      console.log('[FORM] Starting form submission to Formspree');
      
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("gender", values.gender);
      formData.append("location", values.location);
      formData.append("area", values.area || "");
      formData.append("email", values.email || "");
      formData.append("phoneNumber", values.phoneNumber || "");
      formData.append("artisanTypes", (values.artisanTypes || []).join(", "));
      formData.append("otherArtisanType", values.otherArtisanType || "");
      formData.append("issueDetail", values.issueDetail || "");
      formData.append("preferredDate", values.preferredDate || "");
      formData.append("earlyAccess", values.earlyAccess);
      formData.append("agreeToTerms", values.agreeToTerms ? "Yes" : "No");
  
      const response = await fetch("https://formspree.io/f/mjkrzeon", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });
  
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`Form submission failed with status ${response.status}`);
      }
  
      console.log("Form submitted successfully to Formspree");
      showToast("You're all set.. We'll text you on whatsapp shortly!", 'success');
      resetForm();
    } catch (error) {
      console.error('[FORM] Error submitting form:', error);
      
      let msg = "There was an error submitting your form. Please try again later.";
      if (error instanceof Error) {
        msg = error.message;
      }
      
      showToast(msg, 'error');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  // Tomorrow's date in YYYY-MM-DD for date input min attribute (today should NOT be selectable)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowString = tomorrow.toISOString().slice(0, 10);

  return (
    <div className="bg-white w-full min-h-screen flex justify-center items-center p-4">
      <div className="w-full max-w-2xl">
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
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
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

                {/* Gender */}
                <div className="relative">
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Gender <span className="text-[#B42318]">*</span>
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer text-base"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                      paddingRight: '2.5rem'
                    }}>
                    <option value="">Select gender</option>
                    {genderOptions.map((gender) => (
                      <option key={gender} value={gender}>
                        {gender}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Location <span className="text-[#B42318]">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {["Lagos Mainland", "Lagos Island"].map((locationOption) => (
                      <label
                        key={locationOption}
                        className="inline-flex items-center cursor-pointer">
                        <Field
                          type="radio"
                          name="location"
                          value={locationOption}
                          checked={values.location === locationOption}
                          className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
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
                  <div className="relative">
                    <label className="block text-[#0C1E22] font-bold mb-2">
                      Area
                    </label>
                    <Field
                      as="select"
                      name="area"
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer text-base"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: 'right 0.5rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem'
                      }}>
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
                    Phone number (WhatsApp) <span className="text-[#B42318]">*</span>
                  </label>
                  <Field
                    type="tel"
                    name="phoneNumber"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
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
                    Email address
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
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
                    What kind of artisan do you need help with? <span className="text-[#B42318]">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {artisanTypes.map((type) => (
                      <label key={type} className="inline-flex items-center cursor-pointer">
                        <Field
                          type="checkbox"
                          name="artisanTypes"
                          value={type}
                          className="form-checkbox h-4 w-4 text-blue-600 cursor-pointer"
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
                      Others (specify) <span className="text-[#B42318]">*</span>
                    </label>
                    <Field
                      type="text"
                      name="otherArtisanType"
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                      placeholder="Specify artisan type"
                    />
                    <ErrorMessage
                      name="otherArtisanType"
                      component="div"
                      className="text-[#B42318] mt-1 text-sm"
                    />
                  </div>
                )}

                {/* Preferred Date - Mobile Optimized */}
                <div>
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Preferred Date
                  </label>
                  <Field name="preferredDate">
                    {({ field, form }: any) => (
                      <input
                        {...field}
                        type="date"
                        min={tomorrowString}
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base cursor-pointer"
                        style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none',
                          colorScheme: 'light'
                        }}
                        onKeyDown={(e: React.KeyboardEvent) => e.preventDefault()}
                        onChange={(e) => {
                          form.setFieldValue('preferredDate', e.target.value);
                        }}
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="preferredDate"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>

                {/* Issue Detail */}
                <div>
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Briefly describe the issue
                  </label>
                  <Field
                    as="textarea"
                    name="issueDetail"
                    className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 text-base resize-none"
                    placeholder="Let us know what you need!"
                  />
                </div>

                {/* Early Access */}
                <div>
                  <label className="block text-[#0C1E22] font-bold mb-2">
                    Would you like early access when ZART launches? <span className="text-[#B42318]">*</span>
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {["Yes, absolutely", "Maybe later", "Not interested"].map(
                      (access) => (
                        <label key={access} className="inline-flex items-center cursor-pointer">
                          <Field
                            type="radio"
                            name="earlyAccess"
                            value={access}
                            className="form-radio h-4 w-4 text-blue-600 cursor-pointer"
                          />
                          <span className="ml-2 text-[#515152] text-base">{access}</span>
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

                {/* Terms & Conditions Agreement */}
                <div>
                  <label className="inline-flex items-start cursor-pointer">
                    <Field
                      type="checkbox"
                      name="agreeToTerms"
                      className="form-checkbox mt-1 h-4 w-4 text-blue-600 cursor-pointer"
                    />
                    <span className="ml-3 text-[#515152] text-sm">
                      By clicking Submit, you agree to{" "}
                      <a
                        href="https://drive.google.com/file/d/1M9LLKWNMrVMMwOoUrCt68bZzGkTUSY81/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline">
                        Zart&apos;s Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://drive.google.com/file/d/1pXzVfRNZBxWPaaiMKSWrlhEq6Ue6PXsn/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  <ErrorMessage
                    name="agreeToTerms"
                    component="div"
                    className="text-[#B42318] mt-1 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={!(isValid && dirty) || isLoading}
                  className="w-full bg-[#FFC600] text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PatronForm;