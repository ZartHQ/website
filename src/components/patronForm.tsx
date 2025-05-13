import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";

const areasData = {
  "Lagos mainland": [
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
  fullName: string;
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
  fullName: Yup.string().required("Full name is required"),
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
  fullName: "",
  location: "",
  phoneNumber: "",
  email: "",
  artisanTypes: [],
  badExperience: "",
  earlyAccess: "",
};

const PatronForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [areas, setAreas] = useState<string[]>([]);

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <div className="bg-white w-full h-full flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isValid, dirty, setFieldValue }) => {
          // Update areas when location changes
          useEffect(() => {
          if (values.location) {
            setAreas(areasData[values.location as keyof typeof areasData] || []);
          } else {
            setAreas([]);
          }
        }, [values.location]);
  
          return (
            <Form className="space-y-6 bg-white font-sans">
              {/* Full Name */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Full name</label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Placeholder text"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
  
              {/* Location */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Location</label>
                <div className="flex space-x-4">
                {["Lagos mainland", "Lagos Island"].map((locationOption) => (
                  <label key={locationOption} className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="location"
                      value={locationOption}
                      checked={values.location === locationOption}
                      className="form-radio"
                    />
                    <span className="ml-2">{locationOption}</span>
                  </label>
                ))}
                </div>
                <ErrorMessage name="location" component="div" className="text-red-500 mt-1 text-sm" />
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
                    className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
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
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>
              )}
  
              {/* Phone Number */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Phone number (WhatsApp preferred)</label>
                <Field
                  type="tel"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Placeholder text"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
  
              {/* Email */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Email address</label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Placeholder text"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
  
              {/* Artisan Types */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">What kind of artisan do you usually need help with?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {artisanTypes.map((type) => (
                    <label key={type} className="inline-flex items-center">
                      <Field
                        type="checkbox"
                        name="artisanTypes"
                        value={type}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="artisanTypes" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
  
              {/* Other Artisan Type */}
              {values.artisanTypes?.includes("Other") && (
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">Others (specify)</label>
                  <Field
                    type="text"
                    name="otherArtisanType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify artisan type"
                  />
                  <ErrorMessage name="otherArtisanType" component="div" className="text-red-500 mt-1 text-sm" />
                </div>
              )}
  
              {/* Bad Experience */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Have you ever had a bad experience with an artisan?</label>
                <Field
                  as="textarea"
                  name="badExperience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Feel free to share — we're solving this!"
                />
              </div>
  
              {/* Early Access */}
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Would you like early access when ZART launches?</label>
                <div className="flex space-x-4">
                  {["Yes, absolutely", "Maybe later", "Not interested"].map((access) => (
                    <label key={access} className="inline-flex items-center">
                      <Field
                        type="radio"
                        name="earlyAccess"
                        value={access}
                        className="form-radio"
                      />
                      <span className="ml-2">{access}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="earlyAccess" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
  
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!(isValid && dirty) || isLoading}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Join the waitlist"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}  

export default PatronForm;