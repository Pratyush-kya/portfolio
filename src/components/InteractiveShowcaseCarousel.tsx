"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ExternalLink, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Terminal,
  Sparkles
} from "lucide-react";
import { GithubIcon } from "@/components/Icons";

interface ShowcaseSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  hudStat: { label: string; value: string };
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: "profiler",
    badge: "Systems Telemetry & CUDA",
    title: "Transformer Inference Profiler",
    subtitle: "Real-time KV-cache allocation tracker with zero disk I/O",
    description: "Built for researchers benchmarking local LLMs. Uses Linux /dev/shm shared-memory ring buffers and CUDA event hooks to sample memory pressure at 60 Hz without polluting host drive bandwidth.",
    image: "/projects/profiler-hero.jpg",
    accent: "text-emerald-400",
    accentBg: "from-emerald-500/20 to-teal-500/10",
    accentBorder: "border-emerald-500/40",
    metrics: [
      { label: "Profile Overhead", value: "<1.2%" },
      { label: "Sampling Rate", value: "60 Hz" },
      { label: "IPC Latency", value: "0.18ms" }
    ],
    tags: ["Python", "PyTorch", "CUDA", "FastAPI", "React", "Tailwind"],
    repoUrl: "https://github.com/Pratyush-kya/transformer-profiler",
    liveUrl: "https://transformer-profiler-demo.vercel.app",
    hudStat: { label: "IPC Memory Bus", value: "14.8 GB/s" }
  },
  {
    id: "resumint",
    badge: "Client-Side Privacy & AI",
    title: "Resumint — Privacy Resume Scorer",
    subtitle: "Zero cloud egress ATS optimization powered by local WASM",
    description: "Evaluates resume syntax and semantic keyword coverage entirely in the client browser. No telemetry sent to remote LLM APIs, preventing personal identifiable information leaks.",
    image: "/projects/resumint-hero.jpg",
    accent: "text-cyan-400",
    accentBg: "from-cyan-500/20 to-blue-500/10",
    accentBorder: "border-cyan-500/40",
    metrics: [
      { label: "Client Privacy", value: "100%" },
      { label: "Parse Time", value: "180ms" },
      { label: "ATS Pass Rate", value: "94%" }
    ],
    tags: ["Next.js", "TypeScript", "WASM ONNX", "Web Workers", "Tailwind"],
    repoUrl: "https://github.com/Pratyush-kya/resumint-ats",
    liveUrl: "https://resumint.dev",
    hudStat: { label: "Cloud Egress", value: "0 Bytes (Airgapped)" }
  },
  {
    id: "arogya",
    badge: "Real-Time Telemetry & GIS",
    title: "Arogya-Relay",
    subtitle: "Low-latency simulated ambulance dispatch with MQTT broker",
    description: "Simulates emergency vehicle dispatching under simulated urban traffic networks. Integrates haversine spatial geohashes with MQTT QoS-1 message routing to guarantee sub-100ms state dissemination.",
    image: "/projects/arogya-hero.jpg",
    accent: "text-rose-400",
    accentBg: "from-rose-500/20 to-orange-500/10",
    accentBorder: "border-rose-500/40",
    metrics: [
      { label: "Dispatch Latency", value: "84ms" },
      { label: "Broker Throughput", value: "1.2k msg/s" },
      { label: "Route Precision", value: "99.4%" }
    ],
    tags: ["Node.js", "MQTT Broker", "WebSockets", "Leaflet GIS", "Express"],
    repoUrl: "https://github.com/Pratyush-kya/arogya-relay",
    liveUrl: "https://arogya-relay-demo.vercel.app",
    hudStat: { label: "Broker Heartbeat", value: "99.98% Uptime" }
  },
  {
    id: "web3-crypto",
    badge: "Web3 & Cryptography",
    title: "Provably-Fair Verifiable Compute",
    subtitle: "Verifiable VRF entropy pipeline and on-chain simulation",
    description: "Explores provably-fair random beacon generation using verifiable random functions (VRF) and cryptographic state proof anchors. Validated on Sepolia testnet with gas-optimized Solidity verifier contracts.",
    image: "/projects/web3-crypto.jpg",
    accent: "text-purple-400",
    accentBg: "from-purple-500/20 to-indigo-500/10",
    accentBorder: "border-purple-500/40",
    metrics: [
      { label: "Proof Verify Gas", value: "~184k" },
      { label: "Entropy Entropy", value: "256-bit" },
      { label: "Testnet Status", value: "Sepolia" }
    ],
    tags: ["Solidity", "Ethers.js", "Hardhat", "Cryptography", "VRF"],
    repoUrl: "https://github.com/Pratyush-kya/provable-entropy",
    hudStat: { label: "VRF Block Anchor", value: "#6,482,109" }
  },
  {
    id: "n8n-pipeline",
    badge: "Autonomous Pipelines",
    title: "Self-Healing n8n Microservices",
    subtitle: "Automated error recovery and event-driven webhook orchestrations",
    description: "Personal operations pipeline coordinating Git webhooks, automated Docker health probes, and instant Discord alerts with exponential backoff retries and payload diffing.",
    image: "/projects/pipeline-n8n.jpg",
    accent: "text-amber-400",
    accentBg: "from-amber-500/20 to-yellow-500/10",
    accentBorder: "border-amber-500/40",
    metrics: [
      { label: "Auto-Healing", value: "100%" },
      { label: "Webhook Latency", value: "42ms" },
      { label: "Active Nodes", value: "14" }
    ],
    tags: ["n8n", "Docker", "Webhooks", "Bash", "PostgreSQL"],
    repoUrl: "https://github.com/Pratyush-kya/n8n-workflows",
    hudStat: { label: "Queue Drain Rate", value: "Zero Backlog" }
  }
];

