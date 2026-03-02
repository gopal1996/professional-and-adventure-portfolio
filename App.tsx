
import React, { useEffect, useState } from 'react';

import { AdventurePortfolio } from '@/components/portfolio/adventure';
import { ProfessionalPortfolio } from '@/components/portfolio/professional';
import { Hero } from '@/components/layout/Hero';
import { TopNav } from '@/components/layout/TopNav';

const App: React.FC = () => {
  const [isAdventureMode, setIsAdventureMode] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isAdventureMode]);

  return (
    <div
      className={`transition-colors duration-1000 ${isAdventureMode ? 'bg-slate-950' : 'bg-slate-50'
        }`}
    >
      <TopNav
        isAdventureMode={isAdventureMode}
        onToggleMode={() => setIsAdventureMode(!isAdventureMode)}
      />

      <Hero
        isAdventureMode={isAdventureMode}
        onDiveIn={() => {
          const id = isAdventureMode ? 'adventure-content' : 'about';
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <div id="adventure-content"></div>
      <div id="pro-content"></div>

      <main>
        {isAdventureMode ? <AdventurePortfolio /> : <ProfessionalPortfolio />}
      </main>
    </div>
  );
};

export default App;
