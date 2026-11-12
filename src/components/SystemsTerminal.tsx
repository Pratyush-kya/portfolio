"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/content";

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function SystemsTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      id: "welcome",
      command: "uname -a",
      output: (
        <div className="text-slate-300 space-y-1">
          <div>Linux cutm-workstation 6.8.0-sys #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux</div>
          <div className="text-emerald-400 font-semibold">
            Pratyush Kiran Rath — Systems &amp; Developer Tooling CLI [v2.4]
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-cyan-300 font-bold">help</span> to view available kernel &amp; portfolio commands. Hotkey: <kbd className="text-white bg-slate-800 px-1 rounded">`</kbd> or <kbd className="text-white bg-slate-800 px-1 rounded">⌘J</kbd> to toggle.
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Global hotkey listener (` or Cmd+J / Ctrl+J)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea outside terminal
      const activeEl = document.activeElement?.tagName.toLowerCase();
      const isInput = activeEl === "input" || activeEl === "textarea";

      if ((e.key === "`" && !isInput) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "j")) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleToggleEvent = () => setIsOpen((prev) => !prev);
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("toggle-terminal", handleToggleEvent);
    window.addEventListener("open-terminal", handleOpenEvent);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-terminal", handleToggleEvent);
      window.removeEventListener("open-terminal", handleOpenEvent);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Scroll to bottom of logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-1 text-slate-300 text-xs">
            <div className="text-cyan-400 font-bold mb-1">Available System Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono">
              <div><span className="text-emerald-400 font-semibold">bench</span> - Run KV-cache RAM benchmark</div>
              <div><span className="text-emerald-400 font-semibold">metrics</span> - View defensible performance numbers</div>
              <div><span className="text-emerald-400 font-semibold">cat /dev/shm</span> - Inspect circular ring-buffer frame</div>
              <div><span className="text-emerald-400 font-semibold">wasm</span> - Check client browser WASM privacy engine</div>
              <div><span className="text-emerald-400 font-semibold">resume</span> - Open 1-page ATS Resume PDF</div>
              <div><span className="text-emerald-400 font-semibold">contact</span> - Get developer email &amp; links</div>
              <div><span className="text-emerald-400 font-semibold">projects</span> - List flagship engineering projects</div>
              <div><span className="text-emerald-400 font-semibold">clear</span> - Flush terminal buffer</div>
              <div><span className="text-emerald-400 font-semibold">exit</span> - Close terminal drawer</div>
            </div>
          </div>
        );
        break;

      case "bench":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-cyan-300">Evaluating Autoregressive KV-Cache Pressure (Llama-3 8B, B=4, S=2048)...</div>
            <div className="p-2 rounded bg-slate-900 border border-emerald-500/30 text-emerald-300">
              <div>[HBM Footprint]: 512.00 MB @ FP16</div>
              <div>[/dev/shm Write Latency]: 0.18 ms (Zero Disk Contention)</div>
              <div>[Physical NVMe Wait]: ~16.40 ms (ELIMINATED)</div>
              <div>[Throughput Speedup]: 91.1x faster I/O telemetry</div>
            </div>
          </div>
        );
        break;

      case "metrics":
        output = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <div className="text-cyan-400 font-bold">Defensible Metrics Summary:</div>
            {PORTFOLIO_DATA.defensibleMetrics.map((m) => (
              <div key={m.label} className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-slate-400">{m.label}:</span>
                <span className="text-emerald-400 font-bold">{m.value} ({m.detail})</span>
              </div>
            ))}
          </div>
        );
        break;

      case "cat":
        if (args.join(" ").includes("/dev/shm")) {
          output = (
            <div className="p-2 rounded bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300 overflow-x-auto">
              <pre>{JSON.stringify({
                shm_fd: 4,
                ring_head_ptr: "0x7fff9420a000",
                capacity_frames: 4096,
                active_entropy: 0.842,
                allocated_kv_bytes: 536870912,
                cuda_event_record: "SYNC_OK",
                timestamp_ns: Date.now() * 1000000
              }, null, 2)}</pre>
            </div>
          );
        } else {
          output = <span className="text-rose-400">cat: {args.join(" ")}: No such file. Try &apos;cat /dev/shm&apos;</span>;
        }
        break;

      case "wasm":
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-emerald-400 font-bold">Client-Side WASM Privacy Engine:</div>
            <div>[WebAssembly Native]: {typeof WebAssembly !== "undefined" ? "SUPPORTED (Active)" : "UNSUPPORTED"}</div>
            <div>[Web Worker Threads]: {typeof Worker !== "undefined" ? "AVAILABLE" : "UNAVAILABLE"}</div>
            <div>[Cloud Data Egress]: 0 BYTES (Airgapped Local Inference)</div>
          </div>
        );
        break;

      case "resume":
        if (typeof window !== "undefined") {
          window.open(PORTFOLIO_DATA.personal.resumeUrl, "_blank");
        }
        output = <span className="text-emerald-400">Opened {PORTFOLIO_DATA.personal.resumeUrl} in new tab.</span>;
        break;

      case "contact":
        output = (
          <div className="space-y-1 text-xs font-mono">
            <div>Email: <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="text-cyan-400 underline">{PORTFOLIO_DATA.personal.email}</a></div>
            <div>GitHub: <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="text-emerald-400 underline">{PORTFOLIO_DATA.personal.github}</a></div>
            <div>LinkedIn: <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{PORTFOLIO_DATA.personal.linkedin}</a></div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            {PORTFOLIO_DATA.flagships.map((f, i) => (
              <div key={f.id}>
                <span className="text-cyan-400">0{i+1}. {f.title}:</span> {f.subtitle}
              </div>
            ))}
          </div>
        );
        break;

      case "clear":
        setLogs([]);
        setInputVal("");
        return;

      case "exit":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        output = (
          <span className="text-rose-400">
            command not found: {cmd}. Type <span className="text-cyan-300 font-bold">help</span> for available commands.
          </span>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output,
      },
    ]);
    setInputVal("");
  };

  const handleKeyDownInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (history.length > 0 && historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= history.length) {
          setHistoryIdx(-1);
          setInputVal("");
        } else {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    }
  };

  return (
    <>
      {/* Floating CLI Pill on Bottom Left */}
      <div className="fixed bottom-5 left-5 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono backdrop-blur-xl border transition-all shadow-xl active:scale-95 ${
            isOpen
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300 shadow-emerald-950/60"
              : "bg-slate-900/80 border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/30"
          }`}
          title="Toggle Systems CLI (` or ⌘J)"
        >
          <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
          <span>&gt;_ CLI</span>
          <kbd className="px-1 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-slate-400">`</kbd>
        </button>
      </div>

      {/* Terminal Drawer / Window */}
      {isOpen && (
        <aside 
          aria-label="Interactive Systems Terminal"
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-slate-950/95 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-emerald-950/40 font-mono text-sm ${
            isMaximized
              ? "inset-4 rounded-2xl"
              : "bottom-0 right-0 left-0 md:left-auto md:right-6 md:bottom-6 md:w-[620px] md:h-[420px] h-[360px] md:rounded-2xl rounded-t-2xl"
          }`}
        >
          {/* Terminal Window Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10 select-none shrink-0 rounded-t-2xl">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 cursor-pointer" onClick={() => setIsMaximized(!isMaximized)} />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-semibold text-slate-300 ml-2 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>pratyush@cutm-systems: ~</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 rounded text-slate-400 hover:text-white"
                title={isMaximized ? "Restore" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Close Terminal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Logs & Output */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs leading-relaxed">
            {logs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <span className="text-white font-medium">{log.command}</span>
                </div>
                <div className="pl-4">{log.output}</div>
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>

          {/* Terminal Prompt Input */}
          <div className="p-3 bg-slate-900/80 border-t border-white/10 flex items-center gap-2 shrink-0">
            <span className="text-emerald-400 font-bold text-xs flex items-center gap-1">
              <span>cutm-os</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyan-400">~</span>
              <span className="text-emerald-400">$</span>
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDownInput}
              placeholder="type 'help', 'bench', 'metrics', or 'resume'..."
              className="flex-1 bg-transparent text-white text-xs font-mono focus:outline-none placeholder-slate-400"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
              title="Execute"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
