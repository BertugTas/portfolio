"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// ── Constants ────────────────────────────────────────────────────────────────
const N        = 620;
const RADIUS   = 1.85;
const REPEL_R  = 1.05;
const REPEL_F  = 0.058;
const SPRING_K = 0.031;
const DAMP     = 0.865;

// ── Fibonacci sphere (evenly distributed points) ─────────────────────────────
function makeSphere(n: number, r: number): Float32Array {
  const pos = new Float32Array(n * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y   = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(Math.max(0, 1 - y * y));
    const t   = phi * i;
    pos[i * 3]     = Math.cos(t) * rad * r;
    pos[i * 3 + 1] = y * r;
    pos[i * 3 + 2] = Math.sin(t) * rad * r;
  }
  return pos;
}

// ── Vertex colours: ~1/7 cyan, rest soft-white ───────────────────────────────
function makeColors(n: number): Float32Array {
  const c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    if (i % 7 === 0) {
      c[i * 3] = 0.40; c[i * 3 + 1] = 0.91; c[i * 3 + 2] = 0.97; // #67e8f9
    } else {
      c[i * 3] = 0.85; c[i * 3 + 1] = 0.85; c[i * 3 + 2] = 0.85;
    }
  }
  return c;
}

// ── Particle simulation ───────────────────────────────────────────────────────
function Particles({ explodeCount }: { explodeCount: number }) {
  const { camera, gl } = useThree();
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const origin  = useMemo(() => makeSphere(N, RADIUS), []);
  const colors  = useMemo(() => makeColors(N), []);
  const initPos = useMemo(() => new Float32Array(origin), [origin]);

  const cur          = useRef(new Float32Array(origin));
  const vel          = useRef(new Float32Array(N * 3));
  const mPos         = useRef(new THREE.Vector3(0, 0, -99));
  const prevExplode  = useRef(0);

  // Project mouse onto z = 0 plane in world space
  useEffect(() => {
    const canvas = gl.domElement;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width)  *  2 - 1;
      const ny = -((e.clientY - rect.top)  / rect.height) *  2 + 1;
      const ray = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
      ray.sub(camera.position).normalize();
      const t = -camera.position.z / ray.z;
      mPos.current.copy(camera.position).addScaledVector(ray, t);
    };
    canvas.addEventListener("mousemove", onMove);
    return () => canvas.removeEventListener("mousemove", onMove);
  }, [camera, gl]);

  // Explode on click
  useEffect(() => {
    if (explodeCount === prevExplode.current) return;
    prevExplode.current = explodeCount;
    const v = vel.current, c = cur.current;
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      const len = Math.sqrt(c[i3] ** 2 + c[i3 + 1] ** 2 + c[i3 + 2] ** 2) || 1;
      const str = 0.22 + Math.random() * 0.26;
      v[i3]     += (c[i3]     / len) * str;
      v[i3 + 1] += (c[i3 + 1] / len) * str;
      v[i3 + 2] += (c[i3 + 2] / len) * str;
    }
  }, [explodeCount]);

  useFrame(({ clock }) => {
    const geo = geoRef.current;
    if (!geo) return;

    const angle = clock.elapsedTime * 0.16;
    const cosA  = Math.cos(angle);
    const sinA  = Math.sin(angle);
    const c     = cur.current;
    const v     = vel.current;
    const m     = mPos.current;

    for (let i = 0; i < N; i++) {
      const i3 = i * 3;

      // Rotate home position around Y (gives slow auto-rotation)
      const ox = origin[i3], oz = origin[i3 + 2];
      const hx =  ox * cosA + oz * sinA;
      const hy =  origin[i3 + 1];
      const hz = -ox * sinA + oz * cosA;

      // Mouse repulsion
      const dx = c[i3] - m.x, dy = c[i3 + 1] - m.y, dz = c[i3 + 2] - m.z;
      const d2 = dx * dx + dy * dy + dz * dz;
      if (d2 < REPEL_R * REPEL_R && d2 > 1e-5) {
        const d = Math.sqrt(d2);
        const f = REPEL_F * (1 - d / REPEL_R);
        v[i3]     += (dx / d) * f;
        v[i3 + 1] += (dy / d) * f;
        v[i3 + 2] += (dz / d) * f;
      }

      // Spring toward rotating home
      v[i3]     += (hx - c[i3])     * SPRING_K;
      v[i3 + 1] += (hy - c[i3 + 1]) * SPRING_K;
      v[i3 + 2] += (hz - c[i3 + 2]) * SPRING_K;

      // Damping + integrate
      v[i3]     *= DAMP; c[i3]     += v[i3];
      v[i3 + 1] *= DAMP; c[i3 + 1] += v[i3 + 1];
      v[i3 + 2] *= DAMP; c[i3 + 2] += v[i3 + 2];
    }

    const attr = geo.attributes.position as THREE.BufferAttribute;
    (attr.array as Float32Array).set(c);
    attr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[initPos, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,  3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.027}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation
      />
    </points>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function hasWebGL() {
  if (typeof document === "undefined") return false;
  const c = document.createElement("canvas");
  return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
}

function useMediaQuery(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, [q]);
  return m;
}

// ── Export ────────────────────────────────────────────────────────────────────
export default function HeroLogo() {
  const [mounted, setMounted] = useState(false);
  const [webgl,   setWebgl]   = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [explode, setExplode] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMounted(true);
      setWebgl(hasWebGL());
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!mounted || !isDesktop || !webgl) return null;

  return (
    <div
      className="w-full h-full cursor-pointer select-none"
      onClick={() => setExplode((n) => n + 1)}
      aria-hidden
    >
      <Canvas
        camera={{ fov: 42, position: [0, 0, 5.5] }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Particles explodeCount={explode} />
      </Canvas>
    </div>
  );
}
