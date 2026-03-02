import React from 'react';
import { Code } from 'lucide-react';

import professionalData from '@/data/professional';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AboutSection() {
  return (
    <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <SectionHeading title="About Me" icon={<Code size={24} />} />
        <p className="text-xl text-slate-600 leading-relaxed">
          {professionalData.about}
        </p>
        <div className="mt-8 flex gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 min-w-[120px]">
            <div className="text-3xl font-bold text-blue-600">
              {professionalData.experienceYears}
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
              Experience
            </div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 min-w-[120px]">
            <div className="text-3xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
              Projects
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <img
          src="https://res.cloudinary.com/gopal1996/image/upload/v1772444104/Portfolio/IMG_1160_tp1z7v.jpg"
          alt="Gopal"
          className="rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl -z-10"></div>
      </div>
    </section>
  );
}

