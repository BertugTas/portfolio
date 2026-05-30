import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllSlugs, getPostPairBySlug } from "@/data/blog";
import BlogPostClient from "./BlogPostClient";

type Props = { params: Promise<{ slug: string }> };

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
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      siteName: "Bertuğ Taş",
      publishedTime: date,
      tags: tags,
      ...(cover ? { images: [cover] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
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
