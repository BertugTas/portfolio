import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import GlobalCursor from "@/components/GlobalCursor";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE = "https://www.bertugtas.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Bertuğ Taş — ML Engineer & Data Scientist",
    template: "%s · Bertuğ Taş",
  },
  description:
    "CS student at Dokuz Eylül University. Building ML systems, deep learning models, and data engineering pipelines from Izmir. TÜBİTAK 2209-A researcher.",
  keywords: [
    "Bertuğ Taş",
    "Machine Learning",
    "Deep Learning",
    "Data Science",
    "Python",
    "TensorFlow",
    "CNN",
    "MLOps",
    "Power BI",
    "SQL",
    "Izmir",
    "TÜBİTAK",
    "Computer Vision",
    "NLP",
    "FastAPI",
    "scikit-learn",
  ],
  authors: [{ name: "Bertuğ Taş", url: BASE }],
  creator: "Bertuğ Taş",
  alternates: {
    canonical: BASE,
  },
  openGraph: {
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description:
      "CS student at Dokuz Eylül University. Building ML systems, deep learning models, and data engineering pipelines from Izmir. TÜBİTAK 2209-A researcher.",
    url: BASE,
    siteName: "Bertuğ Taş",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Bertuğ Taş — ML Engineer & Data Scientist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description: "ML · Deep Learning · Computer Vision · MLOps · İzmir",
    creator: "@bertugtas",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bertuğ Taş",
  url: BASE,
  sameAs: [
    "https://github.com/BertugTas",
    "https://www.linkedin.com/in/bertugtas",
    "https://twitter.com/bertugtas",
  ],
  jobTitle: "ML Engineer & Data Scientist",
  description:
    "CS student at Dokuz Eylül University. Building ML systems, deep learning models, and data engineering pipelines from Izmir. TÜBİTAK 2209-A researcher.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Dokuz Eylül University",
  },
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "MLOps",
    "Data Science",
    "Python",
    "TensorFlow",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-[#e8e8e8]`}
      >
        <GlobalCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
