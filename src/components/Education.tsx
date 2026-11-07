import { PORTFOLIO_DATA } from "@/data/content";
import { GraduationCap, BookOpen, Calendar, MapPin } from "lucide-react";

export function Education() {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-white">Education &amp; Research</h2>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold mb-1">
              <GraduationCap className="w-4 h-4" />
              <span>Undergraduate Degree</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {PORTFOLIO_DATA.personal.degree}
            </h3>
            <p className="text-sm text-zinc-300 font-medium">
              {PORTFOLIO_DATA.personal.university}
            </p>
          </div>

          <div className="flex flex-col sm:items-end text-xs font-mono text-zinc-300 gap-1">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{PORTFOLIO_DATA.personal.period}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Odisha, India</span>
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800/60 space-y-2 text-xs sm:text-sm text-zinc-400 leading-relaxed">
          <p className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-200">Coursework &amp; Fundamentals:</strong> Operating Systems, Data Structures &amp; Algorithms, Computer Organization, Database Systems, Linux System Programming.
            </span>
          </p>
          <p className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-zinc-300 shrink-0 mt-0.5" />
            <span>
              <strong className="text-zinc-200">Independent Research Focus:</strong> Mechanistic telemetry for autoregressive transformer decoding; client-side document parsing pipelines with zero cloud data retention.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
