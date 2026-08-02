"use client";

import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { CheckCircle } from "lucide-react";
import storageUtil from "@/utils/browser-storage";
import { showToast } from "@/utils/toast";
import {
  AREAS_DATA,
  ARTISAN_TYPES,
  HEARD_OPTIONS,
  MAX_IMAGE_BYTES,
  PRIVACY_URL,
  TERMS_URL,
  type ArtisanRequestForm,
  type ArtisanType,
  getInitialValues,
  getTomorrow,
  patronValidationSchema,
  submitPatronRequest
} from "@/utils/patronFormShared";

const STORAGE_KEY = "patronFormData";

const LABEL = "mb-2 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-zart-green";
const INPUT =
  "w-full rounded-lg border border-zart-line bg-white px-4 py-3 text-[15.5px] text-zart-ink transition-colors focus:border-zart-green focus:outline-none";
const ERROR = "mt-1 text-sm text-zart-error";
const CHIP_BASE =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors";
const CHIP_ON = "border-zart-green bg-zart-green text-white";
const CHIP_OFF =
  "border-zart-line bg-white text-zart-body hover:border-zart-green hover:text-zart-green";

/**
 * Lives inside <Formik> so hooks run in a real component body rather than
 * inside the render prop.
 */
const FormBody = ({
  loading,
  photo,
  photoError,
  submitError,
  onPickPhoto,
  onClearPhoto
}: {
  loading: boolean;
  photo: File | null;
  photoError: string | null;
  submitError: string | null;
  onPickPhoto: (f: File | null) => void;
  onClearPhoto: () => void;
}) => {
  const { values, isValid, dirty, setFieldValue } =
    useFormikContext<ArtisanRequestForm>();
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    if (restored) return;
    const saved = storageUtil.getObject<ArtisanRequestForm>(STORAGE_KEY);
    if (saved) {
      (Object.keys(saved) as (keyof ArtisanRequestForm)[]).forEach((key) => {
        setFieldValue(key as string, saved[key]);
      });
    }
    setRestored(true);
  }, [restored, setFieldValue]);

  useEffect(() => {
    if (restored) storageUtil.store(STORAGE_KEY, values);
  }, [values, restored]);

  const areas = values.location
    ? AREAS_DATA[values.location as keyof typeof AREAS_DATA] ?? []
    : [];

  const toggleTrade = (label: ArtisanType) => {
    const next = values.artisanTypes.includes(label)
      ? values.artisanTypes.filter((t) => t !== label)
      : [...values.artisanTypes, label];
    setFieldValue("artisanTypes", next);
  };

  return (
    <Form className="rounded-xl border border-zart-line bg-white p-6 md:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="firstName">First name *</label>
          <Field id="firstName" name="firstName" className={INPUT} placeholder="First name" />
          <ErrorMessage name="firstName" component="div" className={ERROR} />
        </div>
        <div>
          <label className={LABEL} htmlFor="lastName">Last name *</label>
          <Field id="lastName" name="lastName" className={INPUT} placeholder="Last name" />
          <ErrorMessage name="lastName" component="div" className={ERROR} />
        </div>
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="gender">Gender *</label>
        <Field as="select" id="gender" name="gender" className={INPUT}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </Field>
        <p className="mt-1.5 text-[13px] text-zart-body">
          So we can match you with an artisan you&rsquo;ll be comfortable having in your home.
        </p>
        <ErrorMessage name="gender" component="div" className={ERROR} />
      </div>

      <fieldset className="mt-5">
        <legend className={LABEL}>Location *</legend>
        <div className="flex gap-3">
          {(["Lagos Mainland", "Lagos Island"] as const).map((loc) => (
            <button
              key={loc}
              type="button"
              aria-pressed={values.location === loc}
              onClick={() => {
                setFieldValue("location", loc);
                setFieldValue("area", "");
              }}
              className={`flex-1 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                values.location === loc ? CHIP_ON : CHIP_OFF
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
        <ErrorMessage name="location" component="div" className={ERROR} />
      </fieldset>

      {values.location && (
        <div className="mt-5">
          <label className={LABEL} htmlFor="area">Area *</label>
          <Field as="select" id="area" name="area" className={INPUT}>
            <option value="">Select an area</option>
            {areas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </Field>
          <ErrorMessage name="area" component="div" className={ERROR} />
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="phoneNumber">WhatsApp number *</label>
          <Field id="phoneNumber" name="phoneNumber" type="tel" className={INPUT} placeholder="0803 000 0000" />
          <ErrorMessage name="phoneNumber" component="div" className={ERROR} />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">Email address *</label>
          <Field id="email" name="email" type="email" className={INPUT} placeholder="Email address" />
          <ErrorMessage name="email" component="div" className={ERROR} />
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className={LABEL}>What do you need? *</legend>
        <div className="flex flex-wrap gap-2">
          {ARTISAN_TYPES.map(({ label, emoji }) => (
            <button
              key={label}
              type="button"
              aria-pressed={values.artisanTypes.includes(label)}
              onClick={() => toggleTrade(label)}
              className={`${CHIP_BASE} ${
                values.artisanTypes.includes(label) ? CHIP_ON : CHIP_OFF
              }`}
            >
              <span className="mr-1.5">{emoji}</span>
              {label}
            </button>
          ))}
        </div>
        <ErrorMessage name="artisanTypes" component="div" className={ERROR} />
      </fieldset>

      {values.artisanTypes.includes("Other") && (
        <div className="mt-5">
          <label className={LABEL} htmlFor="otherArtisanType">Please specify</label>
          <Field id="otherArtisanType" name="otherArtisanType" className={INPUT} placeholder="Specify artisan type" />
          <ErrorMessage name="otherArtisanType" component="div" className={ERROR} />
        </div>
      )}

      <div className="mt-5">
        <label className={LABEL} htmlFor="preferredDate">Preferred date *</label>
        <Field id="preferredDate" name="preferredDate" type="date" min={getTomorrow()} className={INPUT} />
        <ErrorMessage name="preferredDate" component="div" className={ERROR} />
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="description">What&rsquo;s the problem? *</label>
        <Field
          as="textarea"
          id="description"
          name="description"
          rows={4}
          className={`${INPUT} resize-y`}
          placeholder="e.g. Kitchen tap has been dripping for a week and the cabinet underneath is getting wet."
        />
        <ErrorMessage name="description" component="div" className={ERROR} />
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="photo">Add a photo (optional)</label>
        {photo ? (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-zart-line bg-zart-mist px-4 py-3">
            <span className="truncate text-sm text-zart-ink">{photo.name}</span>
            <button
              type="button"
              onClick={onClearPhoto}
              className="shrink-0 text-sm font-semibold text-zart-error underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) => onPickPhoto(e.target.files?.[0] ?? null)}
            className="w-full cursor-pointer rounded-lg border border-dashed border-zart-line bg-white px-4 py-3 text-sm text-zart-body file:mr-3 file:rounded-md file:border-0 file:bg-zart-mist file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-zart-ink"
          />
        )}
        <p className="mt-1.5 text-[13px] text-zart-body">
          A picture of the problem helps us send the right person. Max 5&nbsp;MB.
        </p>
        {photoError && <div className={ERROR}>{photoError}</div>}
      </div>

      <div className="mt-5">
        <label className={LABEL} htmlFor="howDidYouHear">How did you hear about us? *</label>
        <Field as="select" id="howDidYouHear" name="howDidYouHear" className={INPUT}>
          <option value="">Select an option</option>
          {HEARD_OPTIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </Field>
        <ErrorMessage name="howDidYouHear" component="div" className={ERROR} />
      </div>

      {values.howDidYouHear === "Other (please specify)" && (
        <div className="mt-5">
          <label className={LABEL} htmlFor="otherHowDidYouHear">Please specify</label>
          <Field id="otherHowDidYouHear" name="otherHowDidYouHear" className={INPUT} placeholder="How did you hear about us?" />
          <ErrorMessage name="otherHowDidYouHear" component="div" className={ERROR} />
        </div>
      )}


      <div className="mt-5 rounded-lg bg-zart-mist p-4">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-zart-body">
          <Field type="checkbox" name="termsAgreed" className="mt-1 shrink-0 accent-zart-green" />
          <span>
            I agree to Zart&rsquo;s{" "}
            <a href={TERMS_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-zart-green underline">
              Terms &amp; Conditions
            </a>{" "}
            and{" "}
            <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-zart-green underline">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <ErrorMessage name="termsAgreed" component="div" className={ERROR} />
      </div>

      {submitError && (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-zart-error/30 bg-zart-error/5 px-4 py-3 text-sm text-zart-error"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={!(isValid && (dirty || restored)) || loading}
        className="mt-6 w-full rounded-lg bg-zart-gold py-4 text-[16px] font-bold text-zart-ink transition-colors hover:bg-[#E8B500] disabled:cursor-not-allowed disabled:bg-zart-line disabled:text-zart-body"
      >
        {loading ? "Sending…" : "Send request"}
      </button>

      <p className="mt-4 font-mono text-[11px] leading-relaxed text-zart-body">
        We&rsquo;ll confirm on WhatsApp before anyone is sent. You pay after the job, against an
        itemised invoice.
      </p>
    </Form>
  );
};

export const BookingForm = () => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const pickPhoto = (file: File | null) => {
    if (file && file.size > MAX_IMAGE_BYTES) {
      setPhotoError("That image is over 5 MB. Please pick a smaller one.");
      setPhoto(null);
      return;
    }
    setPhotoError(null);
    setPhoto(file);
  };

  /** Bring the confirmation into view instead of leaving the reader mid-page. */
  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="book" ref={sectionRef} className="scroll-mt-24 pb-16 md:pb-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 md:grid-cols-[0.85fr_1.15fr] md:gap-16 md:px-8">
        <div className="md:sticky md:top-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-zart-body/70">
            Book an artisan
          </p>
          <h2 className="mb-3 mt-3 font-poppins text-3xl font-bold leading-tight text-zart-ink md:text-[40px]">
            Tell us what happened
          </h2>
          <p className="max-w-[46ch] text-lg text-zart-body">
            We&rsquo;ll message you on WhatsApp within minutes to confirm the details.
          </p>
        </div>

        {done ? (
          <div className="rounded-xl border border-zart-line bg-white p-8 text-center md:p-12">
            <CheckCircle className="mx-auto mb-6 h-16 w-16 text-zart-green" />
            <h3 className="mb-3 font-poppins text-2xl font-bold text-zart-ink">
              Request received
            </h3>
            <p className="mx-auto mb-6 max-w-[42ch] text-zart-body">
              We&rsquo;ll review it and connect you with a vetted artisan within 24 hours. Keep an
              eye on your WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => {
                setDone(false);
                scrollToSection();
              }}
              className="rounded-lg bg-zart-gold px-6 py-3 font-bold text-zart-ink transition-colors hover:bg-[#E8B500]"
            >
              Send another request
            </button>
          </div>
        ) : (
          <Formik
            initialValues={getInitialValues()}
            validationSchema={patronValidationSchema}
            onSubmit={async (values, { resetForm }) => {
              setLoading(true);
              setSubmitError(null);
              try {
                await submitPatronRequest(values, photo);
                storageUtil.delete(STORAGE_KEY);
                resetForm();
                setPhoto(null);
                setPhotoError(null);
                setDone(true);
                scrollToSection();
              } catch (err) {
                const notConfigured =
                  err instanceof Error &&
                  err.message.includes("NEXT_PUBLIC_REQUEST_ENDPOINT");

                const message = notConfigured
                  ? "Requests aren't connected yet. See docs/apps-script/README.md to finish setup."
                  : "We couldn't send your request. Check your connection and try again, or message us on WhatsApp.";

                setSubmitError(message);
                showToast(message, "error");
                if (notConfigured) console.error(err);
              } finally {
                setLoading(false);
              }
            }}
          >
            <FormBody
              loading={loading}
              photo={photo}
              photoError={photoError}
              submitError={submitError}
              onPickPhoto={pickPhoto}
              onClearPhoto={() => {
                setPhoto(null);
                setPhotoError(null);
              }}
            />
          </Formik>
        )}
      </div>
    </section>
  );
};
