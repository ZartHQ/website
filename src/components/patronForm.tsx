import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";
import storageUtil from "@/utils/browser-storage";
import { CheckCircle } from "lucide-react";

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
  | "Painter"
  | "Other";

export interface ArtisanRequestForm {
  firstName: string;
  lastName: string;
  gender: string;
  location: string;
  area: string;
  phoneNumber: string;
  email: string;
  artisanTypes: ArtisanType[];
  otherArtisanType: string;
  preferredDate: string;
  description: string;
  earlyAccess: "Yes, absolutely" | "Maybe later" | "Not interested" | "";
  howDidYouHear: string;
  otherHowDidYouHear: string;
  termsAgreed: boolean;
}

const artisanTypes: { label: ArtisanType; emoji: string }[] = [
  { label: "Carpenter", emoji: "🪚" },
  { label: "Electrician", emoji: "⚡️" },
  { label: "Plumber", emoji: "🔧" },
  { label: "Cleaner", emoji: "🧹" },
  { label: "Painter", emoji: "🖌️" },
  { label: "Other", emoji: "➕" }
];

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const getInitialValues = (): ArtisanRequestForm => {
  return {
    firstName: "",
    lastName: "",
    gender: "",
    location: "",
    area: "",
    phoneNumber: "",
    email: "",
    artisanTypes: [],
    otherArtisanType: "",
    preferredDate: "",
    description: "",
    earlyAccess: "",
    howDidYouHear: "",
    otherHowDidYouHear: "",
    termsAgreed: false
  };
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  gender: Yup.string().required("Please select your gender"),
  location: Yup.string().required("Please select a location"),
  area: Yup.string().when("location", {
    is: (location: string) => !!location,
    then: (schema) => schema.required("Please select an area")
  }),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^(\+?234|0)[789][01]\d{8}$/,
      "Please enter a valid Nigerian phone number"
    ),
  email: Yup.string().email("Invalid email").required("Email is required"),
  artisanTypes: Yup.array()
    .min(1, "Please select at least one artisan type")
    .required("Please select an artisan type"),
  otherArtisanType: Yup.string().when("artisanTypes", {
    is: (types: string[]) => types?.includes("Other"),
    then: (schema) => schema.required("Please specify the artisan type")
  }),
  earlyAccess: Yup.string().required("Please select an option"),
  howDidYouHear: Yup.string().required("Please select how you heard about us"),
  otherHowDidYouHear: Yup.string().when("howDidYouHear", {
    is: "Other (please specify)",
    then: (schema) => schema.required("Please specify how you heard about us")
  }),
  termsAgreed: Yup.boolean().oneOf([true], "You must agree to the terms and conditions")
});

const PatronForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [areas, setAreas] = useState<string[]>([]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (
    values: ArtisanRequestForm,
    {
      resetForm
    }: {
      resetForm: () => void;
    }
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("https://formspree.io/f/xrejweyw", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          gender: values.gender,
          location: `${values.location}${values.area ? ` - ${values.area}` : ""}`,
          artisanTypes: values.artisanTypes.join(", "),
          otherArtisanType: values.otherArtisanType,
          email: values.email,
          phone: values.phoneNumber,
          preferredDate: values.preferredDate,
          description: values.description,
          earlyAccess: values.earlyAccess,
          howDidYouHear: values.howDidYouHear,
          otherHowDidYouHear: values.otherHowDidYouHear
        })
      });

      if (response.ok) {
        setIsLoading(false);
        storageUtil.delete("patronFormData");
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
          <h1 className="text-3xl font-bold text-[#0C1E22] mb-3">Request Submitted!</h1>
          <p className="text-[#515152] text-base mb-2">We've received your booking request.</p>
          <p className="text-[#515152] text-base mb-6">Our team will review your request and connect you with a relaible artisan within 24 hours. Keep an eye on your WhatsApp for updates!</p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="w-full bg-[#FFC600] text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full h-full flex justify-center items-center">
      <Formik
        initialValues={getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={false}>
        {({ values, isValid, dirty, setFieldValue }) => {
          // Load saved form data from localStorage after mount (to avoid hydration mismatch)
          useEffect(() => {
            if (!hasLoadedFromStorage) {
              const savedValues = storageUtil.getObject<ArtisanRequestForm>("patronFormData");
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

          // Save form data to localStorage whenever values change
          useEffect(() => {
            if (hasLoadedFromStorage) {
              storageUtil.store("patronFormData", values);
            }
          }, [values, hasLoadedFromStorage]);

          useEffect(() => {
            if (values.location) {
              setAreas(areasData[values.location as keyof typeof areasData] || []);
            } else {
              setAreas([]);
            }
          }, [values.location]);

          return (
            <Form className="space-y-6 bg-white font-sans w-full">

              {/* Full Name */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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
                  <ErrorMessage name="firstName" component="div" className="text-[#B42318] mt-1 text-sm" />
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
                  <ErrorMessage name="lastName" component="div" className="text-[#B42318] mt-1 text-sm" />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Gender <span className="text-[#B42318]">*</span>
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-[#B42318] mt-1 text-sm" />
              </div>

              {/* Location */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-3">
                  Location <span className="text-[#B42318]">*</span>
                </label>
                <div className="flex gap-3">
                  {["Lagos Mainland", "Lagos Island"].map((locationOption) => {
                    const isSelected = values.location === locationOption;
                    return (
                      <button
                        key={locationOption}
                        type="button"
                        onClick={() => {
                          setFieldValue("location", locationOption);
                          setFieldValue("area", "");
                        }}
                        className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all duration-150 ${
                          isSelected
                            ? "bg-[#0C1E22] text-white border-[#0C1E22]"
                            : "bg-white text-[#515152] border-gray-200 hover:border-[#0C1E22]"
                        }`}>
                        {locationOption}
                      </button>
                    );
                  })}
                </div>
                <ErrorMessage name="location" component="div" className="text-[#B42318] mt-2 text-sm" />
              </div>

              {/* Area Dropdown */}
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
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="area" component="div" className="text-[#B42318] mt-1 text-sm" />
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
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-[#B42318] mt-1 text-sm" />
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
                <ErrorMessage name="email" component="div" className="text-[#B42318] mt-1 text-sm" />
              </div>

              {/* Artisan Types */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-3">
                  What kind of artisan do you usually need help with?
                </label>
                <div className="flex flex-wrap gap-3">
                  {artisanTypes.map(({ label, emoji }) => {
                    const isSelected = values.artisanTypes.includes(label);
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => {
                          const next = isSelected
                            ? values.artisanTypes.filter((t) => t !== label)
                            : [...values.artisanTypes, label];
                          setFieldValue("artisanTypes", next);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-150 ${
                          isSelected
                            ? "bg-[#0C1E22] text-white border-[#0C1E22]"
                            : "bg-white text-[#515152] border-gray-300 hover:border-[#0C1E22]"
                        }`}>
                        <span>{emoji}</span>
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
                <ErrorMessage name="artisanTypes" component="div" className="text-[#B42318] mt-2 text-sm" />
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
                  <ErrorMessage name="otherArtisanType" component="div" className="text-[#B42318] mt-1 text-sm" />
                </div>
              )}

              {/* Preferred Date */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Preferred date
                </label>
                <Field
                  type="date"
                  name="preferredDate"
                  min={getTomorrow()}
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="preferredDate" component="div" className="text-[#B42318] mt-1 text-sm" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Briefly describe the issue
                </label>
                {/* <p className="text-[#515152] text-sm mb-3">
                  We'll confirm everything over WhatsApp — photos/video welcome.
                </p> */}
                <Field
                  as="textarea"
                  name="description"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Let us know what you need!"
                  rows={4}
                />
                <ErrorMessage name="description" component="div" className="text-[#B42318] mt-1 text-sm" />
              </div>

              {/* How Did You Hear About Us */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  How did you hear about us? <span className="text-[#B42318]">*</span>
                </label>
                <Field
                  as="select"
                  name="howDidYouHear"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
                <ErrorMessage name="howDidYouHear" component="div" className="text-[#B42318] mt-1 text-sm" />
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
                  <ErrorMessage name="otherHowDidYouHear" component="div" className="text-[#B42318] mt-1 text-sm" />
                </div>
              )}

              {/* Early Access */}
              <div>
                <label className="block text-[#0C1E22] font-bold mb-2">
                  Would you like early access when Zart launches? <span className="text-[#B42318]">*</span>
                </label>
                <div className="flex space-x-4">
                  {["Yes, absolutely", "Maybe later", "Not interested"].map((access) => (
                    <label key={access} className="inline-flex items-center">
                      <Field type="radio" name="earlyAccess" value={access} className="form-radio" />
                      <span className="ml-1 text-[#515152] text-base">{access}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="earlyAccess" component="div" className="text-[#B42318] mt-1 text-sm" />
              </div>

              {/* Terms and Conditions */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Field
                    type="checkbox"
                    name="termsAgreed"
                    className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0"
                  />
                  <label className="text-[#515152] text-sm leading-relaxed">
                    By clicking Submit, you agree to{" "}
                    <a
                      href="https://drive.google.com/file/d/1M9LLKWNMrVMMwOoUrCt68bZzGkTUSY81/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold">
                      Zart's Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://drive.google.com/file/d/1pXzVfRNZBxWPaaiMKSWrlhEq6Ue6PXsn/view"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                <ErrorMessage name="termsAgreed" component="div" className="text-[#B42318] mt-2 text-sm" />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!(isValid && (dirty || hasLoadedFromStorage)) || isLoading}
                className="w-full bg-[#FFC600] text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 cursor-pointer disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                {isLoading ? "Submitting..." : "Submit"}
              </Button>

            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PatronForm;
