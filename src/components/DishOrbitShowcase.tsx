"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  Sparkles, 
  Compass, 
  Maximize2, 
  Minimize2, 
  Cpu, 
  Layers, 
  Terminal, 
  Activity, 
  Wifi, 
  BatteryMedium,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Shield,
  Radio,
  FileCode2,
  Server
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface OrbitNode {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  architecture: string;
  category: string;
  description: string;
  image: string;
  accent: string;
  accentGlow: string;
  accentBorder: string;
  icon: typeof Cpu;
  metrics: { label: string; value: string }[];
  telemetryStream: string[];
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  simAction: string;
}

const ORBIT_NODES: OrbitNode[] = [
  {
    id: "profiler",
    tag: "NODE // 01",
    title: "Kernel /dev/shm Ring Buffer",
    subtitle: "LLM KV-Cache Telemetry Profiler",
    architecture: "POSIX Shared Memory IPC & CUDA Hooks",
    category: "Systems & Low-Latency AI",
    description: "Autoregressive memory sampling with zero physical disk I/O contention. Operates inside POSIX shared memory ring buffers at 60 Hz to profile Transformer context memory allocation with <1.2% overhead.",
    image: "/projects/profiler-hero.jpg",
    accent: "text-emerald-400",
    accentGlow: "bg-emerald-500/15",
    accentBorder: "border-emerald-500/40",
    icon: Cpu,
    metrics: [
      { label: "Sampling Rate", value: "60 Hz" },
      { label: "IPC Latency", value: "0.18 ms" },
      { label: "Overhead", value: "<1.2%" },
      { label: "Memory Bus", value: "14.8 GB/s" }
    ],
    telemetryStream: [
      "mmap(/dev/shm/kv_profile, 67108864) = 0x7f9a2e000",
      "cudaEventRecord(start_stream, 0x0) -> OK",
      "RingBuffer: 2048 frames written, 0 dropped"
    ],
    techStack: ["Python 3.11", "PyTorch 2.4", "CUDA 12.4", "FastAPI", "SSE Stream"],
    repoUrl: "https://github.com/Pratyush-kya/transformer-profiler",
    liveUrl: "https://transformer-profiler-demo.vercel.app",
    simAction: "Simulate CUDA Memory Intercept"
  },
  {
    id: "resumint",
    tag: "NODE // 02",
    title: "Client-Side WASM Privacy Engine",
    subtitle: "Resumint Zero-Egress ATS Parser",
    architecture: "Web Workers & In-Browser Neural Heuristics",
    category: "Client-Side Computing",
    description: "Evaluates resume syntax and semantic ATS coverage completely in the client's browser. Employs background WebAssembly workers with strict CSP to guarantee 0 KB sensitive user data leaves the device.",
    image: "/projects/resumint-hero.jpg",
    accent: "text-cyan-400",
    accentGlow: "bg-cyan-500/15",
    accentBorder: "border-cyan-500/40",
    icon: Shield,
    metrics: [
      { label: "Cloud Egress", value: "0 KB" },
      { label: "Parse Time", value: "84 ms" },
      { label: "Worker Threads", value: "Dedicated" },
      { label: "Privacy Bar", value: "100% Local" }
    ],
    telemetryStream: [
      "WebWorker initialized: sandbox_id=0x9f1",
      "CSP Policy: connect-src 'none' (Enforced)",
      "AST Tokenizer: 412 words parsed in 84ms"
    ],
    techStack: ["Next.js 16", "TypeScript", "WASM ONNX", "Web Workers", "Tailwind CSS"],
    repoUrl: "https://github.com/Pratyush-kya/resumint",
    liveUrl: "https://resumint-demo.vercel.app",
    simAction: "Run Local AST Tokenizer Test"
  },
  {
    id: "arogya",
    tag: "NODE // 03",
    title: "MQTT QoS-1 Geohash Routing",
    subtitle: "Arogya-Relay Emergency Dispatch Mesh",
    architecture: "Aedes MQTT Broker & Spatial Graph Routing",
    category: "Real-Time Telemetry",
    description: "Coordinates emergency medical vehicle dispatching across urban road networks. Guarantees delivery using MQTT Quality-of-Service level 1, maintaining sub-100ms state updates under high simulated packet loss.",
    image: "/projects/arogya-hero.jpg",
    accent: "text-rose-400",
    accentGlow: "bg-rose-500/15",
    accentBorder: "border-rose-500/40",
    icon: Radio,
    metrics: [
      { label: "Dispatch Latency", value: "<85 ms" },
      { label: "Protocol", value: "MQTT QoS-1" },
      { label: "Packet Loss Tol", value: "99.8%" },
      { label: "Spatial Grid", value: "Geohash-7" }
    ],
    telemetryStream: [
      "Aedes broker: 12 clients connected",
      "SUB emergency/telemetry/# -> ACK received",
      "Shortest-path Dijkstra: 1.4km in 78ms"
    ],
    techStack: ["Node.js", "Aedes MQTT", "WebSockets", "Leaflet GIS", "Express"],
    repoUrl: "https://github.com/Pratyush-kya/arogya-relay",
    liveUrl: "https://arogya-relay-demo.vercel.app",
    simAction: "Dispatch Simulated Ambulance"
  },
  {
    id: "crypto",
    tag: "NODE // 04",
    title: "Sepolia Provable VRF Protocol",
    subtitle: "On-Chain Cryptographic Verifier",
    architecture: "EVM Smart Contracts & Verifiable Randomness",
    category: "Cryptographic Protocols",
    description: "Verifiable random function (VRF) beacon verification with gas-optimized Solidity smart contracts. Guarantees tamper-proof randomness with mathematical audit trails on Ethereum testnets.",
    image: "/projects/web3-crypto.jpg",
    accent: "text-purple-400",
    accentGlow: "bg-purple-500/15",
    accentBorder: "border-purple-500/40",
    icon: FileCode2,
    metrics: [
      { label: "Gas Overhead", value: "-34%" },
      { label: "VRF Proof", value: "Ed25519" },
      { label: "Network", value: "Sepolia" },
      { label: "Solidity", value: "v0.8.24" }
    ],
    telemetryStream: [
      "eth_estimateGas(verifyVRF): 48,210 units",
      "Contract state: 0x9812A... (Verified)",
      "Proof signature verified against public key"
    ],
    techStack: ["Solidity", "Hardhat", "Ethers.js", "OpenZeppelin", "Web3.js"],
    repoUrl: "https://github.com/Pratyush-kya/portfolio_pratyush",
    simAction: "Verify Cryptographic Beacon"
  },
  {
    id: "pipeline",
    tag: "NODE // 05",
    title: "Self-Healing Microservices Mesh",
    subtitle: "n8n Autonomous Operations Pipeline",
    architecture: "Event-Driven GitOps & Docker Container Fleet",
    category: "Infrastructure & DevOps",
    description: "Autonomous error recovery pipeline coordinating Git webhooks, automated Docker container restarts, and instant Discord alerts. Self-heals service outages in <15 seconds without human intervention.",
    image: "/projects/pipeline-n8n.jpg",
    accent: "text-amber-400",
    accentGlow: "bg-amber-500/15",
    accentBorder: "border-amber-500/40",
    icon: Server,
    metrics: [
      { label: "Recovery Time", value: "<15 sec" },
      { label: "Containers", value: "Docker Mesh" },
      { label: "Uptime", value: "99.98%" },
      { label: "Alert Latency", value: "1.2 sec" }
    ],
    telemetryStream: [
      "Webhook received: commit 0xdf183b5",
      "Container healthcheck: HTTP 500 detected",
      "Auto-rollback executed -> HTTP 200 restored in 12s"
    ],
    techStack: ["n8n", "Docker", "PostgreSQL", "Bash Scripts", "Webhooks"],
    repoUrl: "https://github.com/Pratyush-kya/portfolio_pratyush",
    simAction: "Trigger Simulated Failover"
  }
];

