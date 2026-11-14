"use client";

import { useState } from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { FileText, Copy, Check, ArrowUpRight, Sparkles, Activity, Shield, Cpu, Terminal } from "lucide-react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [pinged, setPinged] = useState(false);
  const [pingLatency, setPingLatency] = useState(38);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}`;
    }
  };

  const testPing = () => {
    setPinged(true);
    setPingLatency(Math.floor(Math.random() * 20) + 25);
    setTimeout(() => setPinged(false), 1500);
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

      {/* 2-Column Responsive Hero Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12">
        {/* Left Column: Headline, Narrative & CTAs */}
        <div className="lg:col-span-7">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Pratyush Kiran Rath
          </h1>

          <p className="text-xl sm:text-2xl font-semibold leading-snug mb-6">
            <span className="text-slate-200">Computer Science student building </span>
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              developer tooling, LLM telemetry &amp; web applications.
            </span>
          </p>

          <p className="text-base text-slate-300 leading-relaxed mb-8 max-w-xl">
            Focused on low-overhead systems profiling, privacy-first client-side computing, and automated operational pipelines. Undergraduate at Centurion University of Technology and Management (B.Tech CSE, 2025–2029).
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
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

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4.5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-emerald-500/30 text-slate-200 text-sm font-medium transition-all shadow-lg shadow-black/20"
              aria-label="Copy email address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span className="font-mono text-xs">{copied ? "Copied: pratyushkiranrath4@gmail.com" : "Copy Email"}</span>
            </button>

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

          {/* Connected Engineering Ecosystem (LinkedIn • GitHub • Vercel • Supabase) */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Ecosystem:</span>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/50 border border-sky-500/30 text-sky-300 text-xs font-mono hover:bg-sky-900/50 transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-white/10 text-slate-300 text-xs font-mono hover:bg-slate-800 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 border border-white/15 text-slate-300 text-xs font-mono">
              <span className="text-white font-bold">▲</span>
              <span>Vercel Edge</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Supabase DB</span>
            </span>
          </div>
        </div>

        {/* Right Column: Web3 Futuristic Holographic Status Card */}
        <div className="lg:col-span-5">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-slate-950/90 shadow-2xl shadow-emerald-950/40 p-5 group scroll-reactive">
            {/* Ambient Corner Mesh */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Visual Header Image with Cyber HUD */}
            <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-white/10">
              <Image
                src="/projects/profiler-real.png"
                alt="Transformer Inference Profiler Telemetry Console"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
                  <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Inference Profiler: Active</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-400">
                  Production Benchmark
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  Linux 6.8 /dev/shm
                </span>
                <span className="text-cyan-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                  14.8 GB/s Bus
                </span>
              </div>
            </div>

            {/* Live Interactive Telemetry Ticker */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-slate-900/80 border border-white/5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CUDA Sampling</span>
                </span>
                <span className="text-emerald-400 font-bold">60 Hz &lt;1.2%</span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono p-2 rounded-lg bg-slate-900/80 border border-white/5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>Client Privacy</span>
                </span>
                <span className="text-purple-300 font-bold">0 Byte Egress</span>
              </div>
            </div>

            {/* Ping Simulator Button */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-slate-300">
                  Telemetry Ping: <span className="text-emerald-400 font-bold">{pingLatency}ms</span>
                </span>
              </div>

              <button
                onClick={testPing}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold transition-all active:scale-95"
              >
                {pinged ? "Echoing..." : "Ping Broker"}
              </button>
            </div>
          </div>
        </div>
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
              className="glass-card p-4 rounded-xl border border-white/10 hover:border-emerald-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 mb-1">
                {metric.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mb-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-300 font-mono leading-tight">
                {metric.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
