import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const TRACE = '#4A7C59';
const TRACE_BRIGHT = '#6FA57E';
const SOLDER = '#D4A24C';
const DARK = '#0B1210';
const PANEL = '#141F1A';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function WorkbenchObject({ position, label, targetId, children, floatSpeed = 1 }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef();
  const t0 = useMemo(() => Math.random() * 10, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * floatSpeed + t0;
    groupRef.current.position.y = position[1] + Math.sin(t) * 0.05;
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
            fontFamily: "'Space Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: DARK,
            background: SOLDER,
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

function RaspberryPiBoard(hovered) {
  return (
    <group scale={0.9}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.06, 1]} />
        <meshStandardMaterial color={hovered ? TRACE_BRIGHT : TRACE} roughness={0.5} metalness={0.1} />
      </mesh>
      {[-0.55, -0.25, 0.05, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.09, -0.35]}>
          <boxGeometry args={[0.06, 0.1, 0.4]} />
          <meshStandardMaterial color={SOLDER} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0.4, 0.12, 0.25]}>
        <boxGeometry args={[0.3, 0.15, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function Laptop(hovered) {
  return (
    <group scale={0.9}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.06, 0.85]} />
        <meshStandardMaterial color="#3a3f3a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.42, -0.4]} rotation={[-0.15, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.75, 0.04]} />
        <meshStandardMaterial color="#2a2f2a" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.42, -0.38]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[1.05, 0.6]} />
        <meshStandardMaterial
          color={hovered ? TRACE_BRIGHT : TRACE}
          emissive={hovered ? TRACE_BRIGHT : TRACE}
          emissiveIntensity={hovered ? 0.8 : 0.4}
        />
      </mesh>
    </group>
  );
}

function Notebook(hovered) {
  return (
    <group scale={0.9} rotation={[0, 0.3, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.75, 0.08, 1]} />
        <meshStandardMaterial color={hovered ? SOLDER : '#8a7355'} roughness={0.8} />
      </mesh>
      <mesh position={[0.32, 0.045, 0]}>
        <boxGeometry args={[0.06, 0.09, 1]} />
        <meshStandardMaterial color={DARK} />
      </mesh>
    </group>
  );
}

function Mug(hovered) {
  return (
    <group scale={0.9}>
      <mesh castShadow>
        <cylinderGeometry args={[0.28, 0.24, 0.5, 24]} />
        <meshStandardMaterial color={hovered ? TRACE_BRIGHT : PANEL} roughness={0.4} />
      </mesh>
      <mesh position={[0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.14, 0.045, 12, 24]} />
        <meshStandardMaterial color={hovered ? TRACE_BRIGHT : PANEL} roughness={0.4} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, -0.2, 0);
  }, [camera]);
  return null;
}

function Desk() {
  return (
    <mesh position={[0, -0.35, 0]} receiveShadow>
      <boxGeometry args={[6, 0.15, 3]} />
      <meshStandardMaterial color="#1a2620" roughness={0.9} />
    </mesh>
  );
}

function CircuitGrid() {
  const lines = useMemo(() => {
    const arr = [];
    for (let i = -4; i <= 4; i++) {
      arr.push(<line key={`h${i}`} />);
    }
    return arr;
  }, []);
  return null; // reserved for future subtle grid texture
}

export default function Scene({ isMobile }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: isMobile ? [0, 1.8, 5.5] : [0, 1.6, 4.6], fov: isMobile ? 42 : 38 }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={[DARK]} />
      <CameraRig />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-2, 1.5, -1]} intensity={0.4} color={TRACE} />
      <pointLight position={[2, 1, 2]} intensity={0.3} color={SOLDER} />

      <Desk />

      <WorkbenchObject position={[-1.5, -0.15, 0.3]} label="Projects" targetId="projects" floatSpeed={0.8}>
        {RaspberryPiBoard}
      </WorkbenchObject>

      <WorkbenchObject position={[0.9, -0.12, -0.3]} label="Skills" targetId="skills" floatSpeed={0.6}>
        {Laptop}
      </WorkbenchObject>

      <WorkbenchObject position={[-0.4, -0.18, -0.7]} label="About" targetId="about" floatSpeed={1.1}>
        {Notebook}
      </WorkbenchObject>

      <WorkbenchObject position={[2, -0.1, 0.6]} label="Contact" targetId="contact" floatSpeed={0.9}>
        {Mug}
      </WorkbenchObject>
    </Canvas>
  );
}
