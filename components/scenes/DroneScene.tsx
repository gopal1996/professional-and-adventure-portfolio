import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Stars } from '@react-three/drei';
import * as THREE from 'three';

interface DroneSceneProps {
  modelPath: string;
}

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

export function DroneScene({ modelPath }: DroneSceneProps) {
  const { scene } = useGLTF(modelPath);
  const droneRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (droneRef.current) {
      const targetX = Math.sin(t * 0.7) * 2.0;
      const targetZ = Math.cos(t * 0.4) * 1.5;
      const targetY = Math.sin(t * 1.1) * 0.4;

      droneRef.current.position.x = THREE.MathUtils.lerp(droneRef.current.position.x, targetX, 0.05);
      droneRef.current.position.z = THREE.MathUtils.lerp(droneRef.current.position.z, targetZ, 0.05);
      droneRef.current.position.y = THREE.MathUtils.lerp(droneRef.current.position.y, targetY, 0.05);

      droneRef.current.rotation.z = THREE.MathUtils.lerp(droneRef.current.rotation.z, Math.sin(t * 0.7) * -0.5, 0.05);
      droneRef.current.rotation.x = THREE.MathUtils.lerp(droneRef.current.rotation.x, Math.cos(t * 0.4) * 0.3, 0.05);
      droneRef.current.rotation.y = THREE.MathUtils.lerp(droneRef.current.rotation.y, Math.sin(t * 0.35) * 0.4, 0.03);
    }
  });

  return (
    <group>
      <WindResistance />
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
      <group ref={droneRef} scale={3}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

useGLTF.preload('/models/Drone.glb');
