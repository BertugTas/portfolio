"use client";

import { useEffect, useRef } from "react";

const details = [
  ["Üniversite", "Dokuz Eylül"],
  ["Bölüm",      "Bilgisayar Bilimi"],
  ["Şehir",      "İzmir, TR"],
  ["Odak",       "ML / DL / BI"],
  ["Durum",      "● Açık",  "green"],
  ["GitHub",     "BertugTas"],
];

export default function About() {
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
      id="about"
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
            // 01
          </span>
          <h2
            className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight leading-none"
            style={{ color: "var(--text)" }}
          >
            Hakkımda
          </h2>
          <div
            className="flex-1 h-px"
            style={{ background: "linear-gradient(to right, var(--border), transparent)" }}
          />
        </div>

        {/* Content grid */}
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Text */}
          <div className="space-y-5 reveal" style={{ transitionDelay: "0.1s" }}>
            <p className="text-sm leading-[2]" style={{ color: "var(--muted2)" }}>
              <span style={{ color: "var(--cyan)" }}>Dokuz Eylül Üniversitesi</span>{" "}
              Bilgisayar Bilimi bölümünde öğrenciyim. İzmir merkezli olarak çalışıyor,
              veri bilimi alanında kendimi sürekli geliştiriyorum.
            </p>
            <p className="text-sm leading-[2]" style={{ color: "var(--muted2)" }}>
              Temel odağım{" "}
              <span style={{ color: "var(--cyan)" }}>makine öğrenmesi</span> ve{" "}
              <span style={{ color: "var(--cyan)" }}>derin öğrenme</span>. Tıbbi görüntü
              sınıflandırmasından kanser teşhis modellerine kadar gerçek dünya
              problemlerini veriye dayalı yaklaşımlarla çözüyorum.
            </p>
            <p className="text-sm leading-[2]" style={{ color: "var(--muted2)" }}>
              <span style={{ color: "var(--green)" }}>Veri mühendisliği</span> tarafında
              SQL optimizasyonu ve Power BI ile kurumsal karar destek sistemleri
              üretiyorum. Playwright ile web otomasyon çözümleri ve Twilio API
              entegrasyonları da uzmanlık alanlarım arasında.
            </p>
          </div>

          {/* Detail grid */}
          <div
            className="grid grid-cols-2 gap-px reveal"
            style={{
              background: "var(--border)",
              border: "1px solid var(--border)",
              transitionDelay: "0.2s",
            }}
          >
            {details.map(([key, val, accent]) => (
              <div
                key={key}
                className="p-5 transition-colors duration-200"
                style={{ background: "var(--bg2)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--bg3)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = "var(--bg2)")
                }
              >
                <div
                  className="text-[0.6rem] uppercase tracking-[0.2em] mb-1.5"
                  style={{ color: "var(--muted)" }}
                >
                  {key}
                </div>
                <div
                  className="text-sm font-semibold"
                  style={{ color: accent === "green" ? "var(--green)" : "var(--cyan)" }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
