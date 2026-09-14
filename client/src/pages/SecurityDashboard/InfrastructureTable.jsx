import { Server, HeartPulse, CheckCircle2 } from "lucide-react";
import { SeverityBadge } from "./AlertsTable";

// ---------------------------------------------------------------------------
// SentinelAI — Monitored Infrastructure (Hosts) table
// Component 7 of the Security Dashboard.
// Agent Status uses a literal heartbeat pulse for online agents — ties the
// visual directly to what the agent is actually doing (sending heartbeats).
// ---------------------------------------------------------------------------

const AGENT_STATUS_STYLES = {
  Online: { dot: "bg-emerald-500", text: "text-emerald-400" },
  Degraded: { dot: "bg-amber-400", text: "text-amber-400" },
  Offline: { dot: "bg-red-500", text: "text-red-400" },
};

function AgentStatus({ status }) {
  const style = AGENT_STATUS_STYLES[status] || AGENT_STATUS_STYLES.Offline;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
      {status === "Online" ? (
        <HeartPulse className="h-3.5 w-3.5 motion-reduce:animate-none animate-pulse" />
      ) : (
        <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      )}
      {status}
    </span>
  );
}

const DEFAULT_HOSTS = [
  {
    id: "host-1",
    hostname: "web-01.internal",
    ip: "10.0.1.11",
    status: "Online",
    lastHeartbeat: "6s ago",
    events: 18240,
    alerts: 0,
    risk: "Low",
  },
  {
    id: "host-2",
    hostname: "web-03.internal",
    ip: "10.0.1.13",
    status: "Online",
    lastHeartbeat: "4s ago",
    events: 21032,
    alerts: 3,
    risk: "Critical",
  },
  {
    id: "host-3",
    hostname: "db-01.internal",
    ip: "10.0.4.22",
    status: "Degraded",
    lastHeartbeat: "1m ago",
    events: 9481,
    alerts: 1,
    risk: "Medium",
  },
  {
    id: "host-4",
    hostname: "app-02.internal",
    ip: "10.0.2.9",
    status: "Online",
    lastHeartbeat: "8s ago",
    events: 14209,
    alerts: 1,
    risk: "High",
  },
  {
    id: "host-5",
    hostname: "cache-01.internal",
    ip: "10.0.5.4",
    status: "Offline",
    lastHeartbeat: "23m ago",
    events: 640,
    alerts: 0,
    risk: "Low",
  },
];

export default function InfrastructureTable({ hosts = DEFAULT_HOSTS, onViewAll }) {
  const isEmpty = hosts.length === 0;
  const allOnline = !isEmpty && hosts.every((h) => h.status === "Online");

  return (
    <section className="border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">Hosts</h2>
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
          <Server className="h-6 w-6 text-slate-700" />
          <p className="text-sm text-slate-500">No hosts monitored yet.</p>
        </div>
      ) : (
        <>
          {allOnline && (
            <div className="flex items-center gap-2 border-b border-slate-800 bg-emerald-500/5 px-4 py-2 sm:px-5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">
                All monitored agents are online.
              </span>
            </div>
          )}

          {/* Desktop / tablet table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-500">
                  <th className="px-5 py-2.5 font-medium">Hostname</th>
                  <th className="px-5 py-2.5 font-medium">IP Address</th>
                  <th className="px-5 py-2.5 font-medium">Agent Status</th>
                  <th className="px-5 py-2.5 font-medium">Last Heartbeat</th>
                  <th className="px-5 py-2.5 font-medium">Events</th>
                  <th className="px-5 py-2.5 font-medium">Alerts</th>
                  <th className="px-5 py-2.5 font-medium">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {hosts.map((h) => (
                  <tr key={h.id} className="transition-colors hover:bg-slate-800/30">
                    <td className="px-5 py-3">
                      <span className="flex items-center gap-2 text-slate-200">
                        <Server className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                        {h.hostname}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-400">{h.ip}</td>
                    <td className="px-5 py-3">
                      <AgentStatus status={h.status} />
                    </td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500">
                      {h.lastHeartbeat}
                    </td>
                    <td className="px-5 py-3 font-mono text-slate-400">
                      {h.events.toLocaleString()}
                    </td>
                    <td className="px-5 py-3">
                      <span className={h.alerts > 0 ? "font-mono text-red-400" : "font-mono text-slate-600"}>
                        {h.alerts}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <SeverityBadge severity={h.risk} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile / tablet stacked cards */}
          <ul className="divide-y divide-slate-800 lg:hidden">
            {hosts.map((h) => (
              <li key={h.id} className="px-4 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    <Server className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                    {h.hostname}
                  </span>
                  <SeverityBadge severity={h.risk} />
                </div>
                <dl className="mt-2.5 grid grid-cols-2 gap-y-1.5 text-xs">
                  <dt className="text-slate-600">IP Address</dt>
                  <dd className="text-right font-mono text-slate-400">{h.ip}</dd>
                  <dt className="text-slate-600">Status</dt>
                  <dd className="text-right"><AgentStatus status={h.status} /></dd>
                  <dt className="text-slate-600">Last heartbeat</dt>
                  <dd className="text-right font-mono text-slate-500">{h.lastHeartbeat}</dd>
                  <dt className="text-slate-600">Events</dt>
                  <dd className="text-right font-mono text-slate-400">{h.events.toLocaleString()}</dd>
                  <dt className="text-slate-600">Alerts</dt>
                  <dd className={`text-right font-mono ${h.alerts > 0 ? "text-red-400" : "text-slate-600"}`}>
                    {h.alerts}
                  </dd>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
