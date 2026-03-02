import React from 'react';
import { Briefcase, Instagram, Linkedin, Rocket } from 'lucide-react';

import adventureData from '@/data/adventure';
import professionalData from '@/data/professional';

export function TopNav({
  isAdventureMode,
  onToggleMode,
}: {
  isAdventureMode: boolean;
  onToggleMode: () => void;
}) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] p-6 flex justify-between items-center pointer-events-none">
      <div className="flex items-center gap-2 pointer-events-auto bg-white/10 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
        <div
          className={`w-8 h-8 shrink-0 ${isAdventureMode ? 'bg-orange-600' : 'bg-blue-600'} rounded-full flex items-center justify-center transition-colors duration-500`}
        >
          <span className="text-white font-bold text-sm">G</span>
        </div>
        <span className={`font-bold whitespace-nowrap text-sm sm:text-base ${isAdventureMode ? 'text-white' : 'text-slate-900'}`}>
          <span className="hidden sm:inline">Gopalakrishnan C</span>
          <span className="sm:hidden">Gopal</span>
        </span>
      </div>

      <div className="pointer-events-auto flex items-center gap-2 sm:gap-4">
        {!isAdventureMode ? (
          <a
            href={professionalData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/50 backdrop-blur-md p-2.5 sm:p-3 rounded-full hover:bg-blue-500 hover:text-white transition-all text-slate-600 border border-slate-200"
          >
            <Linkedin size={16} />
          </a>
        ) : (
          <a
            href={adventureData.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-full hover:bg-pink-500 hover:text-white transition-all text-white/70 border border-white/10"
          >
            <Instagram size={16} />
          </a>
        )}

        <button
          onClick={onToggleMode}
          className="relative w-20 sm:w-48 h-10 sm:h-12 bg-slate-200/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-full p-1 transition-all duration-500 border border-slate-300 dark:border-slate-700 shadow-inner"
        >
          <div
            className={`absolute inset-1 rounded-full transition-all duration-500 flex items-center justify-center gap-1.5
              w-8 sm:w-24
              ${isAdventureMode
                ? 'translate-x-[40px] sm:translate-x-[88px] bg-orange-600 text-white'
                : 'translate-x-0 bg-white text-slate-900 shadow-md'
              }`}
          >
            {isAdventureMode ? <Rocket size={14} /> : <Briefcase size={14} />}
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">
              {isAdventureMode ? 'Hobbies' : 'Pro'}
            </span>
          </div>
          <div className="hidden sm:flex justify-between px-6 items-center h-full text-[10px] font-bold text-slate-400 uppercase tracking-tighter pointer-events-none">
            <span>Pro</span>
            <span>Hobbies</span>
          </div>
        </button>
      </div>
    </nav>
  );
}

