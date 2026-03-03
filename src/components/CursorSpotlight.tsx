"use client";

import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const BASE_SHADOW =
      "0 0 8px 3px rgba(0,229,255,0.6), 0 0 20px 6px rgba(0,229,255,0.25), 0 0 40px 10px rgba(0,229,255,0.1)";
    const HOVER_SHADOW =
      "0 0 10px 4px rgba(0,229,255,0.75), 0 0 26px 8px rgba(0,229,255,0.35), 0 0 50px 14px rgba(0,229,255,0.15)";

    const onMove = (e: MouseEvent) => {
      el.style.left = e.clientX + "px";
      el.style.top  = e.clientY + "px";
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) {
        el.style.transform  = "translate(-50%,-50%) scale(1.6)";
        el.style.boxShadow  = HOVER_SHADOW;
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) {
        el.style.transform  = "translate(-50%,-50%) scale(1)";
        el.style.boxShadow  = BASE_SHADOW;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
    };
  }, []);

  return (
    <div
      ref={elRef}
      id="glow-cursor"
      style={{
        position:     "fixed",
        pointerEvents:"none",
        zIndex:       9999,
        width:        "10px",
        height:       "10px",
        borderRadius: "50%",
        background:   "#00e5ff",
        transform:    "translate(-50%, -50%)",
        boxShadow:    "0 0 8px 3px rgba(0,229,255,0.6), 0 0 20px 6px rgba(0,229,255,0.25), 0 0 40px 10px rgba(0,229,255,0.1)",
        transition:   "transform 0.15s ease",
        left:         "-100px",
        top:          "-100px",
      }}
    />
  );
}
