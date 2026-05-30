"use client";

import { useLanguage, T } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const t = T[lang].footer;

  return (
    <footer
      className="relative z-[1] overflow-hidden"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {/* Editorial wordmark watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          aria-hidden
          className="font-black tracking-tighter uppercase whitespace-nowrap leading-none"
          style={{
            fontSize: "clamp(2.5rem,10vw,7rem)",
            color: "rgba(255,255,255,0.018)",
            letterSpacing: "-0.04em",
          }}
        >
          BERTUĞ TAŞ
        </span>
      </div>

      {/* Meta row */}
      <div className="relative flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 py-7 gap-2">
        <span className="font-mono text-[0.6rem] tracking-[0.12em]" style={{ color: "var(--muted)" }}>
          © {new Date().getFullYear()} Bertuğ Taş · {t.location}
        </span>
        <a
          href="https://bertugtas.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.6rem] tracking-[0.12em] transition-opacity duration-200 hover:opacity-60"
          style={{ color: "var(--cyan)" }}
        >
          bertugtas.com
        </a>
      </div>
    </footer>
  );
}
