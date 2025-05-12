import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter} from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "Zart",
  description:
    "Vetted artisans. No stress. No scams.",
  applicationName: "Zart",
  formatDetection: {
    telephone: true
  },
  keywords: [
    "artisans",
    "artisans in Nigeria",
    "artisans in Africa",
    "artisans in the diaspora",
    "patrons",
    "service providers",
    "zart",
    "service works",
    "experts",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zarthq.com/",
    siteName: "Zart",
    title: "Zart",
    description:
      "Vetted artisans. No stress. No scams.",
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
    creator: "@Convo_Connect",
    images:
      "https://res.cloudinary.com/dqx8jfcj0/image/upload/v1747082032/IMG_6303_zb1w5i.jpg",
    description:
      "Vetted artisans. No stress. No scams.",
  },
  appleWebApp: {
    statusBarStyle: "black",
    capable: true,
    title: "ZartHQ"
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
       <Providers>{children}</Providers>
      </body>
    </html>
  );
}
