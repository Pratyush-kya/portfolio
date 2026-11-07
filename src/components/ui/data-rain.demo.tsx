"use client";

// Demo file for DataRain component
import DataRain from "@/components/ui/data-rain";

export default function DataRainDemo() {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-2xl border border-white/10 bg-[#020308]">
      <DataRain
        fullscreen={false}
        count={2500}
        flowSpeed={1.2}
        palette={{
          calm: "#22e6ff",
          mid: "#8a5cff",
          hot: "#ff3d9a",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center z-10">
        <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Interactive Fluid Physics</span>
        <h2 className="text-3xl font-bold text-white tracking-tight">Interactive Data Rain</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md">
          Move your cursor across the canvas to disturb velocity streamlines and create particle vortices.
        </p>
      </div>
    </div>
  );
}
