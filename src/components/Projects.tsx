"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage, T } from "@/context/LanguageContext";
import { slugMap } from "@/data/projects";

const stack: Record<string, string[]> = {
  "Brain MRI Tumor Classification System":             ["Python", "TensorFlow / Keras", "CNN", "NumPy", "OpenCV"],
  "Beyin MRI Tümör Sınıflandırma Sistemi":             ["Python", "TensorFlow / Keras", "CNN", "NumPy", "OpenCV"],
  "Cancer Diagnosis Model — Multi-Algorithm Analysis":  ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib"],
  "Kanser Teşhis Modeli — Çok Algoritma Analizi":      ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib"],
  "Enterprise BI Dashboard":                            ["Power BI", "DAX", "MS SQL Server", "T-SQL"],
  "Kurumsal İş Zekası Dashboard":                      ["Power BI", "DAX", "MS SQL Server", "T-SQL"],
  "Automated Data Collection & Alerting System":        ["Python", "Playwright", "Twilio API"],
  "Otomatik Veri Toplama & Uyarı Sistemi":             ["Python", "Playwright", "Twilio API"],
  "Enterprise Database Management System":              ["C#", "OOP", "MS SQL Server", "T-SQL", "Windows Forms"],
  "Kurumsal Veritabanı Yönetim Sistemi":               ["C#", "OOP", "MS SQL Server", "T-SQL", "Windows Forms"],
  "PredictiveOps Platform — Full-Stack ML Platform":   ["Python", "FastAPI", "Next.js", "Docker", "GitHub Actions", "SQLite"],
  "PredictiveOps Platform — Full-Stack ML Platformu":  ["Python", "FastAPI", "Next.js", "Docker", "GitHub Actions", "SQLite"],
  "bt-flow — Zero-Boilerplate ML Deployment":          ["PyPI", "CLI", "FastAPI", "Pydantic", "Typer"],
  "bt-flow — Tek Satırda ML Deployment":               ["PyPI", "CLI", "FastAPI", "Pydantic", "Typer"],
};

const badges: Record<string, string[]> = {
  "Brain MRI Tumor Classification System":             ["CNN Architecture", "Medical Imaging", "Multi-class"],
  "Beyin MRI Tümör Sınıflandırma Sistemi":             ["CNN Architecture", "Medical Imaging", "Multi-class"],
  "Cancer Diagnosis Model — Multi-Algorithm Analysis":  ["4 Algorithms", "ROC / AUC", "Confusion Matrix"],
  "Kanser Teşhis Modeli — Çok Algoritma Analizi":      ["4 Algoritma", "ROC / AUC", "Confusion Matrix"],
  "Enterprise BI Dashboard":                            ["DAX", "Star Schema", "KPI Tracking"],
  "Kurumsal İş Zekası Dashboard":                      ["DAX", "Star Schema", "KPI Takibi"],
  "Automated Data Collection & Alerting System":        ["Scheduled Pipeline", "SMS Alert", "Auto Filter"],
  "Otomatik Veri Toplama & Uyarı Sistemi":             ["Zamanlı Pipeline", "SMS Bildirim", "Oto Filtre"],
  "Enterprise Database Management System":              ["CRUD", "Role-based Auth", "Reporting"],
  "Kurumsal Veritabanı Yönetim Sistemi":               ["CRUD", "Rol Tabanlı Auth", "Raporlama"],
  "PredictiveOps Platform — Full-Stack ML Platform":   ["REST API", "CI/CD Pipeline", "Docker Compose"],
  "PredictiveOps Platform — Full-Stack ML Platformu":  ["REST API", "CI/CD Pipeline", "Docker Compose"],
  "bt-flow — Zero-Boilerplate ML Deployment":          ["Open Source", "PyPI Published", "1-Line Deploy"],
  "bt-flow — Tek Satırda ML Deployment":               ["Açık Kaynak", "PyPI'da Yayında", "Tek Satır Deploy"],
};

const pypiLinks: Record<string, string> = {
  "bt-flow — Zero-Boilerplate ML Deployment": "https://pypi.org/project/bt-flow/",
  "bt-flow — Tek Satırda ML Deployment":      "https://pypi.org/project/bt-flow/",
};

const metrics: Record<string, { val: string; label: string; color: string }[]> = {
  "PredictiveOps Platform — Full-Stack ML Platform": [
    { val: "REST",  label: "API Layer",  color: "var(--cyan)"  },
    { val: "CI/CD", label: "Automated",  color: "var(--green)" },
    { val: "3",     label: "Services",   color: "var(--orange)"},
  ],
  "PredictiveOps Platform — Full-Stack ML Platformu": [
    { val: "REST",  label: "API Katmanı", color: "var(--cyan)"  },
    { val: "CI/CD", label: "Otomatik",    color: "var(--green)" },
    { val: "3",     label: "Servis",      color: "var(--orange)"},
  ],
};

/* ─────────────────────────────────────────── helpers ── */
function StackTag({ label }: { label: string }) {
  return (
    <span
      className="text-[0.6rem] tracking-[0.08em] px-2 py-0.5 whitespace-nowrap"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border)",
        color: "var(--muted2)",
      }}
    >
      {label}
    </span>
  );
}

