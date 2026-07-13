import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/* WindStreaks: additive points flowing on +z, sells speed (drones,    */
/* paragliding). Port of the old WindParticles with scalable count.    */
/* ------------------------------------------------------------------ */
export function WindStreaks({ count = 100, color = '#ffffff', opacity = 0.18 }: {
  count?: number;
  color?: string;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speed[i] = 0.2 + Math.random() * 0.45;
    }
    return { pos, speed };
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += particles.speed[i];
      if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={particles.pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={opacity} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* Snowfall: falling points with per-particle sway (skiing).           */
/* ------------------------------------------------------------------ */
export function Snowfall({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      // Keep flakes away from the camera (z <= 2) so none render as giant squares
      pos[i * 3 + 2] = Math.random() * 12 - 10;
      speed[i] = 0.012 + Math.random() * 0.02;
      phase[i] = Math.random() * Math.PI * 2;
    }
    return { pos, speed, phase };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] -= data.speed[i];
      positions[i * 3] += Math.sin(t * 0.8 + data.phase[i]) * 0.003;
      if (positions[i * 3 + 1] < -2.5) positions[i * 3 + 1] = 8;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={data.pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#f8fafc" transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* ScanLine: thin emissive plane sweeping up through a volume          */
/* (3D printing "print in progress").                                  */
/* ------------------------------------------------------------------ */
export function ScanLine({
  color = '#22d3ee',
  width = 3.6,
  minY = -1.1,
  maxY = 1.3,
  speed = 0.35,
}: {
  color?: string;
  width?: number;
  minY?: number;
  maxY?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const range = maxY - minY;
    meshRef.current.position.y = minY + ((t * speed) % range);
  });

  // Slab is wider than the model so it reads as a clean glowing scan slice
  // wrapping the body, never as clipped fragments.
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[width, 0.015, width]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.2}
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* NavLights: blinking red/green aircraft strobes (drone). Parent this */
/* inside the model group so it follows the flight path.               */
/* ------------------------------------------------------------------ */
export function NavLights({ offset = 0.28 }: { offset?: number }) {
  const redRef = useRef<THREE.MeshStandardMaterial>(null);
  const greenRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Aircraft-style double strobe: sharp on, long off
    const strobe = (phase: number) => (Math.sin(t * 6 + phase) > 0.85 ? 4 : 0.2);
    if (redRef.current) redRef.current.emissiveIntensity = strobe(0);
    if (greenRef.current) greenRef.current.emissiveIntensity = strobe(Math.PI);
  });

  return (
    <group>
      <mesh position={[-offset, 0.05, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial ref={redRef} color="#7f1d1d" emissive="#ef4444" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[offset, 0.05, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial ref={greenRef} color="#14532d" emissive="#22c55e" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* SunDisc: emissive sphere; bloom turns it into a soft glare          */
/* (paragliding, surfing sunset).                                      */
/* ------------------------------------------------------------------ */
export function SunDisc({
  position = [0, 1.5, -12] as [number, number, number],
  color = '#fde68a',
  radius = 0.6,
  intensity = 3,
}: {
  position?: [number, number, number];
  color?: string;
  radius?: number;
  intensity?: number;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={intensity} toneMapped={false} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* DustMotes: slow-drifting faint particles (PC building ambience).    */
/* ------------------------------------------------------------------ */
export function DustMotes({ count = 30, color = '#fca5a5' }: { count?: number; color?: string }) {
  const meshRef = useRef<THREE.Points>(null);
  const data = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phase = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      phase[i] = Math.random() * Math.PI * 2;
    }
    return { pos, phase };
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += Math.sin(t * 0.3 + data.phase[i]) * 0.0015;
      positions[i * 3] += Math.cos(t * 0.2 + data.phase[i]) * 0.001;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={data.pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color={color} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/* RgbRig: hue-cycling point light + two synced emissive LED bars      */
/* (PC building gaming-rig wash).                                      */
/* ------------------------------------------------------------------ */
export function RgbRig() {
  const lightRef = useRef<THREE.PointLight>(null);
  const barLeft = useRef<THREE.MeshStandardMaterial>(null);
  const barRight = useRef<THREE.MeshStandardMaterial>(null);
  const hueColor = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    hueColor.setHSL((t * 0.03) % 1, 0.9, 0.5);
    if (lightRef.current) lightRef.current.color.copy(hueColor);
    if (barLeft.current) barLeft.current.emissive.copy(hueColor);
    if (barRight.current) barRight.current.emissive.copy(hueColor);
  });

  return (
    <group>
      <pointLight ref={lightRef} position={[0, 2, 3]} intensity={12} distance={12} />
      <mesh position={[-2.4, -1.3, 0.5]}>
        <boxGeometry args={[0.06, 0.06, 2.4]} />
        <meshStandardMaterial ref={barLeft} color="#111" emissive="#ef4444" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      <mesh position={[2.4, -1.3, 0.5]}>
        <boxGeometry args={[0.06, 0.06, 2.4]} />
        <meshStandardMaterial ref={barRight} color="#111" emissive="#ef4444" emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      {/* Faint emissive floor grid, fades into fog */}
      <gridHelper args={[24, 36, '#7f1d1d', '#450a0a']} position={[0, -1.55, 0]} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* PlatformRing: dark platform + emissive ring under a model           */
/* (3D printing display pedestal).                                     */
/* ------------------------------------------------------------------ */
export function PlatformRing({ color = '#22d3ee', radius = 2.2, y = -1.55 }: {
  color?: string;
  radius?: number;
  y?: number;
}) {
  return (
    <group position={[0, y, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 48]} />
        <meshStandardMaterial color="#0f172a" roughness={0.85} metalness={0.2} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <ringGeometry args={[radius - 0.08, radius, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* SnowSlope: static low-poly displaced plane (skiing piste).          */
/* Displacement computed once; flatShading gives the low-poly look.   */
/* ------------------------------------------------------------------ */
export function SnowSlope() {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(24, 24, 48, 48);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const bump =
        Math.sin(x * 0.5) * Math.cos(y * 0.4) * 0.35 +
        Math.sin(x * 1.3 + 2) * Math.cos(y * 1.1) * 0.15 +
        Math.sin(x * 2.7) * 0.05;
      pos.setZ(i, bump);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2.35, 0, 0.15]} position={[0, -2.1, -2]}>
      <meshStandardMaterial color="#f1f5f9" roughness={0.9} metalness={0} flatShading />
    </mesh>
  );
}
