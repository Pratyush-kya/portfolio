"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA, CaseStudy } from "@/data/content";
import { GithubIcon } from "@/components/Icons";
import { ExternalLink, AlertTriangle, Layers, Award, RotateCcw, ArrowRight, Eye } from "lucide-react";

const PROJECT_IMAGES: Record<string, { src: string; overlay: string; tag: string }> = {
  "transformer-profiler": {
    src: "/projects/profiler-hero.jpg",
    overlay: "CUDA Event Interceptor & /dev/shm Ring Buffer",
    tag: "Low-Overhead Telemetry"
  },
  "resumint-ats": {
    src: "/projects/resumint-hero.jpg",
    overlay: "WASM ONNX Local Neural Parser & Radar Vectoring",
    tag: "Zero-Cloud Egress"
  },
  "arogya-relay": {
    src: "/projects/arogya-hero.jpg",
    overlay: "MQTT QoS-1 Spatial Geohash Routing Matrix",
    tag: "Sub-100ms Dispatch"
  }
};

export function FlagshipProjects() {
  const [activeTabs, setActiveTabs] = useState<Record<string, "decisions" | "results" | "problem" | "retrospective">>({
    "transformer-profiler": "decisions",
    "resumint-ats": "decisions",
    "arogya-relay": "decisions",
  });

  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const categories = ["All", "AI Systems", "Client-Side Web", "Health-Tech"];

  const filteredProjects = PORTFOLIO_DATA.flagships.filter((p) => {
    if (categoryFilter === "All") return true;
    if (categoryFilter === "AI Systems") return p.category.includes("AI");
    if (categoryFilter === "Client-Side Web") return p.category.includes("Client-Side");
    if (categoryFilter === "Health-Tech") return p.category.includes("Health");
    return true;
  });

  const setTab = (projectId: string, tab: "decisions" | "results" | "problem" | "retrospective") => {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="projects" className="mb-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <span>Featured Engineering Case Studies</span>
        </h2>
        <span className="h-px flex-1 bg-slate-800" />
      </div>

      <p className="text-sm text-slate-300 mb-6 max-w-2xl">
        In-depth architecture breakdowns with verifiable constraints, engineering trade-offs, and retrospective lessons.
      </p>

      {/* Interactive Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold font-mono transition-all ${
              categoryFilter === cat
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                : "bg-slate-900/60 text-slate-400 hover:text-white border border-white/5 hover:border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-10">
        {filteredProjects.map((project: CaseStudy, idx) => {
          const currentTab = activeTabs[project.id] || "decisions";
          const visual = PROJECT_IMAGES[project.id] || {
            src: "/projects/telemetry-mesh.jpg",
            overlay: "System Blueprint",
            tag: "Production Ready"
          };

          return (
            <article
              key={project.id}
              className="glass-card rounded-2xl border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300 shadow-xl shadow-black/40"
            >
              {/* Rich Visual Image Banner */}
              <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-slate-950 border-b border-white/10">
                <Image
                  src={visual.src}
                  alt={project.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Visual HUD Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-emerald-300 font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{visual.tag}</span>
                  </span>

                  <span className="px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300">
                    ID // 0{idx + 1}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/5">
                    {visual.overlay}
                  </span>
                  <span className="hidden sm:inline bg-black/80 px-2.5 py-1 rounded-md backdrop-blur-sm text-cyan-400 border border-white/5">
                    Architecture Dossier
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8">
                {/* Header / Category / Links */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center">
                        0{idx + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-800/80 border border-white/10 text-slate-300 font-mono text-xs font-medium">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300 font-medium mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* External Action buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-medium transition-colors border border-white/5"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold transition-all shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live App ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Defensible Metrics Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 p-3 rounded-xl bg-slate-950/70 border border-white/5">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="px-2">
                      <div className="text-[11px] text-slate-400 font-mono">{m.label}</div>
                      <div className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Navigation Tabs inside the Card */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/5 mb-5">
                  <button
                    onClick={() => setTab(project.id, "decisions")}
                    className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                      currentTab === "decisions"
                        ? "bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Decisions &amp; Trade-offs
                  </button>
                  <button
                    onClick={() => setTab(project.id, "results")}
                    className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                      currentTab === "results"
                        ? "bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Verified Results
                  </button>
                  <button
                    onClick={() => setTab(project.id, "problem")}
                    className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                      currentTab === "problem"
                        ? "bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Constraints
                  </button>
                  <button
                    onClick={() => setTab(project.id, "retrospective")}
                    className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                      currentTab === "retrospective"
                        ? "bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Retrospective
                  </button>
                </div>

                {/* Tab 1: Decisions & Trade-offs */}
                {currentTab === "decisions" && (
                  <div className="space-y-3 animate-fadeIn">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Key Architectural Choices</span>
                    </h4>
                    <div className="space-y-2">
                      {project.decisionsAndTradeoffs.map((dec, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300 leading-relaxed font-mono flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{dec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 2: Verified Results */}
                {currentTab === "results" && (
                  <div className="space-y-3 animate-fadeIn">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Empirical Benchmarks</span>
                    </h4>
                    <div className="space-y-2">
                      {project.results.map((res, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-xs text-slate-300 leading-relaxed font-mono flex items-start gap-2.5"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Problem & Constraints */}
                {currentTab === "problem" && (
                  <div className="space-y-3 animate-fadeIn">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Constraints &amp; Problem Statement</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-900/40 border border-white/5">
                      <strong className="text-amber-300 font-semibold block mb-1">Problem:</strong>
                      {project.problem}
                    </p>
                    <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 text-amber-200 font-mono text-xs leading-relaxed">
                      <span className="text-amber-400 font-bold block mb-1">Verifiable Constraints:</span>
                      {project.constraints}
                    </div>
                  </div>
                )}

                {/* Tab 4: What I'd change (Retrospective) */}
                {currentTab === "retrospective" && (
                  <div className="space-y-3 animate-fadeIn">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono font-semibold flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                      <span>Honest Retrospective &amp; Known Failure Modes</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed p-4 rounded-xl bg-slate-900/40 border border-white/5">
                      {project.whatIdChange}
                    </p>
                  </div>
                )}

                {/* Tech Stack Pills & Clear Ownership Footer */}
                <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-white/5 text-slate-300 font-mono text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 shrink-0">
                    <span className="text-slate-400">Architecture:</span>{" "}
                    <span className="text-emerald-400 font-semibold">100% Solo Engineering</span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
