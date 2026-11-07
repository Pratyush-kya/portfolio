"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { FileText, Copy, Check, ArrowUpRight } from "lucide-react";

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
    <section id="top" className="mb-16">
      {/* Availability Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>{PORTFOLIO_DATA.personal.statusBadge}</span>
      </div>

      {/* Name and Headline */}
      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        {PORTFOLIO_DATA.personal.name}
      </h1>

      <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed max-w-2xl mb-4">
        Computer Science student building developer tooling, LLM inference telemetry &amp; web applications.
      </p>

      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mb-8">
        Focused on low-overhead systems profiling, privacy-first client-side computing, and automated operational pipelines. Studying B.Tech in CSE at Centurion University of Technology and Management (2025–2029).
      </p>

      {/* Actions: Primary CTA + Secondary Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-12">
        {/* Dominant Primary CTA */}
        <a
          href={PORTFOLIO_DATA.personal.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
        >
          <FileText className="w-4 h-4" />
          <span>View Resume (PDF)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        {/* Copy Email Button */}
        <button
          onClick={copyEmail}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 text-sm font-medium transition-colors"
          aria-label="Copy email address"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
          <span>{copied ? "Copied to clipboard!" : "Copy Email"}</span>
        </button>

        {/* GitHub */}
        <a
          href={PORTFOLIO_DATA.personal.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium transition-colors"
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
          className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium transition-colors"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
      </div>

      {/* Defensible Metrics Strip */}
      <div className="pt-8 border-t border-zinc-800/80">
        <h2 className="text-xs uppercase tracking-wider text-zinc-300 font-mono mb-4">
          Defensible Benchmarks &amp; Proof Points
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {PORTFOLIO_DATA.defensibleMetrics.map((metric) => (
            <div
              key={metric.label}
              className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mb-0.5">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-zinc-200 mb-1">
                  {metric.label}
                </div>
              </div>
              <p className="text-[11px] text-zinc-400 leading-tight">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
