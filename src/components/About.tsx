import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/content";
import { GraduationCap, Cpu, ShieldCheck, Zap, User } from "lucide-react";

export function About() {
  return (
    <section id="about" className="mb-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <User className="w-6 h-6 text-emerald-400" />
          <span>About Me</span>
        </h2>
        <span className="h-px flex-1 bg-slate-800" />
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-xl shadow-black/40">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar representation with high-res portrait and status beacon */}
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shrink-0 shadow-xl shadow-emerald-500/20 group">
            <Image
              src="/avatar.jpg"
              alt="Pratyush Kiran Rath"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none" />
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
          </div>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed flex-1">
            <p>
              I am an undergraduate Computer Science student at{" "}
              <strong className="text-white font-medium">{PORTFOLIO_DATA.personal.university}</strong>{" "}
              ({PORTFOLIO_DATA.personal.period}). My work is driven by pragmatic minimalism: rather than adding layers of premature abstraction, I focus on building software that is measurable, resource-efficient, and fast.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>Systems Telemetry</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Profiling KV-cache footprint &amp; Shannon entropy during LLM decoding with zero disk write overhead.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold mb-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Client-Side Privacy</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Moving compute into the user&apos;s browser (via Web Workers) to guarantee zero sensitive data exposure.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold mb-1.5">
                  <Zap className="w-4 h-4" />
                  <span>Workflow Ops</span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Self-hosted webhook automation pipelines for event triage, monitoring alerts, and operations.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 pt-2 border-t border-white/5 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Based in Odisha, India. Seeking summer 2026 systems engineering, full-stack, and developer tooling internships.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
