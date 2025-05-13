import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zart – Trusted Artisans Near You | Book Easily, No Scams",
  description:
    "Book vetted artisans like plumbers, electricians, and carpenters near you. No stress, no scams – just reliable home services from Zart.",
  applicationName: "Zart",
  formatDetection: {
    telephone: true
  },
  keywords: [
    "vetted artisans",
    "trusted artisans in Nigeria",
    "book plumbers in Lagos",
    "electricians near me",
    "Zart app",
    "home repair services Nigeria",
    "artisan marketplace Africa",
    "find service providers",
    "no scam artisans"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zarthq.com/",
    siteName: "Zart",
    title: "Zart – Trusted Artisans Near You | Book Easily, No Scams",
    description:
      "Book vetted artisans like plumbers, electricians, and carpenters near you. No stress, no scams – just reliable home services from Zart.",
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
    title: "Zart – Trusted Artisans Near You",
    description:
      "Book reliable, vetted artisans for your home or office – no stress, no scams.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
