"use client";

import { useState } from "react";
import { ShieldCheck, Sparkles, Check, AlertCircle, RefreshCw } from "lucide-react";

export function ResumintInteractiveWidget() {
  const [bulletText, setBulletText] = useState(
    "Engineered /dev/shm shared-memory circular ring buffer reducing LLM telemetry write latency from 16.4ms to 0.18ms without NVMe contention."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Client-side heuristics
  const words = bulletText.trim().split(/\s+/).filter(Boolean);
  const hasMetric = /\b\d+(\.\d+)?(%|ms|x|GB|MB|k)?\b/i.test(bulletText);
  const actionVerbs = ["engineered", "built", "optimized", "reduced", "designed", "implemented", "deployed", "profiled", "scaled", "automated"];
  const hasActionVerb = words.some((w) => actionVerbs.includes(w.toLowerCase().replace(/[^a-z]/g, "")));
  const lengthScore = words.length >= 10 && words.length <= 28;

  let score = 50;
  if (hasMetric) score += 25;
  if (hasActionVerb) score += 15;
  if (lengthScore) score += 10;

  const testAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 200);
  };

  const loadSample = (sample: string) => {
    setBulletText(sample);
  };

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-cyan-500/30 font-mono text-xs space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-white font-bold text-xs sm:text-sm">Living Proof-of-Work: Client-Side ATS Scanner</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-[10px]">
          <ShieldCheck className="w-3 h-3 text-cyan-400" />
          <span>0 KB Cloud Egress (Browser-Only)</span>
        </div>
      </div>

      <div>
        <label className="block text-[11px] text-slate-400 mb-1.5">
          Input Bullet Point (Evaluated locally via client string AST heuristics):
        </label>
        <textarea
          value={bulletText}
          onChange={(e) => setBulletText(e.target.value)}
          rows={2}
          className="w-full p-2.5 rounded-lg bg-slate-900 border border-white/15 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400 resize-none"
          placeholder="Paste a resume bullet point..."
        />
      </div>

      {/* Preset Quick Tests */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-slate-400">Try samples:</span>
        <button
          onClick={() => loadSample("Engineered /dev/shm shared-memory circular ring buffer reducing LLM telemetry write latency from 16.4ms to 0.18ms without NVMe contention.")}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
        >
          Strong (Quantified)
        </button>
        <button
          onClick={() => loadSample("Helped with some Python code for machine learning model monitoring.")}
          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px]"
        >
          Weak (Vague)
        </button>
      </div>

      {/* Live Heuristic Readout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5">
        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Overall Score</div>
          <div className={`text-base font-bold ${score >= 80 ? "text-emerald-400" : score >= 65 ? "text-amber-400" : "text-rose-400"}`}>
            {score} / 100
          </div>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Action Verb</div>
          <div className="flex items-center gap-1 font-semibold text-xs mt-0.5">
            {hasActionVerb ? (
              <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Detected</span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Missing</span>
            )}
          </div>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Metric Impact</div>
          <div className="flex items-center gap-1 font-semibold text-xs mt-0.5">
            {hasMetric ? (
              <span className="text-emerald-400 flex items-center gap-1"><Check className="w-3 h-3" /> Quantified</span>
            ) : (
              <span className="text-rose-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> No Metrics</span>
            )}
          </div>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Word Count</div>
          <div className="text-xs font-bold text-white mt-0.5">
            {words.length} words {lengthScore ? "✓" : "(target 10-25)"}
          </div>
        </div>
      </div>
    </div>
  );
}
