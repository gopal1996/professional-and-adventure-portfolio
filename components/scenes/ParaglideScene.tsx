import React from 'react';
import { Cloud, Float as DreiFloat } from '@react-three/drei';
import * as THREE from 'three';

export function ParaglideScene() {
  return (
    <group scale={1.5}>
      <DreiFloat speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 1, 0]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[1.5, 0.05, 16, 100, Math.PI]} />
          <meshStandardMaterial color="#ff9900" side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.3, 4, 8]} />
          <meshStandardMaterial color="#fff" />
        </mesh>
      </DreiFloat>
      <Cloud opacity={0.5} speed={0.4} bounds={[10, 1, 1.5]} segments={20} />
    </group>
  );
}

