"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { BlogPostPair, BlogCategory } from "@/data/blog";

type Props = { pair: BlogPostPair };

const CATEGORY_TINT: Record<BlogCategory, string> = {
  research:     "var(--cyan)",
  experiences:  "var(--green)",
  perspectives: "var(--orange)",
};

const CATEGORY_LABEL: Record<BlogCategory, { en: string; tr: string }> = {
  research:     { en: "Research",     tr: "Araştırma"  },
  experiences:  { en: "Experiences",  tr: "Deneyimler" },
  perspectives: { en: "Perspectives", tr: "Görüşler"   },
};

/* ─────────────────────────────────── helpers ── */

function CellMarker({
  left,
  right,
  rightColor,
}: {
  left: string;
  right?: string;
  rightColor?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <span className="text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
        {left}
      </span>
      {right && (
        <span
          className="text-[0.55rem] tracking-[0.25em] uppercase font-bold"
          style={{ color: rightColor ?? "var(--muted)" }}
        >
          {right}
        </span>
      )}
    </div>
  );
}

function MetaCell({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="p-5 md:p-6" style={{ background: "var(--bg)" }}>
      <span
        className="block text-[0.48rem] uppercase tracking-[0.22em] mb-2"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
      <span
        className="block text-[0.85rem] font-bold tracking-tight"
        style={{ color: color ?? "var(--text-max)" }}
      >
        {value}
      </span>
    </div>
  );
}

function FallbackNotice({
  availableLang,
  lang,
}: {
  availableLang: "en" | "tr" | null;
  lang: "en" | "tr";
}) {
  return (
    <section className="relative z-[1] pt-40 pb-28 px-6 md:px-12 min-h-[80vh] flex items-center">
      <div
        aria-hidden
        className="reveal-line absolute top-0 left-0 right-0 h-px visible"
        style={{ background: "var(--border-strong)" }}
      />

      <div
        className="max-w-2xl mx-auto p-12 text-center"
        style={{ background: "var(--bg2)", border: "1px solid var(--border)" }}
      >
        <span
          className="block text-[0.6rem] uppercase tracking-[0.3em] mb-5"
          style={{ color: "var(--orange)" }}
        >
          {lang === "tr" ? "// MEVCUT DEĞİL" : "// NOT AVAILABLE"}
        </span>

        <p
          className="text-[1rem] leading-[1.9] mb-6"
          style={{ color: "var(--muted2)" }}
        >
          {lang === "tr"
            ? "Bu yazı henüz Türkçe'de mevcut değil."
            : "This post is not yet available in English."}
        </p>

        {availableLang && (
          <p className="text-[0.78rem] leading-[1.8]" style={{ color: "var(--muted)" }}>
            {lang === "tr"
              ? "Üst menüdeki dil değiştiriciyle İngilizce versiyonuna geçebilirsiniz."
              : "Use the language toggle in the navbar to read the Turkish version."}
          </p>
        )}

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-10 text-[0.65rem] font-bold uppercase tracking-[0.22em] transition-colors duration-200"
          style={{ color: "var(--cyan)" }}
        >
          ← {lang === "tr" ? "Arşive Dön" : "Back to Archive"}
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────── main ── */

export default function BlogPostClient({ pair }: Props) {
  const { lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-line");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  const post = pair[lang];

  // Fallback: post missing in current language
  if (!post) {
    const otherLang: "en" | "tr" = lang === "en" ? "tr" : "en";
    return <FallbackNotice availableLang={pair[otherLang] ? otherLang : null} lang={lang} />;
  }

  const fm = post.frontmatter;

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] pt-32 pb-28 px-6 md:px-12"
    >
      {/* Animated section divider */}
      <div
        aria-hidden
        className="reveal-line absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-strong)" }}
      />

      <div className="max-w-5xl mx-auto relative">

        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[0.6rem] font-bold uppercase tracking-[0.22em] mb-12 transition-colors duration-200 group"
          style={{ color: "var(--muted2)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted2)")}
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
          <span>{lang === "tr" ? "Arşive Dön" : "Back to Archive"}</span>
        </Link>

        {/* ═══════════════════ BENTO: LEDE → TELEMETRY → BODY ═══════════════════ */}
        <div
          className="flex flex-col gap-px reveal"
          style={{ background: "var(--border)" }}
        >
          {/* ───── LEDE CELL ───── */}
          <div className="p-8 md:p-12 lg:p-16" style={{ background: "var(--bg)" }}>
            <CellMarker
              left={lang === "tr" ? `// YAZI · ${CATEGORY_LABEL[fm.category].tr.toUpperCase()}` : `// POST · ${CATEGORY_LABEL[fm.category].en.toUpperCase()}`}
              right={lang === "tr" ? "MAKALE" : "ARTICLE"}
              rightColor={CATEGORY_TINT[fm.category]}
            />

            <h1
              className="font-black tracking-tighter leading-[1.0] mb-8"
              style={{
                fontSize: "clamp(2.5rem,6vw,5rem)",
                color: "var(--text-max)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {fm.title}
            </h1>

            <p
              className="text-[1.05rem] leading-[1.7]"
              style={{ color: "var(--muted2)", maxWidth: "60ch" }}
            >
              {fm.excerpt}
            </p>
          </div>

          {/* ───── TELEMETRY STRIP — 4-cell metadata row ───── */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: "var(--border)" }}
          >
            <MetaCell
              label={lang === "tr" ? "Kategori" : "Category"}
              value={CATEGORY_LABEL[fm.category][lang]}
              color={CATEGORY_TINT[fm.category]}
            />
            <MetaCell
              label={lang === "tr" ? "Tarih" : "Date"}
              value={fm.date}
            />
            <MetaCell
              label={lang === "tr" ? "Süre" : "Read Time"}
              value={`${post.readMinutes} ${lang === "tr" ? "dakika" : "min"}`}
            />
            <MetaCell
              label={lang === "tr" ? "Etiketler" : "Tags"}
              value={fm.tags ? String(fm.tags.length).padStart(2, "0") : "00"}
            />
          </div>

          {/* ───── BODY CELL — rendered markdown ───── */}
          <div className="p-8 md:p-12 lg:p-16" style={{ background: "var(--bg)" }}>
            <article
              className="prose-blog mx-auto"
              style={{ maxWidth: "68ch" }}
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            {fm.tags && fm.tags.length > 0 && (
              <div
                className="mt-14 pt-8 mx-auto"
                style={{ maxWidth: "68ch", borderTop: "1px solid var(--border)" }}
              >
                <span
                  className="block text-[0.5rem] uppercase tracking-[0.22em] mb-3"
                  style={{ color: "var(--muted)" }}
                >
                  {lang === "tr" ? "Etiketler" : "Tags"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {fm.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.58rem] tracking-[0.07em] px-1.5 py-px"
                      style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
