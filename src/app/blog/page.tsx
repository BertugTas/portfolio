import type { Metadata } from "next";
import { getAllPostPairs } from "@/data/blog";
import BlogIndexClient from "./BlogIndexClient";

export const metadata: Metadata = {
  title: "Transmissions",
  description:
    "Field notes from the research layer — data science, MLOps, computer vision, and engineering practice by Bertuğ Taş.",
  alternates: { canonical: "https://www.bertugtas.com/blog" },
  openGraph: {
    title: "Transmissions · Bertuğ Taş",
    description:
      "Field notes from the research layer — data science, MLOps, computer vision, and engineering practice.",
    url: "https://www.bertugtas.com/blog",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Transmissions · Bertuğ Taş",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transmissions · Bertuğ Taş",
    description: "Field notes from the research layer.",
    creator: "@bertugtas",
    images: ["/twitter-image"],
  },
};

export default function BlogIndexPage() {
  const pairs = getAllPostPairs();
  return <BlogIndexClient pairs={pairs} />;
}
