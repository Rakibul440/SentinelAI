import { useState } from "react";
import { Server, Search, ChevronUp, ChevronDown } from "lucide-react";
import AgentActionsMenu from "./AgentActionsMenu";

// ---------------------------------------------------------------------------
// SentinelAI — Agent List Table
// Component 3 of the Agents page.
// Full 11-column table with sort, search filter, status badges,
// credential status badges, and per-row action menu.
// Collapses to stacked cards on mobile.
// ---------------------------------------------------------------------------

const STATUS_STYLES = {
  Online: { dot: "bg-emerald-500", text: "text-emerald-400", pulse: true },
  Offline: { dot: "bg-red-500", text: "text-red-400", pulse: false },
  "Pending Enrollment": { dot: "bg-amber-400", text: "text-amber-400", pulse: false },
  Revoked: { dot: "bg-slate-600", text: "text-slate-500", pulse: false },
  Disabled: { dot: "bg-slate-600", text: "text-slate-500", pulse: false },
};

const CRED_STYLES = {
  Active: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  Revoked: "border-red-500/40 bg-red-500/10 text-red-400",
  Expired: "border-amber-400/40 bg-amber-400/10 text-amber-400",
  Rotating: "border-blue-400/40 bg-blue-400/10 text-blue-400",
};

export function AgentStatusBadge({ status }) {
  const style = STATUS_STYLES[status] || STATUS_STYLES.Offline;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${style.text}`}>
      <span className="relative flex h-1.5 w-1.5">
        {style.pulse && (
          <span className={`absolute h-1.5 w-1.5 rounded-full ${style.dot} motion-reduce:animate-none animate-ping opacity-75`} />
        )}
        <span className={`relative h-1.5 w-1.5 rounded-full ${style.dot}`} />
      </span>
      {status}
    </span>
  );
}

export function CredentialBadge({ status }) {
  return (
    <span className={`inline-flex items-center border px-2 py-0.5 text-xs font-medium ${CRED_STYLES[status] || CRED_STYLES.Revoked}`}>
      {status}
    </span>
  );
}

const DEFAULT_AGENTS = [
  { id: "AGT-001", name: "web-agent-01", hostname: "web-01.internal", ip: "10.0.1.11", status: "Online", version: "1.4.2", lastHeartbeat: "4s ago", eventsSent: 18240, alertsGenerated: 0, credentialStatus: "Active" },
  { id: "AGT-002", name: "web-agent-03", hostname: "web-03.internal", ip: "10.0.1.13", status: "Online", version: "1.4.2", lastHeartbeat: "6s ago", eventsSent: 21032, alertsGenerated: 3, credentialStatus: "Active" },
  { id: "AGT-003", name: "db-agent-01", hostname: "db-01.internal", ip: "10.0.4.22", status: "Offline", version: "1.3.9", lastHeartbeat: "23m ago", eventsSent: 9481, alertsGenerated: 1, credentialStatus: "Active" },
  { id: "AGT-004", name: "app-agent-02", hostname: "app-02.internal", ip: "10.0.2.9", status: "Online", version: "1.4.2", lastHeartbeat: "8s ago", eventsSent: 14209, alertsGenerated: 1, credentialStatus: "Active" },
  { id: "AGT-005", name: "cache-agent-01", hostname: "cache-01.internal", ip: "10.0.5.4", status: "Pending Enrollment", version: "—", lastHeartbeat: "—", eventsSent: 0, alertsGenerated: 0, credentialStatus: "Active" },
  { id: "AGT-006", name: "legacy-agent-01", hostname: "legacy-01.internal", ip: "10.0.9.2", status: "Revoked", version: "1.2.1", lastHeartbeat: "2d ago", eventsSent: 4102, alertsGenerated: 0, credentialStatus: "Revoked" },
];

const SORT_KEYS = ["name", "status", "lastHeartbeat", "eventsSent", "alertsGenerated"];

export default function AgentListTable({ agents = DEFAULT_AGENTS, onAction }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [sortDir, setSortDir] = useState("asc");

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filtered = agents
    .filter(
      (a) =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.hostname.toLowerCase().includes(search.toLowerCase()) ||
        a.ip.includes(search) ||
        a.id.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = typeof av === "number" ? av - bv : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });

  function SortIcon({ k }) {
    if (sortKey !== k) return <ChevronUp className="h-3 w-3 opacity-20" />;
    return sortDir === "asc"
      ? <ChevronUp className="h-3 w-3 text-cyan-400" />
      : <ChevronDown className="h-3 w-3 text-cyan-400" />;
  }

  function Th({ label, sortable, k }) {
    return (
      <th className="px-4 py-2.5 font-medium">
        {sortable ? (
          <button
            type="button"
            onClick={() => toggleSort(k)}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-300"
          >
            {label}
            <SortIcon k={k} />
          </button>
        ) : (
          <span className="text-slate-500">{label}</span>
        )}
      </th>
    );
  }

  return (
    <section className="border border-slate-800 bg-slate-900">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 px-4 py-3 sm:px-5">
        <h2 className="text-sm font-medium text-slate-200">Agent List</h2>
        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-600" />
          <input
            type="text"
            placeholder="Search agents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-slate-800 bg-slate-950 py-1.5 pl-8 pr-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none transition-colors focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto xl:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 text-xs">
            <tr>
              <Th label="Agent Name" sortable k="name" />
              <Th label="Agent ID" />
              <Th label="Hostname" />
              <Th label="IP Address" />
              <Th label="Status" sortable k="status" />
              <Th label="Version" />
              <Th label="Last Heartbeat" sortable k="lastHeartbeat" />
              <Th label="Events Sent" sortable k="eventsSent" />
              <Th label="Alerts" sortable k="alertsGenerated" />
              <Th label="Credential" />
              <th className="px-4 py-2.5 text-right text-xs font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-4 py-12 text-center text-sm text-slate-500">
                  No agents match your search.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-slate-800/30">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-2 text-slate-200">
                      <Server className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                      {a.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.id}</td>
                  <td className="px-4 py-3 text-slate-400">{a.hostname}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-400">{a.ip}</td>
                  <td className="px-4 py-3"><AgentStatusBadge status={a.status} /></td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.version}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{a.lastHeartbeat}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{a.eventsSent.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={a.alertsGenerated > 0 ? "font-mono text-red-400" : "font-mono text-slate-600"}>
                      {a.alertsGenerated}
                    </span>
                  </td>
                  <td className="px-4 py-3"><CredentialBadge status={a.credentialStatus} /></td>
                  <td className="px-4 py-3 text-right">
                    <AgentActionsMenu agent={a} onAction={onAction} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile / tablet stacked cards */}
      <ul className="divide-y divide-slate-800 xl:hidden">
        {filtered.length === 0 ? (
          <li className="px-4 py-10 text-center text-sm text-slate-500">No agents match your search.</li>
        ) : (
          filtered.map((a) => (
            <li key={a.id} className="px-4 py-3.5">
              <div className="flex items-start justify-between gap-2">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-200">
                  <Server className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                  {a.name}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <AgentStatusBadge status={a.status} />
                  <AgentActionsMenu agent={a} onAction={onAction} align="left" />
                </div>
              </div>
              <dl className="mt-2.5 grid grid-cols-2 gap-y-1.5 text-xs">
                <dt className="text-slate-600">Agent ID</dt>
                <dd className="text-right font-mono text-slate-500">{a.id}</dd>
                <dt className="text-slate-600">Hostname</dt>
                <dd className="text-right text-slate-400">{a.hostname}</dd>
                <dt className="text-slate-600">IP Address</dt>
                <dd className="text-right font-mono text-slate-400">{a.ip}</dd>
                <dt className="text-slate-600">Version</dt>
                <dd className="text-right font-mono text-slate-500">{a.version}</dd>
                <dt className="text-slate-600">Last Heartbeat</dt>
                <dd className="text-right font-mono text-slate-500">{a.lastHeartbeat}</dd>
                <dt className="text-slate-600">Events Sent</dt>
                <dd className="text-right font-mono text-slate-400">{a.eventsSent.toLocaleString()}</dd>
                <dt className="text-slate-600">Alerts</dt>
                <dd className={`text-right font-mono ${a.alertsGenerated > 0 ? "text-red-400" : "text-slate-600"}`}>
                  {a.alertsGenerated}
                </dd>
                <dt className="text-slate-600">Credential</dt>
                <dd className="flex justify-end"><CredentialBadge status={a.credentialStatus} /></dd>
              </dl>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
