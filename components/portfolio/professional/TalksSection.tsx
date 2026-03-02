import React from 'react';
import { Mic } from 'lucide-react';

import professionalData from '@/data/professional';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function TalksSection() {
  return (
    <section id="talks">
      <SectionHeading title="Talks" icon={<Mic size={24} />} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionalData.talks.map((talk, idx) => (
          <a href={talk.link} key={idx} className="block group">
            <Card className="overflow-hidden p-0 h-full">
              <img
                src={talk.thumbnail}
                alt={talk.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {talk.title}
                </h3>
                <p className="text-slate-600 text-sm mb-4">{talk.description}</p>
                <span className="text-blue-600 font-bold text-sm">
                  Watch Session →
                </span>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}

