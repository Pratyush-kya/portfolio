"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/content";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav aria-label="Main Navigation" className="sticky top-4 z-50 mb-12">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-xl shadow-black/20">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-zinc-200 font-mono text-sm font-semibold tracking-tight hover:text-white transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>PKR // 2026</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
          <a href="#projects" className="hover:text-zinc-100 transition-colors">
            Projects
          </a>
          <a href="#deep-dive" className="hover:text-zinc-100 transition-colors">
            Deep Dive
          </a>
          <a href="#skills" className="hover:text-zinc-100 transition-colors">
            Skills
          </a>
          <a href="#about" className="hover:text-zinc-100 transition-colors">
            About
          </a>
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            Resume ↗
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 p-4 bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col gap-3 text-sm text-zinc-300">
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="py-1 hover:text-white"
          >
            Projects
          </a>
          <a
            href="#deep-dive"
            onClick={() => setIsOpen(false)}
            className="py-1 hover:text-white"
          >
            Deep Dive (Article)
          </a>
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="py-1 hover:text-white"
          >
            Skills & Stack
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="py-1 hover:text-white"
          >
            About & Education
          </a>
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="py-1 text-emerald-400 font-medium"
          >
            View Resume (PDF) ↗
          </a>
        </div>
      )}
    </nav>
  );
}
