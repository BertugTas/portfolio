"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GlobalCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Don't render on touch/stylus screens — native touch feedback is better
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setIsClient(true);

    const update = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);

  if (!isClient) return null;

  return (
    <motion.div
      animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5 }}
      transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 2147483647,
        width: "10px",
        height: "10px",
        backgroundColor: "#67e8f9",
        borderRadius: "50%",
        boxShadow: "0 0 8px #67e8f9, 0 0 20px rgba(103,232,249,0.35)",
      }}
    />
  );
}
