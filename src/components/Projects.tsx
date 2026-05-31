"use client";

import { useEffect, useRef } from "react";
import { useLanguage, T } from "@/context/LanguageContext";
import {
  projectsList,
  projectsData,
  type ProjectCard,
  type ProjectMetaKV,
  type ProjectMetric,
} from "@/data/projects";

/* ──────────────────────────────────── primitives ── */

function StackTag({ label }: { label: string }) {
  return (
    <span
      className="text-[0.58rem] tracking-[0.07em] px-1.5 py-px"
      style={{ border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted)" }}
    >
      {label}
    </span>
  );
}

function Badge({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      className="text-[0.58rem] tracking-[0.07em] px-2 py-0.5 whitespace-nowrap"
      style={{
        background: accent ? "rgba(103,232,249,0.07)" : "rgba(110,231,183,0.07)",
        border: `1px solid ${accent ? "rgba(103,232,249,0.22)" : "rgba(110,231,183,0.18)"}`,
        color: accent ? "var(--cyan)" : "var(--green)",
      }}
    >
      {label}
    </span>
  );
}

function MetaRow({ items, lang }: { items: ProjectMetaKV[]; lang: "en" | "tr" }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mb-4">
      {items.map((item) => (
        <span key={item.keyEn} className="inline-flex items-center gap-1.5">
          <span
            className="text-[0.58rem] uppercase tracking-[0.18em]"
            style={{ color: "var(--muted)" }}
          >
            {lang === "tr" ? item.keyTr : item.keyEn}
          </span>
          <span
            className="text-[0.6rem] tracking-[0.04em]"
            style={{ color: item.color ?? "var(--muted2)" }}
          >
            {item.val}
          </span>
        </span>
      ))}
    </div>
  );
}

function CellMarker({
  left,
  right,
  rightColor,
  liveDot,
}: {
  left: string;
  right?: string;
  rightColor?: "cyan" | "green" | "orange" | "muted";
  liveDot?: boolean;
}) {
  const rightTint =
    rightColor === "cyan"   ? "var(--cyan)" :
    rightColor === "green"  ? "var(--green)" :
    rightColor === "orange" ? "var(--orange)" :
    "var(--muted)";

  return (
    <div className="flex items-center justify-between mb-7">
      <span
        className="text-[0.55rem] tracking-[0.25em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        {left}
      </span>
      {right && (
        <span
          className="inline-flex items-center gap-2 text-[0.55rem] tracking-[0.25em] uppercase font-bold"
          style={{ color: rightTint }}
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

function ActionBtn({
  href,
  label,
  primary,
  external = true,
}: {
  href: string;
  label: string;
  primary?: boolean;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external && !href.startsWith("mailto") ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center justify-between gap-2 px-5 py-3.5 text-[0.65rem] font-black uppercase tracking-[0.18em] transition-all duration-300"
      style={
        primary
          ? { background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "var(--text)" }
          : { border: "1px solid var(--border-strong)", color: "var(--muted2)" }
      }
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--cyan)";
        el.style.color = "var(--cyan)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        if (primary) {
          el.style.borderColor = "rgba(255,255,255,0.12)";
          el.style.color = "var(--text)";
        } else {
          el.style.borderColor = "var(--border-strong)";
          el.style.color = "var(--muted2)";
        }
      }}
    >
      <span>{label}</span>
      <span>↗</span>
    </a>
  );
}

function MetricTile({ metric, lang }: { metric: ProjectMetric; lang: "en" | "tr" }) {
  return (
    <div className="p-5" style={{ background: "var(--bg)" }}>
      <span
        className="block text-3xl font-black tracking-tighter leading-none"
        style={{ color: metric.color }}
      >
        {metric.val}
      </span>
      <span
        className="block text-[0.52rem] uppercase tracking-[0.2em] mt-2"
        style={{ color: "var(--muted)" }}
      >
        {lang === "tr" ? metric.labelTr : metric.labelEn}
      </span>
    </div>
  );
}

function MetaTile({ item, lang }: { item: ProjectMetaKV; lang: "en" | "tr" }) {
  return (
    <div className="p-4" style={{ background: "var(--bg)" }}>
      <span
        className="block text-[0.5rem] uppercase tracking-[0.22em] mb-1.5"
        style={{ color: "var(--muted)" }}
      >
        {lang === "tr" ? item.keyTr : item.keyEn}
      </span>
      <span
        className="block text-[0.92rem] font-bold tracking-tight"
        style={{ color: item.color ?? "var(--text-max)" }}
      >
        {item.val}
      </span>
    </div>
  );
}

