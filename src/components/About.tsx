"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].about;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(".reveal, .reveal-line").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
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
          01
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

        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Text */}
          <div className="space-y-6 reveal" style={{ transitionDelay: "0.1s" }}>
            <p className="text-[0.9rem] leading-[2.05]" style={{ color: "var(--muted2)" }}>
              <span style={{ color: "var(--text)" }}>{t.p1[0]}</span>{t.p1[1]}
            </p>
            <p className="text-[0.9rem] leading-[2.05]" style={{ color: "var(--muted2)" }}>
              {t.p2intro}
              <span style={{ color: "var(--cyan)" }}>{t.p2a}</span>{" "}
              {lang === "tr" ? "ve " : "and "}
              <span style={{ color: "var(--cyan)" }}>{t.p2b}</span>
              {t.p2rest}
              <span style={{ color: "var(--cyan)" }}>{t.p2c}</span>
              {t.p2end}
            </p>
            <p className="text-[0.9rem] leading-[2.05]" style={{ color: "var(--muted2)" }}>
              {t.p3intro}
              <span style={{ color: "var(--green)" }}>{t.p3a}</span>
              {t.p3b}
              <span style={{ color: "var(--green)" }}>{t.p3c}</span>
              {t.p3end}
            </p>
          </div>

          {/* Detail grid */}
          <div
            className="grid grid-cols-2 gap-px reveal"
            style={{
              background: "var(--border)",
              border: "1px solid var(--border)",
              transitionDelay: "0.2s",
            }}
          >
            {t.details.map(([key, val, accent]) => (
              <div
                key={key}
                className="p-6 transition-colors duration-300"
                style={{ background: "var(--bg2)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg3)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--bg2)")}
              >
                <div className="text-[0.52rem] uppercase tracking-[0.22em] mb-2.5" style={{ color: "var(--muted)" }}>
                  {key}
                </div>
                <div
                  className="text-[0.9rem] font-bold tracking-tight"
                  style={{ color: accent === "green" ? "var(--green)" : "var(--cyan)" }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
