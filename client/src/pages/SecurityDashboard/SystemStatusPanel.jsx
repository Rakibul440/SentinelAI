import { ArrowDownToLine, Radar, Network, BrainCircuit, Database, Radio, CheckCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — System Status
// Component 11 of the Security Dashboard.
// Health of the platform's own pipeline stages, not the monitored fleet.
// Shows the "System operating normally." reassurance banner when every
// engine reports Operational.
// ---------------------------------------------------------------------------

const STATUS_STYLES = {
  Operational: { dot: "bg-emerald-500", text: "text-emerald-400" },
  Degraded: { dot: "bg-amber-400", text: "text-amber-400" },
  Down: { dot: "bg-red-500", text: "text-red-400" },
};

const DEFAULT_SYSTEMS = [
  { key: "ingestion", label: "Event Ingestion", icon: ArrowDownToLine, status: "Operational", metric: "12.4k events/min" },
  { key: "detection", label: "Detection Engine", icon: Radar, status: "Operational", metric: "42ms avg latency" },
  { key: "correlation", label: "Correlation Engine", icon: Network, status: "Operational", metric: "9 active chains" },
  { key: "ml", label: "ML Engine", icon: BrainCircuit, status: "Operational", metric: "Isolation Forest · v1.3" },
  { key: "database", label: "Database", icon: Database, status: "Operational", metric: "PostgreSQL · 8ms p50" },
  { key: "connectivity", label: "Agent Connectivity", icon: Radio, status: "Operational", metric: "17/18 connected" },
];

function StatusIndicator({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Down;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
      <span className="relative flex h-2 w-2">
        <span className={`absolute h-2 w-2 rounded-full ${style.dot} ${status === "Operational" ? "motion-reduce:animate-none animate-ping" : ""} opacity-75`} />
        <span className={`relative h-2 w-2 rounded-full ${style.dot}`} />
      </span>
      {status}
    </span>
  );
}

export default function SystemStatusPanel({ systems = DEFAULT_SYSTEMS }) {
  const allOperational = systems.every((s) => s.status === "Operational");

  return (
    <section className="border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">System Status</h2>
      </div>

      {allOperational && (
        <div className="flex items-center gap-2 border-b border-slate-800 bg-emerald-500/5 px-4 py-2 sm:px-5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-emerald-400">System operating normally.</span>
        </div>
      )}

      <div className="grid grid-cols-1 divide-y divide-slate-800 sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-3">
        {systems.map((s) => (
          <div key={s.key} className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center border border-slate-800 bg-slate-950 text-slate-400">
                <s.icon className="h-4 w-4" />
              </span>
              <StatusIndicator status={s.status} />
            </div>
            <p className="mt-3 text-sm font-medium text-slate-200">{s.label}</p>
            <p className="mt-0.5 font-mono text-xs text-slate-600">{s.metric}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
