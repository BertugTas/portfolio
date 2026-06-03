import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import TechInventory from "@/components/TechInventory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const NeuralBackground3D = dynamic(
  () => import("@/components/NeuralBackground3D"),
  { ssr: false, loading: () => null }
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NeuralBackground3D />
      <Navbar />
      <Hero />
      <About />
      <Research />
      <Projects />
      <TechInventory />
      <Contact />
      <Footer />
    </main>
  );
}
