import { PORTFOLIO_DATA } from "@/data/content";
import { Workflow, ExternalLink, Sparkles } from "lucide-react";

export function SecondaryProjects() {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <span>Secondary Projects &amp; Workflows</span>
        </h2>
        <span className="h-px flex-1 bg-slate-800" />
      </div>
      <p className="text-xs sm:text-sm text-slate-300 mb-6">
        Self-hosted automation pipelines and educational cryptographic prototypes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PORTFOLIO_DATA.secondaryProjects.map((project) => (
          <div
            key={project.title}
            className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-white/10 text-slate-300 font-mono text-xs">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]">
                  {project.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 group-hover:text-emerald-400 transition-colors">
                {project.category.includes("Workflow") && <Workflow className="w-4 h-4 text-emerald-400 shrink-0" />}
                <span>{project.title}</span>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded bg-slate-950/80 border border-white/5 text-slate-400 font-mono text-[10px]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>{project.linkText}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
