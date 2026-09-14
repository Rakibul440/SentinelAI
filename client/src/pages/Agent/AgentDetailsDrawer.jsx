import { X, Server, Calendar, Activity, AlertTriangle, FolderOpen, ShieldCheck, FileText } from "lucide-react";
import { AgentStatusBadge, CredentialBadge } from "./AgentListTable";
import AgentActionsMenu from "./AgentActionsMenu";

// ---------------------------------------------------------------------------
// SentinelAI — Agent Details Drawer
// Component 6 of the Agents page.
// Slides in from the right when "View Details" is chosen from AgentActionsMenu.
// ---------------------------------------------------------------------------

const STATUS_MESSAGES = {
  Online: { text: "Agent is online.", tone: "text-emerald-400" },
  Offline: { text: "Agent connection lost.", tone: "text-red-400" },
  "Pending Enrollment": { text: "Agent is waiting for enrollment.", tone: "text-amber-400" },
  Revoked: { text: "Agent credential revoked.", tone: "text-slate-500" },
  Disabled: { text: "Agent is offline.", tone: "text-slate-500" },
};

function InfoRow({ label, value, mono = false }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-800/60 last:border-b-0">
      <span className="shrink-0 text-xs text-slate-600">{label}</span>
      <span className={`text-right text-xs ${mono ? "font-mono text-slate-400" : "text-slate-300"}`}>
        {value}
      </span>
    </div>
  );
}

const DEFAULT_AGENT = {
  id: "AGT-002",
  name: "web-agent-03",
  hostname: "web-03.internal",
  ip: "10.0.1.13",
  os: "Ubuntu 22.04 LTS",
  version: "1.4.2",
  status: "Online",
  lastHeartbeat: "6s ago",
  registeredOn: "2026-08-14 09:22",
  logSources: ["Nginx Access Log", "Nginx Error Log", "Journald", "Auth Log"],
  eventsCollected: 21032,
  alertsGenerated: 3,
  relatedIncidents: [
    { id: "INC-0482", name: "Coordinated brute-force → privilege escalation", severity: "Critical" },
  ],
  credentialStatus: "Active",
};

const SEV_COLOR = {
  Critical: "text-red-400",
  High: "text-orange-400",
  Medium: "text-amber-400",
  Low: "text-blue-400",
};

export default function AgentDetailsDrawer({ agent = DEFAULT_AGENT, open, onClose, onAction }) {
  const statusMsg = STATUS_MESSAGES[agent.status] || STATUS_MESSAGES.Offline;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
          onClick={onClose}
          style={{ animation: "fadeBg 0.2s ease-out" }}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-slate-800 bg-slate-900 shadow-2xl shadow-black/60 transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <style>{`
          @keyframes fadeBg { from { opacity: 0; } to { opacity: 1; } }
        `}</style>

        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Server className="h-4 w-4 text-slate-500" />
            <h2 className="text-sm font-semibold text-slate-100">{agent.name}</h2>
            <AgentStatusBadge status={agent.status} />
          </div>
          <div className="flex items-center gap-2">
            <AgentActionsMenu agent={agent} onAction={onAction} />
            <button type="button" onClick={onClose} className="text-slate-500 hover:text-slate-300">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {/* Status message banner */}
          <div className={`border-b border-slate-800 px-5 py-2.5 text-xs font-medium ${statusMsg.tone}`}>
            {statusMsg.text}
          </div>

          {/* Agent Information */}
          <div className="border-b border-slate-800 px-5 py-4">
            <p className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <ShieldCheck className="h-3 w-3" /> Agent Information
            </p>
            <InfoRow label="Agent ID" value={agent.id} mono />
            <InfoRow label="Hostname" value={agent.hostname} mono />
            <InfoRow label="IP Address" value={agent.ip} mono />
            <InfoRow label="Operating System" value={agent.os} />
            <InfoRow label="Agent Version" value={`v${agent.version}`} mono />
            <InfoRow label="Last Heartbeat" value={agent.lastHeartbeat} mono />
            <InfoRow label="Registered On" value={agent.registeredOn} mono />
            <div className="flex items-center justify-between py-2.5">
              <span className="text-xs text-slate-600">Credential Status</span>
              <CredentialBadge status={agent.credentialStatus} />
            </div>
          </div>

          {/* Log Sources */}
          <div className="border-b border-slate-800 px-5 py-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <FileText className="h-3 w-3" /> Log Sources
            </p>
            <div className="flex flex-wrap gap-2">
              {agent.logSources.map((src) => (
                <span key={src} className="border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-400">
                  {src}
                </span>
              ))}
            </div>
          </div>

          {/* Activity Stats */}
          <div className="border-b border-slate-800 px-5 py-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <Activity className="h-3 w-3" /> Activity
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-slate-800 bg-slate-950 p-3">
                <p className="text-xs text-slate-600">Events Collected</p>
                <p className="mt-1 font-mono text-lg font-semibold text-slate-100">
                  {agent.eventsCollected.toLocaleString()}
                </p>
              </div>
              <div className="border border-slate-800 bg-slate-950 p-3">
                <p className="text-xs text-slate-600">Alerts Generated</p>
                <p className={`mt-1 font-mono text-lg font-semibold ${agent.alertsGenerated > 0 ? "text-red-400" : "text-slate-600"}`}>
                  {agent.alertsGenerated}
                </p>
              </div>
            </div>
          </div>

          {/* Related Incidents */}
          <div className="px-5 py-4">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600">
              <FolderOpen className="h-3 w-3" /> Related Incidents
            </p>
            {agent.relatedIncidents.length === 0 ? (
              <p className="text-xs text-slate-600">No open incidents.</p>
            ) : (
              <ul className="space-y-2">
                {agent.relatedIncidents.map((inc) => (
                  <li key={inc.id} className="flex items-start gap-3 border border-slate-800 bg-slate-950 p-3">
                    <AlertTriangle className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${SEV_COLOR[inc.severity] || "text-slate-400"}`} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-slate-200">{inc.name}</p>
                      <p className={`mt-0.5 font-mono text-[11px] ${SEV_COLOR[inc.severity] || "text-slate-500"}`}>
                        {inc.id} · {inc.severity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
