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
  title: "Bertuğ Taş — ML Engineer & Data Scientist",
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
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description:
      "Dokuz Eylül Üniversitesi Bilgisayar Bilimi öğrencisi. Makine öğrenmesi, derin öğrenme ve veri mühendisliği.",
    url: "https://bertugtas.com",
    siteName: "Bertuğ Taş",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Bertuğ Taş — ML Engineer & Data Scientist",
    description: "ML · Deep Learning · Data Engineering · İzmir",
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
        <GlobalCursor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
