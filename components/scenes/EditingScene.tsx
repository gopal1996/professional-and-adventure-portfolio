import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural Video Editing scene: a glowing play button hero, a film-strip
 * ribbon undulating behind it, and floating timeline clips below.
 */

const PINK = '#ec4899';
const VIOLET = '#8b5cf6';

function PlayButton() {
  const groupRef = useRef<THREE.Group>(null);
  const triMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const ringMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const triangleGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const r = 0.5;
    shape.moveTo(r, 0);
    shape.lineTo(-r * 0.6, r * 0.75);
    shape.lineTo(-r * 0.6, -r * 0.75);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 0.15, bevelEnabled: false });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.03;
      const target = pulse * (hovered ? 1.08 : 1);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, target, 0.08));
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    }
    const targetGlow = hovered ? 4 : 2.5;
    if (triMatRef.current) {
      triMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(triMatRef.current.emissiveIntensity, targetGlow, 0.08);
    }
    if (ringMatRef.current) {
      ringMatRef.current.emissiveIntensity = THREE.MathUtils.lerp(ringMatRef.current.emissiveIntensity, targetGlow, 0.08);
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, 0.3, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh geometry={triangleGeometry}>
        <meshStandardMaterial ref={triMatRef} color={PINK} emissive={PINK} emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.1, 0.06, 16, 64]} />
        <meshStandardMaterial ref={ringMatRef} color={PINK} emissive={PINK} emissiveIntensity={2.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

function FilmStrip() {
  const groupRef = useRef<THREE.Group>(null);
  const frames = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 11) * Math.PI * 1.4 - Math.PI * 0.7;
        return {
          position: [Math.sin(angle) * 3.2, Math.sin(i * 0.9) * 0.5 + 0.5, -1.6 - Math.cos(angle) * 1.2] as [number, number, number],
          rotationY: -angle * 0.5,
          phase: i * 0.5,
        };
      }),
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.position.y = frames[i].position[1] + Math.sin(t + frames[i].phase) * 0.08;
    });
  });

  return (
    <group ref={groupRef}>
      {frames.map((frame, i) => (
        <group key={i} position={frame.position} rotation={[0, frame.rotationY, 0]}>
          <mesh>
            <boxGeometry args={[0.7, 0.5, 0.02]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* sprocket edge strips */}
          <mesh position={[0, 0.27, 0]}>
            <boxGeometry args={[0.7, 0.04, 0.025]} />
            <meshStandardMaterial color={PINK} emissive={PINK} emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.27, 0]}>
            <boxGeometry args={[0.7, 0.04, 0.025]} />
            <meshStandardMaterial color={PINK} emissive={PINK} emissiveIntensity={1.6} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function TimelineClips() {
  const groupRef = useRef<THREE.Group>(null);
  const clips = useMemo(
    () => [
      { width: 1.6, x: -1.7, color: PINK },
      { width: 0.9, x: -0.2, color: VIOLET },
      { width: 1.3, x: 1.1, color: '#475569' },
      { width: 0.8, x: 2.3, color: PINK },
    ],
    []
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.position.y = -1.35 + Math.sin(t * 1.2 + i * 0.8) * 0.05;
    });
  });

  return (
    <group ref={groupRef}>
      {clips.map((clip, i) => (
        <mesh key={i} position={[clip.x, -1.35, 0.8]}>
          <boxGeometry args={[clip.width, 0.18, 0.1]} />
          <meshStandardMaterial
            color={clip.color}
            emissive={clip.color}
            emissiveIntensity={0.8}
            roughness={0.4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export function EditingScene({ isMobile }: { isMobile: boolean }) {
  return (
    <group>
      <PlayButton />
      <FilmStrip />
      <TimelineClips />
      <Sparkles count={isMobile ? 12 : 30} scale={8} size={2} speed={0.4} color={PINK} />
    </group>
  );
}
