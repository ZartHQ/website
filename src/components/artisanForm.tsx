import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "./button";
import request from "@/utils/api";
// import { HelpCircle } from "lucide-react";

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  service: Yup.string().required("Service is required"),
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

const initialValues: ServiceProviderForm = {
  name: "",
  service: "",
  contactMethods: [],
  localGovernment: "",
  area: ""
};

const ArtisanForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const handleSubmit = async (
    values: ServiceProviderForm,
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
          serviceType: values.service,
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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ values, errors, touched, isValid, dirty }) => (
          <Form className="space-y-6 bg-white font-satoshi w-11/12">
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
                What service do you offer?
              </label>
              <Field
                type="text"
                name="service"
                className="w-full h-[54px] px-4 py-2 border border-gray-300 rounded-lg focus:outline focus:outline-[#084E61] focus:border-[#084E61]"
                placeholder="Service"
              />
              <ErrorMessage
                name="service"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            <div>
              <label className="block text-[#000C19] text-xl font-bold mb-2 font-satoshi">
                How should we contact you?
              </label>
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 mb-2">
                    <Field
                      type="checkbox"
                      name="contactMethods"
                      value="email"
                      className="rounded border-gray-300 focus:ring-[#084E61] accent-[#084E61]"
                    />
                    <span className="text-gray-700 font-satoshi">Email</span>
                  </label>
                  {values.contactMethods.includes("email") && (
                    <Field
                      type="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your email"
                    />
                  )}
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 mb-2">
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
                  {values.contactMethods.includes("phone") && (
                    <Field
                      type="tel"
                      name="phoneNumber"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your phone number"
                    />
                  )}
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>
              </div>
              <ErrorMessage
                name="contactMethods"
                component="div"
                className="text-red-500 mt-1 text-sm"
              />
            </div>

            <div>
              <div className="flex items-center mb-4">
                <label className="block text-[#000C19] text-xl font-satoshi font-bold mb-2">
                  Where do you offer this service?
                </label>
                {/* <HelpCircle className="w-5 h-5 ml-2 text-gray-400" /> */}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#152F22] text-[14px] font-satoshi mb-2">
                    Local Government
                  </label>
                  <Field
                    type="text"
                    name="localGovernment"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Placeholder text"
                  />
                  <ErrorMessage
                    name="localGovernment"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[#152F22] text-[14px] font-satoshi mb-2">
                    Area (example: Igando, Marina, etc)
                  </label>
                  <Field
                    type="text"
                    name="area"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Placeholder text"
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
              disabled={!isValid || !dirty}
              isLoading={isLoading}
              loadingText="Submitting..."
              className="w-full py-4 bg-gray-200 text-gray-400 rounded-lg font-medium text-xl transition-colors duration-200 hover:bg-blue-600 hover:text-white disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed">
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ArtisanForm;
