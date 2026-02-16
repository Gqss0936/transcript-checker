import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center">
              <div className="text-xs uppercase tracking-widest text-slate-400 font-medium">
                PSU
              </div>
              <div className="mx-3 bg-slate-300 w-px h-5"></div>
              <div className="text-sm font-medium text-slate-900 group-hover:text-slate-700 transition-colors">
                CS Credit Checker
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

