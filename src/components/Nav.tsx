"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Main Navigation" className="sticky top-4 z-50 mb-12">
      <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-slate-900/75 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40">
        <a
          href="#top"
          className="flex items-center gap-3 text-slate-100 font-semibold tracking-tight hover:text-white transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            PR
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
              Pratyush Rath
            </span>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Available for Hire</span>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
          <a href="#projects" className="hover:text-emerald-400 transition-colors">
            Projects
          </a>
          <a href="#interactive-lab" className="hover:text-emerald-400 transition-colors">
            Interactive Lab
          </a>
          <a href="#deep-dive" className="hover:text-emerald-400 transition-colors">
            Deep Dive
          </a>
          <a href="#skills" className="hover:text-emerald-400 transition-colors">
            Skills
          </a>
          <a href="#about" className="hover:text-emerald-400 transition-colors">
            About
          </a>
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 font-medium text-xs transition-all"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 border border-white/5 focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 p-5 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl flex flex-col gap-3 text-sm text-slate-200">
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="py-1.5 hover:text-emerald-400 transition-colors"
          >
            Featured Projects
          </a>
          <a
            href="#interactive-lab"
            onClick={() => setIsOpen(false)}
            className="py-1.5 hover:text-emerald-400 transition-colors"
          >
            Interactive Lab &amp; Simulator
          </a>
          <a
            href="#deep-dive"
            onClick={() => setIsOpen(false)}
            className="py-1.5 hover:text-emerald-400 transition-colors"
          >
            Technical Article (Deep Dive)
          </a>
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="py-1.5 hover:text-emerald-400 transition-colors"
          >
            Skills &amp; Tech Stack
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="py-1.5 hover:text-emerald-400 transition-colors"
          >
            About &amp; Education
          </a>
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="mt-2 py-2.5 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-center flex items-center justify-center gap-1.5"
          >
            <span>View Resume (PDF)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </nav>
  );
}
