import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float as DreiFloat, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { ChevronDown, Code, Wind } from 'lucide-react';

export function Hero({
  isAdventureMode,
  onDiveIn,
}: {
  isAdventureMode: boolean;
  onDiveIn: () => void;
}) {
  return (
    <header
      className={`relative h-screen flex items-center justify-center overflow-hidden ${isAdventureMode ? 'text-white' : 'text-slate-900'
        }`}
    >
      <div className="absolute inset-0 -z-10 opacity-30">
        <Canvas>
          <ambientLight intensity={0.5} />
          <DreiFloat speed={2}>
            <Sphere args={[1, 32, 32]} position={[2, 1, -2]}>
              <MeshDistortMaterial
                color={isAdventureMode ? '#ff9900' : '#3b82f6'}
                speed={2}
                distort={0.4}
              />
            </Sphere>
          </DreiFloat>
          <DreiFloat speed={3}>
            <Sphere args={[0.5, 32, 32]} position={[-2, -1, -3]}>
              <MeshDistortMaterial
                color={isAdventureMode ? '#ff0055' : '#94a3b8'}
                speed={3}
                distort={0.6}
              />
            </Sphere>
          </DreiFloat>
        </Canvas>
      </div>

      <div className="text-center space-y-6 max-w-4xl px-6 relative z-10">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${isAdventureMode
              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              : 'bg-blue-100 text-blue-600 border border-blue-200'
            }`}
        >
          {isAdventureMode ? <Wind size={16} /> : <Code size={16} />}
          {isAdventureMode ? 'Chasing Adrenaline' : 'Building the Future'}
        </div>
        <h1 className="text-6xl md:text-9xl font-black font-display leading-tight tracking-tighter">
          {isAdventureMode ? (
            <>
              LIFE IN{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                3D
              </span>
            </>
          ) : (
            <>
              CODE IN{' '}
              <span className="text-blue-600 underline decoration-blue-200 decoration-8 underline-offset-8">
                STYLE
              </span>
            </>
          )}
        </h1>
        <p className="text-xl md:text-3xl text-slate-500 dark:text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
          {isAdventureMode
            ? 'Exploring the vertical world through paragliding, high-speed carving, and FPV drone engineering.'
            : 'Senior Frontend Engineer specializing in high-performance React architectures and premium digital aesthetics.'}
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <button
            onClick={onDiveIn}
            className={`flex items-center gap-2 px-10 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-2xl ${isAdventureMode
                ? 'bg-white text-slate-950 shadow-white/10'
                : 'bg-slate-900 text-white shadow-slate-900/20'
              }`}
          >
            Dive In
            <ChevronDown size={20} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <ChevronDown size={32} />
      </div>
    </header>
  );
}

