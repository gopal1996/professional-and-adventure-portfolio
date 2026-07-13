import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Rocket,
  Target,
  CheckCircle2,
  Wrench,
  Sparkles,
  ChevronDown,
  Layers,
  ListChecks,
  FileText,
  Route,
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

interface PmSpec {
  problem: string;
  users: string;
  requirements: string[];
  success: string[];
}

interface ImplementationStep {
  phase: string;
  detail: string;
}

interface ExecutionPlan {
  useCase: string;
  techStack: string[];
  prerequisites: string[];
  pmSpec: PmSpec;
  implementation: ImplementationStep[];
}

interface RoadmapProject {
  title: string;
  description: string;
  stack: string[];
  status: 'Planned' | 'In progress' | 'Shipped' | 'Optional';
  scope?: 'Enterprise';
  plan: ExecutionPlan;
}

const projects: RoadmapProject[] = [
  {
    title: 'RAG "Chat with your docs"',
    description:
      'Vector DB + citations + an eval harness. Covers RAG and evals in a single build.',
    stack: ['RAG', 'Vector DB', 'Evals'],
    status: 'Planned',
    plan: {
      useCase:
        'Let a user drop in a set of documents and ask questions, getting answers with inline citations back to the exact source passages.',
      techStack: [
        'Python / FastAPI',
        'LangChain or LlamaIndex',
        'Qdrant or Pinecone',
        'Claude / OpenAI embeddings + chat',
        'React frontend',
        'Ragas for evals',
      ],
      prerequisites: [
        'Comfort with Python and async APIs',
        'Understanding of embeddings and cosine similarity',
        'A document corpus to index',
        'An LLM API key',
      ],
      pmSpec: {
        problem:
          'Teams sit on large document sets they cannot search by meaning, only by keyword.',
        users:
          'Support, ops, and knowledge workers who need grounded answers, not hallucinations.',
        requirements: [
          'Upload and chunk documents',
          'Semantic search over chunks',
          'Answer with citations to the source',
          'Reject or flag low-confidence answers',
        ],
        success: [
          'Answer relevance above baseline on the eval set',
          'Every answer carries at least one citation',
          'p95 response under 3s',
        ],
      },
      implementation: [
        {
          phase: 'Ingestion',
          detail:
            'Load, chunk, and embed documents into the vector store with metadata.',
        },
        {
          phase: 'Retrieval',
          detail:
            'Build a top-k retriever with a re-ranking step and a similarity threshold.',
        },
        {
          phase: 'Generation',
          detail:
            'Prompt the LLM with retrieved context and enforce citation formatting.',
        },
        {
          phase: 'Evaluation',
          detail:
            'Wire Ragas metrics (faithfulness, answer relevance, context precision) into a test set.',
        },
        {
          phase: 'UI',
          detail: 'Ship a chat UI that renders answers with clickable citations.',
        },
      ],
    },
  },
  {
    title: 'MCP Server',
    description:
      'Expose a real tool or API over MCP. The highest-signal, scarcest skill in the 2026 market.',
    stack: ['MCP', 'Agents'],
    status: 'Planned',
    plan: {
      useCase:
        'Expose a real tool or internal API as an MCP server so any MCP-aware client (Claude, IDEs, agents) can call it as a first-class tool.',
      techStack: [
        'TypeScript or Python MCP SDK',
        'Node.js / FastAPI host',
        'A real backing API or DB',
        'JSON Schema for tool defs',
        'Docker for packaging',
      ],
      prerequisites: [
        'Understanding of the MCP protocol (tools, resources, prompts)',
        'An API or data source worth exposing',
        'Comfort with schema-driven tool definitions',
      ],
      pmSpec: {
        problem:
          'Agents cannot safely act on internal systems without a standard, typed tool interface.',
        users:
          'Developers building agents, and end users of AI clients who want real actions, not just chat.',
        requirements: [
          'Define tools with typed inputs and outputs',
          'Handle auth and rate limits',
          'Return structured, model-friendly results',
          'Expose resources and prompts where useful',
        ],
        success: [
          'Server passes MCP inspector validation',
          'A client can discover and call every tool',
          'Errors return actionable messages',
        ],
      },
      implementation: [
        {
          phase: 'Design',
          detail: 'Pick the tool surface and write JSON Schemas for each tool.',
        },
        {
          phase: 'Server',
          detail:
            'Implement the MCP server with the official SDK and wire tools to the backing API.',
        },
        {
          phase: 'Auth',
          detail: 'Add credential handling, scoping, and rate limiting.',
        },
        {
          phase: 'Test',
          detail: 'Validate with the MCP inspector and a live client connection.',
        },
        {
          phase: 'Package',
          detail: 'Dockerize and document install and connection steps.',
        },
      ],
    },
  },
  {
    title: 'Agentic Workflow App',
    description:
      'A multi-step agent doing a real task with LangGraph or CrewAI.',
    stack: ['LangGraph', 'Agents'],
    status: 'Planned',
    plan: {
      useCase:
        'An agent that plans and executes a multi-step real task (for example, research a topic and produce a brief) using tools and working memory.',
      techStack: [
        'LangGraph or CrewAI',
        'Python',
        'LLM API',
        'Tool integrations (search, code, HTTP)',
        'LangSmith for traces',
      ],
      prerequisites: [
        'RAG and tool-calling basics',
        'Understanding of state machines and graphs',
        'A well-scoped task with clear success criteria',
      ],
      pmSpec: {
        problem:
          'Single-shot prompts fail on tasks that need planning, tool use, and iteration.',
        users: 'Anyone offloading a repeatable multi-step knowledge task.',
        requirements: [
          'Decompose a goal into steps',
          'Call tools and react to results',
          'Maintain working state across steps',
          'Stop conditions and error recovery',
        ],
        success: [
          'Completes the target task end to end',
          'Recovers from at least one tool failure',
          'Full trace available for every run',
        ],
      },
      implementation: [
        {
          phase: 'Graph',
          detail: 'Model the workflow as nodes and edges with typed state.',
        },
        {
          phase: 'Tools',
          detail: 'Integrate the tools the agent needs and define their schemas.',
        },
        {
          phase: 'Control',
          detail: 'Add loops, branches, and stop conditions with retries.',
        },
        {
          phase: 'Observability',
          detail: 'Instrument traces so each decision is inspectable.',
        },
        {
          phase: 'Harden',
          detail: 'Add guardrails, timeouts, and cost caps.',
        },
      ],
    },
  },
  {
    title: 'Open-source AISDLC Demo',
    description: 'A public, linkable slice of the Freshworks AISDLC work.',
    stack: ['LLM', 'Dev Tooling'],
    status: 'Planned',
    plan: {
      useCase:
        'A public, linkable slice of the Freshworks AISDLC work that shows AI woven into the software delivery lifecycle.',
      techStack: [
        'TypeScript / Node',
        'LLM API',
        'GitHub Actions',
        'A sample repo to operate on',
        'CLI or bot interface',
      ],
      prerequisites: [
        'Clearance to open-source a sanitized slice',
        'A clear narrative of the AISDLC value',
        'A reproducible demo scenario',
      ],
      pmSpec: {
        problem:
          'The AISDLC work is real but not publicly demonstrable, so it cannot be linked in a portfolio.',
        users:
          'Hiring managers and engineers evaluating the AI-native delivery experience.',
        requirements: [
          'Runnable demo with sample data',
          'Clear README and narrative',
          'No proprietary code or data',
          'One-command setup',
        ],
        success: [
          'Someone can clone and run it in under 10 minutes',
          'The AI value is obvious from the demo',
          'Linkable from the portfolio',
        ],
      },
      implementation: [
        {
          phase: 'Scope',
          detail: 'Choose one AISDLC capability that is safe to open-source.',
        },
        {
          phase: 'Rebuild',
          detail: 'Reimplement it cleanly with synthetic data.',
        },
        {
          phase: 'Package',
          detail: 'Add setup scripts, sample inputs, and a walkthrough.',
        },
        {
          phase: 'Document',
          detail: 'Write the README, architecture note, and demo GIF.',
        },
        {
          phase: 'Publish',
          detail: 'Open-source and link from the portfolio.',
        },
      ],
    },
  },
  {
    title: 'Text-to-SQL Analytics Copilot',
    description:
      'Natural-language questions over a real schema with guardrails, query validation, and result caching. Shows RAG grounded in structured data, not just docs.',
    stack: ['RAG', 'Text-to-SQL', 'Guardrails'],
    status: 'Planned',
    plan: {
      useCase:
        'Ask a question in plain English and get a validated SQL query plus results over a real relational schema.',
      techStack: [
        'Python',
        'LLM with schema-aware prompting',
        'Postgres (read replica)',
        'sqlglot for parse and validate',
        'Redis result cache',
        'React frontend',
      ],
      prerequisites: [
        'A database with a known schema',
        'Understanding of SQL and query safety',
        'RAG basics for schema retrieval',
      ],
      pmSpec: {
        problem:
          'Non-technical users cannot self-serve analytics and block engineers with ad hoc query requests.',
        users: 'PMs, ops, and analysts who know the question but not the SQL.',
        requirements: [
          'Translate natural language to SQL grounded in the schema',
          'Validate and sandbox queries before running',
          'Read-only enforcement',
          'Cache repeated queries',
        ],
        success: [
          'High execution accuracy on a benchmark question set',
          'Zero writes reach the database',
          'Results returned with the generated SQL shown',
        ],
      },
      implementation: [
        {
          phase: 'Schema retrieval',
          detail:
            'Index tables and columns so the model only sees relevant schema.',
        },
        {
          phase: 'Generation',
          detail:
            'Prompt for SQL with few-shot examples and dialect constraints.',
        },
        {
          phase: 'Guardrails',
          detail:
            'Parse, validate, and enforce read-only plus row limits before execution.',
        },
        {
          phase: 'Execution',
          detail: 'Run against a read replica and cache results.',
        },
        {
          phase: 'UI',
          detail: 'Show the answer, the SQL, and let users edit and rerun.',
        },
      ],
    },
  },
  {
    title: 'Voice AI Agent',
    description:
      'A real-time voice agent with streaming STT, LLM reasoning, and TTS. Covers latency budgets, interruption handling, and tool calling under a tight response window.',
    stack: ['Voice', 'Realtime', 'Agents'],
    status: 'Planned',
    plan: {
      useCase:
        'A real-time voice assistant the user can talk to that reasons, calls tools, and talks back with low latency.',
      techStack: [
        'Realtime STT (Deepgram / Whisper)',
        'LLM realtime (Claude / GPT)',
        'TTS (ElevenLabs)',
        'WebRTC or WebSockets',
        'Python / Node backend',
        'Voice activity detection',
      ],
      prerequisites: [
        'Tool-calling agent basics',
        'Understanding of streaming and latency budgets',
        'Audio pipeline familiarity',
      ],
      pmSpec: {
        problem:
          'Typing is a poor interface for hands-busy or accessibility-sensitive tasks.',
        users: 'Callers, drivers, support lines, and accessibility use cases.',
        requirements: [
          'Stream speech to text in real time',
          'Handle interruptions (barge-in)',
          'Call tools mid-conversation',
          'Speak responses with natural latency',
        ],
        success: [
          'Time to first audio under ~1s',
          'Interruptions handled gracefully',
          'Tool calls complete within a turn',
        ],
      },
      implementation: [
        {
          phase: 'Pipeline',
          detail: 'Wire streaming STT to the LLM to streaming TTS.',
        },
        {
          phase: 'Turn-taking',
          detail: 'Add voice activity detection and barge-in handling.',
        },
        {
          phase: 'Tools',
          detail: 'Enable tool calling within the streaming loop.',
        },
        {
          phase: 'Latency',
          detail: 'Profile and cut latency at each hop; stream partial output.',
        },
        {
          phase: 'Deploy',
          detail: 'Serve over WebRTC with a simple call UI.',
        },
      ],
    },
  },
  {
    title: 'LLM Cost / Eval Dashboard',
    description:
      'Leans on the token-optimization strength. Optional stretch project.',
    stack: ['Observability', 'Evals'],
    status: 'Optional',
    plan: {
      useCase:
        'A dashboard that tracks LLM spend, latency, and quality across models and features, with drill-down.',
      techStack: [
        'Python / FastAPI',
        'ClickHouse or Postgres metrics store',
        'React + charting',
        'Provider usage APIs',
        'An eval runner',
      ],
      prerequisites: [
        'LLM usage generating telemetry',
        'A cost model per provider',
        'Eval sets to score against',
      ],
      pmSpec: {
        problem:
          'LLM cost and quality drift are invisible until the bill or a regression appears.',
        users: 'Eng leads and PMs owning AI feature budgets and quality.',
        requirements: [
          'Ingest token, cost, and latency per call',
          'Break down by model, feature, and team',
          'Track eval scores over time',
          'Alert on cost or quality thresholds',
        ],
        success: [
          'Every LLM call is accounted for',
          'Cost per feature is visible',
          'Regressions trigger alerts',
        ],
      },
      implementation: [
        {
          phase: 'Instrument',
          detail: 'Capture usage events from the LLM call sites.',
        },
        {
          phase: 'Store',
          detail: 'Land events in a queryable metrics store.',
        },
        {
          phase: 'Visualize',
          detail: 'Build charts for cost, latency, and eval scores.',
        },
        {
          phase: 'Alert',
          detail: 'Add threshold alerts for spend and quality.',
        },
      ],
    },
  },
  {
    title: 'Multi-Tenant RAG Platform',
    description:
      'Production RAG with per-tenant isolation, role-based access control, document ingestion pipelines, and namespaced vector stores. The pattern most B2B SaaS teams need in 2026.',
    stack: ['RAG', 'Multi-tenant', 'RBAC', 'Kubernetes'],
    status: 'Planned',
    scope: 'Enterprise',
    plan: {
      useCase:
        'A hosted RAG service where many customer tenants each get isolated documents, retrieval, and access control.',
      techStack: [
        'Python / FastAPI',
        'Qdrant or Pinecone with namespaces',
        'Postgres for metadata',
        'Kubernetes',
        'OIDC / RBAC',
        'Ingestion workers (Celery / queues)',
      ],
      prerequisites: [
        'Single-tenant RAG shipped first',
        'Understanding of tenant isolation and RBAC',
        'Kubernetes and queue experience',
      ],
      pmSpec: {
        problem:
          'B2B SaaS teams need RAG per customer without leaking data across tenants.',
        users: 'Platform teams shipping AI features to many business customers.',
        requirements: [
          'Strict per-tenant data isolation',
          'Role-based access to documents and answers',
          'Scalable ingestion pipelines',
          'Per-tenant usage metering',
        ],
        success: [
          'No cross-tenant retrieval in adversarial tests',
          'Ingestion scales horizontally',
          'Access respects roles on every request',
        ],
      },
      implementation: [
        {
          phase: 'Isolation',
          detail:
            'Namespace vectors and metadata per tenant with enforced filters.',
        },
        {
          phase: 'AuthZ',
          detail: 'Add OIDC auth and role-based access checks on every query.',
        },
        {
          phase: 'Ingestion',
          detail:
            'Build async document pipelines with retries and status tracking.',
        },
        {
          phase: 'Scale',
          detail: 'Deploy on Kubernetes with autoscaling workers.',
        },
        {
          phase: 'Metering',
          detail: 'Track per-tenant usage for billing and quotas.',
        },
      ],
    },
  },
  {
    title: 'Agent Orchestration Platform',
    description:
      'A supervisor-and-workers architecture running long-lived agents with durable state, retries, human-in-the-loop approvals, and full trace observability. Enterprise-grade agentic infrastructure.',
    stack: ['LangGraph', 'Temporal', 'Observability', 'HITL'],
    status: 'Planned',
    scope: 'Enterprise',
    plan: {
      useCase:
        'Run long-lived, reliable agents at scale with durable state, retries, approvals, and full tracing.',
      techStack: [
        'LangGraph',
        'Temporal or a durable workflow engine',
        'Postgres for state',
        'Kubernetes',
        'LangSmith / OpenTelemetry',
        'A human-in-the-loop approval UI',
      ],
      prerequisites: [
        'Agentic workflow app shipped',
        'Understanding of durable execution',
        'Observability tooling in place',
      ],
      pmSpec: {
        problem:
          'Agents that run for minutes or hours fail without durable state, retries, and human checkpoints.',
        users: 'Teams operationalizing agents for real business workflows.',
        requirements: [
          'Durable, resumable agent runs',
          'Retries and compensation on failure',
          'Human-in-the-loop approval gates',
          'End-to-end trace observability',
        ],
        success: [
          'Agent runs survive process restarts',
          'Failed steps retry without duplicating work',
          'Every run is fully traceable',
        ],
      },
      implementation: [
        {
          phase: 'Durability',
          detail:
            'Model agent runs as durable workflows with persisted state.',
        },
        {
          phase: 'Supervision',
          detail: 'Add a supervisor that dispatches and monitors worker agents.',
        },
        {
          phase: 'HITL',
          detail: 'Insert approval gates that pause and resume runs.',
        },
        {
          phase: 'Observability',
          detail: 'Emit traces and metrics for every step.',
        },
        {
          phase: 'Scale',
          detail: 'Run workers on Kubernetes with backpressure and quotas.',
        },
      ],
    },
  },
  {
    title: 'AI Gateway & Governance Layer',
    description:
      'A central proxy for all LLM traffic: routing across providers, budget limits, PII redaction, prompt-injection filtering, audit logs, and per-team usage metering. Turns the token-optimization strength into a platform.',
    stack: ['Gateway', 'Security', 'Cost Control', 'Compliance'],
    status: 'Planned',
    scope: 'Enterprise',
    plan: {
      useCase:
        'A single proxy all LLM traffic flows through, adding routing, budgets, safety filtering, and audit.',
      techStack: [
        'Go or Node proxy',
        'Redis for rate limits',
        'Postgres for audit logs',
        'PII detection',
        'Prompt-injection filters',
        'Provider SDKs',
      ],
      prerequisites: [
        'Multiple LLM call sites to consolidate',
        'Understanding of provider APIs and streaming',
        'Security and compliance requirements',
      ],
      pmSpec: {
        problem:
          'Ungoverned direct LLM calls mean no cost control, no audit trail, and no safety enforcement.',
        users: 'Platform, security, and finance teams governing AI usage org-wide.',
        requirements: [
          'Route across providers with fallback',
          'Enforce per-team budgets and rate limits',
          'Redact PII and block prompt injection',
          'Log every request for audit',
        ],
        success: [
          'All LLM traffic passes through the gateway',
          'Budgets enforced in real time',
          'Complete audit trail with redaction',
        ],
      },
      implementation: [
        {
          phase: 'Proxy',
          detail: 'Build a streaming-capable proxy in front of provider APIs.',
        },
        {
          phase: 'Routing',
          detail: 'Add provider routing, fallback, and model aliasing.',
        },
        {
          phase: 'Controls',
          detail: 'Enforce budgets, rate limits, and per-team quotas.',
        },
        {
          phase: 'Safety',
          detail: 'Add PII redaction and prompt-injection filtering.',
        },
        {
          phase: 'Audit',
          detail: 'Log requests, responses, and cost for compliance.',
        },
      ],
    },
  },
  {
    title: 'Enterprise Eval & CI Pipeline',
    description:
      'Automated regression evals wired into CI/CD, gating deployments on quality, safety, and cost thresholds with dashboards and alerting. Makes LLM changes shippable with confidence at scale.',
    stack: ['Evals', 'CI/CD', 'Guardrails', 'Observability'],
    status: 'Planned',
    scope: 'Enterprise',
    plan: {
      useCase:
        'Regression evals that run in CI and gate deployments on quality, safety, and cost.',
      techStack: [
        'Python',
        'Ragas / Promptfoo / DeepEval',
        'GitHub Actions or GitLab CI',
        'A metrics dashboard',
        'LLM-as-judge + assertions',
      ],
      prerequisites: [
        'Eval sets and golden data',
        'A CI/CD pipeline to hook into',
        'Defined quality and cost thresholds',
      ],
      pmSpec: {
        problem:
          'LLM changes ship blind because there is no automated quality gate.',
        users: 'Teams that need to change prompts and models safely at scale.',
        requirements: [
          'Run evals on every PR',
          'Gate merges on thresholds',
          'Track quality and cost over time',
          'Alert on regressions',
        ],
        success: [
          'No prompt or model change merges below threshold',
          'Trends visible per metric',
          'Regressions caught before production',
        ],
      },
      implementation: [
        {
          phase: 'Eval sets',
          detail: 'Curate golden datasets and define metrics per feature.',
        },
        {
          phase: 'Runner',
          detail:
            'Build a repeatable eval runner with assertions and LLM judges.',
        },
        {
          phase: 'CI',
          detail: 'Wire evals into CI to run on every change.',
        },
        {
          phase: 'Gates',
          detail: 'Fail builds below quality, safety, or cost thresholds.',
        },
        {
          phase: 'Dashboards',
          detail: 'Publish trends and alert on regressions.',
        },
      ],
    },
  },
];

