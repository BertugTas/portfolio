import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bertuğ Taş — ML & Data Science",
  description:
    "Dokuz Eylül Üniversitesi Bilgisayar Bilimi öğrencisi. Makine öğrenmesi, derin öğrenme ve veri mühendisliği.",
  keywords: [
    "Bertuğ Taş",
    "Data Science",
    "Machine Learning",
    "Deep Learning",
    "CNN",
    "Python",
    "Power BI",
    "SQL",
    "İzmir",
  ],
  authors: [{ name: "Bertuğ Taş" }],
  openGraph: {
    title: "Bertuğ Taş — ML & Data Science",
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
      <body className={`${jetbrainsMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
