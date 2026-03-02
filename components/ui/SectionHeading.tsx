import React from 'react';

export function SectionHeading({
  title,
  icon,
  dark,
}: {
  title: string;
  icon?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 mb-8">
      {icon && (
        <div
          className={`p-2 ${
            dark ? 'bg-white/10 text-white' : 'bg-blue-100 text-blue-600'
          } rounded-lg`}
        >
          {icon}
        </div>
      )}
      <h2
        className={`text-3xl md:text-5xl font-bold font-display ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
    </div>
  );
}