function Badge({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className="text-[0.6rem] tracking-[0.08em] px-2 py-0.5 whitespace-nowrap"
      style={{
        background: accent ? "rgba(103,232,249,0.07)" : "rgba(110,231,183,0.07)",
        border: `1px solid ${accent ? "rgba(103,232,249,0.25)" : "rgba(110,231,183,0.2)"}`,
        color: accent ? "var(--cyan)" : "var(--green)",
      }}
    >
      {label}
    </span>
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

function PrimaryBtn({ href, label }: { href: string; label: string }) {
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
      {label} ↗
    </a>
  );
}

function CaseStudyBtn({ slug, label }: { slug: string; label: string }) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] px-4 py-2 transition-all duration-200"
      style={{ background: "var(--cyan)", color: "var(--bg)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(103,232,249,0.4)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.boxShadow = "none")
      }
    >
      {label} →
    </Link>
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

  const [featured, ...rest] = t.items;

  const featuredStack   = stack[featured.title]   ?? [];
  const featuredBadges  = badges[featured.title]  ?? [];
  const featuredMetrics = metrics[featured.title] ?? [];
  const featuredSlug    = slugMap[featured.title] ?? "";
  const featuredPypi    = pypiLinks[featured.title] ?? "";
  const featuredGithub  = featured.href;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-[1] py-28 px-6 md:px-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto">

        {/* ── Section header ── */}
        <div className="flex items-baseline gap-5 mb-14 reveal">
          <span className="text-[0.7rem] tracking-[0.2em] opacity-60" style={{ color: "var(--cyan)" }}>
            {t.num}
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight leading-none"
            style={{ color: "var(--text)" }}
          >
            {t.title}
          </h2>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, var(--border), transparent)" }} />
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
                {featured.area}
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
                  className="text-2xl md:text-3xl font-bold mb-4 leading-snug"
                  style={{ color: "var(--text)" }}
                >
                  {featured.title}
                </h3>

                <p
                  className="text-[0.78rem] leading-[1.9] mb-6"
                  style={{ color: "var(--muted2)", maxWidth: "56ch" }}
                >
                  {featured.description}
                </p>

                {/* badges */}
                {featuredBadges.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {featuredBadges.map((b) => <Badge key={b} label={b} accent />)}
                  </div>
                )}

                {/* stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {featuredStack.map((s) => <StackTag key={s} label={s} />)}
                </div>

                {/* links */}
                <div className="flex flex-wrap gap-3">
                  {featuredPypi
                    ? <PrimaryBtn href={featuredPypi} label="PyPI" />
                    : featuredSlug && (
                        <CaseStudyBtn
                          slug={featuredSlug}
                          label={lang === "tr" ? "Vaka Analizi" : "Case Study"}
                        />
                      )
                  }
                  {featuredSlug !== "bi-dashboard" && <GithubBtn href={featuredGithub} />}
                </div>
              </div>

              {/* right: metric cards */}
              {featuredMetrics.length > 0 && (
                <div className="flex flex-row md:flex-col gap-3 mt-8 md:mt-0 flex-wrap">
                  {featuredMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="flex-1 md:flex-none px-5 py-4 text-center min-w-[80px]"
                      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
                    >
                      <span className="block text-2xl font-bold leading-none mb-1.5" style={{ color: m.color }}>
                        {m.val}
                      </span>
                      <span className="block text-[0.52rem] uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
                        {m.label}
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
            const projectStack  = stack[project.title]   ?? [];
            const projectBadges = badges[project.title]  ?? [];
            const projectSlug   = slugMap[project.title] ?? "";
            const projectPypi   = pypiLinks[project.title] ?? "";
            const num           = String(idx + 2).padStart(2, "0");

            return (
              <div
                key={project.title}
                className="reveal group relative overflow-hidden flex flex-col transition-colors duration-300"
                style={{
                  background: "var(--bg2)",
                  padding: "2rem",
                }}
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

                {/* project number + area */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5"
                    style={{ color: "var(--muted2)", border: "1px solid var(--border)" }}
                  >
                    {project.area}
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
                  className="text-[1.05rem] font-bold mb-3 leading-snug"
                  style={{ color: "var(--text)", overflowWrap: "break-word" }}
                >
                  {project.title}
                </h3>

                {/* description */}
                <p
                  className="text-[0.72rem] leading-[1.85] mb-4 flex-1"
                  style={{ color: "var(--muted2)", overflowWrap: "break-word" }}
                >
                  {project.description}
                </p>

                {/* badges */}
                {projectBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {projectBadges.map((b) => <Badge key={b} label={b} />)}
                  </div>
                )}

                {/* stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {projectStack.map((s) => <StackTag key={s} label={s} />)}
                </div>

                {/* links */}
                <div
                  className="flex flex-wrap gap-2 mt-auto pt-5"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  {projectPypi
                    ? <PrimaryBtn href={projectPypi} label="PyPI" />
                    : projectSlug && (
                        <CaseStudyBtn
                          slug={projectSlug}
                          label={lang === "tr" ? "Vaka Analizi" : "Case Study"}
                        />
                      )
                  }
                  {projectSlug !== "bi-dashboard" && <GithubBtn href={project.href} />}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
