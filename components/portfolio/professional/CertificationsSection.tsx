import React from 'react';
import { Award } from 'lucide-react';

import professionalData from '@/data/professional';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function CertificationsSection() {
  return (
    <section id="certifications">
      <SectionHeading title="Certifications" icon={<Award size={24} />} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionalData.certifications.map((cert, idx) => (
          <Card key={idx} className="overflow-hidden p-0 h-full">
            <img
              src={cert.thumbnail}
              alt={cert.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">{cert.title}</h3>
              <p className="text-sm text-slate-500">{cert.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

