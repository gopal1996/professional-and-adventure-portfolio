import React from 'react';
import { AboutSection } from './AboutSection';
import { BlogsSection } from './BlogsSection';
import { CertificationsSection } from './CertificationsSection';
import { EducationSection } from './EducationSection';
import { ExperienceSection } from './ExperienceSection';
import { ProfessionalFooter } from './ProfessionalFooter';
import { ProjectsSection } from './ProjectsSection';
import { TalksSection } from './TalksSection';

export function ProfessionalPortfolio() {
  return (
    <div id="pro-content" className="max-w-6xl mx-auto px-6 py-20 space-y-32">
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <BlogsSection />
      <TalksSection />
      <CertificationsSection />
      <EducationSection />
      <ProfessionalFooter />
    </div>
  );
}

