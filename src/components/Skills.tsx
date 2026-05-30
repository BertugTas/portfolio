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
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal, .reveal-line").forEach((el) => revealObserver.observe(el));

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
      { threshold: 0.25 }
    );
    sectionRef.current?.querySelectorAll(".skill-fill").forEach((el) => fillObserver.observe(el));

    return () => { revealObserver.disconnect(); fillObserver.disconnect(); };
  }, [lang]);

  const barVariants = ["", "green-fill", "orange-fill"];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-[1] py-28 px-6 md:px-12"
    >
      {/* Animated section divider — grows from left as section enters viewport */}
      <div
        aria-hidden
        className="reveal-line absolute top-0 left-0 right-0 h-px"
        style={{ background: "var(--border-strong)" }}
      />

      <div className="max-w-5xl mx-auto relative overflow-hidden">

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
          <span className="text-[0.65rem] tracking-[0.25em] opacity-50 shrink-0" style={{ color: "var(--cyan)" }}>
            {t.num}
          </span>
          <h2
            className="font-black tracking-tighter leading-none"
            style={{ fontSize: "clamp(2.4rem,7.5vw,6rem)", color: "var(--text-max)" }}
          >
            {t.title}
          </h2>
          <div
            className="flex-1 h-px self-center ml-4 hidden md:block"
            style={{ background: "linear-gradient(to right, var(--border-strong), transparent)" }}
          />
        </div>

        <div
          className="grid md:grid-cols-3 gap-px reveal items-start md:items-stretch"
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
              {/* top accent line */}
              <div
                className="hover-bar absolute top-0 left-0 right-0 h-px origin-left transition-transform duration-400"
                style={{ background: "var(--cyan)", transform: "scaleX(0)" }}
              />

              {/* Large decorative icon */}
              <div
                className="text-5xl mb-5 font-mono leading-none select-none"
                style={{ color: "rgba(103,232,249,0.18)" }}
              >
                {group.icon}
              </div>

              <div
                className="text-xl font-black tracking-tight mb-2 leading-tight"
                style={{ color: "var(--text-max)" }}
              >
                {group.title}
              </div>
              <div className="text-[0.62rem] leading-relaxed mb-7" style={{ color: "var(--muted)" }}>
                {group.sub}
              </div>

              <div className="space-y-4 mb-6">
                {group.bars.map((bar, bi) => (
                  <div key={bar.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-[0.62rem]" style={{ color: "var(--muted2)" }}>{bar.name}</span>
                      <span className="text-[0.62rem] font-bold tabular-nums" style={{ color: "var(--cyan)" }}>{bar.pct}%</span>
                    </div>
                    <div className="h-px overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className={`skill-fill ${barVariants[i] ?? ""}`}
                        data-w={bar.pct}
                        key={`${lang}-${bi}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {group.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.52rem] uppercase tracking-[0.12em] px-2 py-0.5 transition-colors duration-200"
                    style={{ border: "1px solid var(--border)", color: "var(--muted)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(103,232,249,0.4)";
                      (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                      (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {group.focus && (
                <div
                  className="mt-6 pt-5 text-[0.58rem] tracking-[0.03em]"
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
