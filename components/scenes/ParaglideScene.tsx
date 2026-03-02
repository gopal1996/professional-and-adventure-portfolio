import { useRef } from 'react';
import { useGLTF, Cloud, Float as DreiFloat } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface ParaglideSceneProps {
  modelPath: string;
}

export function ParaglideScene({ modelPath }: ParaglideSceneProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }
  });

  return (
    <group>
      <Cloud opacity={0.5} speed={0.4} bounds={[10, 1, 1.5]} segments={20} />
      <DreiFloat speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
        <group ref={groupRef} scale={0.2} position={[0, 0, 0]}>
          <primitive object={scene} />
        </group>
      </DreiFloat>
    </group>
  );
}

useGLTF.preload('/models/Parachute.glb');
