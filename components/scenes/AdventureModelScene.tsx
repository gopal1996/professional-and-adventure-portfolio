import { useMemo, useRef } from 'react';
import { useGLTF, Cloud, Stars, Sparkles, Float as DreiFloat, MeshDistortMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WindParticles() {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);
  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
      speed[i] = 0.15 + Math.random() * 0.35;
    }
    return { pos, speed };
  }, []);

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
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

interface Props {
  modelPath: string;
  scale?: number;
  rotation?: [number, number, number];
  effects?: string[];
}

export function AdventureModelScene({ modelPath, scale = 2, rotation = [0, 0, 0], effects = ['spin'] }: Props) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
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
      groupRef.current.rotation.y += 0.004;
    }

    if (effects.includes('float-y')) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }
  });

  const model = (
    <group ref={groupRef} scale={scale}>
      <group rotation={rotation}>
        <primitive object={scene} />
      </group>
    </group>
  );

  return (
    <group>
      {effects.includes('wind')     && <WindParticles />}
      {effects.includes('clouds')   && <Cloud opacity={0.5} speed={0.4} bounds={[10, 1, 1.5]} segments={20} />}
      {effects.includes('stars')    && <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />}
      {effects.includes('sparkles') && <Sparkles count={200} scale={10} size={2} speed={0.5} color="white" />}
      {effects.includes('snow') && (
        <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20, 32, 32]} />
          <MeshDistortMaterial color="#eef" speed={1} distort={0.5} roughness={0} />
        </mesh>
      )}
      {effects.includes('float') ? (
        <DreiFloat speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
          {model}
        </DreiFloat>
      ) : model}
    </group>
  );
}
