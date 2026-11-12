"use client";

import { useState, useEffect } from "react";
import DishOrbitCarousel, { type Dish } from "@/components/ui/dish-orbit-carousel";
import { 
  Sparkles, 
  Compass, 
  Maximize2, 
  Minimize2, 
  Cpu, 
  ChefHat, 
  Layers, 
  Terminal, 
  Activity, 
  Wifi, 
  BatteryMedium,
  CheckCircle2
} from "lucide-react";

// Preset 1: Developer Systems & AI Telemetry Nodes
const SYSTEMS_NODES: Dish[] = [
  {
    title: "Kernel /dev/shm",
    subtitle: "LLM KV-Cache Profiler",
    eyebrow: "#1 Systems Architecture",
    image: "/projects/profiler-hero.jpg",
    rating: 4.9,
    chef: "Pratyush Kiran Rath",
    kitchen: "Linux Kernel & CUDA IPC",
    description: "Autoregressive memory sampling with zero physical disk I/O contention. Operates inside POSIX shared memory ring buffers at 60 Hz.",
    likes: 1840,
    ingredients: ["Python 3.11", "PyTorch 2.4", "CUDA 12.4", "FastAPI", "SSE Stream"],
    accent: "#10b981",
  },
  {
    title: "Client-Side WASM",
    subtitle: "Resumint Privacy Parser",
    eyebrow: "#2 Zero-Egress AI",
    image: "/projects/resumint-hero.jpg",
    rating: 4.8,
    chef: "Pratyush Kiran Rath",
    kitchen: "Local Browser Sandbox",
    description: "Evaluates resume syntax and semantic ATS coverage completely in the client's browser. Eliminates cloud egress and data privacy leaks.",
    likes: 1220,
    ingredients: ["Next.js 16", "TypeScript", "WASM ONNX", "Web Workers", "Tailwind CSS"],
    accent: "#06b6d4",
  },
  {
    title: "Spatial Geohash",
    subtitle: "Arogya-Relay Dispatch",
    eyebrow: "#3 Real-Time Telemetry",
    image: "/projects/arogya-hero.jpg",
    rating: 4.9,
    chef: "Pratyush Kiran Rath",
    kitchen: "MQTT QoS-1 Broker Mesh",
    description: "Simulates emergency vehicle dispatching across urban road networks. Guarantees sub-100ms state updates under simulated packet loss.",
    likes: 950,
    ingredients: ["Node.js", "Aedes MQTT", "WebSockets", "Leaflet GIS", "Express"],
    accent: "#f43f5e",
  },
  {
    title: "Sepolia Testnet",
    subtitle: "Provable VRF Compute",
    eyebrow: "#4 Cryptographic Protocol",
    image: "/projects/web3-crypto.jpg",
    rating: 4.7,
    chef: "Pratyush Kiran Rath",
    kitchen: "EVM Smart Contract Lab",
    description: "Verifiable random function (VRF) beacon verification with gas-optimized Solidity smart contracts and mathematical audit trails.",
    likes: 780,
    ingredients: ["Solidity 0.8.24", "Hardhat", "Ethers.js", "Cryptographic VRF"],
    accent: "#a855f7",
  },
  {
    title: "Self-Healing",
    subtitle: "n8n Microservices Ops",
    eyebrow: "#5 Event-Driven Mesh",
    image: "/projects/pipeline-n8n.jpg",
    rating: 4.8,
    chef: "Pratyush Kiran Rath",
    kitchen: "Docker Container Fleet",
    description: "Autonomous error recovery pipeline coordinating Git webhooks, automated Docker container restarts, and instant Discord alerts.",
    likes: 1100,
    ingredients: ["n8n", "Docker", "PostgreSQL", "Bash Scripts", "Webhooks"],
    accent: "#f59e0b",
  },
];

// Preset 2: Smart Kitchen Hardware Display
const KITCHEN_DISHES: Dish[] = [
  {
    title: "Dry-Aged",
    subtitle: "Prime Black Angus",
    eyebrow: "#1 Signature Grill",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    chef: "Marco Laurent",
    kitchen: "Atelier Fire & Oak",
    description: "45-day dry-aged bone-in ribeye seared over white binchotan charcoal, glazed with bone marrow jus and smoked sea salt.",
    likes: 1240,
    ingredients: ["Prime Black Angus", "Binchotan Smoke", "Marrow Butter", "Thyme Essence"],
    accent: "#ff5e36",
  },
  {
    title: "Wild-Caught",
    subtitle: "Ora King Salmon",
    eyebrow: "#2 Coastal Catch",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    chef: "Elena Rostova",
    kitchen: "Nordic Waters Bistro",
    description: "Pan-roasted crisp skin New Zealand salmon with dill emulsion, pickled shallots, and shaved fennel salad.",
    likes: 980,
    ingredients: ["Ora King Salmon", "Dill Oil", "Pickled Shallots", "Cured Roe"],
    accent: "#06b6d4",
  },
  {
    title: "Handcrafted",
    subtitle: "Truffle Tagliolini",
    eyebrow: "#3 Pastificio Specialty",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop&q=80",
    rating: 5.0,
    chef: "Gianluca Moretti",
    kitchen: "Trattoria Della Spiga",
    description: "30-yolk fresh tagliolini ribbons tossed in cultured mountain butter, topped with 24-month Parmigiano and shaved Umbrian winter black truffle.",
    likes: 2150,
    ingredients: ["Umbrian Truffle", "30-Yolk Pasta", "Vacche Rosse Butter", "Aged Reggiano"],
    accent: "#d97706",
  },
  {
    title: "Botanical",
    subtitle: "Garden Burrata",
    eyebrow: "#4 Summer Crudo",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985b?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    chef: "Sophie Chen",
    kitchen: "Verdant Table",
    description: "Pugliese creamy burrata paired with heirloom tomatoes, crushed basil oil, 12-year balsamic pearls, and grilled sourdough.",
    likes: 870,
    ingredients: ["Pugliese Burrata", "Heirloom Tomatoes", "Aged Balsamic", "Wild Basil"],
    accent: "#10b981",
  },
];