export function DishOrbitShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoOrbit, setIsAutoOrbit] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simOutput, setSimOutput] = useState<string | null>(null);

  const activeNode = ORBIT_NODES[activeIdx];
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-Orbit interval
  useEffect(() => {
    if (!isAutoOrbit) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ORBIT_NODES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoOrbit]);

  // Keyboard navigation & Escape fullscreen listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev + 1) % ORBIT_NODES.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev - 1 + ORBIT_NODES.length) % ORBIT_NODES.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  // True Browser Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      try {
        if (containerRef.current?.requestFullscreen) {
          containerRef.current.requestFullscreen().catch(() => {});
        } else if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        }
      } catch {}
    } else {
      setIsFullscreen(false);
      try {
        if (document.exitFullscreen && document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
      } catch {}
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const runSimulation = () => {
    setIsSimulating(true);
    setSimOutput("Executing low-level IPC signal...");
    setTimeout(() => {
      const randomLatency = (Math.random() * 0.15 + 0.05).toFixed(3);
      setSimOutput(`SUCCESS: Vector dispatched. Round-trip verified in ${randomLatency}ms [ACK 0x9F2].`);
      setIsSimulating(false);
      showToast(`Telemetry verified for ${activeNode.subtitle}`);
    }, 400);
  };

  return (
    <section id="smart-display" className="mb-24 scroll-mt-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-emerald-500/50 text-emerald-300 font-mono text-xs shadow-2xl backdrop-blur-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>Interactive Spatial Telemetry &amp; Fullscreen Kiosk</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Systems Orbit Command Center</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real-time orbital telemetry station mapping kernel memory, edge WASM sandboxes, and distributed brokers. Touch-optimized and kiosk-ready.
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* Auto Orbit Toggle */}
          <button
            onClick={() => setIsAutoOrbit(!isAutoOrbit)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              isAutoOrbit
                ? "bg-purple-950/70 border-purple-500/40 text-purple-300"
                : "bg-slate-900/80 border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {isAutoOrbit ? (
              <>
                <Pause className="w-3.5 h-3.5 text-purple-400" />
                <span>Auto-Orbit ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-slate-400" />
                <span>Auto-Orbit PAUSED</span>
              </>
            )}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/15 text-xs font-mono font-medium text-slate-200 hover:text-white transition-all shadow-lg active:scale-95"
            title="Toggle full-screen kiosk experience"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full-Screen Kiosk</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Orbit Stage Deck */}
      <div 
        ref={containerRef}
        className={
          isFullscreen
            ? "fixed inset-0 z-50 w-screen h-screen bg-[#070b14] flex flex-col justify-between overflow-y-auto p-4 sm:p-8"
            : "relative w-full rounded-3xl overflow-hidden border border-white/15 bg-slate-950/90 shadow-2xl shadow-purple-950/30 min-h-[700px] lg:min-h-[740px] flex flex-col justify-between scroll-reactive"
        }
      >
        {/* Fullscreen HUD Status Bar */}
        {isFullscreen && (
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border border-white/10 rounded-2xl mb-4 shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-white font-bold">
                SYSTEMS_ORBIT // KIOSK_ONLINE
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-white/10">
                120 FPS NATIVE
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Wifi className="w-3.5 h-3.5" />
                <span>5G CONNECTED</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <BatteryMedium className="w-3.5 h-3.5" />
                <span>100%</span>
              </span>
              <button
                onClick={toggleFullscreen}
                className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-mono"
              >
                Exit (Esc)
              </button>
            </div>
          </div>
        )}

        {/* Orbit Grid Body (Wide 2-Column Command Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 flex-1 items-center">
          
          {/* Left Column: Spatial Orbital Radar Visualizer */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px]">
            {/* Ambient Background Aura */}
            <div className={`absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full ${activeNode.accentGlow} blur-3xl transition-all duration-700 pointer-events-none`} />

            {/* Central Kernel Core Reactor */}
            <div className="relative z-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-slate-900/90 border-2 border-white/20 shadow-2xl flex flex-col items-center justify-center p-3 text-center group cursor-pointer hover:border-emerald-500/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-3" />
              <activeNode.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${activeNode.accent} transition-transform duration-500 group-hover:scale-110`} />
              <span className="text-[10px] font-mono text-slate-300 font-bold mt-1 tracking-wider uppercase">
                {activeNode.id}
              </span>
              <span className="text-[9px] font-mono text-slate-400">
                FOCAL_CORE
              </span>
            </div>

            {/* Concentric Telemetry SVG Orbit Tracks */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
              <circle cx="250" cy="250" r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="250" cy="250" r="210" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="250" y1="30" x2="250" y2="470" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="30" y1="250" x2="470" y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </svg>

            {/* Orbiting Satellite Node Nodes along Circular Trajectory */}
            <div className="absolute inset-0 pointer-events-none">
              {ORBIT_NODES.map((node, i) => {
                const total = ORBIT_NODES.length;
                // Calculate angular offset relative to activeIdx
                const angleDeg = ((i - activeIdx) * (360 / total) - 90);
                const angleRad = (angleDeg * Math.PI) / 180;
                // Radii
                const radiusX = 170;
                const radiusY = 170;
                const posX = Math.cos(angleRad) * radiusX;
                const posY = Math.sin(angleRad) * radiusY;
                const isSelected = i === activeIdx;
                const NodeIcon = node.icon;

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setActiveIdx(i);
                      setIsAutoOrbit(false);
                    }}
                    style={{
                      transform: `translate3d(calc(${posX}px), calc(${posY}px), 0px)`,
                    }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-3 sm:p-3.5 rounded-2xl border transition-all duration-700 flex items-center gap-2.5 shadow-xl ${
                      isSelected
                        ? `bg-slate-900 border-2 ${node.accentBorder} scale-110 shadow-2xl z-20 ring-4 ring-emerald-500/10`
                        : "bg-slate-950/80 border-white/10 hover:border-white/30 text-slate-400 hover:text-white scale-90 opacity-70 hover:opacity-100 z-10"
                    }`}
                    title={node.title}
                  >
                    <NodeIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? node.accent : "text-slate-400"}`} />
                    <span className={`text-[11px] font-mono font-bold hidden sm:inline ${isSelected ? "text-white" : "text-slate-400"}`}>
                      {node.title.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Orbit Step Controls */}
            <div className="absolute bottom-2 flex items-center gap-3 z-20">
              <button
                onClick={() => {
                  setActiveIdx((prev) => (prev - 1 + ORBIT_NODES.length) % ORBIT_NODES.length);
                  setIsAutoOrbit(false);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
                aria-label="Previous system node"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
                <span className="text-emerald-400 font-bold">0{activeIdx + 1}</span>
                <span>/</span>
                <span>0{ORBIT_NODES.length}</span>
              </div>
              <button
                onClick={() => {
                  setActiveIdx((prev) => (prev + 1) % ORBIT_NODES.length);
                  setIsAutoOrbit(false);
                }}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-all active:scale-95"
                aria-label="Next system node"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Node Engineering Dossier & Interactive HUD */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Node Header Badges */}
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-900 border ${activeNode.accentBorder} ${activeNode.accent}`}>
                  {activeNode.tag}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono text-slate-400 bg-slate-900/60 border border-white/10">
                  {activeNode.category}
                </span>
              </div>

              {/* Title & Architecture */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {activeNode.title}
              </h3>
              <p className="text-sm font-semibold text-emerald-400 font-mono mt-1">
                {activeNode.architecture}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-3">
                {activeNode.description}
              </p>

              {/* Defensible Quantitative Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 p-3 rounded-2xl bg-slate-900/80 border border-white/10">
                {activeNode.metrics.map((m) => (
                  <div key={m.label} className="text-center p-1.5">
                    <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{m.label}</div>
                    <div className={`text-sm sm:text-base font-bold font-mono ${activeNode.accent}`}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Live Simulated Telemetry Stream Terminal Box */}
              <div className="mt-4 p-3 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-white/10 pb-1 mb-1">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Activity className="w-3 h-3 animate-pulse" />
                    <span>KERNEL_IPC_STREAM</span>
                  </span>
                  <span>SYNC // 60Hz</span>
                </div>
                {activeNode.telemetryStream.map((line, i) => (
                  <div key={i} className="text-slate-400 truncate">
                    <span className="text-emerald-400">&gt;</span> {line}
                  </div>
                ))}
                {simOutput && (
                  <div className="text-cyan-300 font-semibold pt-1">
                    {simOutput}
                  </div>
                )}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {activeNode.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-white/5 text-[11px] font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={runSimulation}
                disabled={isSimulating}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
              >
                <Activity className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                <span>{isSimulating ? "Transmitting..." : activeNode.simAction}</span>
              </button>

              {activeNode.repoUrl && (
                <a
                  href={activeNode.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </a>
              )}

              {activeNode.liveUrl && (
                <a
                  href={activeNode.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-cyan-400 hover:text-cyan-300 text-xs font-mono font-medium transition-colors"
                >
                  <span>Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Hardware Telemetry HUD Bar */}
        <div className="px-6 py-3 bg-slate-950/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">ACTIVE_VECTOR:</span>
            <span className="text-white font-bold">{activeNode.subtitle}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-slate-400">
              Click any node on the orbit or use keyboard arrows ← →
            </span>
            <span className="px-2.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-semibold">
              Kiosk &amp; Web Deck Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
