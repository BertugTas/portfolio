"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

// ── Dot rating: filled ● up to rating, hollow ○ for the rest ──────────────
function Dots({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5 items-center" aria-label={`${rating} of ${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{
            color: i < rating ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.1)",
            fontSize: "0.55rem",
            lineHeight: 1,
          }}
        >
          {i < rating ? "●" : "○"}
        </span>
      ))}
    </span>
  );
}

// ── Stack entry row ────────────────────────────────────────────────────────
function StackRow({ name, rating }: { name: string; rating: number }) {
  return (
    <div
      className="flex items-center justify-between py-2.5"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <span className="text-[0.72rem] tracking-[0.02em]" style={{ color: "var(--muted2)" }}>
        {name}
      </span>
      <Dots rating={rating} />
    </div>
  );
}

// ── Inventory cell ─────────────────────────────────────────────────────────
function InventoryCell({
  icon,
  title,
  items,
}: {
  icon: string;
  title: string;
  items: { name: string; rating: number }[];
}) {
  return (
    <div className="p-6 md:p-8 flex flex-col" style={{ background: "var(--bg)" }}>
      <div className="flex items-center gap-3 mb-5">
        <span style={{ color: "rgba(103,232,249,0.35)", fontSize: "1.1rem" }}>{icon}</span>
        <span className="text-[0.55rem] uppercase tracking-[0.22em] font-bold" style={{ color: "var(--muted)" }}>
          {title}
        </span>
      </div>
      <div className="flex flex-col">
        {items.map((item) => (
          <StackRow key={item.name} name={item.name} rating={item.rating} />
        ))}
      </div>
    </div>
  );
}

// ── Inventory data ─────────────────────────────────────────────────────────
const INVENTORY = [
  {
    icon: "◇",
    titleEn: "Languages",
    titleTr: "Diller",
    items: [
      { name: "Python",     rating: 5 },
      { name: "SQL",        rating: 4 },
      { name: "R",          rating: 3 },
      { name: "C#",         rating: 3 },
      { name: "JavaScript", rating: 2 },
    ],
  },
  {
    icon: "◈",
    titleEn: "ML / Deep Learning",
    titleTr: "ML / Derin Öğrenme",
    items: [
      { name: "scikit-learn", rating: 5 },
      { name: "TensorFlow",   rating: 4 },
      { name: "Keras",        rating: 4 },
      { name: "PyTorch",      rating: 3 },
      { name: "CNN",          rating: 4 },
    ],
  },
  {
    icon: "◎",
    titleEn: "Data & Vision",
    titleTr: "Veri & Görüntü",
    items: [
      { name: "pandas",       rating: 5 },
      { name: "NumPy",        rating: 5 },
      { name: "OpenCV",       rating: 4 },
      { name: "matplotlib",   rating: 4 },
      { name: "Power BI/DAX", rating: 4 },
    ],
  },
  {
    icon: "◉",
    titleEn: "Tools & Infra",
    titleTr: "Araçlar & Altyapı",
    items: [
      { name: "Git / GitHub",      rating: 5 },
      { name: "FastAPI",           rating: 4 },
      { name: "PostgreSQL",        rating: 4 },
      { name: "Docker",            rating: 3 },
      { name: "GitHub Actions",    rating: 3 },
    ],
  },
] as const;

// ── Component ──────────────────────────────────────────────────────────────
export default function TechInventory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].skills;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    sectionRef.current
      ?.querySelectorAll(".reveal, .reveal-line, .chapter-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  return (
    <section
      id="skills"
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
          04
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

        {/* Legend */}
        <div
          className="flex items-center gap-6 mb-10 reveal"
          style={{ transitionDelay: "0.05s" }}
        >
          <span className="text-[0.52rem] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            {lang === "tr" ? "Yetkinlik" : "Proficiency"}
          </span>
          <span className="inline-flex items-center gap-3">
            {[
              { label: lang === "tr" ? "Temel" : "Basics", rating: 1 },
              { label: lang === "tr" ? "Orta" : "Working", rating: 3 },
              { label: lang === "tr" ? "İleri" : "Advanced", rating: 5 },
            ].map(({ label, rating }) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Dots rating={rating} />
                <span className="text-[0.5rem] uppercase tracking-[0.15em]" style={{ color: "var(--muted)" }}>
                  {label}
                </span>
              </span>
            ))}
          </span>
        </div>

        {/* 2×2 datasheet bento */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-px reveal"
          style={{ background: "var(--border)", border: "1px solid var(--border)", transitionDelay: "0.1s" }}
        >
          {INVENTORY.map((cell) => (
            <InventoryCell
              key={cell.titleEn}
              icon={cell.icon}
              title={lang === "tr" ? cell.titleTr : cell.titleEn}
              items={[...cell.items]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
