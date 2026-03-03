"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

const stack: Record<string, string[]> = {
  "Brain MRI Tumor Classification System":           ["Python", "TensorFlow / Keras", "CNN", "NumPy", "OpenCV"],
  "Beyin MRI Tümör Sınıflandırma Sistemi":           ["Python", "TensorFlow / Keras", "CNN", "NumPy", "OpenCV"],
  "Cancer Diagnosis Model — Multi-Algorithm Analysis": ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib"],
  "Kanser Teşhis Modeli — Çok Algoritma Analizi":    ["Python", "scikit-learn", "pandas", "NumPy", "matplotlib"],
  "Enterprise BI Dashboard":                          ["Power BI", "DAX", "MS SQL Server", "T-SQL"],
  "Kurumsal İş Zekası Dashboard":                    ["Power BI", "DAX", "MS SQL Server", "T-SQL"],
  "Automated Data Collection & Alerting System":      ["Python", "Playwright", "Twilio API"],
  "Otomatik Veri Toplama & Uyarı Sistemi":           ["Python", "Playwright", "Twilio API"],
  "Enterprise Database Management System":            ["C#", "OOP", "MS SQL Server", "T-SQL"],
  "Kurumsal Veritabanı Yönetim Sistemi":             ["C#", "OOP", "MS SQL Server", "T-SQL", "Windows Forms"],
};

const metrics: Record<string, { val: string; valColor: string; key: string }[]> = {
  "Brain MRI Tumor Classification System": [
    { val: "CNN", valColor: "var(--cyan)", key: "Architecture" },
    { val: "MRI", valColor: "var(--green)", key: "Dataset" },
  ],
  "Beyin MRI Tümör Sınıflandırma Sistemi": [
    { val: "CNN", valColor: "var(--cyan)", key: "Mimari" },
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
            const isFeatured = project.featured;
            const projectStack = stack[project.title] ?? [];
            const projectMetrics = metrics[project.title];

            return (
              <a
                key={project.title}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block relative overflow-hidden transition-colors duration-300 ${
                  isFeatured ? "col-span-2 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center" : ""
                }`}
                style={{ background: "var(--bg2)", padding: "2rem" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg2)")}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(103,232,249,0.03), transparent)" }}
                />

                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span
                      className="text-[0.6rem] uppercase tracking-[0.2em] px-2 py-0.5"
                      style={{ color: "var(--muted2)", border: "1px solid var(--border)" }}
                    >
                      {project.area}
                    </span>
                    <span
                      className="text-base transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--muted)" }}
                    >
                      ↗
                    </span>
                  </div>

                  <div
                    className={`font-bold mb-3 leading-snug ${isFeatured ? "text-2xl" : "text-lg"}`}
                    style={{ color: "var(--text)" }}
                  >
                    {project.title}
                  </div>

                  <p className="text-[0.72rem] leading-[1.8] mb-5" style={{ color: "var(--muted2)" }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
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
                </div>

                {isFeatured && projectMetrics && (
                  <div className="flex md:flex-col gap-3">
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
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
