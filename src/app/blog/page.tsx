import type { Metadata } from "next";
import { getAllPostPairs } from "@/data/blog";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Field notes from the research layer — data science, MLOps, computer vision, and engineering practice by Bertuğ Taş.",
  alternates: { canonical: "https://bertugtas.com/blog" },
  openGraph: {
    title: "Transmissions · Bertuğ Taş",
    description:
      "Field notes from the research layer — data science, MLOps, computer vision, and engineering practice.",
    url: "https://bertugtas.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transmissions · Bertuğ Taş",
    description: "Field notes from the research layer.",
  },
};

export default function BlogIndexPage() {
  const pairs = getAllPostPairs();
  return <BlogIndexClient pairs={pairs} />;
}
