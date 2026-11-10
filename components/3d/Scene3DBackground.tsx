"use client";

import React, { useRef, Suspense, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleField({ count = 80, isDark = true }: { count?: number; isDark?: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={isDark ? "#a78bfa" : "#8b5cf6"}
        transparent
        opacity={isDark ? 0.6 : 0.4}
        sizeAttenuation
      />
    </points>
  );
}

function HeroOrb({ isDark = true }: { isDark?: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={ref} scale={1.8}>
        <icosahedronGeometry args={[1, 6]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          roughness={isDark ? 0.12 : 0.08}
          metalness={isDark ? 0.7 : 0.05}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={isDark ? 0.6 : 0.45}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3DBackground({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 ${className}`}>
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={isDark ? 0.5 : 1.3} />
          <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.5} color={isDark ? "#a78bfa" : "#ffffff"} />
          <pointLight position={[-4, 3, -3]} intensity={isDark ? 0.5 : 1.2} color="#22d3ee" />

          <HeroOrb isDark={isDark} />
          <ParticleField count={120} isDark={isDark} />
        </Canvas>
      </Suspense>
    </div>
  );
}
