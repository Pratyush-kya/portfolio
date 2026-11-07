import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold mb-3">
        404: Page Not Found
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
        This Route Does Not Exist
      </h1>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        The page you requested could not be found or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
}