/* ──────────────────────────────────── component ── */

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = T[lang].projects;

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal, .reveal-line, .chapter-reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.05 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Resolve cards by id so layout slot is decoupled from array order
  const featured = projectsList.find((p) => p.id === "bt-flow")!;
  const teknofest = projectsList.find((p) => p.id === "teknofest-health")!;
  const savtek = projectsList.find((p) => p.id === "savtek-gcs")!;
  const research = projectsList.find((p) => p.id === "tubitak-research")!;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-[1] py-28 px-6 md:px-12"
    >
      {/* Animated section divider */}
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
          style={{
            fontSize: "clamp(8rem,20vw,17rem)",
            color: "rgba(255,255,255,0.022)",
            lineHeight: 0.85,
          }}
        >
          03
        </span>

        {/* ── Section header ── */}
        <div className="flex items-baseline gap-5 mb-16 reveal">
          <span
            className="text-[0.65rem] tracking-[0.25em] shrink-0"
            style={{ color: "var(--muted)" }}
          >
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

        {/* ═══════════════════ BENTO WRAPPER ═══════════════════ */}
        <div
          className="flex flex-col gap-px reveal"
          style={{ background: "var(--border)" }}
        >

          {/* ════════════ ROW 1 — FEATURED (bt-flow) ════════════ */}
          <FeaturedRow card={featured} lang={lang} />

          {/* ════════════ ROW 2 — SECONDARY (Teknofest + SAVTEK) ════════════ */}
          <div
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-px"
            style={{ background: "var(--border)" }}
          >
            <SecondaryCell
              card={teknofest}
              lang={lang}
              markerLeft={lang === "tr" ? "// 02 · TIBBİ YZ" : "// 02 · MEDICAL AI"}
            />
            <SecondaryCell
              card={savtek}
              lang={lang}
              markerLeft={lang === "tr" ? "// 03 · SAVUNMA" : "// 03 · DEFENSE TECH"}
            />
          </div>

          {/* ════════════ ROW 3 — RESEARCH (TÜBİTAK) ════════════ */}
          <ResearchRow card={research} lang={lang} />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────── row components ── */

function CaseStudyBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div
      className="pt-5"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <span
        className="block text-[0.58rem] uppercase tracking-[0.28em] mb-2 font-bold"
        style={{ color: "var(--muted)" }}
      >
        {label}
      </span>
      <p className="text-[0.84rem] leading-[1.95]" style={{ color: "var(--muted2)" }}>
        {text}
      </p>
    </div>
  );
}

