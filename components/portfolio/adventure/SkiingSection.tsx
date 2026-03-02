import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Snowflake } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { SkiingScene } from '@/components/scenes/SkiingScene';
import adventureData from '@/data/adventure';

const hobby = adventureData.hobbies.find((h) => h.id === 'skiing')!;

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
        <SectionHeading title={hobby.title} icon={<Snowflake size={24} />} dark />
        <p className="text-2xl text-white/60 leading-relaxed font-light">
          {hobby.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {hobby.details.map((tag) => (
            <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white/40 italic">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

