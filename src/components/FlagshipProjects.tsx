import { PORTFOLIO_DATA } from "@/data/content";
import { GithubIcon } from "@/components/Icons";
import { ExternalLink, Activity, AlertTriangle, Layers, Award, RotateCcw } from "lucide-react";

export function FlagshipProjects() {
  return (
    <section id="projects" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Featured Engineering Case Studies</h2>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>
      <p className="text-sm text-zinc-400 mb-8 max-w-2xl">
        Three in-depth case studies documenting actual technical constraints, trade-offs, measurable results, and retrospective changes.
      </p>

      <div className="space-y-10">
        {PORTFOLIO_DATA.flagships.map((project, idx) => (
          <article
            key={project.id}
            className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/90 relative overflow-hidden"
          >
            {/* Header / Category / Links */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-mono text-xs">
                    0{idx + 1} // {project.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 font-medium">
                  {project.subtitle}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-medium transition-colors"
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
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo ↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/60">
              {project.metrics.map((m) => (
                <div key={m.label} className="px-2">
                  <div className="text-xs text-zinc-400 font-mono">{m.label}</div>
                  <div className="text-sm sm:text-base font-bold font-mono text-emerald-400">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep-dive sections */}
            <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {/* Problem */}
              <div>
                <h4 className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-1 font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>The Problem</span>
                </h4>
                <p className="text-zinc-300">{project.problem}</p>
              </div>

              {/* Technical Constraints */}
              <div>
                <h4 className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-1 font-semibold">
                  <Activity className="w-3.5 h-3.5 text-sky-400" />
                  <span>Constraints</span>
                </h4>
                <p className="text-zinc-400">{project.constraints}</p>
              </div>

              {/* Architectural Decisions & Trade-offs */}
              <div>
                <h4 className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Decisions &amp; Trade-offs</span>
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-zinc-300">
                  {project.decisionsAndTradeoffs.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>

              {/* Measurable Results */}
              <div>
                <h4 className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-1.5 font-semibold">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Measurable Results</span>
                </h4>
                <ul className="space-y-1 list-disc list-inside text-zinc-300">
                  {project.results.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>

              {/* What I'd Change in Retrospect */}
              <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 mt-4">
                <h4 className="flex items-center gap-1.5 text-amber-300 font-mono text-xs uppercase tracking-wider mb-1 font-semibold">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>What I Would Change in Retrospect</span>
                </h4>
                <p className="text-zinc-400 text-xs sm:text-sm italic leading-normal">
                  &ldquo;{project.whatIdChange}&rdquo;
                </p>
              </div>
            </div>

            {/* Tech Stack Footer */}
            <div className="mt-5 pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-zinc-400 font-mono mr-1">Stack:</span>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-[11px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
