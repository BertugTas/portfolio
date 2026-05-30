"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

// ── Counter hook — cubic ease-out RAF loop ──────────────────────────────
function useCountUp(
  target: number,
  decimals: number,
  duration: number,
  started: boolean,
): number {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    setVal(0);
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - p) ** 3;
      setVal(+(eased * target).toFixed(decimals));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, decimals, duration, started]);

  return val;
}

// ── Character-scramble hook — settles left-to-right ────────────────────
const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function useScramble(target: string, duration: number, started: boolean): string {
  const [display, setDisplay] = useState(() => target.replace(/[A-Z0-9]/g, "·"));
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const settled = Math.floor(p * target.length);
      const result = target
        .split("")
        .map((ch, i) => {
          if (i < settled || ch === "-") return ch;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");
      setDisplay(result);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration, started]);

  return display;
}

// ── Shared cell props ───────────────────────────────────────────────────
type CellBase = {
  accent: string;
  label: string;
  labelTr: string;
  index: number;
  started: boolean;
  compact: boolean;
};

// ── Numeric counter cell ────────────────────────────────────────────────
function NumericCell({
  numericEnd,
  decimals,
  suffix,
  accent,
  label,
  labelTr,
  index,
  started,
  compact,
}: CellBase & { numericEnd: number; decimals: number; suffix: string }) {
  const { lang } = useLanguage();
  const val = useCountUp(numericEnd, decimals, 1600, started);
  const displayed =
    decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex flex-col justify-between overflow-hidden ${
        compact ? "p-4 h-[92px]" : "p-5 h-[108px]"
      }`}
      style={{ background: "var(--bg2)" }}
    >
      <span
        className="block text-[0.49rem] uppercase tracking-[0.22em]"
        style={{ color: "var(--muted)" }}
      >
        {lang === "tr" ? labelTr : label}
      </span>
      <span
        className="block font-bold tabular-nums leading-none"
        style={{
          color: accent,
          fontSize: compact ? "clamp(1.55rem,5vw,1.9rem)" : "clamp(1.7rem,2.8vw,2.35rem)",
        }}
      >
        {displayed}
        {suffix}
      </span>
      {/* bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          opacity: 0.38,
        }}
      />
    </motion.div>
  );
}

// ── Code / designation cell ─────────────────────────────────────────────
function CodeCell({
  code,
  accent,
  label,
  labelTr,
  index,
  started,
  compact,
}: CellBase & { code: string }) {
  const { lang } = useLanguage();
  const display = useScramble(code, 1400, started);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={started ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{
        duration: 0.55,
        delay: index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`relative flex flex-col justify-between overflow-hidden ${
        compact ? "p-4 h-[92px]" : "p-5 h-[108px]"
      }`}
      style={{ background: "var(--bg2)" }}
    >
      <span
        className="block text-[0.49rem] uppercase tracking-[0.22em]"
        style={{ color: "var(--muted)" }}
      >
        {lang === "tr" ? labelTr : label}
      </span>
      <span
        className="block font-bold font-mono tracking-[0.1em] leading-none"
        style={{
          color: accent,
          fontSize: compact ? "clamp(1.2rem,4vw,1.55rem)" : "clamp(1.35rem,2.2vw,1.85rem)",
        }}
      >
        {display}
      </span>
      {/* designation badge */}
      <span
        className="mt-1.5 self-start text-[0.43rem] uppercase tracking-[0.18em] px-1.5 py-0.5"
        style={{
          background: "rgba(251,191,36,0.07)",
          border: "1px solid rgba(251,191,36,0.18)",
          color: "var(--orange)",
        }}
      >
        TÜBİTAK
      </span>
      {/* bottom accent line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          opacity: 0.38,
        }}
      />
    </motion.div>
  );
}

// ── Main component ──────────────────────────────────────────────────────
// Delay synced with Hero name-reveal timeline: nameEnd - 40 ≈ 820ms
export default function DataScienceMetrics({ compact = false }: { compact?: boolean }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), 820);
    return () => clearTimeout(id);
  }, []);

  return (
    <div
      className={`grid grid-cols-2 gap-px ${compact ? "w-[240px]" : "w-[282px]"}`}
      style={{ background: "var(--border)" }}
    >
      <NumericCell
        numericEnd={96.4} decimals={1} suffix="%"
        accent="var(--cyan)"
        label="Avg Model Accuracy" labelTr="Ort. Model Doğruluğu"
        index={0} started={started} compact={compact}
      />
      <NumericCell
        numericEnd={15} decimals={0} suffix="M+"
        accent="var(--green)"
        label="Data Points Processed" labelTr="İşlenen Veri Noktası"
        index={1} started={started} compact={compact}
      />
      <CodeCell
        code="2209-A"
        accent="var(--orange)"
        label="TÜBİTAK Research" labelTr="TÜBİTAK Araştırma"
        index={2} started={started} compact={compact}
      />
      <NumericCell
        numericEnd={40} decimals={0} suffix="+"
        accent="var(--cyan)"
        label="Open Source Projects" labelTr="Açık Kaynak Proje"
        index={3} started={started} compact={compact}
      />
    </div>
  );
}
