"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const N = 65;
const BOUND = 8;
const CONNECT_DIST = 3.4;
const MAX_EDGES = (N * (N - 1)) / 2;

function hasWebGL() {
  if (typeof document === "undefined") return false;
  const c = document.createElement("canvas");
  return Boolean(c.getContext("webgl2") ?? c.getContext("webgl"));
}

function Network() {
  const groupRef = useRef<THREE.Group>(null);
  const ptGeoRef = useRef<THREE.BufferGeometry>(null);
  const lnGeoRef = useRef<THREE.BufferGeometry>(null);

  const { pos, vel } = useMemo(() => {
    const pos = new Float32Array(N * 3);
    const vel = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * BOUND * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * BOUND * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * BOUND * 2;
      vel[i * 3]     = (Math.random() - 0.5) * 0.013;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.013;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.013;
    }
    return { pos, vel };
  }, []);

  const linePosArr = useMemo(() => new Float32Array(MAX_EDGES * 6), []);

  useFrame(({ clock }) => {
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      pos[i3]     += vel[i3];
      pos[i3 + 1] += vel[i3 + 1];
      pos[i3 + 2] += vel[i3 + 2];
      if (Math.abs(pos[i3])     > BOUND) vel[i3]     *= -1;
      if (Math.abs(pos[i3 + 1]) > BOUND) vel[i3 + 1] *= -1;
      if (Math.abs(pos[i3 + 2]) > BOUND) vel[i3 + 2] *= -1;
    }

    const ptGeo = ptGeoRef.current;
    if (ptGeo) {
      (ptGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    }

    let edgeCount = 0;
    const cd2 = CONNECT_DIST * CONNECT_DIST;
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const i3 = i * 3, j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        if (dx * dx + dy * dy + dz * dz < cd2) {
          const idx = edgeCount * 6;
          linePosArr[idx]     = pos[i3];     linePosArr[idx + 1] = pos[i3 + 1]; linePosArr[idx + 2] = pos[i3 + 2];
          linePosArr[idx + 3] = pos[j3]; linePosArr[idx + 4] = pos[j3 + 1]; linePosArr[idx + 5] = pos[j3 + 2];
          edgeCount++;
        }
      }
    }

    const lnGeo = lnGeoRef.current;
    if (lnGeo) {
      (lnGeo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      lnGeo.setDrawRange(0, edgeCount * 2);
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.045;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.022) * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={ptGeoRef}>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          color="#ffffff"
          transparent
          opacity={0.35}
          sizeAttenuation
        />
      </points>

      <lineSegments>
        <bufferGeometry ref={lnGeoRef}>
          <bufferAttribute attach="attributes-position" args={[linePosArr, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.08} />
      </lineSegments>
    </group>
  );
}

export default function NeuralBackground3D() {
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(false);

  useEffect(() => {
    setReady(true);
    setWebgl(hasWebGL());
  }, []);

  if (!ready || !webgl) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.45 }}
      aria-hidden
    >
      <Canvas
        camera={{ fov: 58, position: [0, 0, 14] }}
        dpr={[1, 1.4]}
        gl={{ antialias: false, alpha: true, powerPreference: "default" }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Network />
      </Canvas>
    </div>
  );
}
