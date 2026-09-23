import { ShieldOff, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// SentinelAI — Recent Alerts table
// Component 4 of the Security Dashboard.
// SeverityBadge and StatusBadge are exported so IncidentsTable,
// AttackChainsTable, and InfrastructureTable can reuse the exact same
// badge styling instead of redefining it.
// ---------------------------------------------------------------------------

const SEVERITY_STYLES = {
  Critical: "border-red-500/40 bg-red-500/10 text-red-400",
  High: "border-orange-400/40 bg-orange-400/10 text-orange-400",
  Medium: "border-amber-400/40 bg-amber-400/10 text-amber-400",
  Low: "border-blue-400/40 bg-blue-400/10 text-blue-400",
};

const STATUS_STYLES = {
  Open: "border-amber-400/40 bg-amber-400/10 text-amber-400",
  Investigating: "border-blue-400/40 bg-blue-400/10 text-blue-400",
  Resolved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Dismissed: "border-slate-600/40 bg-slate-700/20 text-slate-500",
};

export function SeverityBadge({ severity }) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-xs font-medium ${
        SEVERITY_STYLES[severity] || SEVERITY_STYLES.Low
      }`}
    >
      {severity}
    </span>
  );
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-xs font-medium ${
        STATUS_STYLES[status] || STATUS_STYLES.Dismissed
      }`}
    >
      {status}
    </span>
  );
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

const DEFAULT_ALERTS = [
  {
    id: "ALRT-1042",
    name: "SSH brute-force attempt",
    severity: "Critical",
    host: "web-03.internal",
    sourceIp: "203.0.113.4",
    detectedAt: "2m ago",
    confidence: 94,
    status: "Open",
  },
  {
    id: "ALRT-1041",
    name: "Anomalous outbound traffic",
    severity: "High",
    host: "db-01.internal",
    sourceIp: "10.0.4.22",
    detectedAt: "18m ago",
    confidence: 78,
    status: "Investigating",
  },
  {
    id: "ALRT-1039",
    name: "Unusual sudo escalation",
    severity: "Medium",
    host: "app-02.internal",
    sourceIp: "10.0.2.9",
    detectedAt: "41m ago",
    confidence: 61,
    status: "Investigating",
  },
  {
    id: "ALRT-1035",
    name: "Repeated 404 probing",
    severity: "Low",
    host: "web-01.internal",
    sourceIp: "198.51.100.7",
    detectedAt: "2h ago",
    confidence: 35,
    status: "Resolved",
  },
];

export default function AlertsTable({ alerts = DEFAULT_ALERTS, onViewAlert, onViewAll }) {
  const isEmpty = alerts.length === 0;

  return (
    <section className="border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">Recent Alerts</h2>
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
          <ShieldOff className="h-6 w-6 text-slate-700" />
          <p className="text-sm text-slate-500">No active threats detected.</p>
        </div>
      ) : (
        <>
          {/* Desktop / tablet table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-500">
                  <th className="px-5 py-2.5 font-medium">Alert Name</th>
                  <th className="px-5 py-2.5 font-medium">Severity</th>
                  <th className="px-5 py-2.5 font-medium">Host</th>
                  <th className="px-5 py-2.5 font-medium">Source IP</th>
                  <th className="px-5 py-2.5 font-medium">Detection Time</th>
                  <th className="px-5 py-2.5 font-medium">Confidence</th>
                  <th className="px-5 py-2.5 font-medium">Status</th>
                  <th className="px-5 py-2.5 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {alerts.map((a) => (
                  <tr key={a.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="px-5 py-3 text-slate-200">{a.name}</td>
                    <td className="px-5 py-3">
                      <SeverityBadge severity={a.severity} />
                    </td>
                    <td className="px-5 py-3 text-slate-400">{a.host}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">
                      {a.sourceIp}
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">
                      {a.detectedAt}
                    </td>
                    <td className="px-5 py-3">
                      <ConfidenceBar value={a.confidence} />
                    </td>
                    <td className="px-5 py-3">
                      <StatusBadge status={a.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => onViewAlert?.(a)}
                        className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        View
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <ul className="divide-y divide-slate-800 md:hidden">
            {alerts.map((a) => (
              <li key={a.id} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-slate-200">{a.name}</p>
                  <SeverityBadge severity={a.severity} />
                </div>
                <dl className="mt-2.5 grid grid-cols-2 gap-y-1.5 text-xs">
                  <dt className="text-slate-600">Host</dt>
                  <dd className="text-right text-slate-400">{a.host}</dd>
                  <dt className="text-slate-600">Source IP</dt>
                  <dd className="text-right font-mono text-slate-400">{a.sourceIp}</dd>
                  <dt className="text-slate-600">Detected</dt>
                  <dd className="text-right font-mono text-slate-500">{a.detectedAt}</dd>
                  <dt className="text-slate-600">Confidence</dt>
                  <dd className="flex justify-end text-slate-400">
                    <ConfidenceBar value={a.confidence} />
                  </dd>
                </dl>
                <div className="mt-3 flex items-center justify-between">
                  <StatusBadge status={a.status} />
                  <button
                    type="button"
                    onClick={() => onViewAlert?.(a)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                  >
                    View Alert
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
