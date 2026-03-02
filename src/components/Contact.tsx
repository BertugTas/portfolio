"use client";

import { useEffect, useRef } from "react";

const links = [
  { icon: "✉",  label: "bertugtaas@gmail.com",       href: "mailto:bertugtaas@gmail.com" },
  { icon: "⌥",  label: "github.com/BertugTas",        href: "https://github.com/BertugTas" },
  { icon: "◈",  label: "LinkedIn — Bertuğ Taş",       href: "https://linkedin.com/in/bertuğ-taş-bb20562b5" },
  { icon: "◎",  label: "ResearchGate — Akademik",     href: "https://www.researchgate.net" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

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

        {/* Section header */}
        <div className="flex items-baseline gap-5 mb-14 reveal">
          <span
            className="text-[0.7rem] tracking-[0.2em] opacity-60"
            style={{ color: "var(--cyan)" }}
          >
            // 04
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight leading-none"
            style={{ color: "var(--text)" }}
          >
            İletişim
          </h2>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
          />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: big text + CTA */}
          <div className="reveal">
            <div
              className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-tight mb-6"
              style={{ color: "var(--text)" }}
            >
              Birlikte
              <br />
              <span style={{ color: "var(--cyan)" }}>çalışalım.</span>
            </div>
            <p
              className="text-sm leading-[2] mb-8 max-w-sm"
              style={{ color: "var(--muted2)" }}
            >
              Veri bilimi projeleri, iş zekası çözümleri veya yazılım geliştirme
              konularında iş birliği için ulaşabilirsiniz.
            </p>
            <a
              href="mailto:bertugtaas@gmail.com"
              className="inline-flex items-center gap-2 px-7 py-3 text-[0.75rem] font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--cyan)",
                color: "var(--bg)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px rgba(0,229,255,0.4), 0 0 40px rgba(0,229,255,0.15)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
            >
              Mail Gönder →
            </a>
          </div>

          {/* Right: contact links */}
          <div
            className="flex flex-col gap-px reveal"
            style={{
              background: "var(--border)",
              border: "1px solid var(--border)",
              transitionDelay: "0.15s",
            }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-between px-6 py-5 text-sm transition-all duration-200"
                style={{
                  background: "var(--bg2)",
                  color: "var(--muted2)",
                  paddingLeft: "1.5rem",
                }}
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
                <span className="text-xs opacity-40 group-hover:opacity-100 transition-all">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
