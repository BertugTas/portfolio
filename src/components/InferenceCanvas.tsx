"use client";

import { useEffect, useRef } from "react";

// ── Layer topology ────────────────────────────────────────────────────────────
const LAYERS_D = [4, 6, 6, 3]; // desktop
const LAYERS_M = [3, 4, 4, 2]; // mobile (<480px)
const CYAN     = "#67e8f9";

// ── Types ─────────────────────────────────────────────────────────────────────
type Nd = { x: number; y: number; act: number };  // node
type Sg = { li: number; fi: number; ti: number;   // signal
            t:  number; spd: number };

// ── Helpers ───────────────────────────────────────────────────────────────────
function sampleK(n: number, k: number): number[] {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(k, n));
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function InferenceCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const _canvas = canvasRef.current;
    if (!_canvas) return;
    // Safe cast after null guard — TypeScript loses narrowing across closure boundaries
    const canvas = _canvas as HTMLCanvasElement;
    const _ctx = canvas.getContext("2d");
    if (!_ctx) return;
    const ctx = _ctx as CanvasRenderingContext2D;

    // ── Mutable state (closure-local, no React re-renders) ──────────────────
    let nodes:          Nd[][] = [];
    let sigs:           Sg[]   = [];
    let raf             = 0;
    let frame           = 0;
    let mx              = -9999;
    let my              = -9999;
    let passTriggered   = false;

    // ── Layout: recompute node positions from current canvas size ──────────
    function layout() {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2);
      const w    = canvas.offsetWidth;
      const h    = canvas.offsetHeight;
      if (!w || !h) return;

      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const counts = w < 480 ? LAYERS_M : LAYERS_D;
      const padX   = w * 0.1;
      const padY   = h * 0.09;
      const colW   = (w - padX * 2) / (counts.length - 1);

      nodes = counts.map((n, li) => {
        const x    = padX + li * colW;
        const rowH = n > 1 ? (h - padY * 2) / (n - 1) : 0;
        return Array.from({ length: n }, (_, ni) => ({
          x,
          y:   n === 1 ? h / 2 : padY + ni * rowH,
          act: 0,
        }));
      });

      sigs = []; // clear in-flight signals on resize
    }

    // ── Spawn one signal: layer li, from-node fi, to-node ti ───────────────
    function spawn(li: number, fi: number, ti: number) {
      sigs.push({ li, fi, ti, t: 0, spd: 0.013 + Math.random() * 0.007 });
    }

    // ── Full forward pass — triggered once on first intersection ───────────
    function forwardPass() {
      if (nodes.length < 4) return;

      // Wave 1: input → hidden-1
      nodes[0].forEach((_, fi) => {
        sampleK(nodes[1].length, 2).forEach(ti => spawn(0, fi, ti));
      });
      // Wave 2: hidden-1 → hidden-2 (staggered)
      setTimeout(() => {
        if (!nodes[1]) return;
        nodes[1].forEach((_, fi) => {
          sampleK(nodes[2].length, 2).forEach(ti => spawn(1, fi, ti));
        });
      }, 350);
      // Wave 3: hidden-2 → output
      setTimeout(() => {
        if (!nodes[2]) return;
        nodes[2].forEach((_, fi) => {
          sampleK(nodes[3].length, 1).forEach(ti => spawn(2, fi, ti));
        });
      }, 700);
    }

    // ── Draw one frame ──────────────────────────────────────────────────────
    function draw() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h || nodes.length < 2) return;
      ctx.clearRect(0, 0, w, h);

      // 1 · All inter-layer connections at extreme hairline opacity
      ctx.lineWidth = 0.5;
      for (let li = 0; li < nodes.length - 1; li++) {
        nodes[li].forEach(from => {
          nodes[li + 1].forEach(to => {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.032)";
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x,   to.y);
            ctx.stroke();
          });
        });
      }

      // 2 · Advance and render signals
      sigs = sigs.filter(sg => {
        sg.t = Math.min(sg.t + sg.spd, 1);
        const from = nodes[sg.li]?.[sg.fi];
        const to   = nodes[sg.li + 1]?.[sg.ti];
        if (!from || !to) return false;

        const px = from.x + (to.x - from.x) * sg.t;
        const py = from.y + (to.y - from.y) * sg.t;

        // Soft glow halo
        const g = ctx.createRadialGradient(px, py, 0, px, py, 8);
        g.addColorStop(0, "rgba(103,232,249,0.65)");
        g.addColorStop(1, "rgba(103,232,249,0)");
        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fill();

        // Hard core
        ctx.beginPath();
        ctx.fillStyle = CYAN;
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();

        if (sg.t >= 1) {
          const dest = nodes[sg.li + 1]?.[sg.ti];
          if (dest) dest.act = 1; // activate destination node
          return false;
        }
        return true;
      });

      // 3 · Nodes — decay activation, render with glow when active
      nodes.forEach(layer => {
        layer.forEach(nd => {
          nd.act *= 0.93; // exponential decay

          if (nd.act > 0.05) {
            const g = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, 10);
            g.addColorStop(0, `rgba(103,232,249,${nd.act * 0.28})`);
            g.addColorStop(1, "rgba(103,232,249,0)");
            ctx.beginPath();
            ctx.fillStyle = g;
            ctx.arc(nd.x, nd.y, 10, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.beginPath();
          ctx.fillStyle = nd.act > 0.05
            ? `rgba(103,232,249,${0.18 + nd.act * 0.72})`
            : "rgba(255,255,255,0.18)";
          ctx.arc(nd.x, nd.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    // ── Idle signal spawner: frequency modulated by cursor proximity ────────
    function maybeSpawnIdle() {
      if (nodes.length < 2) return;
      const rect     = canvas.getBoundingClientRect();
      const cx       = rect.left + rect.width  / 2;
      const cy       = rect.top  + rect.height / 2;
      const dist     = Math.hypot(mx - cx, my - cy);
      const prox     = Math.max(0, 1 - dist / 520);   // 0 = far, 1 = touching
      const interval = Math.round(52 - prox * 28);    // 52 frames far → 24 close

      if (frame % interval === 0) {
        const li = Math.floor(Math.random() * (nodes.length - 1));
        const fi = Math.floor(Math.random() * nodes[li].length);
        const ti = Math.floor(Math.random() * nodes[li + 1].length);
        spawn(li, fi, ti);
      }
    }

    // ── Main RAF loop ───────────────────────────────────────────────────────
    function tick() {
      if (!document.hidden) {
        frame++;
        maybeSpawnIdle();
        draw();
      }
      raf = requestAnimationFrame(tick);
    }

    // ── IntersectionObserver: trigger forward pass once visible ─────────────
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !passTriggered) {
        passTriggered = true;
        io.disconnect();
        forwardPass();
      }
    }, { threshold: 0.25 });

    // ── ResizeObserver: re-layout when container resizes ────────────────────
    const ro = new ResizeObserver(() => layout());

    // ── Mouse tracking (passive — no scroll cost) ───────────────────────────
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // ── Init ─────────────────────────────────────────────────────────────────
    layout();
    ro.observe(canvas);
    io.observe(canvas);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      aria-hidden
    />
  );
}
