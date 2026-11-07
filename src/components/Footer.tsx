"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Copy, Check, Mail, Shield } from "lucide-react";

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
    <footer id="contact" className="pt-12 pb-8 border-t border-zinc-800/80">
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 sm:p-8 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
          Let&apos;s Connect
        </h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-xl">
          I am actively exploring <strong className="text-zinc-200">Summer 2026 / 2027 Software Engineering and ML Systems internships</strong>. If you are building high-performance systems or developer tools, feel free to reach out.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Copy Email Button */}
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs sm:text-sm transition-colors shadow-md shadow-emerald-500/10"
            aria-label="Copy email address"
          >
            {copied ? <Check className="w-4 h-4 text-zinc-950" /> : <Copy className="w-4 h-4 text-zinc-950" />}
            <span>{copied ? "Copied: " + PORTFOLIO_DATA.personal.email : "Copy Email"}</span>
          </button>

          {/* Direct Mailto */}
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs sm:text-sm font-medium transition-colors"
          >
            <Mail className="w-4 h-4 text-zinc-400" />
            <span>Open Mail Client ↗</span>
          </a>

          {/* LinkedIn */}
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium transition-colors"
          >
            <LinkedinIcon className="w-4 h-4 text-sky-400" />
            <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs sm:text-sm font-medium transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Footer Info & Privacy notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-300 font-mono">
        <div className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>Privacy-first: No tracking cookies or personal data collected.</span>
        </div>
        <div className="text-zinc-300">
          Resume last updated: {PORTFOLIO_DATA.personal.resumeLastUpdated} · Next.js SSG
        </div>
      </div>
    </footer>
  );
}
