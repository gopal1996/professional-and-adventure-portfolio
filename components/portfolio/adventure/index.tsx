import React from 'react';
import { Instagram } from 'lucide-react';

import adventureData from '@/data/adventure';
import { DroneSection } from './DroneSection';
import { ParaglidingSection } from './ParaglidingSection';
import { PrintingSection } from './PrintingSection';
import { SkiingSection } from './SkiingSection';

export function AdventurePortfolio() {
  return (
    <div className="bg-slate-950 text-white pb-32">
      <PrintingSection />
      <DroneSection />
      <ParaglidingSection />
      <SkiingSection />

      <footer className="text-center py-24 border-t border-white/5">
        <h2 className="text-6xl font-display font-black mb-8 text-white/20">
          The Adventure Continues
        </h2>
        <a
          href={adventureData.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-5 rounded-full font-bold text-xl hover:scale-110 transition-transform shadow-2xl shadow-pink-600/20"
        >
          <Instagram size={28} />
          Check My Instagram
        </a>
      </footer>
    </div>
  );
}

