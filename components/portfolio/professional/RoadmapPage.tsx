import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Rocket,
  Target,
  CheckCircle2,
  Wrench,
  Sparkles,
} from 'lucide-react';

const marketSkills: string[] = [
  'LLM / API fluency (Claude, GPT, Gemini, open models)',
  'RAG + vector DBs (Pinecone, Weaviate, Qdrant)',
  'Agentic AI + MCP (building MCP servers is scarce, high value)',
  'Prompt engineering & context management',
  'Evals & guardrails',
  'Production deployment, cost optimization, observability',
  'Python + TypeScript',
  'Fine-tuning (LoRA / QLoRA / RLHF) [bonus]',
];

const strengths: string[] = [
  'React, TypeScript, Node.js',
  'Docker, Kubernetes, GCP, CI/CD',
  'Token & cost optimization',
  'Real LLM workflow experience (AISDLC, AI localization)',
  'LangChain / Ollama exposure',
];

const toBuild: string[] = [
  'Hands-on RAG + a vector DB',
  'Building an MCP server',
  'Agent orchestration (LangGraph / CrewAI)',
  'Eval harnesses',
  'Fine-tuning basics',
];

interface RoadmapProject {
  title: string;
  description: string;
  stack: string[];
  status: 'Planned' | 'In progress' | 'Shipped' | 'Optional';
}

const projects: RoadmapProject[] = [
  {
    title: 'RAG "Chat with your docs"',
    description:
      'Vector DB + citations + an eval harness. Covers RAG and evals in a single build.',
    stack: ['RAG', 'Vector DB', 'Evals'],
    status: 'Planned',
  },
  {
    title: 'MCP Server',
    description:
      'Expose a real tool or API over MCP. The highest-signal, scarcest skill in the 2026 market.',
    stack: ['MCP', 'Agents'],
    status: 'Planned',
  },
  {
    title: 'Agentic Workflow App',
    description:
      'A multi-step agent doing a real task with LangGraph or CrewAI.',
    stack: ['LangGraph', 'Agents'],
    status: 'Planned',
  },
  {
    title: 'Open-source AISDLC Demo',
    description: 'A public, linkable slice of the Freshworks AISDLC work.',
    stack: ['LLM', 'Dev Tooling'],
    status: 'Planned',
  },
  {
    title: 'LLM Cost / Eval Dashboard',
    description:
      'Leans on the token-optimization strength. Optional stretch project.',
    stack: ['Observability', 'Evals'],
    status: 'Optional',
  },
];

const statusStyles: Record<RoadmapProject['status'], string> = {
  Planned: 'bg-blue-100 text-blue-700',
  'In progress': 'bg-amber-100 text-amber-700',
  Shipped: 'bg-emerald-100 text-emerald-700',
  Optional: 'bg-slate-200 text-slate-600',
};

export function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center">
              <Rocket size={22} className="text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900">
              AI-Native Roadmap
            </h1>
          </div>
          <p className="text-slate-500 max-w-2xl">
            Where the AI-native fullstack market is heading in 2026, where I
            stand against it, and the projects I am shipping to close the gap.
          </p>
        </div>

        {/* Market expectations */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Target size={20} />
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-900">
              Market Expectations (2026)
            </h2>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {marketSkills.map((skill) => (
              <span
                key={skill}
                className="bg-white border border-slate-200 text-slate-700 text-sm px-3.5 py-2 rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Gap analysis */}
        <section className="mb-12">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 size={18} className="text-emerald-600" />
                <h3 className="font-bold text-slate-900">Already Strong</h3>
              </div>
              <ul className="space-y-2.5">
                {strengths.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Wrench size={18} className="text-blue-600" />
                <h3 className="font-bold text-slate-900">To Build</h3>
              </div>
              <ul className="space-y-2.5">
                {toBuild.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-slate-600"
                  >
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects to ship */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <Sparkles size={20} />
            </div>
            <h2 className="text-2xl font-bold font-display text-slate-900">
              Projects to Ship
            </h2>
          </div>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex gap-4"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 font-bold flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-bold text-slate-900">
                      {project.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${statusStyles[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400">
            Once a project ships, promote it to the{' '}
            <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-600">
              projects
            </code>{' '}
            array in{' '}
            <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-600">
              data/professional.ts
            </code>{' '}
            with a real link.
          </p>
        </section>
      </div>
    </div>
  );
}
