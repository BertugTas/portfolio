"use client";

import { useEffect, useRef } from "react";

const projects = [
  {
    featured: true,
    title: "Beyin MRI Görüntü Sınıflandırma",
    area: "Derin Öğrenme",
    description:
      "Tıbbi görüntü işleme alanında CNN mimarisi kullanan derin öğrenme projesi. Beyin MRI veri seti üzerinde eğitilen model, tümör sınıflandırmasında yüksek doğruluk oranı elde etti.",
    stack: ["Python", "CNN", "Deep Learning", "NumPy", "matplotlib"],
    metrics: [
      { val: "CNN", valColor: "var(--cyan)",  key: "Mimari" },
      { val: "MRI", valColor: "var(--green)", key: "Görüntü" },
    ],
    href: "https://github.com/BertugTas/Brain-MRI-Classification",
  },
  {
    featured: false,
    title: "ML Meme Kanseri Sınıflandırma",
    area: "Makine Öğrenmesi",
    description:
      "Birden fazla sınıflandırma algoritmasının karşılaştırmalı analizi. Logistic Regression, Random Forest, SVM ve KNN modelleri doğruluk, hassasiyet ve geri çağırma metrikleriyle karşılaştırıldı.",
    stack: ["Python", "scikit-learn", "pandas", "NumPy"],
    href: "https://github.com/BertugTas/ML-BreastCancer-Classification",
  },
  {
    featured: false,
    title: "Kariyer İlan Otomasyon Botu",
    area: "Otomasyon",
    description:
      "Playwright ile hedef platformları tarayan, yeni ilanları tespit edip Twilio API aracılığıyla anlık SMS bildirimi gönderen tam otomatik iş akışı. Zamanlanmış çalışma ve filtreleme desteği.",
    stack: ["Python", "Playwright", "Twilio API"],
    href: "https://github.com/BertugTas/Kariyer-ilan-Botu",
  },
  {
    featured: false,
    title: "Veritabanı Yönetim Sistemi",
    area: "Yazılım Geliştirme",
    description:
      "OOP prensipleriyle C# üzerinde geliştirilen fatura ve stok yönetim uygulaması. MS SQL Server backend ile CRUD operasyonları, raporlama ve kullanıcı yönetimi.",
    stack: ["C#", "OOP", "MS SQL Server", "T-SQL"],
    href: "https://github.com/BertugTas/DataBaseUI",
  },
  {
    featured: false,
    title: "Power BI Eğitim Analitik Dashboard",
    area: "Veri Görselleştirme",
    description:
      "Kurumsal eğitim verisini DAX ölçümleri ve hesaplanmış sütunlarla modelleyen, KPI takibi ve trend analizini interaktif görsellerle sunan iş zekası raporu.",
    stack: ["Power BI", "DAX", "MS SQL Server", "PostgreSQL"],
    href: "https://github.com/BertugTas",
  },
  {
    featured: false,
    title: "AI İçerik Araçları Rehberi",
    area: "Araştırma",
    description:
      "İçerik üreticileri için erişilebilir yapay zeka araçlarını kategorize eden, kullanım senaryolarıyla açıklayan kapsamlı bir referans kaynağı.",
    stack: ["AI Tools", "İçerik Üretimi", "Dokümantasyon"],
    href: "https://github.com/BertugTas/AI-icerik-araclari",
  },
];

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const isFeatured = project.featured;

  return (
    <a
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
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,229,255,0.03), transparent)",
        }}
      />

      <div>
        {/* Top row */}
        <div className="flex justify-between items-start mb-5">
          <span
            className="text-[0.6rem] uppercase tracking-[0.2em] px-2 py-0.5"
            style={{
              color: "var(--cyan)",
              border: "1px solid rgba(0,229,255,0.2)",
              background: "rgba(0,229,255,0.05)",
            }}
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

        {/* Title */}
        <div
          className={`font-bold mb-3 leading-snug ${isFeatured ? "text-2xl" : "text-lg"}`}
          style={{ color: "var(--text)" }}
        >
          {project.title}
        </div>

        {/* Description */}
        <p
          className="text-[0.72rem] leading-[1.8] mb-5"
          style={{ color: "var(--muted2)" }}
        >
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[0.6rem] tracking-[0.08em] px-2 py-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                color: "var(--muted2)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Featured metrics */}
      {isFeatured && project.metrics && (
        <div className="flex md:flex-col gap-3">
          {project.metrics.map((m) => (
            <div
              key={m.key}
              className="px-4 py-3 text-center"
              style={{
                background: "rgba(0,229,255,0.05)",
                border: "1px solid rgba(0,229,255,0.12)",
              }}
            >
              <span
                className="block text-xl font-bold leading-none mb-1"
                style={{ color: m.valColor }}
              >
                {m.val}
              </span>
              <span
                className="block text-[0.55rem] uppercase tracking-[0.15em]"
                style={{ color: "var(--muted)" }}
              >
                {m.key}
              </span>
            </div>
          ))}
        </div>
      )}
    </a>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

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

        {/* Section header */}
        <div className="flex items-baseline gap-5 mb-14 reveal">
          <span
            className="text-[0.7rem] tracking-[0.2em] opacity-60"
            style={{ color: "var(--cyan)" }}
          >
            // 03
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight leading-none"
            style={{ color: "var(--text)" }}
          >
            Projeler
          </h2>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
          />
        </div>

        {/* Projects grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px reveal"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* GitHub link */}
        <div className="mt-8 text-center reveal" style={{ transitionDelay: "0.2s" }}>
          <a
            href="https://github.com/BertugTas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 text-[0.75rem] uppercase tracking-[0.1em] transition-all duration-200"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)";
              (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted2)";
            }}
          >
            Tüm projeler GitHub&apos;da →
          </a>
        </div>
      </div>
    </section>
  );
}
