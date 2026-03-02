import React from 'react';

import professionalData from '@/data/professional';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function EducationSection() {
  return (
    <section id="education">
      <SectionHeading title="Education" />
      <div className="space-y-6">
        {professionalData.schooling.map((school, idx) => (
          <Card key={idx} className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold">{school.degree}</h3>
              <p className="text-slate-600">{school.institution}</p>
            </div>
            <div className="text-slate-500 font-medium">{school.year}</div>
          </Card>
        ))}
      </div>
    </section>
  );
}

