"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";

const CONTACTS = [
  {
    index: "01",
    type: "Email",
    label: "bertugtaas@gmail.com",
    href: "mailto:bertugtaas@gmail.com",
  },
  {
    index: "02",
    type: "GitHub",
    label: "github.com/BertugTas",
    href: "https://github.com/BertugTas",
  },
  {
    index: "03",
    type: "LinkedIn",
    label: "linkedin.com/in/bertuğ-taş",
    href: "https://linkedin.com/in/bertu%C4%9F-ta%C5%9F-bb20562b5",
  },
  {
    index: "04",
    type: "ResearchGate",
    label: "researchgate.net/profile/Bertug-Tas",
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
    sectionRef.current
      ?.querySelectorAll(".reveal, .reveal-line, .chapter-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
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
          06
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

        <div className="grid md:grid-cols-[3fr_2fr] gap-8 md:gap-12 lg:gap-16 items-start">

          {/* LEFT: terse descriptor */}
          <div className="reveal">
            {/* Chapter micro-label — typographic anchor for the left column */}
            <span
              className="block text-[0.52rem] uppercase tracking-[0.3em] mb-4 font-bold"
              style={{ color: "var(--cyan)" }}
            >
              {t.chapter}
            </span>

            <p
              className="text-[0.68rem] uppercase tracking-[0.2em] mb-8"
              style={{ color: "var(--muted)" }}
            >
              {t.descriptor}
            </p>

            <div
              className="h-px mb-8 w-10"
              style={{ background: "var(--border-strong)" }}
            />

            <p
              className="text-[0.88rem] leading-[2] mb-6"
              style={{ color: "var(--muted2)", maxWidth: "42ch" }}
            >
              {t.body}
            </p>

            {/* Location telemetry */}
            <div className="flex items-center gap-3 mt-10">
              <span
                className="status-dot w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
              />
              <span className="text-[0.52rem] uppercase tracking-[0.22em]" style={{ color: "var(--muted)" }}>
                {lang === "tr" ? "İzmir, TR — müsait" : "Izmir, TR — available"}
              </span>
            </div>
          </div>

          {/* RIGHT: numbered coordinate list */}
          <div
            className="flex flex-col gap-px reveal"
            style={{
              background: "var(--border)",
              border: "1px solid var(--border)",
              transitionDelay: "0.15s",
            }}
          >
            {CONTACTS.map((link) => (
              <a
                key={link.index}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center justify-between px-6 py-5 transition-all duration-200"
                style={{ background: "var(--bg)", color: "var(--muted2)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--bg2)";
                  el.style.color = "var(--text-max)";
                  el.style.boxShadow = "inset 0 1px 0 rgba(103,232,249,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "var(--bg)";
                  el.style.color = "var(--muted2)";
                  el.style.boxShadow = "none";
                }}
              >
                <span className="flex flex-col gap-0.5">
                  <span
                    className="text-[0.58rem] uppercase tracking-[0.22em] tabular-nums"
                    style={{ color: "var(--muted)" }}
                  >
                    {link.index} · {link.type}
                  </span>
                  <span className="text-[0.7rem] tracking-[0.02em]">{link.label}</span>
                </span>
                <span className="text-[0.65rem] opacity-25 transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0.5 transform">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
