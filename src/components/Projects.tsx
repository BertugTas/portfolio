"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";
import { projectsList, type ProjectCard, type ProjectMetaKV } from "@/data/projects";

/* ─────────────────────────────────────────── helpers ── */

function StackTag({ label }: { label: string }) {
  return (
    <span
      className="text-[0.58rem] tracking-[0.07em] px-1.5 py-px"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        color: "var(--muted)",
      }}
    >
      {label}
    </span>
  );
}

function Badge({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className="text-[0.58rem] tracking-[0.07em] px-2 py-0.5 whitespace-nowrap"
      style={{
        background: accent ? "rgba(103,232,249,0.07)" : "rgba(110,231,183,0.07)",
        border: `1px solid ${accent ? "rgba(103,232,249,0.22)" : "rgba(110,231,183,0.18)"}`,
        color: accent ? "var(--cyan)" : "var(--green)",
      }}
    >
      {label}
    </span>
  );
}

function MetaRow({ items, lang }: { items: ProjectMetaKV[]; lang: "en" | "tr" }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-4">
      {items.map((item) => (
        <span key={item.keyEn} className="inline-flex items-center gap-1.5">
          <span
            className="text-[0.49rem] uppercase tracking-[0.18em]"
            style={{ color: "var(--muted)" }}
          >
            {lang === "tr" ? item.keyTr : item.keyEn}
          </span>
          <span
            className="text-[0.6rem] tracking-[0.04em]"
            style={{ color: item.color ?? "var(--muted2)" }}
          >
            {item.val}
          </span>
        </span>
      ))}
    </div>
  );
}

function GithubBtn({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] px-4 py-2 transition-all duration-200"
      style={{ border: "1px solid var(--border)", color: "var(--muted2)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
        (e.currentTarget as HTMLElement).style.color = "var(--text)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.color = "var(--muted2)";
      }}
    >
      GitHub ↗
    </a>
  );
}

function PyPIBtn({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] px-4 py-2 transition-all duration-200"
      style={{ background: "var(--cyan)", color: "var(--bg)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(103,232,249,0.4)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = "none")
      }
    >
      PyPI ↗
    </a>
  );
}

