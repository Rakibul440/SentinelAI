import { useState } from "react";
import AgentsHeader from "./AgentsHeader";
import AgentsActionBar from "./AgentsActionBar";
import AgentListTable from "./AgentListTable";
import AddEnrollAgentModal from "./AddEnrollAgentModal";
import DownloadAgentPanel from "./DownloadAgentPanel";
import AgentDetailsDrawer from "./AgentDetailsDrawer";

// ---------------------------------------------------------------------------
// SentinelAI — Agents Page (assembled)
// Wires all Agents components into the full page.
// No Navbar/Footer — rendered inside your existing app shell.
// ---------------------------------------------------------------------------

const MOCK_AGENTS = [
  { id: "AGT-001", name: "web-agent-01", hostname: "web-01.internal", ip: "10.0.1.11", status: "Online", version: "1.4.2", lastHeartbeat: "4s ago", eventsSent: 18240, alertsGenerated: 0, credentialStatus: "Active", os: "Ubuntu 22.04 LTS", registeredOn: "2026-08-10 11:04", logSources: ["Nginx Access Log", "Journald"], eventsCollected: 18240, relatedIncidents: [] },
  { id: "AGT-002", name: "web-agent-03", hostname: "web-03.internal", ip: "10.0.1.13", status: "Online", version: "1.4.2", lastHeartbeat: "6s ago", eventsSent: 21032, alertsGenerated: 3, credentialStatus: "Active", os: "Ubuntu 22.04 LTS", registeredOn: "2026-08-14 09:22", logSources: ["Nginx Access Log", "Nginx Error Log", "Journald", "Auth Log"], eventsCollected: 21032, relatedIncidents: [{ id: "INC-0482", name: "Coordinated brute-force → privilege escalation", severity: "Critical" }] },
  { id: "AGT-003", name: "db-agent-01", hostname: "db-01.internal", ip: "10.0.4.22", status: "Offline", version: "1.3.9", lastHeartbeat: "23m ago", eventsSent: 9481, alertsGenerated: 1, credentialStatus: "Active", os: "Debian 12", registeredOn: "2026-08-11 14:30", logSources: ["Auth Log", "Journald"], eventsCollected: 9481, relatedIncidents: [] },
  { id: "AGT-004", name: "app-agent-02", hostname: "app-02.internal", ip: "10.0.2.9", status: "Online", version: "1.4.2", lastHeartbeat: "8s ago", eventsSent: 14209, alertsGenerated: 1, credentialStatus: "Active", os: "Ubuntu 20.04 LTS", registeredOn: "2026-08-12 08:17", logSources: ["Application Log", "Journald"], eventsCollected: 14209, relatedIncidents: [] },
  { id: "AGT-005", name: "cache-agent-01", hostname: "cache-01.internal", ip: "10.0.5.4", status: "Pending Enrollment", version: "—", lastHeartbeat: "—", eventsSent: 0, alertsGenerated: 0, credentialStatus: "Active", os: "—", registeredOn: "—", logSources: [], eventsCollected: 0, relatedIncidents: [] },
  { id: "AGT-006", name: "legacy-agent-01", hostname: "legacy-01.internal", ip: "10.0.9.2", status: "Revoked", version: "1.2.1", lastHeartbeat: "2d ago", eventsSent: 4102, alertsGenerated: 0, credentialStatus: "Revoked", os: "CentOS 7", registeredOn: "2026-07-01 10:00", logSources: ["Auth Log"], eventsCollected: 4102, relatedIncidents: [] },
];

const STATS = {
  total: MOCK_AGENTS.length,
  online: MOCK_AGENTS.filter((a) => a.status === "Online").length,
  offline: MOCK_AGENTS.filter((a) => a.status === "Offline").length,
  pendingEnrollment: MOCK_AGENTS.filter((a) => a.status === "Pending Enrollment").length,
  revoked: MOCK_AGENTS.filter((a) => a.status === "Revoked").length,
};

export default function AgentsPage() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  function handleAction(key, agent) {
    if (key === "view") {
      setSelectedAgent(agent);
      setDrawerOpen(true);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <main className="mx-auto max-w-[1600px] space-y-4 p-4 sm:p-6">
        <AgentsHeader stats={STATS} />

        <AgentsActionBar
          onAddAgent={() => setEnrollOpen(true)}
          onDownloadAgent={() => setDownloadOpen((o) => !o)}
          onGenerateToken={() => setEnrollOpen(true)}
        />

        {downloadOpen && (
          <DownloadAgentPanel open={downloadOpen} onClose={() => setDownloadOpen(false)} />
        )}

        <AgentListTable agents={MOCK_AGENTS} onAction={handleAction} />
      </main>

      <AddEnrollAgentModal open={enrollOpen} onClose={() => setEnrollOpen(false)} />

      <AgentDetailsDrawer
        agent={selectedAgent || MOCK_AGENTS[1]}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAction={handleAction}
      />
    </div>
  );
}
