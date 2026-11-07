import { PORTFOLIO_DATA } from "@/data/content";
import { Workflow, ExternalLink } from "lucide-react";

export function SecondaryProjects() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-xl font-bold tracking-tight text-white">Other Projects &amp; Workflows</h2>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>
      <p className="text-xs sm:text-sm text-zinc-400 mb-6">
        Self-hosted automation pipelines and educational cryptographic prototypes.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PORTFOLIO_DATA.secondaryProjects.map((project) => (
          <div
            key={project.title}
            className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px]">
                  {project.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 font-mono text-[10px]">
                  {project.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                {project.category.includes("Workflow") && <Workflow className="w-4 h-4 text-emerald-400" />}
                <span>{project.title}</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 rounded bg-zinc-950 text-zinc-400 font-mono text-[10px]"
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
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
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
