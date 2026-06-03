import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Research from "@/components/Research";
import Projects from "@/components/Projects";
import TechInventory from "@/components/TechInventory";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
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
