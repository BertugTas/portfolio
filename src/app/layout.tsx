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

export const metadata: Metadata = {
  metadataBase: new URL("https://bertugtas.com"),
  title: {
    default: "Bertuğ Taş — ML Engineer & Data Scientist",
    template: "%s · Bertuğ Taş",
  },
  description:
    "CS student at Dokuz Eylül University. Building ML systems, deep learning models, and data engineering pipelines from Izmir. TÜBİTAK 2209-A researcher.",
  keywords: [
    "Bertuğ Taş", "Machine Learning", "Deep Learning", "Data Science",
    "Python", "TensorFlow", "CNN", "MLOps", "Power BI", "SQL",
    "Izmir", "TÜBİTAK", "Computer Vision",
  ],
  authors: [{ name: "Bertuğ Taş", url: "https://bertugtas.com" }],
  alternates: {
    canonical: "https://bertugtas.com",
  },
  openGraph: {
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description:
      "CS student at Dokuz Eylül University. Building ML systems, deep learning models, and data engineering pipelines from Izmir. TÜBİTAK 2209-A researcher.",
    url: "https://bertugtas.com",
    siteName: "Bertuğ Taş",
    locale: "tr_TR",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description:
      "ML · Deep Learning · Computer Vision · MLOps · İzmir",
    creator: "@bertugtas",
  },
  robots: { index: true, follow: true },
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
        <GlobalCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
