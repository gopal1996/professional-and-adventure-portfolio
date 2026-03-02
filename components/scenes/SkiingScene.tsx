import { useRef } from 'react';
import { useGLTF, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface SkiingSceneProps {
  modelPath: string;
}

export function SkiingScene({ modelPath }: SkiingSceneProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    }
  });

  return (
    <group>
      <Sparkles count={200} scale={10} size={2} speed={0.5} color="white" />
      <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <MeshDistortMaterial color="#eef" speed={1} distort={0.5} roughness={0} />
      </mesh>
      <group ref={groupRef} scale={0.5} position={[0, 0, 0]}>
        <group rotation={[-Math.PI / 2, -1, -1.5]}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/models/Skier.glb');