export function InteractiveShowcaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const current = SHOWCASE_SLIDES[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  return (
    <section id="showcase" className="mb-24 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Interactive Visual Systems Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Featured Engineering Carousel</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Cinematic slideshow exploring architecture blueprints, live telemetry streams, and verifiable engineering benchmarks.
          </p>
        </div>

        {/* Play / Pause & Navigation Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-colors"
            aria-label={isPlaying ? "Pause slideshow autoplay" : "Resume slideshow autoplay"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Autoplay ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Autoplay PAUSED</span>
              </>
            )}
          </button>

          <button
            onClick={prevSlide}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-all active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div 
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="relative rounded-3xl overflow-hidden border border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-2xl shadow-black/80 select-none scroll-reactive"
      >
        {/* Ambient Glow Gradient matching current slide accent */}
        <div 
          className={`absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br ${current.accentBg} blur-3xl opacity-40 pointer-events-none transition-all duration-700`}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
          {/* Left Column: Visual Image Stage with Interactive Overlay */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[380px] overflow-hidden group bg-slate-900/90">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-85"
              priority
            />

            {/* Gradient Overlays for High-Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent hidden lg:block" />

            {/* Glowing Top HUD Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{current.hudStat.label}: </span>
                <span className="text-emerald-400 font-bold">{current.hudStat.value}</span>
              </span>

              <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-slate-300">
                Slide 0{currentIndex + 1} / 0{SHOWCASE_SLIDES.length}
              </span>
            </div>

            {/* Bottom Overlay Info on Mobile */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="text-[11px] font-mono text-slate-400 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Active Architecture Node
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
                Interactive Preview Active
              </span>
            </div>
          </div>

          {/* Right Column: Project Dossier & Metrics */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-900 border ${current.accentBorder} ${current.accent}`}>
                  {current.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                {current.title}
              </h3>
              <p className="text-sm font-medium text-slate-300 mb-4 leading-snug">
                {current.subtitle}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Defensible Quantitative Metrics Bar */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900/90 border border-white/5 mb-6">
                {current.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{m.label}</div>
                    <div className={`text-sm sm:text-base font-bold font-mono ${current.accent}`}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {current.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-white/5 text-[11px] font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              {current.repoUrl && (
                <a
                  href={current.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white text-xs font-mono font-medium transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                </a>
              )}
              {current.liveUrl && (
                <a
                  href={current.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono transition-all shadow-md shadow-emerald-500/20"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Strip along the Bottom */}
        <div className="p-3 bg-slate-950/95 border-t border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {SHOWCASE_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all shrink-0 ${
                  isActive
                    ? `bg-slate-800 border ${slide.accentBorder} shadow-lg`
                    : "bg-slate-900/50 hover:bg-slate-900 border border-transparent text-slate-400 hover:text-slate-200"
                }`}
              >
                <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className={`text-xs font-bold font-mono ${isActive ? "text-white" : "text-slate-300"}`}>
                    0{idx + 1}. {slide.title.split(" ")[0]}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {slide.badge.split(" ")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
