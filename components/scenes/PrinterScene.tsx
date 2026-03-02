import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PrinterScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const headRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      const scale = (Math.sin(t * 0.5) + 1) / 2;
      meshRef.current.scale.set(1.5, scale * 1.5, 1.5);
      meshRef.current.position.y = (scale * 1.5) / 2 - 0.75;
    }
    if (headRef.current) {
      headRef.current.position.x = Math.sin(t * 4) * 1.2;
      headRef.current.position.z = Math.cos(t * 3) * 1.2;
      headRef.current.position.y = meshRef.current
        ? meshRef.current.position.y + meshRef.current.scale.y / 2 + 0.2
        : 0;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} />
      </mesh>
      <mesh ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#00f2ff"
          emissive="#00f2ff"
          emissiveIntensity={2}
          wireframe
        />
      </mesh>
      <group ref={headRef}>
        <mesh>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#ff0055" emissive="#ff0055" />
        </mesh>
        <pointLight color="#ff0055" intensity={2} distance={2} />
      </group>
    </group>
  );
}

