"use client";

import { useLanguage, T } from "@/context/LanguageContext";
import InferenceCanvas from "@/components/InferenceCanvas";

// ── Hero: editorial 2-zone layout ─────────────────────────────────────────────
// LEFT  — name at display scale + identity descriptor
// RIGHT — InferenceCanvas (desktop only)
// STRIP — currently-badge + scroll indicator

export default function Hero() {
  const { lang } = useLanguage();
  const t = T[lang].hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col z-[1] overflow-hidden"
    >
      {/* ── Mobile: canvas as barely-visible ambient layer ───────────────── */}
      <div
        aria-hidden
        className="lg:hidden absolute inset-0 pointer-events-none"
        style={{ opacity: 0.1 }}
      >
        <InferenceCanvas />
      </div>

      {/* ── Main: [LEFT identity] | [RIGHT canvas] ───────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_min(420px,36vw)]">

        {/* ── LEFT: identity ──────────────────────────────────────────────── */}
        <div className="relative z-[1] flex flex-col px-8 md:px-16 pt-32 md:pt-36 pb-10 lg:pb-16">

          {/* Micro section marker */}
          <span
            className="text-[0.52rem] uppercase tracking-[0.28em] animate-fade-up"
            style={{
              color: "var(--muted)",
              animationDelay: "80ms",
              animationFillMode: "both",
            }}
          >
            {lang === "tr" ? "// 00 · KİMLİK" : "// 00 · IDENTITY"}
          </span>

          {/* Name — primary brand statement ───────────────────────────────── */}
          <div className="flex-1 flex flex-col justify-center py-12 lg:py-0">
            <h1
              className="font-black leading-[0.88] flex flex-col items-start"
              style={{ letterSpacing: "-0.04em" }}
              aria-label="Bertuğ Taş"
            >
              <span
                className="name-wipe block"
                style={{
                  fontSize: "clamp(4rem,14vw,11rem)",
                  color: "var(--text-max)",
                }}
              >
                BERTUĞ
              </span>
              <span
                className="name-wipe-2 block tas-glow"
                style={{
                  fontSize: "clamp(4rem,14vw,11rem)",
                  color: "var(--cyan)",
                }}
              >
                TAŞ
              </span>
            </h1>

            {/* Thin rule */}
            <div
              className="w-10 h-px mt-8 mb-5 animate-fade-up"
              style={{
                background: "var(--border-strong)",
                animationDelay: "1.4s",
                animationFillMode: "both",
              }}
            />

            {/* Eyebrow descriptor */}
            <p
              className="text-[0.68rem] uppercase tracking-[0.22em] animate-fade-up"
              style={{
                color: "var(--muted2)",
                animationDelay: "1.5s",
                animationFillMode: "both",
              }}
            >
              {t.eyebrow}
            </p>
          </div>
        </div>

        {/* ── RIGHT: InferenceCanvas — desktop only ────────────────────────── */}
        <div
          className="hidden lg:flex flex-col px-10 pt-36 pb-12"
          style={{ borderLeft: "1px solid var(--border)" }}
        >
          {/* Top telemetry label */}
          <span
            className="text-[0.48rem] uppercase tracking-[0.28em] animate-fade-up"
            style={{
              color: "var(--muted)",
              animationDelay: "1.2s",
              animationFillMode: "both",
            }}
          >
            {lang === "tr" ? "// ÇIKARIM MOTORU" : "// INFERENCE ENGINE"}
          </span>

          {/* Canvas — fills the available vertical space */}
          <div className="flex-1 my-8 min-h-[240px]">
            <InferenceCanvas />
          </div>

          {/* Bottom telemetry label */}
          <span
            className="font-mono text-[0.44rem] uppercase tracking-[0.2em] animate-fade-up"
            style={{
              color: "var(--muted)",
              animationDelay: "1.8s",
              animationFillMode: "both",
            }}
          >
            {lang === "tr" ? "SİNİRSEL İLERİ GEÇİŞ · 4 KATMAN" : "NEURAL FORWARD-PASS · 4L"}
          </span>
        </div>
      </div>

      {/* ── Bottom strip: currently + scroll ─────────────────────────────── */}
      <div style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between px-8 md:px-16 py-4">

          {/* Currently badge */}
          <div
            className="flex items-center gap-3 animate-fade-up"
            style={{ animationDelay: "1.7s", animationFillMode: "both" }}
          >
            <span
              className="status-dot w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: "var(--green)",
                boxShadow: "0 0 6px var(--green)",
              }}
            />
            <span
              className="text-[0.55rem] uppercase tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              {t.currently}
            </span>
            <span
              className="hidden sm:inline text-[0.58rem] tracking-[0.04em]"
              style={{ color: "var(--muted2)" }}
            >
              {t.currentProject}
            </span>
          </div>

          {/* Scroll indicator */}
          <span
            className="animate-scan-down text-[0.52rem] uppercase tracking-[0.25em]"
            style={{ color: "var(--muted)" }}
          >
            {t.scroll}
          </span>
        </div>
      </div>
    </section>
  );
}
