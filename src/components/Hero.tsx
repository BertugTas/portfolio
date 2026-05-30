"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import DataScienceMetrics from "@/components/DataScienceMetrics";
import { useLanguage, T } from "@/context/LanguageContext";

const firstName = "Bertuğ".split("");
const lastName  = "TAŞ".split("");

function SplitReveal({
  chars,
  baseDelay,
  className,
  glow,
}: {
  chars: string[];
  baseDelay: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <span
      className={`inline-flex pb-1 ${glow ? "tas-glow" : "overflow-hidden pb-3 -mb-3"} ${className ?? ""}`}
    >
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block animate-char-reveal"
          style={{ animationDelay: `${baseDelay + i * 60}ms` }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

function CellMarker({
  left,
  right,
  liveDot,
}: {
  left: string;
  right?: string;
  liveDot?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-8 lg:mb-10">
      <span
        className="text-[0.55rem] tracking-[0.25em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        {left}
      </span>
      {right && (
        <span
          className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.25em] uppercase"
          style={{ color: liveDot ? "var(--green)" : "var(--muted)" }}
        >
          {liveDot && (
            <span
              className="status-dot w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
            />
          )}
          {right}
        </span>
      )}
    </div>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const t = T[lang].hero;
  const nameEnd = 200 + (firstName.length + lastName.length) * 60 + 120;

  // null = not yet measured (avoids SSR/hydration mismatch)
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col z-[1] px-6 md:px-12 overflow-x-hidden"
    >
      {/* ─── Constrained bento — aligns hairlines with About/Skills/Projects/Contact ─── */}
      <div
        className="max-w-5xl mx-auto w-full flex-1 flex flex-col gap-px"
        style={{ background: "var(--border)" }}
      >

      {/* ═══════════════════ ROW 1 — A: NAME · B: METRICS ═══════════════════ */}
      <div
        className="flex-1 grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-px"
        style={{ background: "var(--border)" }}
      >

        {/* ───── CELL A · NAME PANEL ───── */}
        <div
          className="relative flex flex-col p-8 pt-24 md:p-12 md:pt-32 lg:p-16 lg:pt-36"
          style={{ background: "var(--bg)" }}
        >
          <CellMarker
            left={lang === "tr" ? "// 00 · KİMLİK" : "// 00 · IDENTITY"}
            right="HERO_PANEL"
          />

          {/* Eyebrow */}
          <div
            className="flex items-center gap-4 mb-12 lg:mb-0 opacity-0 animate-fade-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <div className="w-14 h-px" style={{ background: "var(--cyan)" }} />
            <span
              className="text-[0.7rem] uppercase tracking-[0.28em]"
              style={{ color: "var(--cyan)" }}
            >
              {t.eyebrow}
            </span>
          </div>

          {/* Spacer + Name — name pushed to bottom of cell */}
          <div className="flex-1 flex flex-col justify-end pt-8 lg:pt-0">
            <h1 className="font-black tracking-tighter leading-[0.88] flex flex-col items-start">
              <SplitReveal
                chars={firstName}
                baseDelay={200}
                className="text-[clamp(3.5rem,10vw,7.5rem)] text-[var(--text-max)]"
              />
              <SplitReveal
                chars={lastName}
                baseDelay={200 + firstName.length * 60 + 80}
                className="text-[clamp(3.5rem,10vw,7.5rem)] text-[var(--cyan)]"
                glow
              />
            </h1>
          </div>

          {/* ML / DL / BI — editorial stat footer */}
          <div
            className="flex flex-wrap items-end gap-7 md:gap-10 mt-10 lg:mt-12 opacity-0 animate-fade-up"
            style={{
              animationDelay: `${nameEnd + 120}ms`,
              animationFillMode: "forwards",
            }}
          >
            {[
              { val: "ML", valClass: "text-[var(--cyan)]",   label: t.ml },
              { val: "DL", valClass: "text-[var(--green)]",  label: t.dl },
              { val: "BI", valClass: "text-[var(--orange)]", label: t.bi },
            ].map(({ val, valClass, label }) => (
              <div
                key={val}
                className="pl-5 border-l"
                style={{ borderColor: "var(--border-strong)" }}
              >
                <span className={`block text-4xl font-black tracking-tighter leading-none ${valClass}`}>
                  {val}
                </span>
                <span
                  className="block text-[0.55rem] uppercase tracking-[0.2em] mt-2"
                  style={{ color: "var(--muted)" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ───── CELL B · METRICS PANEL ───── */}
        <div
          className="relative flex flex-col p-8 pt-12 md:p-12 md:pt-32 lg:p-16 lg:pt-36"
          style={{ background: "var(--bg)" }}
        >
          <CellMarker
            left={lang === "tr" ? "// TELEMETRİ" : "// TELEMETRY"}
            right="LIVE"
            liveDot
          />

          <div className="flex-1 flex items-center justify-center py-6">
            {isDesktop === true && (
              <div
                className="opacity-0 animate-fade-up"
                style={{
                  animationDelay: `${nameEnd - 40}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <DataScienceMetrics />
              </div>
            )}
            {isDesktop === false && (
              <div
                className="opacity-0 animate-fade-up"
                style={{
                  animationDelay: "80ms",
                  animationFillMode: "forwards",
                }}
              >
                <DataScienceMetrics compact />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════ ROW 2 — C1: PROFILE · C2: ACT · C3: CONNECT ═══════════════════ */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[3fr_2fr_2fr] gap-px"
        style={{ background: "var(--border)" }}
      >

        {/* ───── CELL C1 · ROLE NARRATIVE ───── */}
        <div
          className="p-8 md:p-12 lg:p-12 flex flex-col"
          style={{ background: "var(--bg)" }}
        >
          <CellMarker left={lang === "tr" ? "// PROFİL" : "// PROFILE"} />

          <p
            className="text-[0.92rem] leading-[1.9] max-w-[48ch] opacity-0 animate-fade-up"
            style={{
              color: "var(--muted2)",
              animationDelay: `${nameEnd}ms`,
              animationFillMode: "forwards",
            }}
          >
            {lang === "tr" ? (
              <>
                Dokuz Eylül Üniversitesi Bilgisayar Bilimi öğrencisi.{" "}
                <span style={{ color: "var(--cyan)" }}>Makine öğrenmesi</span> ve{" "}
                <span style={{ color: "var(--cyan)" }}>derin öğrenme</span> modelleri üzerinde çalışıyor;{" "}
                <span style={{ color: "var(--cyan)" }}>veri bilimi</span> ve{" "}
                <span style={{ color: "var(--cyan)" }}>veri mühendisliği</span> alanlarında
                uzmanlaşıyorum.
                <span className="blink-cursor" />
              </>
            ) : (
              <>
                Computer Science student at Dokuz Eylül University.{" "}
                Working on <span style={{ color: "var(--cyan)" }}>machine learning</span> and{" "}
                <span style={{ color: "var(--cyan)" }}>deep learning</span> models;
                specializing in <span style={{ color: "var(--cyan)" }}>data science</span> and{" "}
                <span style={{ color: "var(--cyan)" }}>data engineering</span>.
                <span className="blink-cursor" />
              </>
            )}
          </p>
        </div>

        {/* ───── CELL C2 · CTA BUTTONS ───── */}
        <div
          className="p-8 md:p-12 lg:p-12 flex flex-col"
          style={{ background: "var(--bg)" }}
        >
          <CellMarker left={lang === "tr" ? "// EYLEMLER" : "// ACTIONS"} />

          <div className="flex flex-col gap-3 mt-auto">
            <a
              href="#projects"
              className="inline-flex items-center justify-between gap-2 px-6 py-4 text-[0.7rem] font-black uppercase tracking-[0.18em] transition-all duration-300 hover:-translate-y-0.5 opacity-0 animate-fade-up"
              style={{
                background: "var(--cyan)",
                color: "var(--bg)",
                animationDelay: `${nameEnd + 240}ms`,
                animationFillMode: "forwards",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(103,232,249,0.45), 0 0 64px rgba(103,232,249,0.15)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = "none")
              }
            >
              <span>{t.cta_work}</span>
              <span>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-between gap-2 px-6 py-4 text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-all duration-300 opacity-0 animate-fade-up"
              style={{
                border: "1px solid var(--border-strong)",
                color: "var(--muted2)",
                animationDelay: `${nameEnd + 320}ms`,
                animationFillMode: "forwards",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--cyan)";
                el.style.color = "var(--cyan)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border-strong)";
                el.style.color = "var(--muted2)";
              }}
            >
              <span>{t.cta_contact}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* ───── CELL C3 · SOCIAL ANCHORS ───── */}
        <div
          className="p-8 md:p-12 lg:p-12 flex flex-col"
          style={{ background: "var(--bg)" }}
        >
          <CellMarker
            left={lang === "tr" ? "// BAĞLANTILAR" : "// CONNECT"}
            right={lang === "tr" ? "İZMİR · TR" : "IZMIR · TR"}
          />

          <div
            className="flex items-center gap-7 mt-auto opacity-0 animate-fade-up"
            style={{
              animationDelay: `${nameEnd + 360}ms`,
              animationFillMode: "forwards",
            }}
          >
            {[
              { icon: <Github size={18} />,   href: "https://github.com/BertugTas",                                     label: "GitHub"   },
              { icon: <Linkedin size={18} />, href: "https://linkedin.com/in/bertu%C4%9F-ta%C5%9F-bb20562b5",          label: "LinkedIn" },
              { icon: <Mail size={18} />,     href: "mailto:bertugtaas@gmail.com",                                      label: "Email"    },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="transition-colors duration-200"
                style={{ color: "var(--muted2)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted2)")}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      </div>
    </section>
  );
}