function FeaturedRow({ card, lang }: { card: ProjectCard; lang: "en" | "tr" }) {
  const content = lang === "tr" ? card.tr : card.en;
  const study = projectsData.find((p) => p.slug === "bt-flow");
  const studyContent = study ? (lang === "tr" ? study.tr : study.en) : null;

  const labels = {
    problem:  lang === "tr" ? "Problem"   : "Problem",
    approach: lang === "tr" ? "Yaklaşım"  : "Approach",
    outcome:  lang === "tr" ? "Çıktı"     : "Outcome",
    stack:    lang === "tr" ? "Yığın"     : "Stack",
    launch:   lang === "tr" ? "// 01 · LANSMAN"       : "// 01 · FLAGSHIP LAUNCH",
    featured: lang === "tr" ? "★ ÖNE ÇIKAN"           : "★ FEATURED",
    links:    lang === "tr" ? "// BAĞLANTILAR"         : "// LINKS",
    live:     lang === "tr" ? "PyPI'DA AKTİF"          : "LIVE ON PYPI",
  };

  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-px overflow-hidden"
      style={{ background: "var(--border)" }}
    >
      {/* Cyan wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(103,232,249,0.04) 0%, transparent 50%)" }}
      />

      {/* ── LEFT: case study narrative ── */}
      <div
        className="relative p-8 md:p-10 lg:p-12 flex flex-col gap-5"
        style={{ background: "var(--bg)" }}
      >
        <CellMarker
          left={labels.launch}
          right={labels.featured}
          rightColor="cyan"
        />

        <span
          className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5 self-start"
          style={{ color: "var(--muted2)", border: "1px solid var(--border)" }}
        >
          {content.area}
        </span>

        <h3
          className="font-black tracking-tighter leading-[1.05]"
          style={{
            fontSize: "clamp(1.75rem,3.5vw,2.6rem)",
            color: "var(--text-max)",
            overflowWrap: "break-word",
            wordBreak: "break-word",
          }}
        >
          {content.title}
        </h3>

        {/* Case study blocks — Problem → Approach → Outcome */}
        {studyContent ? (
          <>
            <CaseStudyBlock label={labels.problem}  text={studyContent.problem}  />
            <CaseStudyBlock label={labels.approach} text={studyContent.approach} />
            <CaseStudyBlock label={labels.outcome}  text={studyContent.outcome}  />
          </>
        ) : (
          <p className="text-[0.85rem] leading-[1.9]" style={{ color: "var(--muted2)" }}>
            {content.description}
          </p>
        )}

        {/* Stack */}
        <div
          className="pt-5 mt-auto"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <span
            className="block text-[0.58rem] uppercase tracking-[0.28em] mb-3 font-bold"
            style={{ color: "var(--muted)" }}
          >
            {labels.stack}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {card.stack.map((s) => (
              <StackTag key={s} label={s} />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: meta + links ── */}
      <div
        className="relative p-8 md:p-10 lg:p-12 flex flex-col"
        style={{ background: "var(--bg)" }}
      >
        <CellMarker
          left={labels.links}
          right={labels.live}
          rightColor="green"
          liveDot
        />

        {/* Metadata — hairline key-value rows, no filled boxes */}
        <div
          className="flex flex-col gap-px mb-8"
          style={{ background: "var(--border)" }}
        >
          {card.meta.map((item) => (
            <div
              key={item.keyEn}
              className="flex items-baseline justify-between px-4 py-3.5"
              style={{ background: "var(--bg)" }}
            >
              <span
                className="text-[0.58rem] uppercase tracking-[0.2em]"
                style={{ color: "var(--muted)" }}
              >
                {lang === "tr" ? item.keyTr : item.keyEn}
              </span>
              <span
                className="text-[0.75rem] font-bold tracking-tight tabular-nums"
                style={{ color: item.color ?? "var(--text-max)" }}
              >
                {item.val}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons — stacked, full-width */}
        <div className="flex flex-col gap-2 mt-auto">
          {card.pypiUrl && <ActionBtn href={card.pypiUrl} label="PyPI →" primary />}
          <ActionBtn href={card.href} label="GitHub →" />
        </div>
      </div>
    </div>
  );
}

function SecondaryCell({
  card,
  lang,
  markerLeft,
}: {
  card: ProjectCard;
  lang: "en" | "tr";
  markerLeft: string;
}) {
  const content = lang === "tr" ? card.tr : card.en;
  const badgeLabels = card.badges.map((b) => (lang === "tr" ? b.tr : b.en));

  return (
    <div
      className="group relative p-8 md:p-10 lg:p-12 flex flex-col overflow-hidden transition-colors duration-300"
      style={{ background: "var(--bg)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg2)";
        el.style.boxShadow = "inset 0 1px 0 rgba(103,232,249,0.22)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--bg)";
        el.style.boxShadow = "none";
      }}
    >
      <CellMarker left={markerLeft} />

      <span
        className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5 self-start mb-5"
        style={{ color: "var(--muted2)", border: "1px solid var(--border)" }}
      >
        {content.area}
      </span>

      <h3
        className="text-2xl md:text-3xl font-black tracking-tighter mb-4 leading-tight"
        style={{ color: "var(--text-max)", overflowWrap: "break-word" }}
      >
        {content.title}
      </h3>

      <p
        className="text-[0.78rem] leading-[1.9] mb-5"
        style={{ color: "var(--muted2)" }}
      >
        {content.description}
      </p>

      <MetaRow items={card.meta} lang={lang} />

      {badgeLabels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {badgeLabels.map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-6">
        {card.stack.map((s) => (
          <StackTag key={s} label={s} />
        ))}
      </div>

      <div
        className="mt-auto pt-5"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <ActionBtn href={card.href} label="GitHub" />
      </div>
    </div>
  );
}

function ResearchRow({ card, lang }: { card: ProjectCard; lang: "en" | "tr" }) {
  const content = lang === "tr" ? card.tr : card.en;
  const badgeLabels = card.badges.map((b) => (lang === "tr" ? b.tr : b.en));

  return (
    <div
      className="relative overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Ghost watermark — centered TÜBİTAK at 2.5% orange */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center font-black tracking-tighter pointer-events-none select-none hidden md:flex"
        style={{
          fontSize: "clamp(4rem,14vw,11rem)",
          color: "rgba(251,191,36,0.025)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        TÜBİTAK
      </span>

      <div className="relative p-8 md:p-10 lg:p-12">
        <CellMarker
          left={lang === "tr" ? "// 04 · AKADEMİK HİBE" : "// 04 · RESEARCH GRANT"}
          right={lang === "tr" ? "AKADEMİK" : "ACADEMIC"}
          rightColor="orange"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 items-start">

          {/* LEFT: title + description + badges + stack */}
          <div>
            <span
              className="text-[0.6rem] uppercase tracking-[0.22em] px-2 py-0.5 inline-block mb-5"
              style={{ color: "var(--muted2)", border: "1px solid var(--border)" }}
            >
              {content.area}
            </span>

            <h3
              className="text-2xl md:text-3xl font-black tracking-tighter mb-5 leading-tight"
              style={{
                color: "var(--text-max)",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {content.title}
            </h3>

            <p
              className="text-[0.85rem] leading-[1.9] mb-6"
              style={{ color: "var(--muted2)", maxWidth: "58ch" }}
            >
              {content.description}
            </p>

            {badgeLabels.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {badgeLabels.map((b) => (
                  <Badge key={b} label={b} />
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {card.stack.map((s) => (
                <StackTag key={s} label={s} />
              ))}
            </div>
          </div>

          {/* RIGHT: academic metadata dashboard — vertical stack of telemetry tiles */}
          <div
            className="grid grid-cols-1 gap-px"
            style={{ background: "var(--border)" }}
          >
            {card.meta.map((item) => (
              <MetaTile key={item.keyEn} item={item} lang={lang} />
            ))}

            {/* Action tile — GitHub */}
            <div className="p-3" style={{ background: "var(--bg)" }}>
              <ActionBtn href={card.href} label="GitHub" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
