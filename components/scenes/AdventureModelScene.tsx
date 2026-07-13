import { useRef, useState } from 'react';
import { useGLTF, Float as DreiFloat } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { NavLights } from './effects';

interface Props {
  modelPath: string;
  scale?: number;
  rotation?: [number, number, number];
  effects?: string[];
}

/**
 * Loads a hobby GLB and applies its motion behaviors (flight/spin/sway/carve)
 * plus a hover scale reaction. Scene-level concerns (lights, environment,
 * particles, postprocessing) live in CinematicStage.
 */
export function AdventureModelScene({ modelPath, scale = 2, rotation = [0, 0, 0], effects = ['spin'] }: Props) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const isFlight = effects.includes('flight');

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (!groupRef.current) return;

    if (isFlight) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, Math.sin(t * 0.7) * 2.0, 0.05);
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, Math.cos(t * 0.4) * 1.5, 0.05);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, Math.sin(t * 1.1) * 0.4, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, Math.sin(t * 0.7) * -0.5, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, Math.cos(t * 0.4) * 0.3, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.sin(t * 0.35) * 0.4, 0.03);
    } else if (effects.includes('spin')) {
      groupRef.current.rotation.y += hovered ? 0.009 : 0.004;
    }

    // Paraglider weight-shift pendulum
    if (effects.includes('sway')) {
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.08;
    }
    // Skier carving lean
    if (effects.includes('carve')) {
      groupRef.current.rotation.z = Math.sin(t * 0.9) * 0.06;
    }

    // Hover reaction: gentle scale-up
    const targetScale = scale * (hovered ? 1.04 : 1);
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    );
  });

  const model = (
    <group
      ref={groupRef}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <group rotation={rotation}>
        <primitive object={scene} />
      </group>
      {effects.includes('navlights') && <NavLights />}
    </group>
  );

  return effects.includes('float') ? (
    <DreiFloat speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      {model}
    </DreiFloat>
  ) : (
    model
  );
}

// Preload all hobby models once; cached across sections.
['printer', 'Drone', 'pc', 'Parachute', 'Skier'].forEach((m) =>
  useGLTF.preload(`/models/${m}.glb`)
);
