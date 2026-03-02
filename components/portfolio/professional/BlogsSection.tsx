import React from 'react';
import { BookOpen } from 'lucide-react';

import professionalData from '@/data/professional';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function BlogsSection() {
  return (
    <section id="blogs">
      <SectionHeading title="Latest Blogs" icon={<BookOpen size={24} />} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionalData.blogs.map((blog, idx) => (
          <a href={blog.link} key={idx} className="block group">
            <Card className="overflow-hidden p-0 h-full">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-slate-600 text-sm">{blog.description}</p>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}

