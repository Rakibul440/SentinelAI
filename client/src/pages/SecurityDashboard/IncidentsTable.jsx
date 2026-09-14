import { FolderCheck, ArrowRight } from "lucide-react";
import { SeverityBadge, StatusBadge } from "./AlertsTable";

// ---------------------------------------------------------------------------
// SentinelAI — Recent Incidents table
// Component 5 of the Security Dashboard.
// Reuses SeverityBadge / StatusBadge from AlertsTable.jsx so severity and
// status colors stay identical across every table in the dashboard.
// ---------------------------------------------------------------------------

function RiskScore({ value }) {
  const color =
    value >= 70 ? "text-red-400" : value >= 40 ? "text-amber-400" : "text-emerald-400";
  return <span className={`font-mono text-sm font-semibold ${color}`}>{value}</span>;
}

function AttackStage({ stage }) {
  return (
    <span className="inline-flex items-center border border-slate-700 bg-slate-800/60 px-2 py-0.5 text-xs text-slate-400">
      {stage}
    </span>
  );
}

const DEFAULT_INCIDENTS = [
  {
    id: "INC-0482",
    name: "Coordinated brute-force → privilege escalation",
    severity: "Critical",
    riskScore: 91,
    host: "web-03.internal",
    stage: "Privilege Escalation",
    firstSeen: "14:02",
    lastSeen: "2m ago",
    status: "Open",
  },
  {
    id: "INC-0481",
    name: "Suspicious lateral movement across app tier",
    severity: "High",
    riskScore: 74,
    host: "app-02.internal",
    stage: "Lateral Movement",
    firstSeen: "12:47",
    lastSeen: "26m ago",
    status: "Investigating",
  },
  {
    id: "INC-0477",
    name: "Data staging before external transfer",
    severity: "Medium",
    riskScore: 52,
    host: "db-01.internal",
    stage: "Exfiltration",
    firstSeen: "Yesterday",
    lastSeen: "3h ago",
    status: "Investigating",
  },
];

export default function IncidentsTable({
  incidents = DEFAULT_INCIDENTS,
  onInvestigate,
  onViewAll,
}) {
  const isEmpty = incidents.length === 0;

  return (
    <section className="border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">Recent Incidents</h2>
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
          <FolderCheck className="h-6 w-6 text-slate-700" />
          <p className="text-sm text-slate-500">No open incidents.</p>
        </div>
      ) : (
        <>
          {/* Desktop / tablet table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-500">
                  <th className="px-5 py-2.5 font-medium">Incident Name</th>
                  <th className="px-5 py-2.5 font-medium">Severity</th>
                  <th className="px-5 py-2.5 font-medium">Risk Score</th>
                  <th className="px-5 py-2.5 font-medium">Affected Host</th>
                  <th className="px-5 py-2.5 font-medium">Attack Stage</th>
                  <th className="px-5 py-2.5 font-medium">First Seen</th>
                  <th className="px-5 py-2.5 font-medium">Last Seen</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {incidents.map((inc) => (
                  <tr key={inc.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="px-5 py-3 text-slate-200">{inc.name}</td>
                    <td className="px-5 py-3">
                      <SeverityBadge severity={inc.severity} />
                    </td>
                    <td className="px-5 py-3">
                      <RiskScore value={inc.riskScore} />
                    </td>
                    <td className="px-5 py-3 text-slate-400">{inc.host}</td>
                    <td className="px-5 py-3">
                      <AttackStage stage={inc.stage} />
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">
                      {inc.firstSeen}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">
                      {inc.lastSeen}
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={inc.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onInvestigate?.(inc)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        Investigate
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet stacked cards */}
          <ul className="divide-y divide-slate-800 lg:hidden">
            {incidents.map((inc) => (
              <li key={inc.id} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-slate-200">{inc.name}</p>
                  <SeverityBadge severity={inc.severity} />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <AttackStage stage={inc.stage} />
                  <span className="text-xs text-slate-600">Risk</span>
                  <RiskScore value={inc.riskScore} />
                </div>
                <dl className="mt-2.5 grid grid-cols-2 gap-y-1.5 text-xs">
                  <dt className="text-slate-600">Host</dt>
                  <dd className="text-right text-slate-400">{inc.host}</dd>
                  <dt className="text-slate-600">First seen</dt>
                  <dd className="text-right font-mono text-slate-500">{inc.firstSeen}</dd>
                  <dt className="text-slate-600">Last seen</dt>
                  <dd className="text-right font-mono text-slate-500">{inc.lastSeen}</dd>
                </dl>
                <div className="mt-3 flex items-center justify-between">
                  <StatusBadge status={inc.status} />
                  <button
                    type="button"
                    onClick={() => onInvestigate?.(inc)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    Investigate
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
