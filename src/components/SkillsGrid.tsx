import { PORTFOLIO_DATA } from "@/data/content";
import { Check, Wrench } from "lucide-react";

export function SkillsGrid() {
  return (
    <section id="skills" className="mb-20 scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
          <Wrench className="w-6 h-6 text-emerald-400" />
          <span>Technical Arsenal</span>
        </h2>
        <span className="h-px flex-1 bg-slate-800" />
      </div>
      <p className="text-sm text-slate-300 mb-6">
        Technologies backed by actual working code and tests in this portfolio. No self-rated proficiency bars.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PORTFOLIO_DATA.skills.map((cat) => (
          <div
            key={cat.title}
            className="glass-card p-6 rounded-2xl border border-white/10"
          >
            <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4 pb-3 border-b border-white/10">
              {cat.title}
            </h3>

            <ul className="space-y-3">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="flex items-start justify-between text-xs sm:text-sm">
                  <span className="text-slate-200 font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 ml-2 text-right">
                    {skill.projectAnchor}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
