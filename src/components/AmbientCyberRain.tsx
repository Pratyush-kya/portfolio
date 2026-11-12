"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Sparkles, EyeOff } from "lucide-react";

// Dynamically import DataRain so canvas physics runs exclusively on client
const DataRain = dynamic(() => import("@/components/ui/data-rain"), { ssr: false });

export function AmbientCyberRain() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setMounted(true);
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {enabled && !isScrolling && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20 transition-opacity duration-300">
          <DataRain
            fullscreen={true}
            count={60}
            flowSpeed={0.6}
            palette={{
              calm: "#10b981",
              mid: "#06b6d4",
              hot: "#8b5cf6"
            }}
          />
        </div>
      )}

      {/* Floating Web3 Rain Controller Pill in Bottom-Right */}
      <aside aria-label="Visual effect controls" className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium backdrop-blur-xl border transition-all shadow-xl active:scale-95 ${
            enabled
              ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300 shadow-emerald-950/60"
              : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-slate-200"
          }`}
          title={enabled ? "Disable ambient particle rain" : "Enable interactive cyber particle rain"}
        >
          {enabled ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Cyber Particles: </span>
              <span className="text-emerald-400 font-bold">ACTIVE</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Cyber Particles: </span>
              <span className="text-slate-400">IDLE</span>
            </>
          )}
        </button>
      </aside>
    </>
  );
}
