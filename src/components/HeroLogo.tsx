"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import LogoMark from "./LogoMark";

type HeroLogoProps = {
  className?: string;
};

type Point3 = [number, number, number];

const PATH_POINTS: Point3[] = [
  [-1.05, -0.35, 0.12],
  [-0.35, 0.38, 0.12],
  [0.22, -0.02, 0.12],
  [0.98, 0.8, 0.12],
];

function hasWebGLSupport() {
  const canvas = document.createElement("canvas");
  const context =
    canvas.getContext("webgl2") ?? canvas.getContext("webgl");
  return Boolean(context);
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);
    onChange();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onChange);
      return () => mediaQuery.removeEventListener("change", onChange);
    }

    mediaQuery.addListener(onChange);
    return () => mediaQuery.removeListener(onChange);
  }, [query]);

  return matches;
}

function Segment({
  from,
  to,
  color,
}: {
  from: Point3;
  to: Point3;
  color: string;
}) {
  const { position, quaternion, length } = useMemo(() => {
    const start = new THREE.Vector3(...from);
    const end = new THREE.Vector3(...to);
    const direction = new THREE.Vector3().subVectors(end, start);
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const rotation = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    );

    return {
      position: midpoint,
      quaternion: rotation,
      length: direction.length(),
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[0.045, 0.045, length, 14]} />
      <meshStandardMaterial color={color} metalness={0.32} roughness={0.28} />
    </mesh>
  );
}

function Chevron({
  x,
  mirrored,
  color,
}: {
  x: number;
  mirrored?: boolean;
  color: string;
}) {
  const direction = mirrored ? -1 : 1;

  return (
    <group position={[x, 0.05, 0.04]}>
      <mesh rotation={[0, 0, direction * Math.PI * 0.24]}>
        <boxGeometry args={[0.55, 0.08, 0.08]} />
        <meshStandardMaterial color={color} metalness={0.22} roughness={0.3} />
      </mesh>
      <mesh rotation={[0, 0, -direction * Math.PI * 0.24]}>
        <boxGeometry args={[0.55, 0.08, 0.08]} />
        <meshStandardMaterial color={color} metalness={0.22} roughness={0.3} />
      </mesh>
    </group>
  );
}

function LogoGeometry({ reduceMotion }: { reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (reduceMotion) {
      groupRef.current.rotation.y = 0.35;
      return;
    }

    groupRef.current.rotation.y += delta * 0.26;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.85) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <mesh rotation={[0, 0, 0.52]}>
        <torusGeometry args={[1.58, 0.1, 24, 140, 5.22]} />
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.4}
          roughness={0.36}
          transparent
          opacity={0.4}
        />
      </mesh>

      <Chevron x={-1.6} color="#d8d8d8" />
      <Chevron x={1.6} mirrored color="#d8d8d8" />

      <mesh position={[0, 0, -0.36]}>
        <circleGeometry args={[2.3, 96]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.06} />
      </mesh>

      <Segment from={PATH_POINTS[0]} to={PATH_POINTS[1]} color="#e8e8e8" />
      <Segment from={PATH_POINTS[1]} to={PATH_POINTS[2]} color="#e8e8e8" />
      <Segment from={PATH_POINTS[2]} to={PATH_POINTS[3]} color="#e8e8e8" />

      {PATH_POINTS.map((point, index) => (
        <mesh key={`${point.join("-")}-${index}`} position={point}>
          <sphereGeometry args={[0.11, 20, 20]} />
          <meshStandardMaterial
            color="#67e8f9"
            emissive="#67e8f9"
            emissiveIntensity={0.45}
            metalness={0.15}
            roughness={0.24}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroLogo({ className }: HeroLogoProps) {
  const [mounted, setMounted] = useState(false);
  const [canUseWebGL, setCanUseWebGL] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    setMounted(true);
    setCanUseWebGL(hasWebGLSupport());
  }, []);

  const show3D = mounted && isDesktop && canUseWebGL;

  return (
    <div
      className={`relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] lg:h-[360px] lg:w-[360px] ${className ?? ""}`}
      aria-label="Logo"
      role="img"
    >
      <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_50%_50%,rgba(103,232,249,0.2),rgba(103,232,249,0)_70%)] blur-2xl" />
      <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
        {show3D ? (
          <Canvas
            camera={{ fov: 34, position: [0, 0, 5] }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.75} />
            <directionalLight position={[3, 4, 4]} intensity={1.15} />
            <pointLight position={[-2, -1, 2]} intensity={1} color="#67e8f9" />
            <Float
              speed={reduceMotion ? 0 : 1.05}
              rotationIntensity={reduceMotion ? 0 : 0.2}
              floatIntensity={reduceMotion ? 0 : 0.34}
            >
              <LogoGeometry reduceMotion={reduceMotion} />
            </Float>
          </Canvas>
        ) : (
          <div className="logo-pulse flex h-full w-full items-center justify-center text-white/70">
            <LogoMark className="h-24 w-24 sm:h-28 sm:w-28" />
          </div>
        )}
      </div>
    </div>
  );
}
