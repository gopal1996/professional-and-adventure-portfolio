import React, { useCallback, useMemo, useState } from 'react';
import { Download, FileJson, RotateCcw } from 'lucide-react';
import professionalData from '@/data/professional';

// ─── Helpers ────────────────────────────────────────────────────────────────

const MONTH_MAP: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function toISO(dateStr: string): string | null {
  if (!dateStr || dateStr === 'Present') return null;
  const [mon, yr] = dateStr.trim().split(' ');
  if (!MONTH_MAP[mon] || !yr) return null;
  return `${yr}-${MONTH_MAP[mon]}-01T00:00:00.000Z`;
}

function calcYears(start: string, end: string): string {
  const [sm, sy] = start.trim().split(' ');
  const [em, ey] = end.trim().split(' ');
  if (!sy || !ey) return '';
  const startDate = new Date(parseInt(sy), MONTH_INDEX[sm] ?? 0);
  const endDate = new Date(parseInt(ey), MONTH_INDEX[em] ?? 0);
  const totalMonths =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth());
  const y = Math.floor(totalMonths / 12);
  const m = totalMonths % 12;
  if (y === 0) return `${m} month${m !== 1 ? 's' : ''}`;
  if (m === 0) return `${y} year${y !== 1 ? 's' : ''}`;
  return `${y} year${y !== 1 ? 's' : ''} ${m} month${m !== 1 ? 's' : ''}`;
}

