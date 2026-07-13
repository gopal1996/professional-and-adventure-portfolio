import { ComponentType, Suspense, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import {
  Box, Wind, Cpu, Video, Plane, Snowflake, Waves,
  Activity, ExternalLink, LucideIcon,
} from 'lucide-react';

import { AdventureItem } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AdventureModelScene } from '@/components/scenes/AdventureModelScene';
import { CinematicStage } from '@/components/scenes/CinematicStage';
import { EditingScene } from '@/components/scenes/EditingScene';
import { SurfingScene } from '@/components/scenes/SurfingScene';
import { getTheme } from '@/components/scenes/themes';
import { useIsMobile } from '@/hooks/useIsMobile';

const iconMap: Record<string, LucideIcon> = {
  Box, Wind, Cpu, Video, Plane, Snowflake, Waves,
};

// Procedural scenes for hobbies without a GLB model
const sceneRegistry: Record<string, ComponentType<{ isMobile: boolean }>> = {
  editing: EditingScene,
  surfing: SurfingScene,
};

const contentVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function HobbySection({ hobby, index }: { hobby: AdventureItem; index: number }) {
  const Icon = iconMap[hobby.icon] ?? Box;
  const reversed = hobby.reversed ?? index % 2 !== 0;
  const isMobile = useIsMobile();
  const theme = getTheme(hobby.id);

  // Lazy-mount the canvas near the viewport, then keep it mounted but pause
  // its frame loop while offscreen.
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: '300px 0px' });
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (inView) setHasMounted(true);
  }, [inView]);

  const ProceduralScene = hobby.scene ? sceneRegistry[hobby.scene] : undefined;

  const sceneContent = hobby.modelPath ? (
    <AdventureModelScene
      modelPath={hobby.modelPath}
      scale={hobby.modelScale}
      rotation={hobby.modelRotation}
      effects={hobby.effects}
    />
  ) : ProceduralScene ? (
    <ProceduralScene isMobile={isMobile} />
  ) : null;

  const canvasPanel = sceneContent ? (
    <motion.div
      className="h-[340px] sm:h-[420px] md:h-[600px] bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl"
      style={{ touchAction: 'pan-y' }}
      initial={{ opacity: 0, scale: 0.96, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {hasMounted && (
        <Suspense fallback={null}>
          <CinematicStage
            theme={theme}
            effects={hobby.effects}
            isMobile={isMobile}
            active={inView}
          >
            {sceneContent}
          </CinematicStage>
        </Suspense>
      )}
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
    </motion.div>
  ) : null;

  const contentPanel = (
    <motion.div
      className="space-y-8"
      variants={contentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={itemVariants}>
        <SectionHeading title={hobby.title} icon={<Icon size={24} />} dark />
      </motion.div>
      <motion.p variants={itemVariants} className="text-2xl text-white/60 leading-relaxed font-light">
        {hobby.description}
      </motion.p>
      {hobby.ctaLink && (
        <motion.a
          variants={itemVariants}
          href={hobby.ctaLink}
          className="inline-flex items-center gap-4 bg-orange-600 px-8 py-4 rounded-full font-bold hover:bg-orange-700 transition-all shadow-xl shadow-orange-900/20"
        >
          {hobby.ctaLabel} <Activity size={20} />
        </motion.a>
      )}
      <div className="flex flex-wrap gap-3">
        {hobby.details.map((tag) => (
          <motion.span
            key={tag}
            variants={itemVariants}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold text-white/40 italic"
          >
            #{tag}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

  if (hobby.videoBackground) {
    return (
      <section ref={sectionRef} className="min-h-screen relative overflow-hidden py-24 px-6 md:px-10 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-20 grayscale">
            <source src={hobby.videoBackground} type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-center h-full">
          <div className="order-1">{contentPanel}</div>
          <div className="order-2 relative">{canvasPanel}</div>
        </div>
      </section>
    );
  }

  // Content first on mobile always; "reversed" only affects desktop column order.
  return (
    <section ref={sectionRef} className="min-h-screen grid md:grid-cols-2 gap-12 px-6 md:px-10 py-24 items-center border-b border-white/5">
      <div className={`order-1 ${reversed ? 'md:order-1' : 'md:order-2'}`}>{contentPanel}</div>
      <div className={`order-2 ${reversed ? 'md:order-2' : 'md:order-1'}`}>{canvasPanel}</div>
    </section>
  );
}
