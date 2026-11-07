import { PORTFOLIO_DATA } from "@/data/content";
import { Check } from "lucide-react";

export function SkillsGrid() {
  return (
    <section id="skills" className="mb-16 scroll-mt-20">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold tracking-tight text-white">Technical Arsenal</h2>
        <span className="h-px flex-1 bg-zinc-800" />
      </div>
      <p className="text-sm text-zinc-400 mb-6">
        Technologies backed by actual working code and tests in this portfolio. No self-rated proficiency bars.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PORTFOLIO_DATA.skills.map((cat) => (
          <div
            key={cat.title}
            className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80"
          >
            <h3 className="text-sm font-mono font-bold text-emerald-400 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-800">
              {cat.title}
            </h3>

            <ul className="space-y-2.5">
              {cat.skills.map((skill) => (
                <li key={skill.name} className="flex items-start justify-between text-xs sm:text-sm">
                  <span className="text-zinc-200 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{skill.name}</span>
                  </span>
                  <span className="text-[11px] font-mono text-zinc-300 ml-2 text-right">
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
