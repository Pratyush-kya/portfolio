import { FileCode, Terminal, CheckCircle2 } from "lucide-react";

export function TechnicalArticle() {
  return (
    <section id="deep-dive" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Technical Deep-Dive</h2>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>
      <p className="text-sm text-zinc-400 mb-6">
        An engineering analysis of memory bottlenecks in autoregressive decoding and in-RAM telemetry.
      </p>

      <article className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/90 text-zinc-300 text-sm sm:text-base leading-relaxed space-y-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
              Systems &amp; ML Architecture
            </span>
            <span>·</span>
            <span>6 min read</span>
            <span>·</span>
            <span>November 2026</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
            Zero-Disk Telemetry: Monitoring Autoregressive LLM KV-Cache in RAM with /dev/shm
          </h3>
          <p className="text-sm text-zinc-400 italic">
            By Pratyush Kiran Rath · Implemented in{" "}
            <a
              href="https://github.com/Pratyush-kya/transformer-inference-profiler"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              transformer-inference-profiler
            </a>
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono">01.</span>
            <span>The Autoregressive KV-Cache Memory Bottleneck</span>
          </h4>
          <p className="text-zinc-300 text-xs sm:text-sm">
            In autoregressive transformer models (such as Llama, Mistral, and DeepSeek), token generation is inherently sequential. To avoid quadratic recomputation of previous attention keys and values at step t, systems maintain a persistent Key-Value (KV) cache. The exact analytical byte footprint for a model with batch size B, sequence length S, layer count L, key-value heads N_kv, head dimension d_head, and byte precision b is given by:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs sm:text-sm text-emerald-300 text-center overflow-x-auto">
            KV_Bytes = 2 × B × S × L × N_kv × d_head × b
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm">
            As sequence length S reaches 8k, 32k, or 128k tokens, KV-cache memory rapidly overtakes static model weights, frequently triggering sudden Out-Of-Memory (OOM) faults.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono">02.</span>
            <span>Why Disk-Based Logging Fails at 60 FPS</span>
          </h4>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Standard profiling utilities often serialize JSON telemetry or write SQLite records to physical storage. Under continuous batch inference, this introduces severe NVMe/SSD write contention and I/O wait latency that slows down generation throughput. Furthermore, modern serverless and containerized deployment environments impose strict ephemeral disk write quotas.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono">03.</span>
            <span>The In-RAM Solution: Linux /dev/shm Ring Buffers</span>
          </h4>
          <p className="text-zinc-300 text-xs sm:text-sm">
            To eliminate physical disk I/O entirely, I designed a circular ring buffer operating inside Linux shared memory (<code className="text-emerald-400 font-mono bg-zinc-950 px-1.5 py-0.5 rounded">/dev/shm</code> tmpfs) and mirrored to an in-memory SQLite database:
          </p>
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto">
            <div className="flex items-center gap-2 text-zinc-300 pb-2 mb-2 border-b border-zinc-800">
              <Terminal className="w-3.5 h-3.5 text-zinc-300" />
              <span>telemetry_buffer.py (Excerpt)</span>
            </div>
            <pre>{`# Zero-disk tmpfs memory allocation
SHM_PATH = "/dev/shm/transformer_telemetry.ring"

class RingBufferTelemetry:
    def __init__(self, capacity_mb=64):
        # Memory-mapped circular buffer in tmpfs
        self.fd = os.open(SHM_PATH, os.O_CREAT | os.O_RDWR)
        self.buffer = mmap.mmap(self.fd, capacity_mb * 1024 * 1024)
        self.conn = sqlite3.connect(":memory:") # In-RAM query index

    def record_step(self, step, entropy, kv_bytes):
        # 0.00 MB/s disk write rate — purely in-RAM
        self.conn.execute(
            "INSERT INTO telemetry VALUES (?, ?, ?)",
            (step, entropy, kv_bytes)
        )`}</pre>
          </div>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="text-emerald-400 font-mono">04.</span>
            <span>Instantaneous Shannon Entropy &amp; Uncertainty</span>
          </h4>
          <p className="text-zinc-300 text-xs sm:text-sm">
            Alongside memory accounting, the suite intercepts logits at each generation step to compute instantaneous Shannon entropy: H(X) = -Σ p(x) log2 p(x). When H(X) spikes, it indicates token-level candidate competition and heightened hallucination risk, providing actionable telemetry before erroneous completions are emitted.
          </p>
        </div>

        {/* Benchmark Callout */}
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-white">Empirical Verification</div>
              <div className="text-xs text-zinc-300">
                Verified via <code className="text-emerald-300 font-mono">iotop</code> with 0.00 MB/s disk write rate and 29/29 passing PyTest test cases.
              </div>
            </div>
          </div>
          <a
            href="https://github.com/Pratyush-kya/transformer-inference-profiler"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-semibold shrink-0 transition-colors"
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>Inspect Profiler Code ↗</span>
          </a>
        </div>
      </article>
    </section>
  );
}
