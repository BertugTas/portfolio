"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import type { BlogPostPair, BlogCategory } from "@/data/blog";

type Props = { pairs: BlogPostPair[] };

const CATEGORY_TINT: Record<BlogCategory, string> = {
  research:     "var(--cyan)",
  experiences:  "var(--green)",
  perspectives: "var(--orange)",
};

const CATEGORY_PILL: Record<BlogCategory, { bg: string; border: string }> = {
  research:     { bg: "rgba(103,232,249,0.07)", border: "rgba(103,232,249,0.22)" },
  experiences:  { bg: "rgba(110,231,183,0.07)", border: "rgba(110,231,183,0.18)" },
  perspectives: { bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.20)"  },
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
  liveDot,
  rightColor,
}: {
  left: string;
  right?: string;
  liveDot?: boolean;
  rightColor?: string;
}) {
  return (
    <div className="flex items-center justify-between mb-6">
      <span className="text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
        {left}
      </span>
      {right && (
        <span
          className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.25em] uppercase font-bold"
          style={{ color: rightColor ?? (liveDot ? "var(--green)" : "var(--muted)") }}
        >
          {liveDot && (
            <span
              className="status-dot w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
            />
          )}
          {right}
        </span>
      )}
    </div>
  );
}

function MetaInline({
  category,
  date,
  readMinutes,
  lang,
}: {
  category: BlogCategory;
  date: string;
  readMinutes: number;
  lang: "en" | "tr";
}) {
  const pill = CATEGORY_PILL[category];
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-5">
      <span
        className="text-[0.5rem] uppercase tracking-[0.22em] font-bold px-2 py-0.5"
        style={{
          background: pill.bg,
          border: `1px solid ${pill.border}`,
          color: CATEGORY_TINT[category],
        }}
      >
        {CATEGORY_LABEL[category][lang].toUpperCase()}
      </span>
      <span className="inline-flex items-baseline gap-1.5">
        <span className="text-[0.48rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
          {lang === "tr" ? "Tarih" : "Date"}
        </span>
        <span className="text-[0.62rem] tabular-nums tracking-[0.04em]" style={{ color: "var(--muted2)" }}>
          {date}
        </span>
      </span>
      <span className="inline-flex items-baseline gap-1.5">
        <span className="text-[0.48rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
          {lang === "tr" ? "Süre" : "Read"}
        </span>
        <span className="text-[0.62rem] tabular-nums tracking-[0.04em]" style={{ color: "var(--muted2)" }}>
          {readMinutes}{lang === "tr" ? " dk" : " min"}
        </span>
      </span>
    </div>
  );
}

/* ─────────────────────────────────── cards ── */

function FeaturedPostCard({ pair, lang }: { pair: BlogPostPair; lang: "en" | "tr" }) {
  const post = pair[lang];
  if (!post) return null;
  const fm = post.frontmatter;

  return (
    <Link
      href={`/blog/${pair.slug}`}
      className="group relative block overflow-hidden p-8 md:p-10 lg:p-12 transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg2)";
        el.style.boxShadow = "inset 0 1px 0 rgba(103,232,249,0.22)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Cyan wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(103,232,249,0.045) 0%, transparent 55%)" }}
      />

      <div className="relative">
        <CellMarker
          left={lang === "tr" ? "// 01 · ÖNE ÇIKAN" : "// 01 · FEATURED"}
          right="★ FLAGSHIP"
          rightColor="var(--cyan)"
        />

        <MetaInline category={fm.category} date={fm.date} readMinutes={post.readMinutes} lang={lang} />

        <h3
          className="font-black tracking-tighter leading-[1.05] mb-5"
          style={{
            fontSize: "clamp(1.75rem,4vw,2.6rem)",
            color: "var(--text-max)",
            overflowWrap: "break-word",
            wordBreak: "break-word",
            hyphens: "auto",
          }}
        >
          {fm.title}
        </h3>

        <p
          className="text-[0.92rem] leading-[1.85] mb-6"
          style={{ color: "var(--muted2)", maxWidth: "60ch" }}
        >
          {fm.excerpt}
        </p>

        <span
          className="inline-flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.18em]"
          style={{ color: "var(--cyan)" }}
        >
          {lang === "tr" ? "Devamını Oku" : "Read Post"}
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}

