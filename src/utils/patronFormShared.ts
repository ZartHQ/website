import * as Yup from "yup";

export const AREAS_DATA = {
  "Lagos Mainland": [
    "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa",
    "Ifako-Ijaiye", "Ikeja", "Kosofe", "Mushin", "Oshodi-Isolo",
    "Shomolu", "Surulere"
  ],
  "Lagos Island": [
    "Eti-Osa", "Lagos Island", "Ikoyi", "Victoria Island", "Lekki", "Ajah", "Epe"
  ]
} as const;

export type ArtisanType =
  | "Carpenter" | "Electrician" | "Plumber" | "Cleaner" | "Painter" | "Other";

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

export const ARTISAN_TYPES: { label: ArtisanType; emoji: string }[] = [
  { label: "Plumber", emoji: "🔧" },
  { label: "Electrician", emoji: "⚡️" },
  { label: "Carpenter", emoji: "🪚" },
  { label: "Painter", emoji: "🖌️" },
  { label: "Cleaner", emoji: "🧹" },
  { label: "Other", emoji: "➕" }
];

export const HEARD_OPTIONS = [
  "Instagram", "TikTok", "Threads", "X (Twitter)", "Google/Search",
  "Friend or Referral", "WhatsApp", "Other (please specify)"
];

export const EARLY_ACCESS_OPTIONS = [
  "Yes, absolutely", "Maybe later", "Not interested"
] as const;

export const TERMS_URL =
  "https://drive.google.com/file/d/1M9LLKWNMrVMMwOoUrCt68bZzGkTUSY81/view";
export const PRIVACY_URL =
  "https://drive.google.com/file/d/1pXzVfRNZBxWPaaiMKSWrlhEq6Ue6PXsn/view";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrejweyw";

export const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

export const getInitialValues = (): ArtisanRequestForm => ({
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
});

export const patronValidationSchema = Yup.object().shape({
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
  termsAgreed: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  )
});

/** Posts the request to Formspree. Throws on failure so callers can toast. */
export const submitPatronRequest = async (values: ArtisanRequestForm) => {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
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

  if (!response.ok) throw new Error("Form submission failed");
  return response;
};
