"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

const CONTACTS = [
  {
    index: "01",
    label: "bertugtaas@gmail.com",
    href: "mailto:bertugtaas@gmail.com",
  },
  {
    index: "02",
    label: "github.com/BertugTas",
    href: "https://github.com/BertugTas",
  },
  {
    index: "03",
    label: "LinkedIn — Bertuğ Taş",
    href: "https://linkedin.com/in/bertu%C4%9F-ta%C5%9F-bb20562b5",
  },
  {
    index: "04",
    labelEn: "ResearchGate — Academic",
    labelTr: "ResearchGate — Akademik",
    href: "https://www.researchgate.net/profile/Bertug-Tas?ev=hdr_xprf",
  },
] as const;

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].contact;

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
      id="contact"
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
          04
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

        <div className="grid md:grid-cols-[3fr_2fr] gap-16 items-start">

          {/* Left: editorial CTA block */}
          <div className="reveal">
            <div
              className="font-black tracking-tighter leading-[1.0] mb-8"
              style={{
                fontSize: "clamp(2.2rem,6.5vw,5rem)",
                color: "var(--text-max)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {t.heading1}
              <br />
              <span style={{ color: "var(--cyan)" }}>{t.heading2}</span>
            </div>

            {/* Thin rule */}
            <div className="h-px mb-8 w-16" style={{ background: "var(--border-strong)" }} />

            <p
              className="text-[0.88rem] leading-[2] mb-10 max-w-sm"
              style={{ color: "var(--muted2)" }}
            >
              {t.body}
            </p>

            <a
              href="mailto:bertugtaas@gmail.com"
              className="inline-flex items-center gap-3 text-[0.75rem] font-black uppercase tracking-[0.18em] px-8 py-4 transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: "var(--cyan)", color: "var(--bg)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(103,232,249,0.45), 0 0 64px rgba(103,232,249,0.15)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
            >
              {t.cta}
            </a>
          </div>

          {/* Right: editorial numbered contact rows */}
          <div
            className="flex flex-col gap-px reveal"
            style={{
              background: "var(--border)",
              border: "1px solid var(--border)",
              transitionDelay: "0.15s",
            }}
          >
            {CONTACTS.map((link) => {
              const label =
                "label" in link
                  ? link.label
                  : lang === "tr"
                  ? link.labelTr
                  : link.labelEn;

              return (
                <a
                  key={link.index}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-6 py-5 transition-all duration-250"
                  style={{ background: "var(--bg2)", color: "var(--muted2)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--bg3)";
                    el.style.color = "var(--text-max)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "var(--bg2)";
                    el.style.color = "var(--muted2)";
                  }}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className="text-[0.48rem] font-black uppercase tracking-[0.25em] tabular-nums shrink-0"
                      style={{ color: "var(--muted)" }}
                    >
                      {link.index}
                    </span>
                    <span className="text-[0.72rem] tracking-[0.02em]">{label}</span>
                  </span>
                  <span
                    className="text-[0.65rem] opacity-30 transition-opacity duration-200 group-hover:opacity-70"
                  >
                    →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
