"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Copy, Check, Mail, Shield, Sparkles } from "lucide-react";

export function Footer() {
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
    <footer id="contact" className="pt-16 pb-12 border-t border-white/10">
      <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 mb-10 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Get in Touch</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
          Let&apos;s Build Something Fast &amp; Reliable
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-xl leading-relaxed">
          I am actively exploring <strong className="text-white">Summer 2026 / 2027 Software Engineering and ML Systems internships</strong>. If you are building high-performance systems or developer tools, I would love to connect.
        </p>

        <div className="flex flex-wrap items-center gap-3.5">
          {/* Copy Email Button */}
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
            aria-label="Copy email address"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
            <span className="font-mono">{copied ? "Copied to clipboard!" : "Copy Email"}</span>
          </button>

          {/* Direct Mailto */}
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-white/10 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            <span>Open Mail Client ↗</span>
          </a>

          {/* LinkedIn */}
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-sky-400" />
            <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Footer Info & Privacy notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400 font-mono">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Privacy-first architecture: No tracking cookies or personal data collected.</span>
        </div>
        <div className="text-slate-400">
          Resume updated: {PORTFOLIO_DATA.personal.resumeLastUpdated} · Next.js 16 SSG
        </div>
      </div>
    </footer>
  );
}
