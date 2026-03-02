import React from 'react';
import { Briefcase } from 'lucide-react';

import professionalData from '@/data/professional';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ExperienceSection() {
  return (
    <section id="experience">
      <SectionHeading title="Experience" icon={<Briefcase size={24} />} />
      <div className="space-y-6">
        {professionalData.experience.map((exp, idx) => (
          <Card key={idx} className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/4">
              <div className="text-lg font-bold text-blue-600">
                {exp.startDate} - {exp.endDate}
              </div>
              <div className="text-slate-500 font-medium">{exp.location}</div>
            </div>
            <div className="md:w-3/4">
              <h3 className="text-2xl font-bold mb-1">{exp.designation}</h3>
              <div className="text-xl text-slate-700 mb-4">{exp.title}</div>
              <p className="text-slate-600">{exp.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

