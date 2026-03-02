"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Cyan dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "#00e5ff",
          boxShadow: "0 0 10px #00e5ff, 0 0 20px #00e5ff",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] w-8 h-8 rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ border: "1px solid rgba(0,229,255,0.4)" }}
      />
    </>
  );
}
