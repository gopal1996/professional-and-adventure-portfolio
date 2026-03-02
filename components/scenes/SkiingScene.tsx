import React from 'react';
import {
  Float as DreiFloat,
  MeshDistortMaterial,
  Sparkles,
} from '@react-three/drei';

export function SkiingScene() {
  return (
    <group>
      <Sparkles count={200} scale={10} size={2} speed={0.5} color="white" />
      <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <MeshDistortMaterial color="#eef" speed={1} distort={0.2} roughness={0} />
      </mesh>
      <DreiFloat speed={5} rotationIntensity={2} floatIntensity={1}>
        <group rotation={[0, Math.PI / 4, 0]}>
          <mesh position={[-0.2, 0, 0]}>
            <boxGeometry args={[0.1, 0.02, 1.5]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
          <mesh position={[0.2, 0, 0]}>
            <boxGeometry args={[0.1, 0.02, 1.5]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
        </group>
      </DreiFloat>
    </group>
  );
}