/* ─────────────────────────────────────────── component ── */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].projects;

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const [featured, ...rest] = projectsList as [ProjectCard, ...ProjectCard[]];
  const featuredContent = lang === "tr" ? featured.tr : featured.en;
  const featuredBadgeLabels = featured.badges.map((b) => (lang === "tr" ? b.tr : b.en));

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-[1] py-28 px-6 md:px-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto relative overflow-hidden">

        {/* Ghost section number */}
        <span
          aria-hidden
          className="absolute right-0 top-0 font-black tracking-tighter leading-none select-none pointer-events-none hidden lg:block"
          style={{ fontSize: "clamp(8rem,20vw,17rem)", color: "rgba(255,255,255,0.022)", lineHeight: 0.85 }}
        >
          03
        </span>

        {/* ── Section header ── */}
        <div className="flex items-baseline gap-5 mb-16 reveal">
          <span className="text-[0.65rem] tracking-[0.25em] opacity-50 shrink-0" style={{ color: "var(--cyan)" }}>
            {t.num}
          </span>
          <h2
            className="font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(3rem,8vw,6.5rem)", color: "var(--text-max)" }}
          >
            {t.title}
          </h2>
          <div
            className="flex-1 h-px self-center ml-4 hidden md:block"
            style={{ background: "linear-gradient(to right, var(--border-strong), transparent)" }}
          />
        </div>

        {/* ══════════════════════ FEATURED CARD ══════════════════════ */}
        <div
          className="reveal mb-px relative overflow-hidden"
          style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderLeftWidth: "2px",
            borderLeftColor: "var(--cyan)",
            boxShadow: "0 0 48px rgba(103,232,249,0.04), inset 0 0 48px rgba(103,232,249,0.015)",
          }}
        >
          {/* subtle gradient wash */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(103,232,249,0.05) 0%, transparent 55%)" }}
          />

          <div className="relative p-8 md:p-10">
            {/* top row: area + featured label */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <span
                className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5"
                style={{ color: "var(--muted2)", border: "1px solid var(--border)" }}
              >
                {featuredContent.area}
              </span>
              <span
                className="text-[0.55rem] uppercase tracking-[0.25em] px-2.5 py-1 font-bold"
                style={{
                  background: "rgba(103,232,249,0.1)",
                  border: "1px solid rgba(103,232,249,0.35)",
                  color: "var(--cyan)",
                }}
              >
                ★ {lang === "tr" ? "Öne Çıkan Proje" : "Featured Project"}
              </span>
            </div>

            <div className="md:grid md:grid-cols-[1fr_auto] md:gap-12 md:items-start">
              {/* left: content */}
              <div>
                <h3
                  className="text-3xl md:text-4xl font-black tracking-tighter mb-4 leading-tight"
                  style={{ color: "var(--text-max)" }}
                >
                  {featuredContent.title}
                </h3>

                <p
                  className="text-[0.78rem] leading-[1.9] mb-5"
                  style={{ color: "var(--muted2)", maxWidth: "56ch" }}
                >
                  {featuredContent.description}
                </p>

                {/* meta row */}
                <MetaRow items={featured.meta} lang={lang} />

                {/* badges */}
                {featuredBadgeLabels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featuredBadgeLabels.map((b) => <Badge key={b} label={b} accent />)}
                  </div>
                )}

                {/* stack */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {featured.stack.map((s) => <StackTag key={s} label={s} />)}
                </div>

                {/* links */}
                <div className="flex flex-wrap gap-3">
                  {featured.pypiUrl && <PyPIBtn href={featured.pypiUrl} />}
                  <GithubBtn href={featured.href} />
                </div>
              </div>

              {/* right: metric panel */}
              {featured.metrics.length > 0 && (
                <div className="flex flex-row md:flex-col gap-3 mt-8 md:mt-0 flex-wrap">
                  {featured.metrics.map((m) => (
                    <div
                      key={m.labelEn}
                      className="flex-1 md:flex-none px-5 py-4 text-center min-w-[80px]"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
                    >
                      <span className="block text-2xl font-bold leading-none mb-1.5" style={{ color: m.color }}>
                        {m.val}
                      </span>
                      <span className="block text-[0.52rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                        {lang === "tr" ? m.labelTr : m.labelEn}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════ REGULAR GRID ══════════════════════ */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px"
          style={{ background: "var(--border)" }}
        >
          {rest.map((project, idx) => {
            const content       = lang === "tr" ? project.tr : project.en;
            const badgeLabels   = project.badges.map((b) => (lang === "tr" ? b.tr : b.en));
            const num           = String(idx + 2).padStart(2, "0");
            const isLastOdd     = idx === rest.length - 1 && rest.length % 2 !== 0;

            return (
              <div
                key={project.id}
                className={`reveal group relative overflow-hidden flex flex-col transition-colors duration-300${isLastOdd ? " md:col-span-2" : ""}`}
                style={{ background: "var(--bg2)", padding: "2rem" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--bg3)";
                  el.style.boxShadow = "inset 0 1px 0 rgba(103,232,249,0.22)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--bg2)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* hover gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(103,232,249,0.03), transparent)" }}
                />

                {/* area + number */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5"
                    style={{ color: "var(--muted2)", border: "1px solid var(--border)" }}
                  >
                    {content.area}
                  </span>
                  <span
                    className="text-[1.6rem] font-bold leading-none tabular-nums select-none"
                    style={{ color: "rgba(255,255,255,0.05)" }}
                  >
                    {num}
                  </span>
                </div>

                {/* title */}
                <h3
                  className="text-xl font-black tracking-tight mb-3 leading-snug"
                  style={{ color: "var(--text-max)", overflowWrap: "break-word" }}
                >
                  {content.title}
                </h3>

                {/* description */}
                <p
                  className="text-[0.72rem] leading-[1.85] mb-4 flex-1"
                  style={{ color: "var(--muted2)", overflowWrap: "break-word" }}
                >
                  {content.description}
                </p>

                {/* meta row */}
                <MetaRow items={project.meta} lang={lang} />

                {/* badges */}
                {badgeLabels.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {badgeLabels.map((b) => <Badge key={b} label={b} />)}
                  </div>
                )}

                {/* stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((s) => <StackTag key={s} label={s} />)}
                </div>

                {/* links */}
                <div
                  className="flex flex-wrap gap-2 mt-auto pt-5"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  {project.pypiUrl && <PyPIBtn href={project.pypiUrl} />}
                  <GithubBtn href={project.href} />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
