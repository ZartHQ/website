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

export const TERMS_URL =
  "https://drive.google.com/file/d/1M9LLKWNMrVMMwOoUrCt68bZzGkTUSY81/view?usp=drive_link";
export const PRIVACY_URL =
  "https://drive.google.com/file/d/1pXzVfRNZBxWPaaiMKSWrlhEq6Ue6PXsn/view?usp=sharing";
export const REFUND_URL =
  "https://docs.google.com/document/d/1x1RkV6Tk_xtcYEPg-iWRW4H1i-I3dWr6/edit?usp=sharing&ouid=117274641844192403999&rtpof=true&sd=true";

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xrejweyw";

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB

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
  preferredDate: Yup.string().required("Please pick a date that suits you"),
  description: Yup.string()
    .required("Please tell us what the problem is")
    .min(10, "A little more detail helps us send the right person"),
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

/**
 * Sends the request as multipart/form-data so an optional photo can ride along.
 *
 * NOTE: file uploads are not supported on Formspree's free plan. Until the
 * backend is swapped out, the photo will be dropped silently by Formspree
 * while the rest of the fields still come through.
 */
export const submitPatronRequest = async (
  values: ArtisanRequestForm,
  photo?: File | null
) => {
  const body = new FormData();
  body.append("firstName", values.firstName);
  body.append("lastName", values.lastName);
  body.append("gender", values.gender);
  body.append(
    "location",
    `${values.location}${values.area ? ` - ${values.area}` : ""}`
  );
  body.append("artisanTypes", values.artisanTypes.join(", "));
  body.append("otherArtisanType", values.otherArtisanType);
  body.append("email", values.email);
  body.append("phone", values.phoneNumber);
  body.append("preferredDate", values.preferredDate);
  body.append("description", values.description);
  body.append("howDidYouHear", values.howDidYouHear);
  body.append("otherHowDidYouHear", values.otherHowDidYouHear);
  if (photo) body.append("photo", photo, photo.name);

  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body
  });

  if (!response.ok) throw new Error("Form submission failed");
  return response;
};
