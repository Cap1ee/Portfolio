'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

/* ─── Color palette for 3D objects (dark theme only) ─── */
const PALETTE = {
  bg: new THREE.Color('#12100D'),
  desk: new THREE.Color('#221C14'),
  trace: new THREE.Color('#C97B4A'),
  traceBright: new THREE.Color('#E8933A'),
  solder: new THREE.Color('#D9A868'),
  panel: new THREE.Color('#2E2820'),
  laptopBase: new THREE.Color('#3a352e'),
  laptopScreen: new THREE.Color('#C97B4A'),
  notebookCover: new THREE.Color('#8a7355'),
  mug: new THREE.Color('#6b5f52'),
  chip: new THREE.Color('#1a1a1a'),
  ambientIntensity: 0.3,
  dirIntensity: 0.5,
  accentIntensity: 1.1,
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ─── Shared geometries (created once) ─── */
const geo = {
  smallBox: new THREE.BoxGeometry(0.06, 0.1, 0.4),
  chipBox: new THREE.BoxGeometry(0.3, 0.15, 0.3),
  boardBox: new THREE.BoxGeometry(1.4, 0.06, 1),
  laptopBaseBox: new THREE.BoxGeometry(1.2, 0.06, 0.85),
  laptopScreenBox: new THREE.BoxGeometry(1.2, 0.75, 0.04),
  screenPlane: new THREE.PlaneGeometry(1.05, 0.6),
  notebookBox: new THREE.BoxGeometry(0.75, 0.08, 1),
  notebookSpine: new THREE.BoxGeometry(0.06, 0.09, 1),
  mugCyl: new THREE.CylinderGeometry(0.28, 0.24, 0.5, 16),
  mugHandle: new THREE.TorusGeometry(0.14, 0.045, 8, 16),
  deskBox: new THREE.BoxGeometry(6, 0.15, 3),
};

/* ─── Workbench Object ─── */
function WorkbenchObject({
  position,
  label,
  targetId,
  children,
  floatSpeed = 1,
}: {
  position: [number, number, number];
  label: string;
  targetId: string;
  children: (hovered: boolean) => React.ReactNode;
  floatSpeed?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const t0 = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * floatSpeed + t0;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.04;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); scrollToId(targetId); }}
    >
      {children(hovered)}
      {hovered && (
        <Html position={[0, 0.9, 0]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div style={{
            fontFamily: "var(--font-geist-mono), 'Space Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--p-bg)',
            background: 'var(--p-solder)',
            padding: '4px 10px',
            borderRadius: '3px',
            whiteSpace: 'nowrap',
          }}>
            {label} →
          </div>
        </Html>
      )}
    </group>
  );
}

/* ─── Scene Content ─── */
function SceneContent({ isMobile }: { isMobile: boolean }) {
  const palette = PALETTE;

  return (
    <group scale={isMobile ? 0.68 : 1}>
      <color attach="background" args={[palette.bg]} />
      <fog attach="fog" args={[palette.bg, 7, 14]} />

      <ambientLight intensity={palette.ambientIntensity} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={palette.dirIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-2, 1.5, -1]} intensity={0.2} color={palette.trace} />
      {/* Static warm accent light (previously cast by the desk lamp) — keeps the
          workbench composition lit now that the lamp object is gone. */}
      <pointLight position={[2.0, 1.6, -0.6]} intensity={palette.accentIntensity} color="#FFF5E0" />

      {/* Desk */}
      <mesh position={[0, -0.35, 0]} receiveShadow geometry={geo.deskBox}>
        <meshStandardMaterial color={palette.desk} roughness={0.9} />
      </mesh>

      {/* ─── Raspberry Pi (Projects) ─── */}
      <WorkbenchObject position={[-1.5, -0.15, 0.3]} label="Projects" targetId="projects" floatSpeed={0.8}>
        {(hovered) => (
          <group scale={0.9}>
            <mesh castShadow receiveShadow geometry={geo.boardBox}>
              <meshStandardMaterial
                color={hovered ? palette.traceBright : palette.trace}
                roughness={0.5} metalness={0.1}
              />
            </mesh>
            {[-0.55, -0.25, 0.05, 0.35].map((x, i) => (
              <mesh key={i} position={[x, 0.09, -0.35]} geometry={geo.smallBox}>
                <meshStandardMaterial color={palette.solder} metalness={0.6} roughness={0.3} />
              </mesh>
            ))}
            <mesh position={[0.4, 0.12, 0.25]} geometry={geo.chipBox}>
              <meshStandardMaterial color={palette.chip} />
            </mesh>
          </group>
        )}
      </WorkbenchObject>

      {/* ─── Laptop (Skills) ─── */}
      <WorkbenchObject position={[0.9, -0.12, -0.3]} label="Skills" targetId="skills" floatSpeed={0.6}>
        {(hovered) => (
          <group scale={0.9}>
            <mesh position={[0, 0, 0]} castShadow geometry={geo.laptopBaseBox}>
              <meshStandardMaterial color={palette.laptopBase} roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.42, -0.4]} rotation={[-0.15, 0, 0]} castShadow geometry={geo.laptopScreenBox}>
              <meshStandardMaterial color={palette.laptopBase} roughness={0.6} />
            </mesh>
            <mesh position={[0, 0.42, -0.38]} rotation={[-0.15, 0, 0]} geometry={geo.screenPlane}>
              <meshStandardMaterial
                color={hovered ? palette.traceBright : palette.laptopScreen}
                emissive={hovered ? palette.traceBright : palette.laptopScreen}
                emissiveIntensity={hovered ? 0.8 : 0.4}
              />
            </mesh>
          </group>
        )}
      </WorkbenchObject>

      {/* ─── Notebook (About) ─── */}
      <WorkbenchObject position={[-0.4, -0.18, -0.7]} label="About" targetId="about" floatSpeed={1.1}>
        {(hovered) => (
          <group scale={0.9} rotation={[0, 0.3, 0]}>
            <mesh castShadow geometry={geo.notebookBox}>
              <meshStandardMaterial
                color={hovered ? palette.solder : palette.notebookCover}
                roughness={0.8}
              />
            </mesh>
            <mesh position={[0.32, 0.045, 0]} geometry={geo.notebookSpine}>
              <meshStandardMaterial color={palette.trace} />
            </mesh>
          </group>
        )}
      </WorkbenchObject>

      {/* ─── Mug (Contact) ─── */}
      <WorkbenchObject position={[1.8, -0.1, 0.7]} label="Contact" targetId="contact" floatSpeed={0.9}>
        {(hovered) => (
          <group scale={0.9}>
            <mesh castShadow geometry={geo.mugCyl}>
              <meshStandardMaterial
                color={hovered ? palette.traceBright : palette.mug}
                roughness={0.4}
              />
            </mesh>
            <mesh position={[0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]} geometry={geo.mugHandle}>
              <meshStandardMaterial color={hovered ? palette.traceBright : palette.mug} roughness={0.4} />
            </mesh>
          </group>
        )}
      </WorkbenchObject>
    </group>
  );
}

/* ─── Main Scene (exported, dynamically imported) ─── */
export default function Scene({ isMobile }: { isMobile: boolean }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{
        position: isMobile ? [0, 1.9, 6.4] : [0, 1.6, 4.6],
        fov: isMobile ? 45 : 38,
      }}
      style={{ width: '100%', height: '100%' }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
        powerPreference: 'high-performance',
      }}
    >
      <PerformanceMonitor>
        <SceneContent isMobile={isMobile} />
      </PerformanceMonitor>
    </Canvas>
  );
}