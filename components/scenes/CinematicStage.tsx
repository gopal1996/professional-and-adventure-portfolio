import { ReactNode, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  PerspectiveCamera,
  Environment,
  Lightformer,
  ContactShadows,
  PresentationControls,
  AdaptiveDpr,
  Cloud,
  Stars,
  Sparkles,
  Sky,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

import { SceneTheme } from './themes';
import {
  WindStreaks,
  Snowfall,
  ScanLine,
  SunDisc,
  DustMotes,
  RgbRig,
  PlatformRing,
  SnowSlope,
} from './effects';

/* Mouse-follow parallax: lerps a wrapper group toward the pointer. */
function ParallaxRig({ children, disabled }: { children: ReactNode; disabled: boolean }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current || disabled) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.08, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.05, 0.04);
  });

  return <group ref={ref}>{children}</group>;
}

/* Slow constant yaw while idle; composes under PresentationControls drag. */
function AutoRotate({ children, speed = 0 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current && speed) ref.current.rotation.y += delta * speed;
  });

  return <group ref={ref}>{children}</group>;
}

/* Ambient effect layers driven by the hobby's effects[] strings. */
function EffectLayers({ effects, isMobile }: { effects: string[]; isMobile: boolean }) {
  const q = isMobile ? 0.4 : 1; // mobile particle budget
  return (
    <>
      {effects.includes('wind') && <WindStreaks count={Math.round(100 * q)} />}
      {effects.includes('stars') && (
        <Stars radius={100} depth={50} count={isMobile ? 500 : 1200} factor={4} saturation={0} fade speed={1} />
      )}
      {effects.includes('clouds') && (
        <Cloud opacity={0.45} speed={0.4} bounds={[10, 1, 1.5]} segments={isMobile ? 8 : 12} position={[0, -1.5, 0]} />
      )}
      {effects.includes('sparkles') && (
        <Sparkles count={Math.round(80 * q)} scale={10} size={2} speed={0.5} color="#bfdbfe" />
      )}
      {effects.includes('scanline') && <ScanLine />}
      {effects.includes('rgb') && <RgbRig />}
      {effects.includes('dust') && <DustMotes count={Math.round(30 * q)} />}
      {effects.includes('sun') && <SunDisc />}
      {effects.includes('snowfall') && (
        <>
          <Snowfall count={isMobile ? 100 : 300} />
          <SnowSlope />
        </>
      )}
      {effects.includes('platform') && <PlatformRing />}
    </>
  );
}

interface CinematicStageProps {
  theme: SceneTheme;
  effects?: string[];
  isMobile: boolean;
  /** Render frames only while the section is near the viewport. */
  active: boolean;
  children: ReactNode;
}

export function CinematicStage({ theme, effects = [], isMobile, active, children }: CinematicStageProps) {
  return (
    <Canvas
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      style={{ touchAction: 'pan-y' }}
    >
      {theme.sky ? (
        <Sky sunPosition={[8, 1.2, -10]} turbidity={6} rayleigh={2.5} />
      ) : (
        <color attach="background" args={[theme.background]} />
      )}
      {!theme.sky && <fog attach="fog" args={[theme.fog.color, theme.fog.near, theme.fog.far]} />}

      <PerspectiveCamera makeDefault position={[0, theme.cameraY ?? 1, 6]} fov={45} />

      <ambientLight intensity={theme.ambient} />
      <directionalLight color={theme.key.color} intensity={theme.key.intensity} position={theme.key.position} />
      <pointLight color={theme.rim.color} intensity={theme.rim.intensity * 10} position={theme.rim.position} distance={30} />

      <Environment resolution={64} frames={1}>
        {theme.lightformers.map((lf, i) => (
          <Lightformer
            key={i}
            color={lf.color}
            intensity={lf.intensity}
            position={lf.position}
            scale={lf.scale}
            rotation={lf.rotation}
          />
        ))}
      </Environment>

      <Suspense fallback={null}>
        <ParallaxRig disabled={isMobile}>
          <PresentationControls
            global={false}
            snap
            cursor
            polar={effects.includes('clamp-polar') ? [-0.15, 0.2] : [-0.3, 0.3]}
            azimuth={[-1, 1]}
            damping={0.2}
          >
            <AutoRotate speed={theme.autoRotateSpeed}>
              <group position={[0, theme.modelY ?? 0, 0]}>{children}</group>
            </AutoRotate>
          </PresentationControls>
          <EffectLayers effects={effects} isMobile={isMobile} />
        </ParallaxRig>
      </Suspense>

      {theme.contactShadow.opacity > 0 && (
        <ContactShadows
          position={[0, -1.6, 0]}
          scale={12}
          opacity={theme.contactShadow.opacity}
          blur={theme.contactShadow.blur}
          far={4}
          frames={theme.contactShadow.animated ? Infinity : 60}
        />
      )}

      <AdaptiveDpr />

      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          intensity={isMobile ? theme.bloom.intensity * 0.7 : theme.bloom.intensity}
          luminanceThreshold={theme.bloom.threshold}
          luminanceSmoothing={0.2}
        />
        {!isMobile && <Vignette eskil={false} offset={0.25} darkness={0.55} />}
      </EffectComposer>
    </Canvas>
  );
}
