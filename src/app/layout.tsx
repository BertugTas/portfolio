import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
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
  title: "Bertuğ Taş",
  description:
    "Dokuz Eylül Üniversitesi Bilgisayar Bilimi öğrencisi. Makine öğrenmesi, derin öğrenme ve veri mühendisliği.",
  keywords: [
    "Bertuğ Taş",
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "Python",
    "Power BI",
    "SQL",
    "İzmir",
  ],
  authors: [{ name: "Bertuğ Taş" }],
  openGraph: {
    title: "Bertuğ Taş",
    description: "Makine öğrenmesi, derin öğrenme ve veri mühendisliği.",
    url: "https://bertugtas.com.tr",
    siteName: "Bertuğ Taş",
    locale: "tr_TR",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#080808] text-[#e8e8e8]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
