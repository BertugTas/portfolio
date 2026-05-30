"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Three.js / R3F scene — lazy-loaded off the critical render path
const NeuralBackground3D = dynamic(
  () => import("@/components/NeuralBackground3D"),
  { ssr: false, loading: () => null }
);

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <NeuralBackground3D />
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
