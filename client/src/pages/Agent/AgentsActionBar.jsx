import { UserPlus, Download, KeyRound } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Agents Action Bar
// Component 2 of the Agents page.
// Three primary actions. "Add Agent" is the primary CTA (cyan-filled).
// Download and Generate Token are secondary (outlined).
// ---------------------------------------------------------------------------

export default function AgentsActionBar({ onAddAgent, onDownloadAgent, onGenerateToken }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onAddAgent}
        className="group flex items-center gap-2 bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
      >
        <UserPlus className="h-4 w-4 transition-transform group-hover:scale-110" />
        Add Agent
      </button>

      <button
        type="button"
        onClick={onDownloadAgent}
        className="flex items-center gap-2 border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
      >
        <Download className="h-4 w-4" />
        Download Agent
      </button>

      <button
        type="button"
        onClick={onGenerateToken}
        className="flex items-center gap-2 border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:text-slate-100"
      >
        <KeyRound className="h-4 w-4" />
        Generate Enrollment Token
      </button>
    </div>
  );
}
