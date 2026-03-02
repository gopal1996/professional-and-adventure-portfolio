import React from 'react';
import { ExternalLink, Zap } from 'lucide-react';

import professionalData from '@/data/professional';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function ProjectsSection() {
  return (
    <section id="projects">
      <SectionHeading title="Projects" icon={<Zap size={24} />} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionalData.projects.map((proj, idx) => (
          <a href={proj.link} key={idx} className="block group">
            <Card className="overflow-hidden p-0 h-full">
              <img
                src={proj.thumbnail}
                alt={proj.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                  {proj.title}
                  <ExternalLink size={16} />
                </h3>
                <p className="text-slate-600 text-sm">{proj.description}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}

