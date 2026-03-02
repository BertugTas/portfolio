"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Vec3 = [number, number, number];

// ── Neural network topology ────────────────────────────────────────────────
// 4 layers: input(3) → hidden(5) → hidden(5) → output(3)
// Each layer has slight X jitter for organic feel
const LAYERS: Vec3[][] = [
  [
    [-0.08,  0.70, -1.5],
    [ 0.08,  0.00, -1.5],
    [-0.08, -0.70, -1.5],
  ],
  [
    [ 0.12,  1.10, -0.4],
    [-0.12,  0.55, -0.4],
    [ 0.00,  0.00, -0.4],
    [ 0.12, -0.55, -0.4],
    [-0.12, -1.10, -0.4],
  ],
  [
    [-0.12,  1.10,  0.7],
    [ 0.12,  0.55,  0.7],
    [ 0.00,  0.00,  0.7],
    [-0.12, -0.55,  0.7],
    [ 0.12, -1.10,  0.7],
  ],
  [
    [ 0.08,  0.70,  1.8],
    [-0.08,  0.00,  1.8],
    [ 0.08, -0.70,  1.8],
  ],
];

const NODES: Vec3[] = LAYERS.flat();

// Nodes that glow cyan (highlighted / "active" in the network)
const ACTIVE = new Set([0, 2, 5, 8, 11, 14, 15, 17]);

// Build edges between every node in layer L and every node in layer L+1
const EDGES: [number, number][] = [];
let base = 0;
for (let l = 0; l < LAYERS.length - 1; l++) {
  const nextBase = base + LAYERS[l].length;
  for (let a = 0; a < LAYERS[l].length; a++) {
    for (let b = 0; b < LAYERS[l + 1].length; b++) {
      EDGES.push([base + a, nextBase + b]);
    }
  }
  base = nextBase;
}

// ── Sub-components ─────────────────────────────────────────────────────────
function Connections() {
  const geo = useMemo(() => {
    const pos: number[] = [];
    for (const [a, b] of EDGES) {
      pos.push(...NODES[a], ...NODES[b]);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    return g;
  }, []);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.07} />
    </lineSegments>
  );
}

function NodeSpheres() {
  const pulseMeshes = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    pulseMeshes.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = 1 + 0.18 * Math.sin(t * 1.6 + i * 1.1);
      mesh.scale.setScalar(s);
    });
  });

  return (
    <>
      {NODES.map((pos, i) => {
        const active = ACTIVE.has(i);
        return (
          <mesh
            key={i}
            position={pos}
            ref={(el) => {
              if (active) pulseMeshes.current[i] = el;
            }}
          >
            <sphereGeometry args={[active ? 0.095 : 0.062, 18, 18]} />
            <meshStandardMaterial
              color={active ? "#67e8f9" : "#c8c8c8"}
              emissive={active ? "#67e8f9" : "#000000"}
              emissiveIntensity={active ? 1.2 : 0}
              metalness={0.2}
              roughness={0.25}
            />
          </mesh>
        );
      })}
    </>
  );
}

function NeuralNet({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    if (reduceMotion) {
      groupRef.current.rotation.y = 0.45;
      return;
    }
    groupRef.current.rotation.y += delta * 0.28;
    groupRef.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.55) * 0.07;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Connections />
      <NodeSpheres />
    </group>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
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

// ── Export ─────────────────────────────────────────────────────────────────
export default function HeroLogo() {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
  }, []);

  if (!mounted || !isDesktop || !webgl) return null;

  return (
    <div className="h-[360px] w-[360px]" aria-hidden>
      <Canvas
        camera={{ fov: 38, position: [0, 0, 5.5] }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 4]} intensity={1.0} />
        <pointLight position={[-2, -1, 2]} intensity={1.2} color="#67e8f9" />
        <NeuralNet reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}
