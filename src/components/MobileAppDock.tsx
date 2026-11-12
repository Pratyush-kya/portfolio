"use client";

import { useState, useEffect } from "react";
import { Sparkles, Layers, Cpu, FileText, Mail, Check, Compass, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";

export function MobileAppDock() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("showcase");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["top", "showcase", "projects", "interactive-lab", "smart-display"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}`;
    }
  };

  return (
    <nav 
      aria-label="Mobile Application Dock"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md md:hidden"
    >
      <div className="flex items-center justify-around px-2 py-2 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80">
        {/* Showcase */}
        <a
          href="#showcase"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            activeSection === "showcase"
              ? "text-cyan-400 bg-cyan-950/40 border border-cyan-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Showcase"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-[10px] font-mono font-medium">Showcase</span>
        </a>

        {/* Projects */}
        <a
          href="#projects"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            activeSection === "projects"
              ? "text-emerald-400 bg-emerald-950/40 border border-emerald-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Projects"
        >
          <Layers className="w-4 h-4" />
          <span className="text-[10px] font-mono font-medium">Projects</span>
        </a>

        {/* Telemetry Lab */}
        <a
          href="#interactive-lab"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            activeSection === "interactive-lab"
              ? "text-teal-400 bg-teal-950/40 border border-teal-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Telemetry Lab"
        >
          <Cpu className="w-4 h-4" />
          <span className="text-[10px] font-mono font-medium">Lab</span>
        </a>

        {/* Smart Display */}
        <a
          href="#smart-display"
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            activeSection === "smart-display"
              ? "text-purple-400 bg-purple-950/40 border border-purple-500/30"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Smart Display"
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px] font-mono font-medium">Orbit</span>
        </a>

        {/* CLI Terminal */}
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
          className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl text-slate-400 hover:text-emerald-400 transition-all font-mono"
          aria-label="Systems CLI Terminal"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px] font-mono font-medium text-emerald-400">CLI</span>
        </button>

        {/* PDF Resume */}
        <a
          href={PORTFOLIO_DATA.personal.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-slate-400 hover:text-slate-200 transition-all"
          aria-label="PDF Resume"
        >
          <FileText className="w-4 h-4" />
          <span className="text-[10px] font-mono font-medium">Resume</span>
        </a>

        {/* Quick Email Copy */}
        <button
          onClick={handleCopyEmail}
          className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
            copied
              ? "text-emerald-400 bg-emerald-950/60"
              : "text-slate-400 hover:text-slate-200"
          }`}
          aria-label="Copy Email"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
          <span className="text-[10px] font-mono font-medium">{copied ? "Copied" : "Email"}</span>
        </button>
      </div>
    </nav>
  );
}
