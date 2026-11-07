import { PORTFOLIO_DATA } from "@/data/content";
import { GraduationCap, BookOpen, Calendar, MapPin } from "lucide-react";

export function Education() {
  return (
    <section className="mb-20">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <GraduationCap className="w-6 h-6 text-emerald-400" />
          <span>Education &amp; Research</span>
        </h2>
        <span className="h-px flex-1 bg-slate-800" />
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold mb-2">
              <span>Undergraduate Degree</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {PORTFOLIO_DATA.personal.degree}
            </h3>
            <p className="text-sm text-slate-300 font-medium">
              {PORTFOLIO_DATA.personal.university}
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-xs font-mono text-slate-300 gap-1.5">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-white/5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              <span>{PORTFOLIO_DATA.personal.period}</span>
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-white/5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Odisha, India</span>
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p className="flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Core Coursework:</strong> Operating Systems, Data Structures &amp; Algorithms, Computer Organization, Database Systems, Linux System Programming.
            </span>
          </p>
          <p className="flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Independent Research Focus:</strong> Mechanistic telemetry for autoregressive transformer decoding; client-side document parsing pipelines with zero cloud data retention.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
