"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";
import { researchData, type ResearchItem } from "@/data/research";

function ResearchFeatured({ item, lang, t }: { item: ResearchItem; lang: "en" | "tr"; t: { methodology: string; outcome: string; featured: string } }) {
  const content = lang === "tr" ? item.tr : item.en;

  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-px overflow-hidden"
      style={{ background: "var(--border)" }}
    >
      {/* Cyan wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(103,232,249,0.038) 0%, transparent 55%)" }}
      />

      {/* LEFT: content */}
      <div className="relative p-8 md:p-10 lg:p-12 flex flex-col" style={{ background: "var(--bg)" }}>
        <div className="flex items-center justify-between mb-7">
          <span className="text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
            {t.featured}
          </span>
          <span
            className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.25em] uppercase font-bold"
            style={{ color: "var(--green)" }}
          >
            <span
              className="status-dot w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
            />
            {lang === "tr" ? "AKTİF" : "ACTIVE"}
          </span>
        </div>

        <span
          className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5 self-start mb-5"
          style={{ color: "var(--orange)", border: "1px solid rgba(251,191,36,0.22)" }}
        >
          {item.sponsor}
        </span>

        <h3
          className="font-black tracking-tighter mb-5 leading-[1.05]"
          style={{
            fontSize: "clamp(1.75rem,3.5vw,2.6rem)",
            color: "var(--text-max)",
          }}
        >
          {content.title}
        </h3>

        <p className="text-[0.62rem] uppercase tracking-[0.12em] mb-2" style={{ color: "var(--muted)" }}>
          {content.area}
        </p>

        {/* Methodology */}
        <div
          className="mt-6 pt-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="block text-[0.6rem] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--muted)" }}>
            {t.methodology}
          </span>
          <p className="text-[0.82rem] leading-[1.95]" style={{ color: "var(--muted2)" }}>
            {content.methodology}
          </p>
        </div>

        {/* Outcome */}
        <div
          className="mt-5 pt-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span className="block text-[0.6rem] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--muted)" }}>
            {t.outcome}
          </span>
          <p className="text-[0.82rem] leading-[1.95]" style={{ color: "var(--muted2)" }}>
            {content.outcome}
          </p>
        </div>
      </div>

      {/* RIGHT: meta + stack */}
      <div className="relative p-8 md:p-10 lg:p-12 flex flex-col" style={{ background: "var(--bg)" }}>
        <div className="mb-7">
          <span className="text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
            {lang === "tr" ? "// VERİ" : "// DATA"}
          </span>
        </div>

        {/* Meta tiles — hairline only, no background */}
        <div
          className="grid grid-cols-1 gap-px mb-6"
          style={{ background: "var(--border)" }}
        >
          {item.meta.map((m) => (
            <div key={m.key} className="p-5" style={{ background: "var(--bg)" }}>
              <span className="block text-[0.6rem] uppercase tracking-[0.2em] mb-1.5" style={{ color: "var(--muted)" }}>
                {m.key}
              </span>
              <span
                className="block text-[0.92rem] font-bold tracking-tight"
                style={{ color: m.color ?? "var(--text-max)" }}
              >
                {m.val}
              </span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-auto">
          <span className="block text-[0.6rem] uppercase tracking-[0.22em] mb-3" style={{ color: "var(--muted)" }}>
            {lang === "tr" ? "Yığın" : "Stack"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {item.stack.map((s) => (
              <span
                key={s}
                className="text-[0.58rem] tracking-[0.07em] px-1.5 py-px"
                style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchSecondary({ item, lang, t }: { item: ResearchItem; lang: "en" | "tr"; t: { secondary: string; methodology: string; outcome: string } }) {
  const content = lang === "tr" ? item.tr : item.en;

  return (
    <div
      className="group relative p-8 md:p-10 lg:p-12 flex flex-col overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg2)";
        el.style.boxShadow = "inset 0 1px 0 rgba(103,232,249,0.18)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg)";
        el.style.boxShadow = "none";
      }}
    >
      <div className="flex items-center justify-between mb-7">
        <span className="text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
          {t.secondary}
        </span>
        <span className="text-[0.55rem] tracking-[0.25em] uppercase font-bold" style={{ color: "var(--cyan)" }}>
          <span className="sr-only">Evaluation score: </span>88 / 100
        </span>
      </div>

      <span
        className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5 self-start mb-5"
        style={{ color: "var(--cyan)", border: "1px solid rgba(103,232,249,0.22)" }}
      >
        {item.sponsor}
      </span>

      <h3
        className="text-2xl md:text-3xl font-black tracking-tighter mb-4 leading-tight"
        style={{ color: "var(--text-max)" }}
      >
        {content.title}
      </h3>

      <p className="text-[0.62rem] uppercase tracking-[0.12em] mb-5" style={{ color: "var(--muted)" }}>
        {content.area}
      </p>

      <div
        className="mt-auto pt-5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <span className="block text-[0.6rem] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--muted)" }}>
          {t.outcome}
        </span>
        <p className="text-[0.78rem] leading-[1.9]" style={{ color: "var(--muted2)" }}>
          {content.outcome}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-6">
        {item.stack.map((s) => (
          <span
            key={s}
            className="text-[0.58rem] tracking-[0.07em] px-1.5 py-px"
            style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Research() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].research;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    sectionRef.current
      ?.querySelectorAll(".reveal, .reveal-line, .chapter-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const featured = researchData.find((r) => r.featured)!;
  const secondary = researchData.filter((r) => !r.featured);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative z-[1] py-28 px-6 md:px-12"
    >
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
          style={{ fontSize: "clamp(8rem,20vw,17rem)", color: "rgba(255,255,255,0.022)", lineHeight: 0.85 }}
        >
          02
        </span>

        {/* Section header */}
        <div className="flex items-baseline gap-5 mb-16 reveal">
          <span className="text-[0.65rem] tracking-[0.25em] shrink-0" style={{ color: "var(--muted)" }}>
            {t.num}
          </span>
          <h2
            className="chapter-reveal font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(2.4rem,7.5vw,6rem)", color: "var(--text-max)" }}
          >
            {t.title}
          </h2>
          <div
            className="flex-1 h-px self-center ml-4 hidden md:block"
            style={{ background: "linear-gradient(to right, var(--border-strong), transparent)" }}
          />
        </div>

        {/* Descriptor */}
        <p
          className="text-[0.72rem] uppercase tracking-[0.18em] mb-10 reveal"
          style={{ color: "var(--muted)", transitionDelay: "0.05s" }}
        >
          {t.descriptor}
        </p>

        {/* Bento */}
        <div
          className="flex flex-col gap-px reveal"
          style={{ background: "var(--border)", transitionDelay: "0.1s" }}
        >
          <ResearchFeatured
            item={featured}
            lang={lang}
            t={{ methodology: t.methodology, outcome: t.outcome, featured: t.featured }}
          />
          <div
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-px"
            style={{ background: "var(--border)" }}
          >
            {secondary.map((item) => (
              <ResearchSecondary
                key={item.id}
                item={item}
                lang={lang}
                t={{ secondary: t.secondary, methodology: t.methodology, outcome: t.outcome }}
              />
            ))}
            {/* TÜBİTAK 1002-A tile — same structural skeleton as ResearchSecondary */}
            <div
              className="relative p-8 md:p-10 lg:p-12 flex flex-col overflow-hidden"
              style={{ background: "var(--bg)" }}
            >
              {/* Watermark */}
              <span
                aria-hidden
                className="absolute bottom-4 right-6 font-black tracking-tighter pointer-events-none select-none"
                style={{
                  fontSize: "clamp(3rem,7vw,5.5rem)",
                  color: "rgba(251,191,36,0.04)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                1002-A
              </span>

              <div className="flex items-center justify-between mb-7">
                <span className="text-[0.55rem] tracking-[0.25em] uppercase" style={{ color: "var(--muted)" }}>
                  {lang === "tr" ? "// 03 · AKADEMİK HİBE" : "// 03 · RESEARCH GRANT"}
                </span>
                <span className="text-[0.55rem] tracking-[0.25em] uppercase font-bold" style={{ color: "var(--orange)" }}>
                  {lang === "tr" ? "AKTİF" : "ACTIVE"}
                </span>
              </div>

              <span
                className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5 self-start mb-5"
                style={{ color: "var(--orange)", border: "1px solid rgba(251,191,36,0.22)" }}
              >
                TÜBİTAK 1002-A
              </span>

              <h3
                className="text-2xl md:text-3xl font-black tracking-tighter mb-4 leading-tight"
                style={{ color: "var(--text-max)" }}
              >
                {lang === "tr"
                  ? "Bölgesel Araştırma Veri Analizi"
                  : "Regional Research Data Analysis"}
              </h3>

              <p className="text-[0.62rem] uppercase tracking-[0.12em] mb-5" style={{ color: "var(--muted)" }}>
                {lang === "tr"
                  ? "İstatistik · Veri Bilimi · Bölgesel Analiz"
                  : "Statistics · Data Science · Regional Analysis"}
              </p>

              <div
                className="mt-auto pt-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <span className="block text-[0.6rem] uppercase tracking-[0.22em] mb-2" style={{ color: "var(--muted)" }}>
                  {t.outcome}
                </span>
                <p className="text-[0.78rem] leading-[1.9]" style={{ color: "var(--muted2)" }}>
                  {lang === "tr"
                    ? "TÜBİTAK hızlı destek programı kapsamında bölgesel veri setleri üzerinde istatistiksel modelleme ve analiz."
                    : "Statistical modeling and analysis on regional datasets under the TÜBİTAK rapid support grant program."}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-6">
                {["Python", "R", "Statistics", "pandas"].map((s) => (
                  <span
                    key={s}
                    className="text-[0.58rem] tracking-[0.07em] px-1.5 py-px"
                    style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
