export interface Metric {
  value: string;
  label: string;
  detail: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  problem: string;
  constraints: string;
  decisionsAndTradeoffs: string[];
  results: string[];
  whatIdChange: string;
}

export interface SecondaryProject {
  title: string;
  category: string;
  techStack: string[];
  description: string;
  status: "Prototype" | "Self-Hosted" | "Experimental";
  link?: string;
  linkText?: string;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; projectAnchor: string }[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Pratyush Kiran Rath",
    role: "Computer Science Student & Systems/Full-Stack Developer",
    headline: "Computer Science student @ Centurion University building developer tooling, LLM inference telemetry & web applications.",
    bio: "I am an undergraduate Computer Science student at Centurion University of Technology and Management (Class of 2029). My focus sits at the intersection of systems efficiency, telemetry, and practical web tooling. Rather than building speculative abstractions, I prefer writing lightweight tools that measure and optimize what already exists.",
    university: "Centurion University of Technology and Management (CUTM)",
    degree: "B.Tech in Computer Science and Engineering",
    period: "2025 – 2029",
    email: "pratyushkiranrath4@gmail.com",
    github: "https://github.com/Pratyush-kya",
    linkedin: "https://www.linkedin.com/in/pratyush-kiran-rath-3a187937a",
    resumeUrl: "/resume/Pratyush-Rath-Resume.pdf",
    resumeLastUpdated: "November 2026",
    statusBadge: "Seeking Summer 2026 / 2027 Software & ML Systems Internships",
  },

  defensibleMetrics: [
    {
      value: "29 / 29",
      label: "Unit Tests Passing",
      detail: "Full PyTest suite on Transformer Inference Profiler covering Shannon entropy & KV calculations.",
    },
    {
      value: "0.00 MB/s",
      label: "Disk I/O Rate",
      detail: "Measured via iotop during sustained LLM decoding using /dev/shm tmpfs circular buffers.",
    },
    {
      value: "0 Bytes",
      label: "Data Uploaded",
      detail: "100% in-browser client-side PDF parsing on Resumint—network inspector verified.",
    },
    {
      value: "3",
      label: "Live Vercel Apps",
      detail: "Active, publicly accessible web applications with zero cold start latency.",
    },
  ] as Metric[],

  flagships: [
    {
      id: "transformer-profiler",
      title: "Transformer Inference Profiler",
      subtitle: "Low-Overhead Mechanistic Memory Telemetry Suite",
      category: "AI Systems & Telemetry",
      techStack: ["Python", "PyTorch", "Plotly Dash", "Linux /dev/shm", "SQLite In-Memory", "PyTest"],
      repoUrl: "https://github.com/Pratyush-kya/transformer-inference-profiler",
      metrics: [
        { label: "Disk Write Rate", value: "0.00 MB/s" },
        { label: "Test Suite", value: "29/29 Passing" },
        { label: "Telemetry Refresh", value: "60 FPS" },
      ],
      problem:
        "In autoregressive transformer decoding, Key-Value (KV) cache memory consumption scales linearly with context length (O(N)), frequently triggering unexpected Out-Of-Memory (OOM) crashes. Existing profilers either log to disk (causing severe I/O latency jitter during live generation) or only provide coarse post-hoc GPU metrics after a crash has already occurred.",
      constraints:
        "The profiler had to run concurrently alongside PyTorch model inference without degrading token generation throughput, while operating with zero disk writes to support container environments with strict ephemeral storage quotas.",
      decisionsAndTradeoffs: [
        "In-RAM tmpfs Circular Buffers: Instead of streaming log files to disk, routed telemetry into /dev/shm shared memory tmpfs using ring buffers and in-memory SQLite tables, completely eliminating storage I/O bottlenecks.",
        "Logit-Level Shannon Entropy: Intercepted logits via PyTorch hooks to calculate instantaneous token entropy H(X) and candidate competition margins, surfacing hallucination risks in real-time.",
        "Analytical KV-Cache Formulation: Implemented exact byte formulas for Multi-Head Attention (MHA), Grouped-Query Attention (GQA), and Multi-Head Latent Attention (MLA).",
      ],
      results: [
        "Maintained 0.00 MB/s disk write activity during sustained batch generation runs.",
        "Verified 29/29 PyTest test suite covering entropy edge-cases and mathematical precision.",
        "Delivered a live 60 FPS Plotly Dash visual dashboard streaming memory trajectories.",
      ],
      whatIdChange:
        "Python-level PyTorch forward hooks incur a 3-5% overhead on very small batch sizes. In a future iteration, I would implement the interception hook as a native C++/Triton kernel directly at the GPU memory barrier.",
    },
    {
      id: "resumint-ats",
      title: "Resumint — Privacy-First ATS Analyzer",
      subtitle: "Client-Side In-Browser Resume Parser & Keyword Scorer",
      category: "Client-Side Web Application",
      techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "pdfjs-dist"],
      liveUrl: "https://resumint-eta.vercel.app",
      repoUrl: "https://github.com/Pratyush-kya/Resumint",
      metrics: [
        { label: "External Uploads", value: "0 Bytes" },
        { label: "Parsing Latency", value: "< 250ms" },
        { label: "Hosting Cost", value: "$0.00 (Static Edge)" },
      ],
      problem:
        "Commercial ATS resume scanners require job applicants to upload personal resumes containing phone numbers, addresses, and full career histories to remote servers with ambiguous data storage and retention practices.",
      constraints:
        "Must parse multi-column PDF layouts and compute semantic keyword matching in under 500ms without utilizing any backend compute servers.",
      decisionsAndTradeoffs: [
        "In-Browser Web Workers: Bundled Mozilla pdfjs-dist inside a dedicated Web Worker to extract raw PDF text asynchronously without locking the browser's UI thread.",
        "Zero-Backend Static Architecture: Deployed as a purely client-side Next.js static application on Vercel's edge network, guaranteeing zero server costs and zero data persistence risk.",
        "Self-Dogfooding: Tested and scored my own resume live through the parsing engine to audit keyword extraction fidelity.",
      ],
      results: [
        "Zero bytes transmitted across the network during resume analysis (verifiable via browser Network DevTools).",
        "Sub-250ms extraction and scoring latency on standard two-page technical resumes.",
        "100% user data privacy with instant client-side ATS feedback.",
      ],
      whatIdChange:
        "Current keyword tokenization relies on term frequency heuristics and regular expressions. I plan to compile a lightweight Rust WebAssembly module with vector embeddings for true semantic similarity matching directly in the browser.",
    },
    {
      id: "arogya-relay",
      title: "Arogya-Relay",
      subtitle: "Emergency Ambulance Dispatch & Triage Telemetry (Prototype)",
      category: "Health-Tech Prototype & State Machine",
      techStack: ["Next.js", "Supabase PostgreSQL 17", "TypeScript", "Tailwind CSS"],
      liveUrl: "https://arogya-relay.vercel.app",
      repoUrl: "https://github.com/Pratyush-kya/Arogya-Relay-",
      metrics: [
        { label: "State Sync Latency", value: "< 150ms" },
        { label: "Database Engine", value: "PostgreSQL 17" },
        { label: "Deployment", value: "Public Prototype" },
      ],
      problem:
        "Emergency ambulance routing and preliminary patient triage communication between field personnel and regional hospital desks are often fragmented across disparate phone calls and manual paper logs.",
      constraints:
        "The interface needed to remain fast and responsive on low-end mobile hardware operating over unstable 3G networks, while enforcing strict idempotent state transitions.",
      decisionsAndTradeoffs: [
        "PostgreSQL 17 State Machine: Used Supabase PostgreSQL with Row Level Security (RLS) and strict database state constraints (Dispatched -> En Route -> Triage Logged -> Arrived) to prevent invalid concurrent transitions.",
        "Simulated Telemetry Pipeline: Built a telemetry streamer simulating transit coordinates and basic patient vitals to validate real-time triage board responsiveness without requiring physical fleet hardware.",
      ],
      results: [
        "Achieved sub-150ms state synchronization latency between dispatch input and the central triage dashboard.",
        "Delivered a touch-optimized mobile interface designed for readability in high-stress transit conditions.",
      ],
      whatIdChange:
        "An unexpected network drop pauses live updates in the prototype. I would implement an offline-first local queue with IndexedDB and background service workers to buffer logs locally and sync automatically upon reconnection.",
    },
  ] as CaseStudy[],

  secondaryProjects: [
    {
      title: "Operational Workflow Automations (n8n)",
      category: "Workflow Orchestration",
      techStack: ["n8n", "Docker", "Webhooks", "Bash", "Telegram API"],
      status: "Self-Hosted",
      description:
        "Self-hosted automation pipelines eliminating operational toil: webhook-driven developer inquiry classification, engineering note repurposing into multi-platform formats, and automated uptime alert dispatch to Telegram.",
      link: "https://github.com/Pratyush-kya/enterprise-n8n-automations",
      linkText: "View Workflow Architectures ↗",
    },
    {
      title: "CypherRoll Web3",
      category: "Cryptographic Prototype",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Web3"],
      status: "Prototype",
      description:
        "An educational Web3 prototype exploring provably fair gaming logic. Implements client-side hash verification allowing users to cryptographically validate roll randomness against predetermined server seeds.",
      link: "https://cypherroll-web3.vercel.app",
      linkText: "Launch Prototype ↗",
    },
  ] as SecondaryProject[],

  skills: [
    {
      title: "Systems & Telemetry",
      skills: [
        { name: "Python", projectAnchor: "Transformer Profiler" },
        { name: "PyTorch", projectAnchor: "Transformer Profiler" },
        { name: "Linux /dev/shm", projectAnchor: "In-RAM Tmpfs" },
        { name: "SQLite (In-Memory)", projectAnchor: "Ring Buffers" },
        { name: "PyTest (29/29 Tests)", projectAnchor: "Test Suite" },
      ],
    },
    {
      title: "Frontend & Web",
      skills: [
        { name: "TypeScript", projectAnchor: "All Web Projects" },
        { name: "Next.js 16 (App Router)", projectAnchor: "Resumint & Portfolio" },
        { name: "React 19", projectAnchor: "Resumint" },
        { name: "Tailwind CSS v4", projectAnchor: "All UIs" },
        { name: "Plotly Dash", projectAnchor: "60 FPS Visualizer" },
        { name: "pdfjs-dist (Web Workers)", projectAnchor: "Resumint In-Browser" },
      ],
    },
    {
      title: "Backend, Data & Ops",
      skills: [
        { name: "Supabase PostgreSQL 17", projectAnchor: "Arogya-Relay" },
        { name: "SQL & RLS Security", projectAnchor: "Arogya-Relay" },
        { name: "n8n Self-Hosted", projectAnchor: "Automation Pipelines" },
        { name: "Docker", projectAnchor: "Workflow Runtime" },
        { name: "Git & GitHub CLI", projectAnchor: "Version Control" },
        { name: "Vercel Edge Platform", projectAnchor: "SSG Hosting" },
      ],
    },
  ] as SkillCategory[],

  featuredArticle: {
    slug: "zero-disk-telemetry-kv-cache",
    title: "Zero-Disk Telemetry: Monitoring Autoregressive LLM KV-Cache in RAM with /dev/shm",
    date: "November 2026",
    readTime: "6 min read",
    summary:
      "Why standard disk logging destroys inference throughput during autoregressive token generation, and how to architect an in-RAM circular ring buffer delivering 60 FPS visual telemetry with 0.00 MB/s disk write rate.",
  },
};
