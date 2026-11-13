import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/providers";

// Self-hosted Outfit (same files as the mobile app) so the site builds and
// runs with no network dependency on Google Fonts.
const outfit = localFont({
  variable: "--font-outfit",
  display: "swap",
  src: [
    { path: "./fonts/Outfit-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Outfit-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Outfit-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Outfit-Bold.ttf", weight: "700", style: "normal" }
  ]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zarthq.com"),
  title: "Zart – Skilled artisans, one tap away",
  description:
    "Download the Zart app to find verified carpenters, electricians, cleaners and plumbers. Describe the job, pick a time, and track it to done.",
  applicationName: "Zart",
  formatDetection: {
    telephone: true
  },
  keywords: [
    "Zart app",
    "verified artisans",
    "find artisans in Nigeria",
    "home repair app",
    "book plumbers",
    "electricians near me",
    "cleaning services app",
    "artisan app Nigeria"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zarthq.com/",
    siteName: "Zart",
    title: "Zart – Skilled artisans, one tap away",
    description:
      "Download the Zart app to find verified carpenters, electricians, cleaners and plumbers. Describe the job, pick a time, and track it to done.",
    images: [
      {
        url: "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1747082032/IMG_6303_zb1w5i.jpg",
        alt: "Zart",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        secureUrl:
          "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1747082032/IMG_6303_zb1w5i.jpg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "https://zarthq.com/",
    creator: "@zarthq",
    title: "Zart – Skilled artisans, one tap away",
    description:
      "Download the Zart app to find verified artisans for the jobs around your home.",
    images:
      "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1747082032/IMG_6303_zb1w5i.jpg"
  },
  appleWebApp: {
    statusBarStyle: "black",
    capable: true,
    title: "ZartHQ"
  },
  alternates: {
    canonical: "https://zarthq.com/"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${outfit.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
