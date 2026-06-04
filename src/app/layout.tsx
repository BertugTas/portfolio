import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import GlobalCursor from "@/components/GlobalCursor";
import "./globals.css";

const BASE_URL = "https://www.bertugtas.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Bertuğ Taş — Makine Öğrenmesi Mühendisi & Veri Bilimci",
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
    "FastAPI",
    "scikit-learn",
  ],
  authors: [{ name: "Bertuğ Taş", url: BASE_URL }],
  creator: "Bertuğ Taş",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description:
      "CS student at Dokuz Eylül University. Building ML systems, deep learning models, and data engineering pipelines from Izmir. TÜBİTAK 2209-A researcher.",
    url: BASE_URL,
    siteName: "Bertuğ Taş",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Bertuğ Taş — Makine Öğrenmesi Mühendisi & Veri Bilimci",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description:
      "ML · Deep Learning · Computer Vision · MLOps · İzmir",
    creator: "@bertugtas",
    images: ["/twitter-image"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
  url: BASE_URL,
  sameAs: [
    "https://github.com/BertugTas",
    "https://linkedin.com/in/bertu%C4%9F-ta%C5%9F-bb20562b5",
    "https://www.researchgate.net/profile/Bertug-Tas",
  ],
  jobTitle: "ML Engineer & Data Scientist",
  description:
    "CS student at Dokuz Eylül University. Building ML systems, deep learning models, and data engineering pipelines from Izmir.",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-[#e8e8e8]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <GlobalCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