function RegularPostCard({
  pair,
  lang,
  index,
}: {
  pair: BlogPostPair;
  lang: "en" | "tr";
  index: number;
}) {
  const post = pair[lang];
  if (!post) return null;
  const fm = post.frontmatter;
  const num = String(index + 2).padStart(2, "0");

  return (
    <Link
      href={`/blog/${pair.slug}`}
      className="group relative block overflow-hidden p-8 md:p-10 lg:p-12 transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg2)";
        el.style.boxShadow = "inset 0 1px 0 rgba(103,232,249,0.22)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg)";
        el.style.boxShadow = "none";
      }}
    >
      <CellMarker
        left={lang === "tr" ? `// ${num} · YAZI` : `// ${num} · POST`}
      />

      <MetaInline category={fm.category} date={fm.date} readMinutes={post.readMinutes} lang={lang} />

      <h3
        className="text-2xl md:text-3xl font-black tracking-tighter mb-4 leading-tight"
        style={{
          color: "var(--text-max)",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          hyphens: "auto",
        }}
      >
        {fm.title}
      </h3>

      <p
        className="text-[0.82rem] leading-[1.85] mb-5"
        style={{ color: "var(--muted2)", maxWidth: "60ch" }}
      >
        {fm.excerpt}
      </p>

      <span
        className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.18em]"
        style={{ color: "var(--muted2)" }}
      >
        {lang === "tr" ? "Yazıyı Aç" : "Open Post"}
        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
      </span>
    </Link>
  );
}

