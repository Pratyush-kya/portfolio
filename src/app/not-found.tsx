import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="font-mono text-emerald-400 text-sm font-bold mb-2">404 // NOT FOUND</div>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
        Page Does Not Exist
      </h1>
      <p className="text-zinc-400 text-sm max-w-md mb-8">
        The route you requested could not be found or has moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
}
