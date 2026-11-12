"use client";

import { useState } from "react";
import { Play, RotateCcw, Cpu, HardDrive, BarChart3, ShieldCheck } from "lucide-react";
import { StorageBenchmarkLab } from "@/components/StorageBenchmarkLab";

interface ModelPreset {
  name: string;
  architecture: "GQA" | "MLA" | "MHA";
  layers: number;
  kvHeads: number;
  headDim: number;
  bytesPerParam: number; // FP16 = 2
}

const PRESETS: ModelPreset[] = [
  { name: "Llama-3 8B", architecture: "GQA", layers: 32, kvHeads: 8, headDim: 128, bytesPerParam: 2 },
  { name: "DeepSeek-V2 Lite", architecture: "MLA", layers: 28, kvHeads: 4, headDim: 128, bytesPerParam: 2 },
  { name: "Standard 7B", architecture: "MHA", layers: 32, kvHeads: 32, headDim: 128, bytesPerParam: 2 },
];

export function InteractiveTelemetryLab() {
  const [selectedModel, setSelectedModel] = useState<ModelPreset>(PRESETS[0]);
  const [seqLength, setSeqLength] = useState<number>(2048);
  const [batchSize, setBatchSize] = useState<number>(4);
  const [simulatedEntropy, setSimulatedEntropy] = useState<number>(0.84);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [tokenStep, setTokenStep] = useState<number>(1);

  // Exact KV Cache Formula: 2 * B * S * L * N_kv * d_head * b
  const totalBytes =
    2 *
    batchSize *
    seqLength *
    selectedModel.layers *
    selectedModel.kvHeads *
    selectedModel.headDim *
    selectedModel.bytesPerParam;

  const totalMegabytes = (totalBytes / (1024 * 1024)).toFixed(2);

  const runSimulationStep = () => {
    setIsSimulating(true);
    setTokenStep((prev) => prev + 1);

    // Random walk for entropy simulation to mimic autoregressive confidence fluctuations
    const nextEntropy = Number((Math.random() * (2.1 - 0.4) + 0.4).toFixed(3));
    setSimulatedEntropy(nextEntropy);

    setTimeout(() => {
      setIsSimulating(false);
    }, 250);
  };

  const resetSimulation = () => {
    setTokenStep(1);
    setSeqLength(2048);
    setBatchSize(4);
    setSimulatedEntropy(0.84);
  };

  return (
    <section id="interactive-lab" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Interactive Telemetry Sandbox</span>
        </h2>
        <span className="h-px flex-1 bg-slate-800" />
      </div>
      <p className="text-sm text-slate-300 mb-6">
        Test the mathematical KV-cache memory engine and entropy equations behind the{" "}
        <strong className="text-white font-medium">Transformer Inference Profiler</strong>.
      </p>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-2">
                Select Model Architecture
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedModel(m)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center ${
                      selectedModel.name === m.name
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-md shadow-emerald-500/10"
                        : "bg-slate-900/60 text-slate-400 hover:text-white border border-white/5"
                    }`}
                  >
                    <div className="font-semibold">{m.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{m.architecture}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sequence Length Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-slate-300">Context Tokens (S)</span>
                <span className="text-emerald-400 font-bold">{seqLength.toLocaleString()} tokens</span>
              </div>
              <input
                type="range"
                min="512"
                max="16384"
                step="512"
                value={seqLength}
                onChange={(e) => setSeqLength(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>512</span>
                <span>4,096</span>
                <span>8,192</span>
                <span>16,384</span>
              </div>
            </div>

            {/* Batch Size Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-slate-300">Concurrent Batch (B)</span>
                <span className="text-cyan-400 font-bold">{batchSize} seqs</span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-2">
              <button
                onClick={runSimulationStep}
                disabled={isSimulating}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-500/20 active:scale-98 disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? "animate-spin" : ""}`} />
                <span>Step Decode (Token #{tokenStep})</span>
              </button>

              <button
                onClick={resetSimulation}
                aria-label="Reset simulation"
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors border border-white/5"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Telemetry Panel */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-xl p-5 border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                <Cpu className="w-4 h-4" />
                <span>Live In-RAM Telemetry Channel</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                /dev/shm tmpfs active
              </span>
            </div>

            {/* Gauges Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* KV Memory Footprint */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Analytical KV Size</span>
                </div>
                <div className="text-2xl font-bold font-mono text-cyan-400">
                  {totalMegabytes} <span className="text-xs text-slate-400 font-normal">MB</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {selectedModel.architecture}: {selectedModel.kvHeads} heads × {selectedModel.headDim}d
                </div>
              </div>

              {/* Shannon Entropy */}
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="text-[11px] font-mono text-slate-400 mb-1 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Logit Shannon Entropy</span>
                </div>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {simulatedEntropy} <span className="text-xs text-slate-400 font-normal">bits</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">
                  {simulatedEntropy < 1.0 ? "Confident Prediction" : simulatedEntropy < 1.8 ? "Moderate Dispersion" : "High Uncertainty Spike"}
                </div>
              </div>
            </div>

            {/* Disk I/O Status */}
            <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Disk I/O Write Rate:</span>
              </div>
              <span className="font-bold text-white px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-500/30">
                0.00 MB/s (In-RAM)
              </span>
            </div>

            {/* Formula Breakdown */}
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900/40 p-2.5 rounded-lg border border-white/5 overflow-x-auto">
              Formula: 2 × {batchSize} (B) × {seqLength} (S) × {selectedModel.layers} (L) × {selectedModel.kvHeads} (N_kv) × {selectedModel.headDim} (d_head) × 2 bytes = {totalBytes.toLocaleString()} bytes
            </div>
          </div>
        </div>

        {/* Empirical Storage Contention Benchmark Comparator */}
        <StorageBenchmarkLab />
      </div>
    </section>
  );
}
