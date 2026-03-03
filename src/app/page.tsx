import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import NeuralBackground3D from "@/components/NeuralBackground3D";
import ClientCursorSpotlight from "@/components/ClientCursorSpotlight";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <NeuralBackground3D />
      <ClientCursorSpotlight />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
