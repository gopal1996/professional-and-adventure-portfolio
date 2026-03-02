import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  Box, Wind, Cpu, Video, Plane, Snowflake, Waves,
  Activity, ExternalLink, LucideIcon,
} from 'lucide-react';

import { AdventureItem } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AdventureModelScene } from '@/components/scenes/AdventureModelScene';

const iconMap: Record<string, LucideIcon> = {
  Box, Wind, Cpu, Video, Plane, Snowflake, Waves,
};

export function HobbySection({ hobby, index }: { hobby: AdventureItem; index: number }) {
  const Icon = iconMap[hobby.icon] ?? Box;
  const reversed = hobby.reversed ?? index % 2 !== 0;

  const canvasPanel = hobby.modelPath ? (
    <div className="h-[400px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 1, 6]} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <AdventureModelScene
            modelPath={hobby.modelPath}
            scale={hobby.modelScale}
            rotation={hobby.modelRotation}
            effects={hobby.effects}
          />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      {hobby.badge && (
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest animate-pulse">
          {hobby.badge}
        </div>
      )}
      {hobby.watermark && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="text-8xl font-black text-white/5 uppercase italic tracking-tighter">
            {hobby.watermark}
          </div>
        </div>
      )}
      {hobby.attribution && (
        <a
          href={hobby.attribution.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white/30 hover:text-white/60 transition-colors text-xs"
        >
          <ExternalLink size={10} />
          {hobby.attribution.name}
        </a>
      )}
    </div>
  ) : (
    <div className="h-[400px] md:h-[600px] rounded-3xl border border-white/10 flex items-center justify-center">
      <Icon size={96} className="text-white/10" />
    </div>
  );

  const contentPanel = (
    <div className="space-y-8">
      <SectionHeading title={hobby.title} icon={<Icon size={24} />} dark />
      <p className="text-2xl text-white/60 leading-relaxed font-light">
        {hobby.description}
      </p>
      {hobby.ctaLink && (
        <a
          href={hobby.ctaLink}
          className="inline-flex items-center gap-4 bg-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20"
        >
          {hobby.ctaLabel} <Activity size={20} />
        </a>
      )}
      <div className="flex flex-wrap gap-3">
        {hobby.details.map((tag) => (
          <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white/40 italic">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );

  if (hobby.videoBackground) {
    return (
      <section className="min-h-screen relative overflow-hidden py-24 px-10 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 grayscale">
            <source src={hobby.videoBackground} type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 grid md:grid-cols-2 gap-20 items-center h-full">
          {contentPanel}
          <div className="h-[500px] relative">{canvasPanel}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen grid md:grid-cols-2 gap-12 px-10 py-24 items-center border-b border-white/5">
      {reversed ? (
        <>
          <div className="order-2 md:order-1">{contentPanel}</div>
          <div className="order-1 md:order-2">{canvasPanel}</div>
        </>
      ) : (
        <>
          {canvasPanel}
          {contentPanel}
        </>
      )}
    </section>
  );
}
