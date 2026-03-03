"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import DataScienceCube from "@/components/DataScienceCube";
import { useLanguage, T } from "@/context/LanguageContext";

const firstName = "Bertuğ".split("");
const lastName  = "TAŞ".split("");

function SplitReveal({
  chars,
  baseDelay,
  className,
  outlined,
  glow,
}: {
  chars: string[];
  baseDelay: number;
  className?: string;
  outlined?: boolean;
  glow?: boolean;
}) {
  return (
    <span className={`inline-flex pb-1 ${glow ? "tas-glow" : "overflow-hidden pb-3 -mb-3"} ${className ?? ""}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block animate-char-reveal"
          style={{
            animationDelay: `${baseDelay + i * 60}ms`,
            ...(outlined
              ? { color: "transparent", WebkitTextStroke: "2px var(--cyan)" }
              : {}),
          }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const t = T[lang].hero;
  const nameEnd = 200 + (firstName.length + lastName.length) * 60 + 120;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 md:px-12 z-[1]"
    >
      <div className="w-full max-w-5xl mx-auto pt-20 lg:pt-24">

        {/* Eyebrow */}
        <div
          className="flex items-center gap-4 mb-3 opacity-0 animate-fade-up"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          <div className="w-10 h-px" style={{ background: "var(--cyan)" }} />
          <span
            className="text-[0.7rem] uppercase tracking-[0.25em]"
            style={{ color: "var(--cyan)" }}
          >
            {t.eyebrow}
          </span>
        </div>

        {/* Name + Cube row */}
        <div className="mb-8 lg:mb-6 lg:flex lg:items-center lg:justify-between lg:gap-10">

          {/* Name — horizontal, same size */}
          <h1 className="font-bold tracking-tight leading-none flex flex-row flex-wrap items-baseline mb-0">
            <SplitReveal
              chars={firstName}
              baseDelay={200}
              className="text-[clamp(3.2rem,6.5vw,6rem)] text-[var(--text)] mr-[0.35em]"
            />
            <SplitReveal
              chars={lastName}
              baseDelay={200 + firstName.length * 60 + 80}
              className="text-[clamp(3.2rem,6.5vw,6rem)] text-[var(--cyan)]"
              glow
            />
          </h1>

          <div
            className="hidden lg:flex shrink-0 translate-x-72 opacity-0 animate-fade-up"
            style={{
              animationDelay: `${nameEnd - 40}ms`,
              animationFillMode: "forwards",
            }}
          >
            <DataScienceCube size={280} />
          </div>
        </div>

        {/* Role paragraph */}
        <p
          className="text-sm leading-[2] mb-10 max-w-[520px] opacity-0 animate-fade-up"
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
              uzmanlaşıyorum.<span className="blink-cursor" />
            </>
          ) : (
            <>
              Computer Science student at Dokuz Eylül University.{" "}
              Working on <span style={{ color: "var(--cyan)" }}>machine learning</span> and{" "}
              <span style={{ color: "var(--cyan)" }}>deep learning</span> models;
              specializing in <span style={{ color: "var(--cyan)" }}>data science</span> and{" "}
              <span style={{ color: "var(--cyan)" }}>data engineering</span>.<span className="blink-cursor" />
            </>
          )}
        </p>

        {/* Metrics */}
        <div
          className="flex gap-8 mb-10 opacity-0 animate-fade-up"
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
              className="pl-4 border-l"
              style={{ borderColor: "var(--border)" }}
            >
              <span className={`block text-2xl font-bold leading-none ${valClass}`}>{val}</span>
              <span
                className="block text-[0.6rem] uppercase tracking-[0.15em] mt-1"
                style={{ color: "var(--muted)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div
          className="flex items-center gap-4 mb-14 opacity-0 animate-fade-up"
          style={{
            animationDelay: `${nameEnd + 240}ms`,
            animationFillMode: "forwards",
          }}
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-7 py-3 text-[0.75rem] font-bold uppercase tracking-[0.1em] transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--cyan)", color: "var(--bg)", boxShadow: "0 0 0 rgba(0,229,255,0)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(0,229,255,0.4), 0 0 40px rgba(0,229,255,0.15)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 rgba(0,229,255,0)")
            }
          >
            {t.cta_work}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3 text-[0.75rem] uppercase tracking-[0.1em] transition-all duration-200"
            style={{ border: "1px solid var(--border)", color: "var(--muted2)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--cyan)";
              (e.currentTarget as HTMLElement).style.color = "var(--cyan)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted2)";
            }}
          >
            {t.cta_contact}
          </a>
        </div>

        {/* Social icons */}
        <div
          className="flex items-center gap-5 opacity-0 animate-fade-up"
          style={{
            animationDelay: `${nameEnd + 360}ms`,
            animationFillMode: "forwards",
          }}
        >
          {[
            { icon: <Github size={16} />,   href: "https://github.com/BertugTas",                   label: "GitHub"   },
            { icon: <Linkedin size={16} />, href: "https://linkedin.com/in/bertuğ-taş-bb20562b5",   label: "LinkedIn" },
            { icon: <Mail size={16} />,     href: "mailto:bertugtaas@gmail.com",                     label: "Email"    },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-colors duration-200"
              style={{ color: "var(--muted)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cyan)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--muted)")}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-6 md:left-12 flex flex-col items-center gap-2 opacity-0 animate-fade-up"
        style={{
          animationDelay: `${nameEnd + 500}ms`,
          animationFillMode: "forwards",
        }}
      >
        <div
          className="w-px h-14 animate-scan-down"
          style={{ background: "linear-gradient(to bottom, var(--cyan), transparent)" }}
        />
        <span
          className="text-[0.6rem] tracking-[0.2em] uppercase"
          style={{ color: "var(--muted)", writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {t.scroll}
        </span>
      </div>
    </section>
  );
}
