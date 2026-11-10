"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

/* ─────────────── Individual Theme-Aware 3D Shapes ─────────────── */

function GlowSphere({
  position,
  color,
  speed = 1,
  distort = 0.35,
  size = 1,
  isDark = true,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  size?: number;
  isDark?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
    }
  });

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={size}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          roughness={isDark ? 0.15 : 0.08}
          metalness={isDark ? 0.65 : 0.05}
          distort={distort}
          speed={2}
          transparent
          opacity={isDark ? 0.8 : 0.6}
        />
      </mesh>
    </Float>
  );
}

function WobbleTorus({
  position,
  color,
  speed = 1,
  size = 1,
  isDark = true,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  size?: number;
  isDark?: boolean;
}) {
  return (
    <Float speed={1.2 * speed} rotationIntensity={1} floatIntensity={0.8}>
      <mesh position={position} scale={size}>
        <torusGeometry args={[1, 0.3, 32, 64]} />
        <MeshWobbleMaterial
          color={color}
          factor={0.22}
          speed={1.5}
          roughness={isDark ? 0.2 : 0.1}
          metalness={isDark ? 0.55 : 0.06}
          transparent
          opacity={isDark ? 0.75 : 0.55}
        />
      </mesh>
    </Float>
  );
}

function CrystalDodecahedron({
  position,
  color,
  speed = 1,
  size = 1,
  isDark = true,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  size?: number;
  isDark?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      ref.current.rotation.z = state.clock.elapsedTime * 0.15 * speed;
    }
  });

  return (
    <Float speed={1 * speed} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={ref} position={position} scale={size}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.08}
          metalness={isDark ? 0.4 : 0.05}
          transmission={isDark ? 0.35 : 0.65}
          thickness={1.5}
          emissive={color}
          emissiveIntensity={isDark ? 0.18 : 0.3}
          transparent
          opacity={isDark ? 0.75 : 0.6}
        />
      </mesh>
    </Float>
  );
}

function GlassOctahedron({
  position,
  color,
  speed = 1,
  size = 1,
  isDark = true,
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  size?: number;
  isDark?: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2 * speed;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.8 * speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={ref} position={position} scale={size}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.05}
          metalness={isDark ? 0.3 : 0.04}
          transmission={isDark ? 0.55 : 0.75}
          thickness={1.8}
          emissive={color}
          emissiveIntensity={isDark ? 0.2 : 0.32}
          transparent
          opacity={isDark ? 0.65 : 0.55}
        />
      </mesh>
    </Float>
  );
}

/* ─────────────── Scene Lighting Setup ─────────────── */

function StudioLighting({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.65 : 1.4} />
      <directionalLight
        position={[6, 8, 5]}
        intensity={isDark ? 0.95 : 1.6}
        color={isDark ? "#c084fc" : "#ffffff"}
      />
      <directionalLight
        position={[-6, -4, -3]}
        intensity={isDark ? 0.5 : 1.0}
        color={isDark ? "#38bdf8" : "#e0f2fe"}
      />
      <pointLight
        position={[0, 5, 2]}
        intensity={isDark ? 0.75 : 1.3}
        color="#a855f7"
      />
      <pointLight
        position={[-4, -2, 3]}
        intensity={isDark ? 0.6 : 1.2}
        color="#00F0FF"
      />
      <pointLight
        position={[4, -2, 3]}
        intensity={isDark ? 0.55 : 1.1}
        color="#f43f5e"
      />
    </>
  );
}

/* ─────────────── Scene Presets ─────────────── */

function HeroScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <StudioLighting isDark={isDark} />
      {/* Kept outside central illustration to keep face, gear, and console pristine */}
      <GlowSphere position={[-4.8, 2.4, -2]} color="#8b5cf6" speed={0.7} distort={0.35} size={0.9} isDark={isDark} />
      <WobbleTorus position={[4.8, 2.2, -2]} color="#06b6d4" speed={0.6} size={0.85} isDark={isDark} />
      <CrystalDodecahedron position={[-4.6, -2.4, -2]} color="#ec4899" speed={0.6} size={0.75} isDark={isDark} />
      <GlassOctahedron position={[4.6, -2.2, -2]} color="#a78bfa" speed={0.9} size={0.65} isDark={isDark} />
    </>
  );
}

function AboutScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <StudioLighting isDark={isDark} />
      <GlowSphere position={[4.2, 1.8, -2]} color="#8b5cf6" speed={0.5} distort={0.25} size={0.95} isDark={isDark} />
      <CrystalDodecahedron position={[-4.2, -1.8, -2.5]} color="#10b981" speed={0.6} size={0.8} isDark={isDark} />
      <GlassOctahedron position={[4.0, -2.2, -3]} color="#6366f1" speed={0.8} size={0.6} isDark={isDark} />
    </>
  );
}

function ServicesScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <StudioLighting isDark={isDark} />
      <WobbleTorus position={[-4.2, 1.5, -2]} color="#a855f7" speed={0.6} size={0.9} isDark={isDark} />
      <GlowSphere position={[4.2, 1.8, -2]} color="#f59e0b" speed={0.5} distort={0.3} size={0.85} isDark={isDark} />
      <CrystalDodecahedron position={[0, -2.6, -2]} color="#06b6d4" speed={0.5} size={0.65} isDark={isDark} />
    </>
  );
}

function ContactScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <StudioLighting isDark={isDark} />
      <GlowSphere position={[4.2, 1.5, -2]} color="#06b6d4" speed={0.4} distort={0.25} size={0.85} isDark={isDark} />
      <WobbleTorus position={[-4.2, -1.2, -2]} color="#8b5cf6" speed={0.5} size={0.75} isDark={isDark} />
      <GlassOctahedron position={[2.5, 2.5, -3]} color="#ec4899" speed={0.7} size={0.55} isDark={isDark} />
    </>
  );
}

function FeaturesScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <StudioLighting isDark={isDark} />
      <GlowSphere position={[-4.2, 1.8, -2]} color="#ec4899" speed={0.6} distort={0.35} size={0.95} isDark={isDark} />
      <CrystalDodecahedron position={[4.2, -1.6, -2]} color="#a78bfa" speed={0.5} size={0.8} isDark={isDark} />
      <WobbleTorus position={[0, 2.6, -3]} color="#06b6d4" speed={0.7} size={0.65} isDark={isDark} />
    </>
  );
}

function TestimonialsScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <StudioLighting isDark={isDark} />
      <GlowSphere position={[4.0, 1.2, -2]} color="#10b981" speed={0.5} distort={0.25} size={0.85} isDark={isDark} />
      <GlassOctahedron position={[-4.0, 1.8, -2.5]} color="#f59e0b" speed={0.6} size={0.6} isDark={isDark} />
      <CrystalDodecahedron position={[0, -2.4, -3]} color="#8b5cf6" speed={0.6} size={0.7} isDark={isDark} />
    </>
  );
}

function DownloadScene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <StudioLighting isDark={isDark} />
      <WobbleTorus position={[4.2, 1.6, -2]} color="#06b6d4" speed={0.6} size={0.85} isDark={isDark} />
      <GlowSphere position={[-4.2, -1.2, -2]} color="#c084fc" speed={0.5} distort={0.3} size={0.8} isDark={isDark} />
      <GlassOctahedron position={[0, 2.4, -3]} color="#f472b6" speed={0.7} size={0.55} isDark={isDark} />
    </>
  );
}

/* ─────────────── Exported Scenes Map ─────────────── */

const SCENES: Record<string, React.FC<{ isDark: boolean }>> = {
  hero: HeroScene,
  about: AboutScene,
  services: ServicesScene,
  contact: ContactScene,
  features: FeaturesScene,
  testimonials: TestimonialsScene,
  download: DownloadScene,
};

/* ─────────────── Main Exported Component ─────────────── */

interface FloatingGeometryProps {
  scene?: string;
  className?: string;
}

export default function FloatingGeometry({ scene = "hero", className = "" }: FloatingGeometryProps) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const SceneComponent = SCENES[scene] || HeroScene;

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <SceneComponent isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  );
}
