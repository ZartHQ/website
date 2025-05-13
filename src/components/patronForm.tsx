import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";

export type ArtisanType = 
  | "Carpenter" 
  | "Electrician" 
  | "Plumber" 
  | "Cleaner" 
  | "Other";

export type Location = "Lagos mainland" | "Lagos Island";

export interface ArtisanRequestForm {
  fullName: string;
  location: Location;
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
  location: "Lagos mainland",
  phoneNumber: "",
  email: "",
  artisanTypes: [],
  badExperience: "",
  earlyAccess: ""
};

const PatronForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (
    values: ArtisanRequestForm,
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
        `/artisan-forms`,
        {
          fullName: values.fullName,
          location: values.location,
          phoneNumber: values.phoneNumber,
          email: values.email,
          artisanTypes: values.artisanTypes,
          otherArtisanType: values.otherArtisanType,
          badExperience: values.badExperience,
          earlyAccess: values.earlyAccess
        },
        true,
        true,
        "Thank you for joining the waitlist! We'll be in touch soon."
      );
      setIsLoading(false);
      console.log("Form submitted successfully:", response.data);
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };
  
  return (
    <div className="bg-white w-full h-full flex justify-center items-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ values, isValid, dirty }) => (
            <Form className="space-y-6 bg-white font-sans">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Full name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Placeholder text"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Location
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="location"
                      value="Lagos mainland"
                      className="form-radio"
                    />
                    <span className="ml-2">Lagos mainland</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="location"
                      value="Lagos Island"
                      className="form-radio"
                    />
                    <span className="ml-2">Lagos Island</span>
                  </label>
                </div>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Phone number (WhatsApp preferred)
                </label>
                <Field
                  type="tel"
                  name="phoneNumber"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Placeholder text"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Email address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Placeholder text"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">
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
                      <span className="ml-2">{type}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage
                  name="artisanTypes"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              {values.artisanTypes?.includes("Other") && (
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
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
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Have you ever had a bad experience with an artisan?
                </label>
                <Field
                  as="textarea"
                  name="badExperience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                  placeholder="Feel free to share — we're solving this!"
                />
              </div>

              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Would you like early access when ZART launches?
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="earlyAccess"
                      value="Yes, absolutely"
                      className="form-radio"
                    />
                    <span className="ml-2">Yes, absolutely</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="earlyAccess"
                      value="Maybe later"
                      className="form-radio"
                    />
                    <span className="ml-2">Maybe later</span>
                  </label>
                  <label className="inline-flex items-center">
                    <Field
                      type="radio"
                      name="earlyAccess"
                      value="Not interested"
                      className="form-radio"
                    />
                    <span className="ml-2">Not interested</span>
                  </label>
                </div>
                <ErrorMessage
                  name="earlyAccess"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={!(isValid && dirty) || isLoading}
                className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed">
                {isLoading ? "Submitting..." : "Join the waitlist"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
  );
};

export default PatronForm;