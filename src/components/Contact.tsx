"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].contact;

  const links = [
    { icon: "✉",  label: "bertugtaas@gmail.com",     href: "mailto:bertugtaas@gmail.com" },
    { icon: "⌥",  label: "github.com/BertugTas",      href: "https://github.com/BertugTas" },
    { icon: "◈",  label: "LinkedIn — Bertuğ Taş",     href: "https://linkedin.com/in/bertu%C4%9F-ta%C5%9F-bb20562b5" },
    { icon: "◎",  label: lang === "tr" ? "ResearchGate — Akademik" : "ResearchGate — Academic", href: "https://www.researchgate.net/profile/Bertug-Tas?ev=hdr_xprf" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
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

        <div className="grid md:grid-cols-2 gap-16 items-center">

          <div className="reveal">
            <div
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: "var(--text)" }}
            >
              {t.heading1}
              <br />
              <span style={{ color: "var(--cyan)" }}>{t.heading2}</span>
            </div>
            <p className="text-sm leading-[2] mb-8 max-w-sm" style={{ color: "var(--muted2)" }}>
              {t.body}
            </p>
            <a
              href="mailto:bertugtaas@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3 text-[0.75rem] font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "var(--cyan)", color: "var(--bg)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,229,255,0.4), 0 0 40px rgba(0,229,255,0.15)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
            >
              {t.cta}
            </a>
          </div>

          <div
            className="flex flex-col gap-px reveal"
            style={{ background: "var(--border)", border: "1px solid var(--border)", transitionDelay: "0.15s" }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-5 text-sm transition-all duration-200"
                style={{ background: "var(--bg2)", color: "var(--muted2)", paddingLeft: "1.5rem" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--bg3)";
                  el.style.color = "var(--cyan)";
                  el.style.paddingLeft = "2rem";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--bg2)";
                  el.style.color = "var(--muted2)";
                  el.style.paddingLeft = "1.5rem";
                }}
              >
                <span>
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </span>
                <span className="text-xs opacity-40">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
