"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUp, ArrowDown, ShieldCheck, Cpu, Lock, Activity, Eye } from "lucide-react";

export interface ScrollDynamicsState {
  direction: "up" | "down" | "idle";
  progress: number; // 0 to 100
  velocity: number; // 0 to 1
  scrollY: number;
}

export function ScrollDynamicsSentinel() {
  const [dynamics, setDynamics] = useState<ScrollDynamicsState>({
    direction: "idle",
    progress: 0,
    velocity: 0,
    scrollY: 0,
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const idleTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    const updateScrollMetrics = () => {
      const currentScrollY = window.scrollY;
      const currentTime = performance.now();
      const dt = Math.max(currentTime - lastTime.current, 16);
      const dy = currentScrollY - lastScrollY.current;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max((currentScrollY / totalHeight) * 100, 0), 100) : 0;

      // Compute normalized velocity (0 to 1)
      const instantVelocity = Math.min(Math.abs(dy) / (dt * 2.5), 1);
      const direction: "up" | "down" | "idle" = dy < -2 ? "up" : dy > 2 ? "down" : "idle";

      // Set CSS variables for GPU-accelerated horizontal/vertical dynamic shifts
      const root = document.documentElement;
      const dirMult = direction === "up" ? -1 : direction === "down" ? 1 : 0;
      const shiftX = (dirMult * instantVelocity * 6).toFixed(2);
      const shiftY = (dirMult * instantVelocity * 4).toFixed(2);

      root.style.setProperty("--scroll-dyn-x", `${shiftX}px`);
      root.style.setProperty("--scroll-dyn-y", `${shiftY}px`);
      root.style.setProperty("--scroll-progress", `${progress.toFixed(1)}%`);
      root.style.setProperty("--scroll-dir", `${dirMult}`);

      setDynamics({
        direction: direction !== "idle" ? direction : dynamics.direction,
        progress: Math.round(progress),
        velocity: Number(instantVelocity.toFixed(2)),
        scrollY: Math.round(currentScrollY),
      });

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;

      // Reset velocity and direction to idle after scrolling stops
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        root.style.setProperty("--scroll-dyn-x", "0px");
        root.style.setProperty("--scroll-dyn-y", "0px");
        root.style.setProperty("--scroll-dir", "0");
        setDynamics((prev) => ({ ...prev, direction: "idle", velocity: 0 }));
      }, 150);
    };

    const handleScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        updateScrollMetrics();
        rafId.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollMetrics();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
    };
  }, []);

  // Quick scroll to top trigger
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Dynamic HUD Security Sentinel (Bottom-Left) */}
      <aside 
        aria-label="Real-time Systems Security Sentinel"
        className="fixed bottom-5 left-5 z-40 hidden md:flex flex-col gap-2 pointer-events-none select-none transition-transform duration-300"
        style={{
          transform: `translate3d(calc(var(--scroll-dyn-x, 0px) * -0.5), calc(var(--scroll-dyn-y, 0px) * 0.5), 0px)`
        }}
      >
        <div className="pointer-events-auto p-2.5 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/80 flex items-center gap-3 text-xs font-mono">
          {/* Scroll Direction Indicator Beacon */}
          <div 
            onClick={scrollToTop}
            title="Click to jump to system root"
            className={`cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
              dynamics.direction === "up"
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-lg shadow-cyan-500/20 scale-105"
                : dynamics.direction === "down"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg shadow-emerald-500/20"
                : "bg-slate-900 border border-white/10 text-slate-400"
            }`}
          >
            {dynamics.direction === "up" ? (
              <ArrowUp className="w-4 h-4 animate-bounce" />
            ) : dynamics.direction === "down" ? (
              <ArrowDown className="w-4 h-4 animate-bounce" />
            ) : (
              <Activity className="w-4 h-4 text-emerald-400" />
            )}
          </div>

          {/* Real-time Telemetry & Security Metrics */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-semibold uppercase">
                {dynamics.direction === "up"
                  ? "ASCENDING // RETRACING"
                  : dynamics.direction === "down"
                  ? "DESCENDING // PROFILING"
                  : "STATIONARY // ARMED"}
              </span>
              <span className="text-emerald-400 font-bold text-[11px]">
                {dynamics.progress}%
              </span>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-300">
              <span className="flex items-center gap-1 text-cyan-300">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                <span>0-EGRESS CSP</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-300">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>MLOCK // SHM</span>
              </span>
            </div>
          </div>

          {/* Depth Meter Progress Bar */}
          <div className="w-12 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-150"
              style={{ width: `${dynamics.progress}%` }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