const statusStyles: Record<RoadmapProject['status'], string> = {
  Planned: 'bg-blue-100 text-blue-700',
  'In progress': 'bg-amber-100 text-amber-700',
  Shipped: 'bg-emerald-100 text-emerald-700',
  Optional: 'bg-slate-200 text-slate-600',
};

function PlanBullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm text-slate-600">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PlanHeading({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="text-violet-600">{icon}</span>
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-700">
        {children}
      </h4>
    </div>
  );
}

function ExecutionPlanPanel({ plan }: { plan: ExecutionPlan }) {
  return (
    <div className="mt-4 pt-5 border-t border-slate-100 space-y-6">
      {/* Use case */}
      <div>
        <PlanHeading icon={<Target size={15} />}>Use Case</PlanHeading>
        <p className="text-sm text-slate-600">{plan.useCase}</p>
      </div>

      {/* Tech stack */}
      <div>
        <PlanHeading icon={<Layers size={15} />}>Tech Stack</PlanHeading>
        <div className="flex flex-wrap gap-1.5">
          {plan.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div>
        <PlanHeading icon={<ListChecks size={15} />}>
          Prerequisites
        </PlanHeading>
        <PlanBullets items={plan.prerequisites} />
      </div>

      {/* PM spec */}
      <div>
        <PlanHeading icon={<FileText size={15} />}>PM Spec</PlanHeading>
        <div className="space-y-3 text-sm">
          <p className="text-slate-600">
            <span className="font-semibold text-slate-800">Problem: </span>
            {plan.pmSpec.problem}
          </p>
          <p className="text-slate-600">
            <span className="font-semibold text-slate-800">Users: </span>
            {plan.pmSpec.users}
          </p>
          <div>
            <p className="font-semibold text-slate-800 mb-1.5">Requirements</p>
            <PlanBullets items={plan.pmSpec.requirements} />
          </div>
          <div>
            <p className="font-semibold text-slate-800 mb-1.5">
              Success metrics
            </p>
            <PlanBullets items={plan.pmSpec.success} />
          </div>
        </div>
      </div>

      {/* Implementation plan */}
      <div>
        <PlanHeading icon={<Route size={15} />}>
          Implementation Plan
        </PlanHeading>
        <ol className="space-y-3">
          {plan.implementation.map((step, i) => (
            <li key={step.phase} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div className="text-sm">
                <span className="font-semibold text-slate-800">
                  {step.phase}.{' '}
                </span>
                <span className="text-slate-600">{step.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function RoadmapPage() {
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set());

  const toggleProject = (title: string) => {
    setOpenProjects((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

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
            {projects.map((project, index) => {
              const isOpen = openProjects.has(project.title);
              return (
                <div
                  key={project.title}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm flex gap-4"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900">
                          {project.title}
                        </h3>
                        {project.scope === 'Enterprise' && (
                          <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                            Enterprise
                          </span>
                        )}
                      </div>
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

                    <button
                      type="button"
                      onClick={() => toggleProject(project.title)}
                      aria-expanded={isOpen}
                      className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors"
                    >
                      {isOpen ? 'Hide execution plan' : 'View execution plan'}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {isOpen && <ExecutionPlanPanel plan={project.plan} />}
                  </div>
                </div>
              );
            })}
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
