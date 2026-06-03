import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
