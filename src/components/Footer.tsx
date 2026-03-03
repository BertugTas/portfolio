"use client";

import { useLanguage, T } from "@/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const t = T[lang].footer;

  return (
    <footer
      className="relative z-[1] flex flex-col sm:flex-row items-center justify-between px-6 md:px-12 py-6"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <span className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} Bertuğ Taş · {t.location}
      </span>
      <span className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: "var(--cyan)" }}>
        bertugtas.com.tr
      </span>
    </footer>
  );
}
