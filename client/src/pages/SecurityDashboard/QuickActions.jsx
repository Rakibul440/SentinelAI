import { UserPlus, AlertTriangle, FolderSearch, Radio, SlidersHorizontal } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Quick Actions
// Component 10 of the Security Dashboard.
// A row of shortcut buttons. "Add Agent" is styled as the primary action
// since it's the one that grows the fleet; the rest are equal-weight
// secondary shortcuts into other dashboard pages.
// ---------------------------------------------------------------------------

const DEFAULT_ACTIONS = [
  { key: "add-agent", label: "Add Agent", icon: UserPlus, primary: true },
  { key: "view-alerts", label: "View Alerts", icon: AlertTriangle },
  { key: "investigate-incidents", label: "Investigate Incidents", icon: FolderSearch },
  { key: "view-live-events", label: "View Live Events", icon: Radio },
  { key: "manage-rules", label: "Manage Detection Rules", icon: SlidersHorizontal },
];

export default function QuickActions({ actions = DEFAULT_ACTIONS, onAction }) {
  return (
    <section className="border border-slate-800 bg-slate-900 p-4 sm:p-5">
      <h2 className="text-sm font-medium text-slate-200">Quick Actions</h2>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={() => onAction?.(a.key)}
            className={`group flex flex-col items-center gap-2.5 border p-4 text-center transition-all hover:-translate-y-0.5 ${
              a.primary
                ? "border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/15"
                : "border-slate-800 bg-slate-950 hover:border-slate-700 hover:bg-slate-800/40"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center border transition-colors ${
                a.primary
                  ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400"
                  : "border-slate-800 bg-slate-900 text-slate-400 group-hover:text-cyan-400"
              }`}
            >
              <a.icon className="h-4 w-4" />
            </span>
            <span
              className={`text-xs font-medium leading-snug ${
                a.primary ? "text-cyan-300" : "text-slate-300"
              }`}
            >
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
