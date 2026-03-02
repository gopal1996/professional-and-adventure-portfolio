import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Activity, Box } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrinterScene } from '@/components/scenes/PrinterScene';
import adventureData from '@/data/adventure';

const hobby = adventureData.hobbies.find((h) => h.id === '3dprint')!;

export function PrintingSection() {
  return (
    <section className="min-h-screen grid md:grid-cols-2 gap-12 px-10 py-24 items-center border-b border-white/5">
      <div className="h-[400px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl shadow-blue-500/10">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <Suspense fallback={null}>
            <PrinterScene />
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest animate-pulse">
          <Activity size={14} />
          Print In Progress
        </div>
      </div>
      <div className="space-y-8">
        <SectionHeading title={hobby.title} icon={<Box size={24} />} dark />
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