function ArchiveMarker({
  counts,
  total,
  lang,
}: {
  counts: Record<BlogCategory, number>;
  total: number;
  lang: "en" | "tr";
}) {
  return (
    <div style={{ background: "var(--bg)" }}>
      <div className="lg:sticky lg:top-32 p-8 md:p-10 lg:p-12 flex flex-col gap-8">

        <CellMarker
          left={lang === "tr" ? "// ARŞİV" : "// ARCHIVE"}
          right="LIVE"
          liveDot
        />

        {/* Total count */}
        <div>
          <span className="block text-[0.48rem] uppercase tracking-[0.22em] mb-2.5" style={{ color: "var(--muted)" }}>
            {lang === "tr" ? "Toplam" : "Count"}
          </span>
          <span
            className="block text-5xl font-black tracking-tighter leading-none tabular-nums"
            style={{ color: "var(--text-max)" }}
          >
            {String(total).padStart(2, "0")}
          </span>
          <span className="block text-[0.52rem] uppercase tracking-[0.2em] mt-2" style={{ color: "var(--muted)" }}>
            {lang === "tr" ? "yazı" : "posts"}
          </span>
        </div>

        {/* Categories with counts */}
        <div>
          <span className="block text-[0.48rem] uppercase tracking-[0.22em] mb-3" style={{ color: "var(--muted)" }}>
            {lang === "tr" ? "Kategoriler" : "Categories"}
          </span>
          <div className="flex flex-col gap-2.5">
            {(["research", "experiences", "perspectives"] as const).map((cat) => (
              <div
                key={cat}
                className="flex items-baseline justify-between pb-2"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-[0.65rem] tracking-[0.04em]" style={{ color: CATEGORY_TINT[cat] }}>
                  {CATEGORY_LABEL[cat][lang]}
                </span>
                <span
                  className="text-[0.55rem] tabular-nums tracking-[0.05em]"
                  style={{ color: "var(--muted)" }}
                >
                  {String(counts[cat]).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial caption */}
        <p className="text-[0.7rem] leading-[1.85]" style={{ color: "var(--muted)" }}>
          {lang === "tr"
            ? "Veri bilimi, MLOps ve araştırma notları. İzmir'den, gerçek projelerden."
            : "Notes on data science, MLOps, and research. From Izmir, from real projects."}
        </p>
      </div>
    </div>
  );
}

function EmptyState({ lang }: { lang: "en" | "tr" }) {
  return (
    <div className="p-16 text-center" style={{ background: "var(--bg)" }}>
      <span className="block text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: "var(--muted)" }}>
        {lang === "tr" ? "Henüz yazı yok" : "No posts yet"}
      </span>
    </div>
  );
}

/* ─────────────────────────────────── main ── */

export default function BlogIndexClient({ pairs }: Props) {
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
  }, []);

  const visiblePairs = pairs.filter((p) => p[lang] !== null);
  const featured = visiblePairs.find((p) => p.featured);
  const regular = visiblePairs.filter((p) => !p.featured);

  const counts: Record<BlogCategory, number> = {
    research:     visiblePairs.filter((p) => p.category === "research").length,
    experiences:  visiblePairs.filter((p) => p.category === "experiences").length,
    perspectives: visiblePairs.filter((p) => p.category === "perspectives").length,
  };

  return (
    <section
      id="blog-index"
      ref={sectionRef}
      className="relative z-[1] pt-32 pb-28 px-6 md:px-12"
    >
      {/* Animated section divider */}
      <div
        aria-hidden
        className="reveal-line absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-strong)" }}
      />

      <div className="relative overflow-hidden">

        {/* Ghost section number */}
        <span
          aria-hidden
          className="absolute right-0 top-0 font-black tracking-tighter leading-none select-none pointer-events-none hidden lg:block"
          style={{
            fontSize: "clamp(8rem,20vw,17rem)",
            color: "rgba(255,255,255,0.022)",
            lineHeight: 0.85,
          }}
        >
          05
        </span>

        {/* Section header */}
        <div className="mb-4 reveal">
          <div className="flex items-baseline gap-5">
            <span
              className="text-[0.65rem] tracking-[0.25em] opacity-50 shrink-0"
              style={{ color: "var(--cyan)" }}
            >
              {"// 05"}
            </span>
            <h2
              className="font-black tracking-tighter leading-none"
              style={{ fontSize: "clamp(2.4rem,7.5vw,6rem)", color: "var(--text-max)" }}
            >
              Transmissions
            </h2>
            <div
              className="flex-1 h-px self-center ml-4 hidden md:block"
              style={{ background: "linear-gradient(to right, var(--border-strong), transparent)" }}
            />
          </div>
          <p
            className="text-[0.62rem] uppercase tracking-[0.18em] mt-3 ml-0"
            style={{ color: "var(--muted)" }}
          >
            {lang === "tr"
              ? "Araştırma katmanından saha notları."
              : "Field notes from the research layer."}
          </p>
        </div>
        <div className="mb-12" />

        {/* ═══════════════════ BENTO WRAPPER ═══════════════════ */}
        <div
          className="flex flex-col gap-px reveal"
          style={{ background: "var(--border)" }}
        >
          {/* Split row: LEFT marker (1fr) · RIGHT post stream (3fr) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-px"
            style={{ background: "var(--border)" }}
          >
            {/* LEFT — sticky archive marker */}
            <ArchiveMarker counts={counts} total={visiblePairs.length} lang={lang} />

            {/* RIGHT — post stream */}
            <div
              className="flex flex-col gap-px"
              style={{ background: "var(--border)" }}
            >
              {visiblePairs.length === 0 ? (
                <EmptyState lang={lang} />
              ) : (
                <>
                  {featured && <FeaturedPostCard pair={featured} lang={lang} />}
                  {regular.map((pair, i) => (
                    <RegularPostCard key={pair.slug} pair={pair} lang={lang} index={i} />
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
