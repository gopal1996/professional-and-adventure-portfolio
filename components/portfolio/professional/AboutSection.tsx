import React from 'react';
import { Code } from 'lucide-react';

import professionalData from '@/data/professional';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MarkdownText } from '@/components/ui/MarkdownText';

function getExperienceYears(): number {
  const firstJob = professionalData.experience[professionalData.experience.length - 1];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const [mon, yr] = firstJob.startDate.split(' ');
  const start = new Date(parseInt(yr), monthNames.indexOf(mon));
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  return Math.round((months / 12) * 10) / 10;
}

export function AboutSection() {
  const experienceYears = getExperienceYears();
  return (
    <section id="about" className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <SectionHeading title="About Me" icon={<Code size={24} />} />
        <MarkdownText className="text-xl text-slate-600 leading-relaxed">
          {professionalData.about.replace('{{experienceYears}}', String(experienceYears))}
        </MarkdownText>
        <div className="mt-8 flex gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100 min-w-[120px]">
            <div className="text-3xl font-bold text-blue-600">
              {experienceYears}
            </div>
            <div className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
              Experience
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

