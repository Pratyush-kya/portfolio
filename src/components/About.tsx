import { PORTFOLIO_DATA } from "@/data/content";
import { GraduationCap, Cpu, ShieldCheck, Zap } from "lucide-react";

export function About() {
  return (
    <section id="about" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">About Me</h2>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>

      <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar representation / badge */}
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 border border-zinc-700/80 flex items-center justify-center shrink-0 text-emerald-400 font-mono text-xl font-bold">
            PKR
          </div>

          <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
            <p>
              I am an undergraduate Computer Science student at{" "}
              <strong className="text-white font-medium">{PORTFOLIO_DATA.personal.university}</strong>{" "}
              ({PORTFOLIO_DATA.personal.period}). My work is driven by pragmatic minimalism: rather than adding layers of premature abstraction, I focus on building software that is measurable, resource-efficient, and fast.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Systems Telemetry</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Profiling KV-cache footprint &amp; Shannon entropy during LLM decoding with zero disk write overhead.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Client-Side Privacy</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Moving compute into the user&apos;s browser (via Web Workers) to guarantee zero sensitive data exposure.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Workflow Ops</span>
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Self-hosted webhook automation pipelines for event triage, monitoring alerts, and operations.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-zinc-400 font-mono">
              <GraduationCap className="w-4 h-4 text-zinc-300" />
              <span>Current Status: B.Tech CSE (Centurion University) · Graduating 2029</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
