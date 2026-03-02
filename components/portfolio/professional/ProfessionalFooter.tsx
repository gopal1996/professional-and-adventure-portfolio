import React from 'react';
import { Briefcase, Linkedin } from 'lucide-react';

import professionalData from '@/data/professional';

export function ProfessionalFooter() {
  return (
    <footer className="pt-20 border-t border-slate-200 text-center text-slate-500">
      <p>
        © {new Date().getFullYear()} {professionalData.name}. Built with React, Three.js & Tailwind
        CSS.
      </p>
      <div className="flex justify-center gap-6 mt-6 pb-12">
        <a
          href={professionalData.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <Linkedin size={20} />
          <span className="font-semibold">LinkedIn</span>
        </a>
        <a
          href={`mailto:${professionalData.email}`}
          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
        >
          <Briefcase size={20} />
          <span className="font-semibold">Work Email</span>
        </a>
      </div>
    </footer>
  );
}

