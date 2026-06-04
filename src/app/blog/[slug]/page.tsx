import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostPairBySlug } from "@/data/blog";
import BlogPostClient from "./BlogPostClient";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pair = getPostPairBySlug(slug);
  if (!pair) return {};

  const post = pair.en ?? pair.tr;
  if (!post) return {};

  const { title, excerpt, cover, date, category, tags } = post.frontmatter;

  return {
    title: `${title} | Bertuğ Taş`,
    description: excerpt,
    authors: [{ name: "Bertuğ Taş", url: "https://www.bertugtas.com" }],
    alternates: { canonical: `https://www.bertugtas.com/blog/${slug}` },
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      siteName: "Bertuğ Taş",
      publishedTime: date,
      authors: ["Bertuğ Taş"],
      tags: tags,
      images: cover
        ? [{ url: cover, alt: title }]
        : [
            {
              url: "/opengraph-image",
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      creator: "@bertugtas",
      images: cover ? [cover] : ["/twitter-image"],
    },
    keywords: [...(tags ?? []), category],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const pair = getPostPairBySlug(slug);
  if (!pair) notFound();

  return <BlogPostClient pair={pair} />;
}
