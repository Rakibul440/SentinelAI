import { Link2, Crosshair } from "lucide-react";
import { StatusBadge } from "./AlertsTable";

// ---------------------------------------------------------------------------
// SentinelAI — Recent Attack Chains table
// Component 6 of the Security Dashboard.
// The standout piece here is StageTracker — a small animated stepper that
// visualizes how far an attack chain has progressed (recon -> ... ->
// exfiltration), which is what makes this table feel distinct from a plain
// list of rows.
// ---------------------------------------------------------------------------

function RiskScore({ value }) {
  const color =
    value >= 70 ? "text-red-400" : value >= 40 ? "text-amber-400" : "text-emerald-400";
  return <span className={`font-mono text-sm font-semibold ${color}`}>{value}</span>;
}

function ConfidenceBar({ value }) {
  const color =
    value >= 80 ? "bg-red-500" : value >= 50 ? "bg-amber-400" : "bg-blue-400";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-14 overflow-hidden bg-slate-800">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="font-mono text-xs text-slate-400">{value}%</span>
    </div>
  );
}

function StageTracker({ stages, currentIndex }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center">
        {stages.map((stage, i) => {
          const done = i < currentIndex;
          const current = i === currentIndex;
          return (
            <div key={stage} className="flex items-center">
              <span
                className={`relative flex h-2 w-2 shrink-0 items-center justify-center rounded-full ${
                  done
                    ? "bg-cyan-500"
                    : current
                    ? "bg-cyan-400"
                    : "bg-slate-700"
                }`}
              >
                {current && (
                  <span className="absolute h-2 w-2 rounded-full bg-cyan-400 motion-reduce:animate-none animate-ping" />
                )}
              </span>
              {i < stages.length - 1 && (
                <span
                  className={`h-px w-4 sm:w-6 ${
                    i < currentIndex ? "bg-cyan-500" : "bg-slate-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <span className="text-xs text-slate-500">{stages[currentIndex]}</span>
    </div>
  );
}

const DEFAULT_CHAINS = [
  {
    id: "CHAIN-118",
    type: "Credential Access → Lateral Movement",
    source: "203.0.113.4",
    target: "web-03.internal",
    stages: ["Recon", "Initial Access", "Privilege Escalation", "Lateral Movement", "Exfiltration"],
    currentStage: 3,
    risk: 88,
    confidence: 91,
    status: "Open",
  },
  {
    id: "CHAIN-114",
    type: "Brute Force → Privilege Escalation",
    source: "198.51.100.22",
    target: "app-02.internal",
    stages: ["Recon", "Initial Access", "Privilege Escalation", "Lateral Movement", "Exfiltration"],
    currentStage: 2,
    risk: 65,
    confidence: 72,
    status: "Investigating",
  },
  {
    id: "CHAIN-109",
    type: "Reconnaissance sweep",
    source: "192.0.2.55",
    target: "db-01.internal",
    stages: ["Recon", "Initial Access", "Privilege Escalation", "Lateral Movement", "Exfiltration"],
    currentStage: 0,
    risk: 28,
    confidence: 44,
    status: "Resolved",
  },
];

export default function AttackChainsTable({ chains = DEFAULT_CHAINS, onViewAll }) {
  const isEmpty = chains.length === 0;

  return (
    <section className="border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">Recent Attack Chains</h2>
        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-medium text-cyan-400 hover:text-cyan-300"
        >
          View all
        </button>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
          <Link2 className="h-6 w-6 text-slate-700" />
          <p className="text-sm text-slate-500">No recent attack chains detected.</p>
        </div>
      ) : (
        <>
          {/* Desktop / tablet table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-500">
                  <th className="px-5 py-2.5 font-medium">Attack Type</th>
                  <th className="px-5 py-2.5 font-medium">Source</th>
                  <th className="px-5 py-2.5 font-medium">Target</th>
                  <th className="px-5 py-2.5 font-medium">Attack Stages</th>
                  <th className="px-5 py-2.5 font-medium">Risk</th>
                  <th className="px-5 py-2.5 font-medium">Confidence</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {chains.map((c) => (
                  <tr key={c.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Crosshair className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                        {c.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">{c.source}</td>
                    <td className="px-5 py-3 text-slate-400">{c.target}</td>
                    <td className="px-5 py-3">
                      <StageTracker stages={c.stages} currentIndex={c.currentStage} />
                    </td>
                    <td className="px-5 py-3">
                      <RiskScore value={c.risk} />
                    </td>
                    <td className="px-5 py-3">
                      <ConfidenceBar value={c.confidence} />
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet stacked cards */}
          <ul className="divide-y divide-slate-800 lg:hidden">
            {chains.map((c) => (
              <li key={c.id} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <Crosshair className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                    {c.type}
                  </span>
                  <StatusBadge status={c.status} />
                </div>
                <dl className="mt-2.5 grid grid-cols-2 gap-y-1.5 text-xs">
                  <dt className="text-slate-600">Source</dt>
                  <dd className="text-right font-mono text-slate-400">{c.source}</dd>
                  <dt className="text-slate-600">Target</dt>
                  <dd className="text-right text-slate-400">{c.target}</dd>
                  <dt className="text-slate-600">Risk</dt>
                  <dd className="text-right"><RiskScore value={c.risk} /></dd>
                  <dt className="text-slate-600">Confidence</dt>
                  <dd className="flex justify-end"><ConfidenceBar value={c.confidence} /></dd>
                </dl>
                <div className="mt-3">
                  <StageTracker stages={c.stages} currentIndex={c.currentStage} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
