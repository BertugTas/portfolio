"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage, T } from "@/context/LanguageContext";
import { slugMap } from "@/data/projects";

const stack: Record<string, string[]> = {
  "Brain MRI Tumor Classification System":            ["Python", "TensorFlow / Keras", "CNN", "NumPy", "OpenCV"],
  "Beyin MRI Tümör Sınıflandırma Sistemi":            ["Python", "TensorFlow / Keras", "CNN", "NumPy", "OpenCV"],
  "Cancer Diagnosis Model — Multi-Algorithm Analysis": ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib"],
  "Kanser Teşhis Modeli — Çok Algoritma Analizi":     ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib"],
  "Enterprise BI Dashboard":                           ["Power BI", "DAX", "MS SQL Server", "T-SQL"],
  "Kurumsal İş Zekası Dashboard":                     ["Power BI", "DAX", "MS SQL Server", "T-SQL"],
  "Automated Data Collection & Alerting System":       ["Python", "Playwright", "Twilio API"],
  "Otomatik Veri Toplama & Uyarı Sistemi":            ["Python", "Playwright", "Twilio API"],
  "Enterprise Database Management System":             ["C#", "OOP", "MS SQL Server", "T-SQL"],
  "Kurumsal Veritabanı Yönetim Sistemi":              ["C#", "OOP", "MS SQL Server", "T-SQL", "Windows Forms"],
};

const badges: Record<string, string[]> = {
  "Brain MRI Tumor Classification System":            ["CNN Architecture", "Medical Imaging", "Multi-class"],
  "Beyin MRI Tümör Sınıflandırma Sistemi":            ["CNN Architecture", "Medical Imaging", "Multi-class"],
  "Cancer Diagnosis Model — Multi-Algorithm Analysis": ["4 Algorithms Compared", "ROC", "Confusion Matrix"],
  "Kanser Teşhis Modeli — Çok Algoritma Analizi":     ["4 Algorithms Compared", "ROC", "Confusion Matrix"],
  "Enterprise BI Dashboard":                           ["DAX", "Star Schema", "KPI Tracking"],
  "Kurumsal İş Zekası Dashboard":                     ["DAX", "Star Schema", "KPI Tracking"],
  "Automated Data Collection & Alerting System":       ["Scheduled Pipeline", "SMS Alert", "Auto Filter"],
  "Otomatik Veri Toplama & Uyarı Sistemi":            ["Scheduled Pipeline", "SMS Alert", "Auto Filter"],
  "Enterprise Database Management System":             ["CRUD", "Role-based Auth", "Reporting Module"],
  "Kurumsal Veritabanı Yönetim Sistemi":              ["CRUD", "Role-based Auth", "Reporting Module"],
};

const metrics: Record<string, { val: string; valColor: string; key: string }[]> = {
  "Brain MRI Tumor Classification System": [
    { val: "CNN", valColor: "var(--cyan)",  key: "Architecture" },
    { val: "MRI", valColor: "var(--green)", key: "Dataset"      },
  ],
  "Beyin MRI Tümör Sınıflandırma Sistemi": [
    { val: "CNN", valColor: "var(--cyan)",  key: "Mimari"    },
    { val: "MRI", valColor: "var(--green)", key: "Veri Seti" },
  ],
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].projects;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-[1] py-28 px-6 md:px-12"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-5xl mx-auto">

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

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px reveal items-start md:items-stretch"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {t.items.map((project) => {
            const isFeatured    = project.featured;
            const projectStack  = stack[project.title]   ?? [];
            const projectMetrics = metrics[project.title];
            const projectBadges = badges[project.title]  ?? [];
            const projectSlug   = slugMap[project.title] ?? "";

            return (
              <div
                key={project.title}
                className={`group relative overflow-hidden transition-colors duration-300 flex flex-col ${
                  isFeatured ? "col-span-2 md:grid md:flex-none md:grid-cols-[1fr_auto] gap-8 md:items-start" : ""
                }`}
                style={{ background: "var(--bg2)", padding: "2rem" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg2)")}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(103,232,249,0.03), transparent)" }}
                />

                {/* Text content */}
                <div className="min-w-0 w-full flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-5">
                    <span
                      className="text-[0.6rem] uppercase tracking-[0.2em] px-2 py-0.5"
                      style={{ color: "var(--muted2)", border: "1px solid var(--border)", overflowWrap: "break-word", wordBreak: "break-word" }}
                    >
                      {project.area}
                    </span>
                  </div>

                  <div
                    className={`font-bold mb-3 leading-snug ${isFeatured ? "text-2xl" : "text-lg"}`}
                    style={{ color: "var(--text)", overflowWrap: "break-word", wordBreak: "break-word" }}
                  >
                    {project.title}
                  </div>

                  <p
                    className="text-[0.72rem] leading-[1.8] mb-4"
                    style={{ color: "var(--muted2)", overflowWrap: "break-word", wordBreak: "break-word" }}
                  >
                    {project.description}
                  </p>

                  {/* Metric badges */}
                  {projectBadges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {projectBadges.map((b) => (
                        <span
                          key={b}
                          className="text-[0.6rem] tracking-[0.08em] px-2 py-0.5"
                          style={{
                            background: "rgba(103,232,249,0.05)",
                            border: "1px solid rgba(103,232,249,0.2)",
                            color: "var(--cyan)",
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {projectStack.map((s) => (
                      <span
                        key={s}
                        className="text-[0.6rem] tracking-[0.08em] px-2 py-0.5"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", color: "var(--muted2)" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Link row — pushed to bottom */}
                  <div
                    className="flex flex-wrap gap-2 mt-auto pt-4"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    {projectSlug !== "bi-dashboard" && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] px-4 py-2 transition-all duration-200"
                        style={{ border: "1px solid var(--border)", color: "var(--muted2)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)";
                          (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLElement).style.color = "var(--muted2)";
                        }}
                      >
                        GitHub ↗
                      </a>
                    )}

                    {projectSlug && (
                      <Link
                        href={`/projects/${projectSlug}`}
                        className="inline-flex items-center gap-1.5 text-[0.65rem] font-bold uppercase tracking-[0.1em] px-4 py-2 transition-all duration-200"
                        style={{ background: "var(--cyan)", color: "var(--bg)" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.boxShadow =
                            "0 0 16px rgba(0,229,255,0.35)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.boxShadow = "none")
                        }
                      >
                        {lang === "tr" ? "Vaka Analizi →" : "Case Study →"}
                      </Link>
                    )}
                  </div>
                </div>

                {/* Featured metrics column */}
                {isFeatured && projectMetrics && (
                  <div className="flex flex-col gap-3 shrink-0 mt-4 md:mt-0">
                    {projectMetrics.map((m) => (
                      <div
                        key={m.key}
                        className="px-4 py-3 text-center"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
                      >
                        <span className="block text-xl font-bold leading-none mb-1" style={{ color: m.valColor }}>
                          {m.val}
                        </span>
                        <span className="block text-[0.55rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
                          {m.key}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
