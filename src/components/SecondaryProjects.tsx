import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/content";
import { Workflow, ExternalLink, Sparkles, ShieldCheck } from "lucide-react";

const SECONDARY_IMAGES = [
  {
    image: "/projects/web3-crypto.jpg",
    hud: "Solidity Sepolia Testnet // VRF 256-bit"
  },
  {
    image: "/projects/pipeline-n8n.jpg",
    hud: "Docker Health Probes // Exponential Backoff"
  }
];

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
        Self-hosted automation pipelines and educational cryptographic prototypes with verifiable logic.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PORTFOLIO_DATA.secondaryProjects.map((project, idx) => {
          const meta = SECONDARY_IMAGES[idx] || SECONDARY_IMAGES[0];

          return (
            <div
              key={project.title}
              className="glass-card rounded-2xl border border-white/10 flex flex-col justify-between group overflow-hidden hover:border-cyan-500/30 transition-all duration-300 shadow-xl shadow-black/30"
            >
              {/* Visual Banner */}
              <div className="relative h-40 w-full overflow-hidden bg-slate-950 border-b border-white/10">
                <Image
                  src={meta.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-white/15 text-slate-300 font-mono text-xs">
                    {project.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-[11px]">
                    {project.status}
                  </span>
                </div>

                <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-400 bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
                  {meta.hud}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                    {project.category.includes("Workflow") && <Workflow className="w-4 h-4 text-emerald-400 shrink-0" />}
                    {project.category.includes("Web3") && <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />}
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
            </div>
          );
        })}
      </div>
    </section>
  );
}
