import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import CaseStudyClient from "./CaseStudyClient";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};

  const { title, problem, area } = project.en;
  const description = problem.slice(0, 155);

  return {
    title: `${title} | Bertug Tas`,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Bertug Tas",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    keywords: [...area.split(" · "), ...project.en.stack],
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();

  return <CaseStudyClient project={project} />;
}
