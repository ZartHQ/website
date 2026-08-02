import * as Yup from "yup";
import CONFIG from "./config";

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

const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that image"));
    reader.readAsDataURL(file);
  });

/**
 * Posts the request to the Google Apps Script web app, which writes it to a
 * Sheet, saves any photo to Drive, and emails the team.
 *
 * Sent as text/plain on purpose: it keeps this a "simple" CORS request, so the
 * browser skips the preflight that Apps Script cannot answer.
 */
export const submitPatronRequest = async (
  values: ArtisanRequestForm,
  photo?: File | null
) => {
  if (!CONFIG.REQUEST_ENDPOINT) {
    throw new Error(
      "NEXT_PUBLIC_REQUEST_ENDPOINT is not set. See docs/apps-script/README.md"
    );
  }

  const payload: Record<string, unknown> = {
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    location: `${values.location}${values.area ? ` - ${values.area}` : ""}`,
    phoneNumber: values.phoneNumber,
    email: values.email,
    artisanTypes: values.artisanTypes,
    otherArtisanType: values.otherArtisanType,
    preferredDate: values.preferredDate,
    description: values.description,
    howDidYouHear: values.howDidYouHear,
    otherHowDidYouHear: values.otherHowDidYouHear,
    company: "" // honeypot
  };

  if (photo) payload.photo = await fileToDataUrl(photo);

  const response = await fetch(CONFIG.REQUEST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) throw new Error("Form submission failed");

  const result = await response.json();
  if (!result.ok) throw new Error(result.error || "Form submission failed");
  return result as { ok: true; reference: string };
};