export function DishOrbitShowcase() {
  const [activePreset, setActivePreset] = useState<"systems" | "kitchen">("systems");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dishes = activePreset === "systems" ? SYSTEMS_NODES : KITCHEN_DISHES;
  const currentItem = dishes[activeItemIndex] || dishes[0];

  // Trigger feedback toast on order/play action
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle true browser fullscreen if supported
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      try {
        if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
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

  // Keyboard Escape listener to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <section id="smart-display" className="mb-24 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 font-mono text-xs mb-3">
            <Compass className="w-3.5 h-3.5 animate-spin text-purple-400" />
            <span>Interactive Display Physics &amp; Web/App Kiosk</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <span>Smart Device Orbit Interface</span>
          </h2>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            GSAP-driven orbital mechanics engineered for smart displays, embedded tablets, and web applications. Features SVG parametric band deformation, inertia scroll pinning, and full-screen kiosk support.
          </p>
        </div>

        {/* Preset Selector & Fullscreen Toggle */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* Preset Segmented Switch */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono">
            <button
              onClick={() => {
                setActivePreset("systems");
                setActiveItemIndex(0);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activePreset === "systems"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Systems Core</span>
            </button>
            <button
              onClick={() => {
                setActivePreset("kitchen");
                setActiveItemIndex(0);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                activePreset === "kitchen"
                  ? "bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Smart Kitchen</span>
            </button>
          </div>

          {/* Auto-Orbit Toggle Button */}
          <button
            onClick={() => setIsAutoOrbit(!isAutoOrbit)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
              isAutoOrbit
                ? "bg-purple-950/80 border-purple-500/40 text-purple-300"
                : "bg-slate-900 border-white/10 text-slate-400 hover:text-white"
            }`}
            title="Toggle autonomous orbital rotation"
          >
            <span className={`w-2 h-2 rounded-full ${isAutoOrbit ? "bg-purple-400 animate-pulse" : "bg-slate-600"}`} />
            <span>Auto-Orbit {isAutoOrbit ? "ON" : "OFF"}</span>
          </button>

          {/* Full-Screen Kiosk Mode Button */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/15 text-xs font-mono font-medium text-slate-200 hover:text-white transition-all shadow-lg active:scale-95"
            title="Enter full-screen kiosk app experience"
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Full-Screen App</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Toast Feedback Overlay */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-mono text-xs shadow-2xl backdrop-blur-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Orbit Stage Container (Supports Standard & Fullscreen Modes) */}
      <div 
        className={
          isFullscreen
            ? "fixed inset-0 z-50 w-screen h-screen bg-[#070b14] flex flex-col justify-between overflow-hidden p-4 sm:p-6"
            : "relative rounded-3xl overflow-hidden border border-white/15 bg-slate-950 shadow-2xl shadow-purple-950/20"
        }
      >
        {/* Fullscreen Kiosk Header Bar */}
        {isFullscreen && (
          <header className="flex items-center justify-between px-4 py-3 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl mb-4 shrink-0 z-20">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-white font-bold">
                {activePreset === "systems" ? "SYSTEMS_CORE // ORBIT_KIOSK" : "SMART_KITCHEN // EMBEDDED_TABLET"}
              </span>
              <span className="hidden sm:inline px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-[10px] font-mono text-slate-400">
                TOUCH_OPTIMIZED
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
              <span className="hidden sm:flex items-center gap-1.5 text-emerald-400">
                <Wifi className="w-3.5 h-3.5" />
                <span>5G ONLINE</span>
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-slate-300">
                <BatteryMedium className="w-3.5 h-3.5 text-cyan-400" />
                <span>98%</span>
              </span>
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/20 text-xs font-mono text-white"
              >
                <Minimize2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Exit (Esc)</span>
              </button>
            </div>
          </header>
        )}

        {/* The Carousel */}
        <div className="flex-1 w-full relative overflow-hidden">
          <DishOrbitCarousel
            key={activePreset + (isFullscreen ? "-fs" : "-std")}
            dishes={dishes}
            height={isFullscreen ? "calc(100vh - 130px)" : "680px"}
            loop={true}
            enableScrollPin={false}
            autoRotateInterval={isAutoOrbit ? 4500 : 0}
            onChange={(idx) => setActiveItemIndex(idx)}
            onOrder={(dish) => showToast(`Executing action for: ${dish.subtitle}`)}
            onPlay={(dish) => showToast(`Inspecting node telemetry: ${dish.title}`)}
            className="w-full"
          />
        </div>

        {/* Bottom Technical HUD Bar */}
        <div className="p-3.5 bg-slate-950/95 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">{currentItem.title}:</span>
            <span className="text-white font-bold">{currentItem.subtitle}</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="hidden md:inline text-slate-400">
              Swipe / Scroll / Keyboard Arrows to rotate
            </span>
            <span className="px-2.5 py-0.5 rounded bg-purple-950/60 border border-purple-500/30 text-purple-300 font-semibold">
              Full-Screen Web &amp; App Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
