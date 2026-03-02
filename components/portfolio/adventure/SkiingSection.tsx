import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Snowflake } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkiingScene } from '@/components/scenes/SkiingScene';

export function SkiingSection() {
  return (
    <section className="min-h-screen grid md:grid-cols-2 gap-12 px-10 py-24 items-center">
      <div className="h-[400px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative border border-white/5">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <SkiingScene />
          </Suspense>
        </Canvas>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-8xl font-black text-white/5 uppercase italic tracking-tighter">
            CARVE
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <SectionHeading title="Skiing" icon={<Snowflake size={24} />} dark />
        <p className="text-2xl text-white/60 leading-relaxed font-light">
          Chasing the powder. From carving black diamonds to backcountry
          exploration, winters are for the mountains.
        </p>
        <div className="flex gap-4">
          <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
            <h3 className="text-3xl font-bold mb-2">4,200m</h3>
            <p className="text-white/40 text-sm uppercase font-bold tracking-widest">
              Highest Peak
            </p>
          </div>
          <div className="flex-1 bg-white/5 p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-all">
            <h3 className="text-3xl font-bold mb-2">95km/h</h3>
            <p className="text-white/40 text-sm uppercase font-bold tracking-widest">
              Max Speed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

