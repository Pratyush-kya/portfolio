"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Sparkles, 
  Layers, 
  Cpu, 
  Compass, 
  BookOpen, 
  User, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  X,
  Terminal
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { PORTFOLIO_DATA } from "@/data/content";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 1200);
    } catch {
      window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}`;
    }
  };

  const navActions = [
    {
      label: "Interactive Visual Showcase",
      section: "#showcase",
      icon: Sparkles,
      color: "text-cyan-400",
      category: "Navigation"
    },
    {
      label: "Featured Engineering Case Studies",
      section: "#projects",
      icon: Layers,
      color: "text-emerald-400",
      category: "Navigation"
    },
    {
      label: "KV-Cache Telemetry Sandbox",
      section: "#interactive-lab",
      icon: Cpu,
      color: "text-teal-400",
      category: "Navigation"
    },
    {
      label: "Smart Device Orbit UI",
      section: "#smart-display",
      icon: Compass,
      color: "text-purple-400",
      category: "Navigation"
    },
    {
      label: "Zero-Disk Telemetry Deep-Dive",
      section: "#deep-dive",
      icon: BookOpen,
      color: "text-amber-400",
      category: "Navigation"
    },
    {
      label: "About & Engineering Philosophy",
      section: "#about",
      icon: User,
      color: "text-slate-300",
      category: "Navigation"
    }
  ];

  const filteredNav = navActions.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Floating Command Trigger for Mobile & Desktop */}
      <div className="fixed top-5 right-5 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 backdrop-blur-xl border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-lg active:scale-95"
          aria-label="Open command palette"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Actions</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-white/15 text-[10px] text-slate-400 font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-xl rounded-2xl bg-slate-950 border border-white/20 shadow-2xl shadow-cyan-950/40 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-slate-900/60">
              <Search className="w-5 h-5 text-cyan-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or jump to section..."
                autoFocus
                className="w-full bg-transparent text-white placeholder-slate-400 text-sm font-mono focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions & Navigation List */}
            <div className="p-3 max-h-[60vh] overflow-y-auto space-y-1">
              <div className="px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Navigation
              </div>

              {filteredNav.map((action) => {
                const Icon = action.icon;
                return (
                  <a
                    key={action.section}
                    href={action.section}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-white transition-colors group"
                  >
                    <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                      <Icon className={`w-4 h-4 ${action.color}`} />
                      <span>{action.label}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-cyan-400">
                      Jump ↵
                    </span>
                  </a>
                );
              })}

              <div className="px-3 pt-3 pb-1 text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Actions &amp; Documents
              </div>

              {/* Copy Email */}
              <button
                onClick={copyEmail}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-white transition-colors group text-left"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
                  <span>{copied ? "Copied Email to Clipboard!" : "Copy Developer Email"}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  pratyushkiranrath4@gmail.com
                </span>
              </button>

              {/* View PDF Resume */}
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>View 1-Page Resume (PDF)</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </a>

              {/* GitHub */}
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <GithubIcon className="w-4 h-4 text-slate-300" />
                  <span>GitHub Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </a>

              {/* LinkedIn */}
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-900 text-slate-200 hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium">
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
              </a>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Protip: Press <kbd className="text-white">Esc</kbd> to exit</span>
              <span className="text-emerald-400">CUTM CSE &apos;29</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
