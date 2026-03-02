"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import HeroLogo from "./HeroLogo";

const firstName = "Bertuğ".split("");
const lastName = "TAŞ".split("");

function SplitReveal({
  chars,
  baseDelay,
  className,
}: {
  chars: string[];
  baseDelay: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex overflow-hidden pb-3 -mb-3 ${className ?? ""}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block animate-char-reveal"
          style={{ animationDelay: `${baseDelay + i * 60}ms` }}
        >
          {char === " " ? "\u00a0" : char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const nameEnd = 200 + (firstName.length + lastName.length) * 60 + 120;

  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="max-w-5xl mx-auto w-full pt-24 pb-16">
        <div className="grid items-center gap-0 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <p
              className="font-mono text-base text-white/60 mb-5 tracking-wide opacity-0 animate-fade-up"
              style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
            >
              Ben
            </p>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 leading-none flex flex-wrap items-baseline gap-x-[0.25em]">
              <SplitReveal chars={firstName} baseDelay={200} className="text-white" />
              <SplitReveal
                chars={lastName}
                baseDelay={200 + firstName.length * 60 + 80}
                className="text-white font-black"
              />
            </h1>

            <h2
              className="text-lg md:text-xl text-white/55 font-normal mb-10 tracking-wide opacity-0 animate-fade-up"
              style={{ animationDelay: `${nameEnd}ms`, animationFillMode: "forwards" }}
            >
              Veri Bilimi & Veri Mühendisi
            </h2>

            <p
              className="text-white/70 text-base max-w-xl leading-relaxed mb-4 opacity-0 animate-fade-up"
              style={{ animationDelay: `${nameEnd + 120}ms`, animationFillMode: "forwards" }}
            >
              Dokuz Eylül Üniversitesi Bilgisayar Bilimi öğrencisiyim. Veri
              bilimi alanında makine öğrenmesi modelleri geliştiriyor, Python
              ve SQL ile büyük veri setlerini analiz ediyor, istatistiksel
              yöntemlerle veriden anlamlı içgörüler çıkarıyorum.
            </p>

            <p
              className="text-white/45 text-sm max-w-xl leading-relaxed mb-12 opacity-0 animate-fade-up"
              style={{ animationDelay: `${nameEnd + 220}ms`, animationFillMode: "forwards" }}
            >
              Nesne yönelimli programlama prensiplerini C# ile uygulayan,
              veri mühendisliği süreçlerini otomatize eden çözümler üretiyorum.
            </p>

            <div
              className="flex items-center gap-6 opacity-0 animate-fade-up"
              style={{ animationDelay: `${nameEnd + 320}ms`, animationFillMode: "forwards" }}
            >
              <a
                href="#projects"
                className="text-sm font-medium text-white border border-white/25 px-6 py-2.5 hover:bg-white hover:text-black transition-all duration-200 tracking-wide"
              >
                Projeler
              </a>
              <a
                href="#contact"
                className="text-sm text-white/50 hover:text-white transition-colors"
              >
                İletişim →
              </a>
            </div>

            <div
              className="flex items-center gap-5 mt-14 opacity-0 animate-fade-up"
              style={{ animationDelay: `${nameEnd + 420}ms`, animationFillMode: "forwards" }}
            >
              {[
                { icon: <Github size={16} />, href: "https://github.com/BertugTas", label: "GitHub" },
                { icon: <Linkedin size={16} />, href: "https://linkedin.com/in/bertuğ-taş-bb20562b5", label: "LinkedIn" },
                { icon: <Mail size={16} />, href: "mailto:bertugtaas@gmail.com", label: "E-posta" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/35 hover:text-white transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div
            className="hidden lg:flex justify-end items-center opacity-0 animate-fade-up translate-x-8"
            style={{ animationDelay: `${nameEnd + 180}ms`, animationFillMode: "forwards" }}
          >
            <HeroLogo />
          </div>
        </div>
      </div>
    </section>
  );
}
