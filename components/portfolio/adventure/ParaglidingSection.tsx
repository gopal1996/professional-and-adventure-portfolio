import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Activity, Plane } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { ParaglideScene } from '@/components/scenes/ParaglideScene';
import adventureData from '@/data/adventure';

const hobby = adventureData.hobbies.find((h) => h.id === 'paragliding')!;

export function ParaglidingSection() {
  return (
    <section className="min-h-screen relative overflow-hidden py-24 px-10 border-b border-white/5">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 grayscale"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-paraglider-flying-under-the-sun-41312-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center h-full">
        <div className="space-y-8">
          <SectionHeading title={hobby.title} icon={<Plane size={24} />} dark />
          <p className="text-2xl text-white/70 leading-relaxed font-light">
            {hobby.description}
          </p>
          <button className="flex items-center gap-4 bg-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20">
            View Flight Logs <Activity size={20} />
          </button>
        </div>
        <div className="h-[500px]">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={1} />
            <Suspense fallback={null}>
              <ParaglideScene />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
}

