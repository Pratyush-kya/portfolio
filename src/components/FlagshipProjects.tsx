"use client";

import { useState } from "react";
import { PORTFOLIO_DATA, CaseStudy } from "@/data/content";
import { GithubIcon } from "@/components/Icons";
import { ExternalLink, AlertTriangle, Layers, Award, RotateCcw, ArrowRight } from "lucide-react";

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
      <div className="space-y-8">
        {filteredProjects.map((project: CaseStudy, idx) => {
          const currentTab = activeTabs[project.id] || "decisions";

          return (
            <article
              key={project.id}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden"
            >
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
                  Trade-offs &amp; Architecture
                </button>
                <button
                  onClick={() => setTab(project.id, "results")}
                  className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                    currentTab === "results"
                      ? "bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Measurable Results
                </button>
                <button
                  onClick={() => setTab(project.id, "problem")}
                  className={`flex-1 min-w-[100px] py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                    currentTab === "problem"
                      ? "bg-slate-800 text-emerald-300 border border-emerald-500/30 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  The Problem &amp; Scope
                </button>
                <button
                  onClick={() => setTab(project.id, "retrospective")}
                  className={`flex-1 min-w-[110px] py-1.5 px-3 rounded-lg text-xs font-mono font-medium transition-all ${
                    currentTab === "retrospective"
                      ? "bg-slate-800 text-amber-300 border border-amber-500/30 shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  What I&apos;d Change
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[120px] text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-white/5">
                {currentTab === "decisions" && (
                  <div>
                    <h4 className="flex items-center gap-1.5 text-indigo-400 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Architectural Decisions &amp; Engineering Trade-offs</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.decisionsAndTradeoffs.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentTab === "results" && (
                  <div>
                    <h4 className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      <span>Verified Results &amp; Benchmarks</span>
                    </h4>
                    <ul className="space-y-2">
                      {project.results.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {currentTab === "problem" && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="flex items-center gap-1.5 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1 font-semibold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>The Problem</span>
                      </h4>
                      <p className="text-slate-200">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-sky-400 font-mono text-xs uppercase tracking-wider mb-1 font-semibold">
                        Technical Constraints
                      </h4>
                      <p className="text-slate-400">{project.constraints}</p>
                    </div>
                  </div>
                )}

                {currentTab === "retrospective" && (
                  <div>
                    <h4 className="flex items-center gap-1.5 text-amber-300 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retrospective Engineering Insight</span>
                    </h4>
                    <p className="text-slate-300 italic leading-relaxed">
                      &ldquo;{project.whatIdChange}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Tech Stack Footer */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-400 font-mono mr-1">Stack:</span>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-white/5 text-slate-300 font-mono text-[11px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
