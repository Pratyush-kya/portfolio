"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { FileText, Copy, Check, ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}`;
    }
  };

  return (
    <section id="top" className="mb-20 pt-4">
      {/* Availability Status Badge */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-8 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-lg shadow-emerald-950/50">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-medium tracking-wide">{PORTFOLIO_DATA.personal.statusBadge}</span>
      </div>

      {/* Main Name with Subtle Glow */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
        Pratyush Kiran Rath
      </h1>

      {/* Dynamic Gradient Headline */}
      <p className="text-xl sm:text-2xl font-semibold leading-snug max-w-2xl mb-6">
        <span className="text-slate-200">Computer Science student building </span>
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          developer tooling, LLM telemetry &amp; web applications.
        </span>
      </p>

      {/* Honest, Grounded Narrative */}
      <p className="text-base text-slate-300 leading-relaxed max-w-2xl mb-10">
        Focused on low-overhead systems profiling, privacy-first client-side computing, and automated operational pipelines. Undergraduate at Centurion University of Technology and Management (B.Tech CSE, 2025–2029).
      </p>

      {/* Actions: Primary CTA + Secondary Actions */}
      <div className="flex flex-wrap items-center gap-3.5 mb-14">
        {/* Dominant Primary CTA */}
        <a
          href={PORTFOLIO_DATA.personal.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98]"
        >
          <FileText className="w-4 h-4" />
          <span>View Resume (PDF)</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        {/* Copy Email Button */}
        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/30 text-slate-200 text-sm font-medium transition-all shadow-lg shadow-black/20"
          aria-label="Copy email address"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          <span className="font-mono text-xs">{copied ? "Copied: pratyushkiranrath4@gmail.com" : "Copy Email"}</span>
        </button>

        {/* GitHub */}
        <a
          href={PORTFOLIO_DATA.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-sm font-medium transition-colors"
          aria-label="GitHub Profile"
        >
          <GithubIcon className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </a>

        {/* LinkedIn */}
        <a
          href={PORTFOLIO_DATA.personal.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-sm font-medium transition-colors"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
      </div>

      {/* Defensible Benchmarks Strip with Glowing Cards */}
      <div className="pt-8 border-t border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <h2 className="text-xs uppercase tracking-wider text-slate-300 font-mono font-semibold">
            Defensible Benchmarks &amp; Proof Points
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {PORTFOLIO_DATA.defensibleMetrics.map((metric) => (
            <div
              key={metric.label}
              className="glass-card p-4 rounded-xl flex flex-col justify-between group"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-white mb-1.5">
                  {metric.label}
                </div>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
