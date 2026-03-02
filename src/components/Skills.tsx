"use client";

import { useEffect, useRef } from "react";

const skillGroups = [
  {
    icon: "🧠",
    title: "Veri Bilimi & ML",
    sub: "Sınıflandırma, regresyon ve görüntü işleme üzerine model geliştirme.",
    bars: [
      { name: "scikit-learn",        pct: 92, variant: "" },
      { name: "pandas / NumPy",      pct: 90, variant: "" },
      { name: "matplotlib / seaborn", pct: 85, variant: "" },
    ],
    tags: ["Logistic Reg.", "Random Forest", "SVM", "KNN", "CNN"],
  },
  {
    icon: "🗄️",
    title: "Veri Mühendisliği & BI",
    sub: "İlişkisel DB tasarımı, sorgu optimizasyonu ve kurumsal BI çözümleri.",
    bars: [
      { name: "SQL / T-SQL",    pct: 88, variant: "orange-fill" },
      { name: "Power BI / DAX", pct: 84, variant: "orange-fill" },
      { name: "PostgreSQL",     pct: 80, variant: "orange-fill" },
    ],
    tags: ["MS SQL Server", "pgAdmin", "SSMS", "ETL"],
  },
  {
    icon: "⚙️",
    title: "Yazılım Geliştirme",
    sub: "OOP prensipleri, otomasyon ve API entegrasyonları.",
    bars: [
      { name: "Python",          pct: 93, variant: "green-fill" },
      { name: "C# / OOP",       pct: 78, variant: "green-fill" },
      { name: "Playwright / Git", pct: 82, variant: "green-fill" },
    ],
    tags: ["Twilio API", "VS Code", "Web Scraping", "Git"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Scroll reveal
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    // Skill bar fills
    const fillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.width = el.dataset.w + "%";
            fillObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );
    sectionRef.current?.querySelectorAll(".skill-fill").forEach((el) => fillObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      fillObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
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
            // 02
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight leading-none"
            style={{ color: "var(--text)" }}
          >
            Beceriler
          </h2>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
          />
        </div>

        {/* Skill groups grid */}
        <div
          className="grid md:grid-cols-3 gap-px reveal"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {skillGroups.map((group, i) => (
            <div
              key={group.title}
              className="relative p-8 overflow-hidden transition-colors duration-300"
              style={{
                background: "var(--bg2)",
                transitionDelay: `${i * 0.08}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--bg3)";
                const bar = el.querySelector(".hover-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "var(--bg2)";
                const bar = el.querySelector(".hover-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(0)";
              }}
            >
              {/* Top accent bar */}
              <div
                className="hover-bar absolute top-0 left-0 right-0 h-0.5 origin-left transition-transform duration-300"
                style={{ background: "var(--cyan)", transform: "scaleX(0)" }}
              />

              <div className="text-2xl mb-4">{group.icon}</div>
              <div
                className="text-sm font-bold mb-1 tracking-[0.05em]"
                style={{ color: "var(--text)" }}
              >
                {group.title}
              </div>
              <div
                className="text-[0.65rem] leading-relaxed mb-6"
                style={{ color: "var(--muted)" }}
              >
                {group.sub}
              </div>

              {/* Skill bars */}
              <div className="space-y-3 mb-5">
                {group.bars.map((bar) => (
                  <div key={bar.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[0.65rem]" style={{ color: "var(--muted2)" }}>
                        {bar.name}
                      </span>
                      <span className="text-[0.65rem]" style={{ color: "var(--cyan)" }}>
                        {bar.pct}%
                      </span>
                    </div>
                    <div
                      className="h-0.5 rounded-sm overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className={`skill-fill ${bar.variant}`}
                        data-w={bar.pct}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.55rem] uppercase tracking-[0.1em] px-2 py-0.5 rounded-sm transition-colors duration-200 cursor-default"
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
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