/** Minimal markdown → HTML for bullet descriptions */
function mdToHtml(md: string): string {
  const lines = md.replace(/\{\{experienceYears\}\}/g, professionalData.experienceYears).split('\n');
  let html = '';
  let inList = false;

  const bold = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${bold(line.slice(2))}</li>`;
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      if (line) html += `<p class="p1">${bold(line)}</p>`;
    }
  }
  if (inList) html += '</ul>';
  return html;
}

function buildActivitiesHtml(): string {
  const { talks, blogs, projects, certifications } = professionalData;
  let html = '';

  if (talks.length) {
    html += '<p><strong>Public Talks:</strong></p><ul>';
    talks.forEach(t => { html += `<li>${t.title} - <a href="${t.link}">Watch</a></li>`; });
    html += '</ul>';
  }
  if (blogs.length) {
    html += '<p><strong>Blog:</strong></p><ul>';
    blogs.forEach(b => { html += `<li>${b.title} - <a href="${b.link}">Read</a></li>`; });
    html += '</ul>';
  }
  if (projects.length) {
    html += '<p><strong>Open Source:</strong></p><ul>';
    projects.forEach(p => { html += `<li>${p.title} - <a href="${p.link}">Link</a></li>`; });
    html += '</ul>';
  }
  if (certifications.length) {
    html += '<p><strong>Certifications:</strong></p><ul>';
    certifications.forEach(c => { html += `<li>${c.title} - <a href="${c.link}">Link</a></li>`; });
    html += '</ul>';
  }
  return html;
}

function buildResumeJSON(): object {
  const p = professionalData;

  const work = p.experience.map((exp, idx) => ({
    id: String(idx),
    name: exp.title,
    position: exp.designation,
    url: '',
    startDate: toISO(exp.startDate),
    isWorkingHere: exp.currentlyWorking,
    endDate: exp.currentlyWorking ? null : toISO(exp.endDate),
    summary: mdToHtml(exp.description),
    highlights: [],
    years: exp.currentlyWorking ? '' : calcYears(exp.startDate, exp.endDate),
  }));

  const education = p.schooling.map((s, idx) => {
    const [startPart, endPart] = s.year.split(' - ');
    const dashIdx = s.degree.indexOf(' - ');
    const studyType = dashIdx !== -1 ? s.degree.slice(0, dashIdx).trim() : s.degree.trim();
    const area = dashIdx !== -1 ? s.degree.slice(dashIdx + 3).trim() : '';
    return {
      id: String(idx + 1),
      institution: s.institution,
      url: '',
      studyType,
      area,
      startDate: toISO(startPart?.trim()) ?? '',
      isStudyingHere: false,
      endDate: toISO(endPart?.trim()) ?? '',
      score: '68%',
      courses: [],
    };
  });

  return {
    basics: {
      name: p.name,
      label: p.role,
      image: '',
      email: p.email,
      phone: '+91 8939244089',
      url: 'https://gopalakrishnan.dev',
      summary: mdToHtml(p.about),
      location: {
        address: '',
        postalCode: '',
        city: 'Chennai, India',
        countryCode: 'IN',
        region: 'Tamil Nadu',
      },
      relExp: '',
      totalExp: `${p.experienceYears} Years`,
      objective: '',
      profiles: [
        { network: 'linkedin', username: 'gopal1996', url: p.linkedin },
        { network: 'github', username: 'gopal1996', url: 'https://github.com/gopal1996/' },
        { network: 'twitter', username: '', url: '' },
        { network: 'hackerrank', username: '', url: '' },
        { network: 'hackerearth', username: '', url: '' },
        { network: 'codechef', username: '', url: '' },
        { network: 'leetcode', username: '', url: '' },
        { network: 'cssbattle', username: '', url: '' },
      ],
    },
    skills: {
      languages: [],
      frameworks: [],
      technologies: [
        { name: 'JavaScript', level: 0 },
        { name: 'TypeScript', level: 0 },
        { name: 'React', level: 0 },
        { name: 'CSS & SASS', level: 0 },
        { name: 'Python', level: 0 },
        { name: 'Node.js', level: 0 },
      ],
      libraries: [
        { name: 'Module Federation', level: 0 },
        { name: 'React Router 7', level: 0 },
        { name: 'Zustand', level: 0 },
        { name: 'Lingui', level: 0 },
      ],
      databases: [
        { name: 'Firebase', level: 3 },
      ],
      practices: [
        { name: 'Micro-frontends', level: 0 },
        { name: 'CI/CD', level: 0 },
        { name: 'Kubernetes', level: 0 },
        { name: 'Artifact Registry', level: 0 },
        { name: 'Cloud Storage', level: 0 },
        { name: 'IAM', level: 0 },
        { name: 'Network - VPC', level: 0 },
      ],
      tools: [
        { name: 'Docker', level: 0 },
        { name: 'GCP', level: 0 },
        { name: 'AWS', level: 0 },
        { name: 'Claude', level: 3 },
        { name: 'Lovable', level: 3 },
        { name: 'n8n', level: 0 },
        { name: 'Ollama', level: 0 },
        { name: 'Jenkins', level: 0 },
        { name: 'Langchain', level: 0 },
      ],
    },
    work,
    education,
    activities: {
      involvements: buildActivitiesHtml(),
      achievements: '',
    },
    volunteer: [],
    awards: [],
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export function ResumeBuilderPage() {
  const defaultJSON = useMemo(() => JSON.stringify(buildResumeJSON(), null, 2), []);
  const [jsonText, setJsonText] = useState(defaultJSON);
  const [parseError, setParseError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJsonText(val);
    try {
      JSON.parse(val);
      setParseError(null);
    } catch {
      setParseError('Invalid JSON — fix before exporting');
    }
  }, []);

  const handleReset = useCallback(() => {
    setJsonText(defaultJSON);
    setParseError(null);
  }, [defaultJSON]);

  const handleExport = useCallback(() => {
    try {
      const parsed = JSON.parse(jsonText);
      const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Gopalakrishnan_C_Resume.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setParseError('Cannot export: fix JSON errors first');
    }
  }, [jsonText]);

  const lineCount = jsonText.split('\n').length;

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <FileJson size={20} className="text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Resume Builder</h1>
            </div>
            <p className="text-slate-500 text-sm ml-[52px]">
              Edit the JSON below, then export for your resume app.
            </p>
          </div>

          <div className="flex items-center gap-3 ml-[52px] sm:ml-0">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-600 px-4 py-2.5 rounded-xl font-medium text-sm transition-all border border-slate-200 shadow-sm"
            >
              <RotateCcw size={15} />
              Reset
            </button>
            <button
              onClick={handleExport}
              disabled={!!parseError}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg"
            >
              <Download size={15} />
              Export JSON
            </button>
          </div>
        </div>

        {/* Error banner */}
        {parseError && (
          <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            {parseError}
          </div>
        )}

        {/* JSON Editor */}
        <div className="bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-slate-400 text-xs font-mono">resume.json</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
              <span>{lineCount} lines</span>
              {!parseError ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Valid JSON
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Error
                </span>
              )}
            </div>
          </div>

          {/* Editor area with line numbers */}
          <div className="flex overflow-auto" style={{ maxHeight: '75vh' }}>
            {/* Line numbers */}
            <div
              className="select-none text-right text-slate-600 text-xs font-mono py-5 px-3 bg-slate-900 border-r border-slate-800 shrink-0 leading-relaxed"
              aria-hidden="true"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i} style={{ lineHeight: '1.625rem' }}>{i + 1}</div>
              ))}
            </div>

            {/* Textarea */}
            <textarea
              value={jsonText}
              onChange={handleChange}
              className="flex-1 bg-slate-900 text-slate-100 font-mono text-[13px] py-5 px-4 resize-none outline-none leading-relaxed w-full"
              style={{ lineHeight: '1.625rem', minHeight: '60vh' }}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        </div>

        {/* Footer hint */}
        <p className="mt-4 text-center text-xs text-slate-400">
          All data is sourced from <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-600">data/professional.ts</code> — edit there to keep changes permanent.
        </p>
      </div>
    </div>
  );
}
