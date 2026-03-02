import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Activity, Box } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { PrinterScene } from '@/components/scenes/PrinterScene';

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
        <SectionHeading title="3D Printing" icon={<Box size={24} />} dark />
        <p className="text-2xl text-white/60 leading-relaxed font-light">
          Bringing digital blueprints to life. I specialize in mechanical
          functional parts and custom drone components using various materials
          from PLA to Carbon Fiber PETG.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h4 className="text-blue-400 font-bold mb-2">Build Volume</h4>
            <p className="text-white/80">300x300x400mm</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
            <h4 className="text-blue-400 font-bold mb-2">Main Rig</h4>
            <p className="text-white/80">Prusa MK3S+</p>
          </div>
        </div>
      </div>
    </section>
  );
}

