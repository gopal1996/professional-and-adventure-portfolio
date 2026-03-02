import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Wind, ExternalLink } from 'lucide-react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { DroneScene } from '@/components/scenes/DroneScene';
import adventureData from '@/data/adventure';

const hobby = adventureData.hobbies.find((h) => h.id === 'drones')!;

export function DroneSection() {
  return (
    <section className="min-h-screen grid md:grid-cols-2 gap-12 px-10 py-24 items-center border-b border-white/5">
      <div className="order-2 md:order-1 space-y-8">
        <SectionHeading title={hobby.title} icon={<Wind size={24} />} dark />
        <p className="text-2xl text-white/60 leading-relaxed font-light">
          {hobby.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {hobby.details.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white/40 italic"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <div className="order-1 md:order-2 h-[400px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl shadow-green-500/10">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <Suspense fallback={null}>
            {hobby.modelPath && <DroneScene modelPath={hobby.modelPath} />}
          </Suspense>
          <OrbitControls enableZoom={false} />
        </Canvas>
        <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10">
          <div className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">
            Telemetry Status
          </div>
          <div className="text-green-500 font-mono text-lg animate-pulse">
            READY FOR TAKEOFF
          </div>
        </div>
        {hobby.attribution && (
          <a
            href={hobby.attribution.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors text-xs"
          >
            <ExternalLink size={10} />
            {hobby.attribution.name}
          </a>
        )}
      </div>
    </section>
  );
}
