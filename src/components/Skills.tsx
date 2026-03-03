"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].skills;

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

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

    return () => { revealObserver.disconnect(); fillObserver.disconnect(); };
  }, [lang]);

  const variants = ["", "", "orange-fill"];

  return (
    <section
      id="skills"
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
          className="grid md:grid-cols-3 gap-px reveal"
          style={{ background: "var(--border)", border: "1px solid var(--border)" }}
        >
          {t.groups.map((group, i) => (
            <div
              key={group.title}
              className="relative p-8 overflow-hidden transition-colors duration-300"
              style={{ background: "var(--bg2)", transitionDelay: `${i * 0.08}s` }}
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
              <div
                className="hover-bar absolute top-0 left-0 right-0 h-0.5 origin-left transition-transform duration-300"
                style={{ background: "var(--cyan)", transform: "scaleX(0)" }}
              />

              <div className="text-lg mb-4 font-mono" style={{ color: "var(--cyan)" }}>{group.icon}</div>
              <div className="text-sm font-bold mb-1 tracking-[0.05em]" style={{ color: "var(--text)" }}>
                {group.title}
              </div>
              <div className="text-[0.65rem] leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                {group.sub}
              </div>

              <div className="space-y-3 mb-5">
                {group.bars.map((bar, bi) => (
                  <div key={bar.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[0.65rem]" style={{ color: "var(--muted2)" }}>{bar.name}</span>
                      <span className="text-[0.65rem]" style={{ color: "var(--cyan)" }}>{bar.pct}%</span>
                    </div>
                    <div className="h-0.5 rounded-sm overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div className={`skill-fill ${variants[i] ?? ""}`} data-w={bar.pct} key={`${lang}-${bi}`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.55rem] uppercase tracking-[0.1em] px-2 py-0.5 rounded-sm transition-colors duration-200 cursor-default"
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
                    {tag}
                  </span>
                ))}
              </div>

              {group.focus && (
                <div
                  className="mt-5 pt-4 text-[0.6rem] tracking-[0.03em]"
                  style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
                >
                  <span style={{ color: "var(--cyan)" }}>▸</span> {group.focus}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
