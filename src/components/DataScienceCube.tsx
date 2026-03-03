"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  baseX: number;
  baseY: number;
};

type Face = {
  label: string;
  sublabel: string;
  accent: string;
  transform: string;
  glow: string;
};

type DataScienceCubeProps = {
  size?: number;
  className?: string;
};

function createFaces(half: number): Face[] {
  return [
    {
      label: "ETL",
      sublabel: "Pipeline",
      accent: "var(--cyan)",
      transform: `rotateY(0deg) translateZ(${half}px)`,
      glow: "rgba(103, 232, 249, 0.24)",
    },
    {
      label: "Feature",
      sublabel: "Engineering",
      accent: "var(--green)",
      transform: `rotateY(180deg) translateZ(${half}px)`,
      glow: "rgba(110, 231, 183, 0.2)",
    },
    {
      label: "ML",
      sublabel: "Modeling",
      accent: "var(--orange)",
      transform: `rotateY(90deg) translateZ(${half}px)`,
      glow: "rgba(251, 191, 36, 0.2)",
    },
    {
      label: "DataOps",
      sublabel: "Platform",
      accent: "var(--muted2)",
      transform: `rotateY(-90deg) translateZ(${half}px)`,
      glow: "rgba(161, 161, 170, 0.16)",
    },
    {
      label: "Power BI",
      sublabel: "Dashboard",
      accent: "var(--orange)",
      transform: `rotateX(90deg) translateZ(${half}px)`,
      glow: "rgba(251, 191, 36, 0.18)",
    },
    {
      label: "MLOps",
      sublabel: "Deploy",
      accent: "var(--cyan)",
      transform: `rotateX(-90deg) translateZ(${half}px)`,
      glow: "rgba(103, 232, 249, 0.2)",
    },
  ];
}

const PARTICLE_COLORS = [
  "rgba(255, 255, 255, 0.18)",
  "rgba(255, 255, 255, 0.12)",
  "rgba(255, 255, 255, 0.08)",
];

export default function DataScienceCube({ size = 260, className = "" }: DataScienceCubeProps) {
  const half = size / 2;
  const stageSize = size + 124;
  const haloInset = Math.max(14, Math.round(size * 0.13));
  const faces = useMemo(() => createFaces(half), [half]);
  const cubeRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const rotationRef = useRef({ x: -20, y: 28 });
  const reduceMotion = useRef(false);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);

  const applyRotation = useCallback(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    cube.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
  }, []);

  useEffect(() => {
    applyRotation();
  }, [applyRotation]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotion.current = mq.matches;
    const onChange = () => {
      reduceMotion.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let raf = 0;
    const animate = () => {
      if (!dragRef.current && !reduceMotion.current) {
        rotationRef.current.y += 0.13;
        applyRotation();
      }
      raf = window.requestAnimationFrame(animate);
    };
    raf = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(raf);
  }, [applyRotation]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseX: rotationRef.current.x,
      baseY: rotationRef.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const dx = event.clientX - drag.startX;
      const dy = event.clientY - drag.startY;

      rotationRef.current.x = Math.max(-68, Math.min(68, drag.baseX - dy * 0.24));
      rotationRef.current.y = drag.baseY + dx * 0.34;
      applyRotation();
    },
    [applyRotation],
  );

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    dragRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const step = event.shiftKey ? 14 : 7;
      if (event.key === "ArrowUp") rotationRef.current.x = Math.max(-68, rotationRef.current.x - step);
      else if (event.key === "ArrowDown") rotationRef.current.x = Math.min(68, rotationRef.current.x + step);
      else if (event.key === "ArrowLeft") rotationRef.current.y -= step;
      else if (event.key === "ArrowRight") rotationRef.current.y += step;
      else return;
      applyRotation();
      event.preventDefault();
    },
    [applyRotation],
  );

  const particles = useMemo(
    () =>
      [...Array(18)].map((_, index) => ({
        id: index,
        left: `${8 + Math.random() * 84}%`,
        top: `${6 + Math.random() * 88}%`,
        delay: `${Math.random() * 4.2}s`,
        color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
      })),
    [],
  );

  return (
    <div
      className={`relative aspect-square cube-float ${className}`}
      style={{ width: `${stageSize}px`, cursor: "crosshair" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseLeave={() => setSpotlight(null)}
    >
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          inset: `${haloInset + 20}px`,
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
      />

      {spotlight && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle 130px at ${spotlight.x}px ${spotlight.y}px, rgba(103,232,249,0.09), rgba(103,232,249,0.03) 50%, transparent 75%)`,
            zIndex: 10,
          }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative flex items-center justify-center w-full h-full"
          style={{ perspective: "1200px" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          tabIndex={0}
          onKeyDown={onKeyDown}
          role="img"
          aria-label="Veri bilimi süreçlerini temsil eden interaktif 3 boyutlu küp"
        >
          <div
            ref={cubeRef}
            className="relative"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            {faces.map((face) => (
              <div
                key={face.label}
                className="absolute inset-0 flex flex-col items-center justify-center border"
                style={{
                  transform: face.transform,
                  borderColor: "rgba(255,255,255,0.07)",
                  background: "linear-gradient(160deg, rgba(22,22,22,0.98) 0%, rgba(10,10,10,0.99) 100%)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), inset 1px 0 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.9)",
                  backfaceVisibility: "hidden",
                }}
              >
                <span
                  className="font-semibold tracking-[0.18em] uppercase"
                  style={{ color: "rgba(255,255,255,0.45)", fontSize: size < 220 ? "1rem" : "1.2rem" }}
                >
                  {face.label}
                </span>
                <span
                  className="tracking-[0.22em] uppercase mt-1"
                  style={{ fontSize: size < 220 ? "0.54rem" : "0.62rem", color: "rgba(255,255,255,0.2)" }}
                >
                  {face.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute block w-1 h-1 rounded-full animate-[pulse_3.8s_ease-in-out_infinite]"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            backgroundColor: particle.color,
          }}
          aria-hidden
        />
      ))}
    </div>
  );
}
