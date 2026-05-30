import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

// ─── Types ─────────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES = ["research", "experiences", "perspectives"] as const;
export type BlogCategory = typeof BLOG_CATEGORIES[number];

export type BlogFrontmatter = {
  title: string;
  slug: string;
  category: BlogCategory;
  date: string;                  // ISO YYYY-MM-DD
  excerpt: string;
  tags?: string[];
  cover?: string;
  featured?: boolean;
  readMinutes?: number;          // optional override; otherwise computed
};

export type BlogPostFile = {
  frontmatter: BlogFrontmatter;
  contentHtml: string;           // rendered markdown
  readMinutes: number;           // always present (computed if missing)
};

// Bilingual pair — one slug, two language variants. Either may be null.
export type BlogPostPair = {
  slug: string;
  date: string;                  // primary date (en preferred)
  category: BlogCategory;
  featured: boolean;
  en: BlogPostFile | null;
  tr: BlogPostFile | null;
};

// ─── Constants ─────────────────────────────────────────────────────────────

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const WORDS_PER_MINUTE = 220;

// ─── Validation ────────────────────────────────────────────────────────────

function isCategory(v: unknown): v is BlogCategory {
  return typeof v === "string" && (BLOG_CATEGORIES as readonly string[]).includes(v);
}

function validateFrontmatter(
  data: Record<string, unknown>,
  file: string,
): BlogFrontmatter {
  const { title, slug, category, date, excerpt, tags, cover, featured, readMinutes } = data;

  if (typeof title !== "string")
    throw new Error(`[blog] ${file}: 'title' missing or not a string`);
  if (typeof slug !== "string")
    throw new Error(`[blog] ${file}: 'slug' missing or not a string`);
  if (!isCategory(category))
    throw new Error(
      `[blog] ${file}: 'category' must be one of ${BLOG_CATEGORIES.join(" | ")}, got ${String(category)}`,
    );
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    throw new Error(`[blog] ${file}: 'date' must be ISO YYYY-MM-DD, got ${String(date)}`);
  if (typeof excerpt !== "string")
    throw new Error(`[blog] ${file}: 'excerpt' missing or not a string`);

  return {
    title,
    slug,
    category,
    date,
    excerpt,
    tags: Array.isArray(tags)
      ? tags.filter((t): t is string => typeof t === "string")
      : undefined,
    cover: typeof cover === "string" ? cover : undefined,
    featured: typeof featured === "boolean" ? featured : undefined,
    readMinutes: typeof readMinutes === "number" ? readMinutes : undefined,
  };
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function computeReadMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function parseFile(filePath: string): BlogPostFile {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = validateFrontmatter(
    data as Record<string, unknown>,
    path.basename(filePath),
  );
  const contentHtml = marked.parse(content, { async: false }) as string;
  const readMinutes = frontmatter.readMinutes ?? computeReadMinutes(content);

  return { frontmatter, contentHtml, readMinutes };
}

// ─── Public API (server-only, called from server components at SSG) ───────

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR);
  const slugs = new Set<string>();
  for (const file of files) {
    const m = file.match(/^(.+)\.(en|tr)\.md$/);
    if (m) slugs.add(m[1]);
  }
  return [...slugs];
}

export function getPostPairBySlug(slug: string): BlogPostPair | null {
  const enPath = path.join(BLOG_DIR, `${slug}.en.md`);
  const trPath = path.join(BLOG_DIR, `${slug}.tr.md`);
  const enExists = fs.existsSync(enPath);
  const trExists = fs.existsSync(trPath);
  if (!enExists && !trExists) return null;

  const en = enExists ? parseFile(enPath) : null;
  const tr = trExists ? parseFile(trPath) : null;
  const primary = en ?? tr!;

  return {
    slug,
    date: primary.frontmatter.date,
    category: primary.frontmatter.category,
    featured: primary.frontmatter.featured ?? false,
    en,
    tr,
  };
}

export function getAllPostPairs(): BlogPostPair[] {
  return getAllSlugs()
    .map(getPostPairBySlug)
    .filter((p): p is BlogPostPair => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}
