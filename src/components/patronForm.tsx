import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";
// import { ArrowLeft, HelpCircle } from "lucide-react";

export type ArtisanType =
  | "Bricklayer"
  | "Carpenter"
  | "Cook"
  | "Electrician"
  | "Hairdresser"
  | "Locfician"
  | "Mechanic"
  | "Painter"
  | "Plumber"
  | "Starlink Installer"
  | "Other";

export type ContactMethod = "email" | "phone";

export interface ArtisanRequestForm {
  name: string;
  artisanTypes: ArtisanType[];
  otherArtisanType?: string;
  contactMethods: ContactMethod[];
  email?: string;
  phoneNumber?: string;
  localGovernment: string;
  area: string;
}
const artisanTypes: ArtisanType[] = [
  "Bricklayer",
  "Carpenter",
  "Cook",
  "Electrician",
  "Hairdresser",
  "Locfician",
  "Mechanic",
  "Painter",
  "Plumber",
  "Starlink Installer",
  "Other"
];
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  artisanTypes: Yup.array()
    .min(1, "Please select at least one artisan type")
    .required("Please select an artisan type"),
  otherArtisanType: Yup.string().when("artisanTypes", {
    is: (types: string[]) => types.includes("Other"),
    then: (schema) => schema.required("Please specify the artisan type")
  }),
  contactMethods: Yup.array()
    .min(1, "Please select at least one contact method")
    .required("Please select a contact method"),
  email: Yup.string().when("contactMethods", {
    is: (methods: string[]) => methods.includes("email"),
    then: (schema) =>
      schema.email("Invalid email").required("Email is required")
  }),
  phoneNumber: Yup.string().when("contactMethods", {
    is: (methods: string[]) => methods.includes("phone"),
    then: (schema) => schema.required("Phone number is required")
  }),
  localGovernment: Yup.string().required("Local Government is required"),
  area: Yup.string().required("Area is required")
});

const initialValues: ArtisanRequestForm = {
  name: "",
  artisanTypes: [],
  contactMethods: [],
  localGovernment: "",
  area: ""
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
          firstName: values.name,
          lastName: values.name,
          email: values.email,
          phone: values.phoneNumber,
          emailOrPhone: true,
          // serviceType: values.service,
          serviceLocalGov: values.localGovernment,
          serviceArea: values.area
        },
        true,
        true,
        "Your details have been submitted successfully. We will contact you shortly."
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
      {" "}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
          console.log("Form submitted successfully");
        }}>
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="space-y-6 bg-white font-satoshi w-11/12 ">
            <div>
              <label className="block text-[#000C19] text-xl font-bold mb-2 font-satoshi">
                What is your name?
              </label>
              <Field
                type="text"
                name="name"
                className="w-full h-[54px] px-4 py-2 border border-gray-300 rounded-lg focus:outline focus:outline-[#084E61] focus:border-[#084E61]"
                placeholder="Enter your name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-[#000C19] text-xl font-bold mb-2 font-satoshi">
                What artisan do you need?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {artisanTypes.map((type) => (
                  <label key={type} className="flex items-center space-x-2">
                    <Field
                      type="checkbox"
                      name="artisanTypes"
                      value={type}
                      className="rounded border-gray-300 focus:ring-[#084E61] accent-[#084E61]"
                    />

                    <span className="text-gray-700 font-satoshi">{type}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="artisanTypes"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            {values.artisanTypes.includes("Other") && (
              <div>
                <Field
                  type="text"
                  name="otherArtisanType"
                  className="w-full h-[54px] px-4 py-2 border border-gray-300 rounded-lg focus:outline focus:outline-[#084E61] focus:border-[#084E61]"
                  placeholder="Please specify the artisan type"
                />
                <ErrorMessage
                  name="otherArtisanType"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-[#000C19] text-xl font-bold mb-2 font-satoshi">
                How should we contact you?
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="contactMethods"
                    value="email"
                    className="rounded border-gray-300 focus:ring-[#084E61] accent-[#084E61]"
                  />
                  <span className="text-gray-700 font-satoshi">Email</span>
                </label>
                {values.contactMethods.includes("email") && (
                  <div>
                    <Field
                      type="email"
                      name="email"
                      className="w-full h-[54px] px-4 py-2 border border-gray-300 rounded-lg focus:outline focus:outline-[#084E61] focus:border-[#084E61]"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 mt-1 text-sm"
                    />
                  </div>
                )}
                <label className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="contactMethods"
                    value="phone"
                    className="rounded border-gray-300 focus:ring-[#084E61] accent-[#084E61]"
                  />
                  <span className="text-gray-700 font-satoshi">
                    Phone Number
                  </span>
                </label>
              </div>
              <ErrorMessage
                name="contactMethods"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            {values.contactMethods.includes("phone") && (
              <div>
                <Field
                  type="tel"
                  name="phoneNumber"
                  className="w-full h-[54px] px-4 py-2 border border-gray-300 rounded-lg focus:outline focus:outline-[#084E61] focus:border-[#084E61]"
                  placeholder="Enter your phone number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 mt-1 text-sm"
                />
              </div>
            )}

            <div>
              <div className="flex items-center mb-2">
                <label className="block text-[#000C19] text-xl font-satoshi font-bold mb-2">
                  Where do you need the service?
                </label>
                {/* <HelpCircle className="w-4 h-4 ml-2 text-gray-400" /> */}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[#152F22] text-[14px] font-satoshi mb-2">
                    Local Government
                  </label>
                  <Field
                    type="text"
                    name="localGovernment"
                    className="w-full h-[54px] px-4 py-2 border border-gray-300 rounded-lg focus:outline focus:outline-[#084E61] focus:border-[#084E61]"
                  />
                  <ErrorMessage
                    name="localGovernment"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[#152F22] font-satoshi text-[14px] mb-2">
                    Area (example: Igando, Marina, etc)
                  </label>
                  <Field
                    type="text"
                    name="area"
                    className="w-full h-[54px] px-4 py-2 border border-gray-300 rounded-lg focus:outline focus:outline-[#084E61] focus:border-[#084E61]"
                  />
                  <ErrorMessage
                    name="area"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!(isValid && dirty)}
              className="w-full bg-[#FFC92A] text-[#115746] py-3 px-6 rounded-lg font-medium transition-colors duration-200 cursor-pointer disabled:bg-[#E9E9EB] disabled:text-[#B1B1B2] disabled:cursor-not-allowed">
              Request artisan
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PatronForm;
