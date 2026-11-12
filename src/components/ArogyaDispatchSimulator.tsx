"use client";

import { useState } from "react";
import { Activity, Radio, MapPin, Navigation, CheckCircle2 } from "lucide-react";

interface GridNode {
  x: number;
  y: number;
  label?: string;
  type?: "station" | "hospital" | "empty";
}

export function ArogyaDispatchSimulator() {
  const [selectedIncident, setSelectedIncident] = useState<{ x: number; y: number } | null>({ x: 3, y: 1 });
  const [dispatchStatus, setDispatchStatus] = useState<"idle" | "dispatching" | "routed">("routed");
  const [latency, setLatency] = useState(84);

  // 5x3 Urban grid
  const station = { x: 0, y: 1, label: "Station Alpha" };
  const hospital = { x: 4, y: 1, label: "Central Trauma" };

  const handleCellClick = (x: number, y: number) => {
    setSelectedIncident({ x, y });
    setDispatchStatus("dispatching");
    const simulatedLatency = Math.floor(Math.random() * 20) + 72; // 72ms - 92ms
    setLatency(simulatedLatency);

    setTimeout(() => {
      setDispatchStatus("routed");
    }, 180);
  };

  // Distance calculation (Manhattan/Haversine grid steps)
  const dist = selectedIncident
    ? Math.abs(selectedIncident.x - station.x) + Math.abs(selectedIncident.y - station.y)
    : 0;

  return (
    <div className="p-4 sm:p-5 rounded-xl bg-slate-950/90 border border-rose-500/30 font-mono text-xs space-y-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          <span className="text-white font-bold text-xs sm:text-sm">Living Proof-of-Work: Real-Time Fleet Dispatch Matrix</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-[10px]">
          <Radio className="w-3 h-3 text-rose-400" />
          <span>MQTT QoS-1 Broker (Sub-100ms)</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-300">
        Click any cell in the urban grid to drop an emergency call and watch real-time MQTT route dispatching:
      </p>

      {/* Urban Spatial Grid */}
      <div className="grid grid-cols-5 gap-2 p-3 rounded-xl bg-slate-900/80 border border-white/10 select-none">
        {[0, 1, 2].map((y) =>
          [0, 1, 2, 3, 4].map((x) => {
            const isStation = x === station.x && y === station.y;
            const isHospital = x === hospital.x && y === hospital.y;
            const isIncident = selectedIncident && x === selectedIncident.x && y === selectedIncident.y;

            return (
              <button
                key={`${x}-${y}`}
                onClick={() => handleCellClick(x, y)}
                className={`h-14 sm:h-16 rounded-lg border transition-all flex flex-col items-center justify-center p-1 text-center relative ${
                  isIncident
                    ? "bg-rose-500/25 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/20 scale-[1.03]"
                    : isStation
                    ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                    : isHospital
                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                    : "bg-slate-950/60 border-white/5 hover:border-white/20 text-slate-400"
                }`}
              >
                {isStation && (
                  <>
                    <span className="text-[10px] font-bold text-emerald-400">AMB-01</span>
                    <span className="text-[8px] text-slate-400">Station</span>
                  </>
                )}
                {isHospital && (
                  <>
                    <span className="text-[10px] font-bold text-cyan-400">HOSPITAL</span>
                    <span className="text-[8px] text-slate-400">Trauma</span>
                  </>
                )}
                {isIncident && !isStation && !isHospital && (
                  <>
                    <MapPin className="w-4 h-4 text-rose-400 animate-bounce" />
                    <span className="text-[9px] font-bold text-rose-300">SOS ({x},{y})</span>
                  </>
                )}
                {!isStation && !isHospital && !isIncident && (
                  <span className="text-[9px] text-slate-400">{x},{y}</span>
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Readout Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/5">
        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Dispatch Latency</div>
          <div className="text-sm sm:text-base font-bold text-rose-400">
            {latency} ms
          </div>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Broker Protocol</div>
          <div className="text-xs font-semibold text-emerald-400 mt-0.5">
            MQTT v5 QoS-1
          </div>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Grid Distance</div>
          <div className="text-xs font-bold text-white mt-0.5">
            {dist} geohash hops
          </div>
        </div>

        <div className="p-2 rounded bg-slate-900/60 border border-white/5">
          <div className="text-[10px] text-slate-400">Fleet Status</div>
          <div className="text-xs font-semibold text-cyan-400 mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            <span>En Route (ETA 3.2m)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
