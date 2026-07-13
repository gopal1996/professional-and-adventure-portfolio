import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural Surfing scene: an animated low-poly ocean, a surfboard that
 * genuinely rides the wave function, and a sunset glare at the horizon.
 */

// Shared wave height function so the board and ocean agree.
function waveHeight(x: number, z: number, t: number): number {
  return (
    0.25 * Math.sin(x * 0.8 + t * 1.2) +
    0.15 * Math.sin(z * 1.3 + t * 0.8) +
    0.07 * Math.sin((x + z) * 2 + t * 2)
  );
}

function Ocean({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const segments = isMobile ? 32 : 64;
  const frameSkip = useRef(0);

  const { geometry, baseXZ } = useMemo(() => {
    const geo = new THREE.PlaneGeometry(24, 24, segments, segments);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    const base = new Float32Array(pos.count * 2);
    for (let i = 0; i < pos.count; i++) {
      base[i * 2] = pos.getX(i);
      base[i * 2 + 1] = pos.getZ(i);
    }
    return { geometry: geo, baseXZ: base };
  }, [segments]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, waveHeight(baseXZ[i * 2], baseXZ[i * 2 + 1], t));
    }
    pos.needsUpdate = true;
    // Normals every frame on desktop, every 3rd on mobile
    frameSkip.current += 1;
    if (!isMobile || frameSkip.current % 3 === 0) {
      meshRef.current.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -1.2, 0]}>
      <meshStandardMaterial color="#0d9488" roughness={0.55} metalness={0.05} flatShading />
    </mesh>
  );
}

function Surfboard() {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const lift = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const x = 0;
    const z = -1;
    const y = waveHeight(x, z, t);
    // Sample the slope for pitch/roll so the board rides the swell
    const eps = 0.4;
    const dydx = (waveHeight(x + eps, z, t) - waveHeight(x - eps, z, t)) / (2 * eps);
    const dydz = (waveHeight(x, z + eps, t) - waveHeight(x, z - eps, t)) / (2 * eps);

    lift.current = THREE.MathUtils.lerp(lift.current, hovered ? 0.12 : 0, 0.08);
    groupRef.current.position.set(x, -1.2 + y + 0.12 + lift.current, z);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -dydz * 0.9, 0.15);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, dydx * 0.9, 0.15);
    // Keep the board angled toward the camera so it never reads edge-on
    groupRef.current.rotation.y = 0.55 + Math.sin(t * 0.3) * 0.2;
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Deck: flattened capsule reads as a longboard */}
      <mesh scale={[1, 0.12, 0.28]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.35, 1.6, 8, 16]} />
        <meshStandardMaterial color="#f97316" roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Deck stripe */}
      <mesh position={[0, 0.045, 0]}>
        <boxGeometry args={[1.7, 0.015, 0.05]} />
        <meshStandardMaterial color="#fef9c3" emissive="#fef9c3" emissiveIntensity={1.5} toneMapped={false} />
      </mesh>
      {/* Fin */}
      <mesh position={[-0.7, -0.12, 0]} rotation={[0, 0, -0.5]}>
        <coneGeometry args={[0.08, 0.28, 4]} />
        <meshStandardMaterial color="#c2410c" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function SurfingScene({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      <Ocean isMobile={isMobile} />
      <Surfboard />
      {/* Sunset glare at the horizon; bloom does the haze */}
      <mesh position={[0, 0.4, -11]}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshStandardMaterial color="#fde68a" emissive="#fbbf24" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <Sparkles count={isMobile ? 15 : 40} scale={[14, 1.5, 10]} size={1.5} speed={0.3} color="#ccfbf1" position={[0, -0.6, 0]} />
    </group>
  );
}
