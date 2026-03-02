import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float as DreiFloat, Stars } from '@react-three/drei';
import * as THREE from 'three';

function WindResistance() {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speed[i] = 0.15 + Math.random() * 0.35;
    }
    return { pos, speed };
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    const positions = meshRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 2] += particles.speed[i];
      if (positions[i * 3 + 2] > 10) positions[i * 3 + 2] = -10;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#ffffff"
        transparent
        opacity={0.15}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function DroneScene() {
  const droneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (droneRef.current) {
      const targetX = Math.sin(t * 0.7) * 2.0;
      const targetZ = Math.cos(t * 0.4) * 1.5;
      const targetY = Math.sin(t * 1.1) * 0.4;

      droneRef.current.position.x = THREE.MathUtils.lerp(
        droneRef.current.position.x,
        targetX,
        0.05,
      );
      droneRef.current.position.z = THREE.MathUtils.lerp(
        droneRef.current.position.z,
        targetZ,
        0.05,
      );
      droneRef.current.position.y = THREE.MathUtils.lerp(
        droneRef.current.position.y,
        targetY,
        0.05,
      );

      const roll = Math.sin(t * 0.7) * -0.5;
      droneRef.current.rotation.z = THREE.MathUtils.lerp(
        droneRef.current.rotation.z,
        roll,
        0.05,
      );

      const pitch = Math.cos(t * 0.4) * 0.3;
      droneRef.current.rotation.x = THREE.MathUtils.lerp(
        droneRef.current.rotation.x,
        pitch,
        0.05,
      );

      droneRef.current.rotation.y = THREE.MathUtils.lerp(
        droneRef.current.rotation.y,
        Math.sin(t * 0.35) * 0.4,
        0.03,
      );
    }
  });

  return (
    <group>
      <WindResistance />
      <group ref={droneRef} scale={1.2}>
        <mesh>
          <boxGeometry args={[2, 0.1, 0.2]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2, 0.1, 0.2]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        {[
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ].map((pos, i) => (
          <group key={i} position={[pos[0], 0.1, pos[1]]}>
            <mesh>
              <cylinderGeometry args={[0.1, 0.1, 0.2]} />
              <meshStandardMaterial color="#444" metalness={1} />
            </mesh>
            <DreiFloat speed={20} rotationIntensity={0} floatIntensity={0}>
              <mesh rotation={[0, 0, 0]}>
                <boxGeometry args={[0.9, 0.01, 0.08]} />
                <meshStandardMaterial
                  color="#00ff00"
                  transparent
                  opacity={0.4}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            </DreiFloat>
          </group>
        ))}
        <mesh position={[0, 0.2, 0.5]}>
          <boxGeometry args={[0.3, 0.3, 0.4]} />
          <meshStandardMaterial color="#111" />
          <mesh position={[0, 0, 0.2]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
              color="#000"
              emissive="#00ff00"
              emissiveIntensity={0.5}
            />
          </mesh>
        </mesh>
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </group>
    </group>
  );
}

