import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface PrinterSceneProps {
  modelPath: string;
}

export function PrinterScene({ modelPath }: PrinterSceneProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={groupRef} scale={10} position={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/models/printer.glb');
